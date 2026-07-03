import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const FAILED_STATUSES = ["FAILED", "CANCELLED", "REFUNDED"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .success-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; padding: 24px;
    background-image: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,.06) 0%, transparent 60%);
  }
  .success-card {
    max-width: 520px; width: 100%; background: #fff; border: 1px solid rgba(37,99,235,.12);
    border-radius: 20px; padding: 48px 40px; text-align: center;
    box-shadow: 0 20px 60px rgba(37,99,235,.1);
  }
  .success-icon { font-size: 56px; margin-bottom: 16px; }
  .success-title { font-size: 28px; font-weight: 800; color: #0b1329; margin-bottom: 8px; }
  .success-sub { font-size: 15px; color: #475569; margin-bottom: 32px; line-height: 1.6; }
  .success-detail { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid rgba(37,99,235,.08); font-size: 14px; text-align: left; }
  .success-detail span:first-child { color: #475569; flex-shrink: 0; }
  .success-detail span:last-child { font-weight: 600; color: #0b1329; word-break: break-all; text-align: right; }
  .success-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 28px; font-size: 14px; font-weight: 600; border-radius: 9999px;
    cursor: pointer; transition: all 0.3s ease; text-decoration: none; border: none;
    font-family: inherit; width: 100%; margin-top: 12px;
  }
  .success-btn-primary { background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; box-shadow: 0 4px 16px rgba(37,99,235,.25); }
  .success-btn-secondary { background: #fff; color: #2563eb; border: 1px solid rgba(37,99,235,.2); }
  .success-loading { color: #475569; font-size: 15px; }
  .success-cert-note { background: rgba(37,99,235,.06); border-radius: 10px; padding: 14px; font-size: 13px; color: #2563eb; font-weight: 600; margin: 24px 0; }
`;

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date(value));
};

export default function DonationSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate("/donate/failure", { replace: true });
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`${API}/donations/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          navigate(`/donate/failure?order_id=${orderId}`, { replace: true });
          return;
        }

        if (FAILED_STATUSES.includes(data.donation?.paymentStatus)) {
          navigate(`/donate/failure?order_id=${orderId}`, { replace: true });
          return;
        }

        if (data.donation?.paymentStatus === "PENDING") {
          setTimeout(verify, 3000);
          return;
        }

        setDonation(data.donation);
        setLoading(false);
      } catch {
        navigate(`/donate/failure?order_id=${orderId}`, { replace: true });
      }
    };

    verify();
  }, [orderId, navigate]);

  const downloadCertificate = () => {
    if (!orderId || !donation?.certificateId) return;
    const email = donation.donorEmail ? `?email=${encodeURIComponent(donation.donorEmail)}` : "";
    window.open(`${API}/donations/certificate/${orderId}${email}`, "_blank");
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="success-page">
          <div className="success-card">
            <div className="success-loading">Verifying your donation...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h1 className="success-title">Thank You for Your Contribution!</h1>
          <p className="success-sub">
            Your generosity helps us empower education, advance research, and inspire innovation across communities.
          </p>

          <div style={{ marginBottom: 8 }}>
            <div className="success-detail"><span>Donor Name</span><span>{donation.donorName}</span></div>
            <div className="success-detail"><span>Amount</span><span>₹{Number(donation.amount).toLocaleString("en-IN")}</span></div>
            <div className="success-detail"><span>Payment ID</span><span>{donation.gatewayPaymentId || "—"}</span></div>
            <div className="success-detail"><span>Order ID</span><span>{donation.orderId}</span></div>
            <div className="success-detail"><span>Date & Time</span><span>{formatDateTime(donation.paymentTime || donation.updatedAt)}</span></div>
            <div className="success-detail"><span>Payment Status</span><span>{donation.paymentStatus}</span></div>
            {donation.certificateId && (
              <div className="success-detail"><span>Certificate No.</span><span>{donation.certificateId}</span></div>
            )}
          </div>

          <div className="success-cert-note">
            📧 Your certificate has been emailed to {donation.donorEmail}
          </div>

          {donation.certificateId && (
            <button type="button" className="success-btn success-btn-primary" onClick={downloadCertificate}>
              ⬇ Download Certificate
            </button>
          )}
          <Link to="/" className="success-btn success-btn-secondary">Back to Home</Link>
        </div>
      </div>
    </>
  );
}
