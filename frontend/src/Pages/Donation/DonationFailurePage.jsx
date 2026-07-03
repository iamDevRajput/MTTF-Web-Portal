import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .result-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; padding: 24px;
    background-image: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,.06) 0%, transparent 60%);
  }
  .result-card {
    max-width: 520px; width: 100%; background: #fff; border: 1px solid rgba(37,99,235,.12);
    border-radius: 20px; padding: 48px 40px; text-align: center;
    box-shadow: 0 20px 60px rgba(37,99,235,.1);
  }
  .result-icon { font-size: 56px; margin-bottom: 16px; }
  .result-title { font-size: 28px; font-weight: 800; color: #0b1329; margin-bottom: 8px; }
  .result-sub { font-size: 15px; color: #475569; margin-bottom: 32px; line-height: 1.6; }
  .result-detail { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid rgba(37,99,235,.08); font-size: 14px; text-align: left; }
  .result-detail span:first-child { color: #475569; flex-shrink: 0; }
  .result-detail span:last-child { font-weight: 600; color: #0b1329; word-break: break-all; text-align: right; }
  .result-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 28px; font-size: 14px; font-weight: 600; border-radius: 9999px;
    cursor: pointer; transition: all 0.3s ease; text-decoration: none; border: none;
    font-family: inherit; width: 100%; margin-top: 12px;
  }
  .result-btn-primary { background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; box-shadow: 0 4px 16px rgba(37,99,235,.25); }
  .result-btn-secondary { background: #fff; color: #2563eb; border: 1px solid rgba(37,99,235,.2); }
  .result-loading { color: #475569; font-size: 15px; }
`;

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date(value));
};

export default function DonationFailurePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(Boolean(orderId));

  useEffect(() => {
    if (!orderId) return;

    fetch(`${API}/donations/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.donation?.paymentStatus === "SUCCESS") {
            navigate(`/donate/success?order_id=${orderId}`, { replace: true });
            return;
          }
          setDonation(data.donation);
        }
      })
      .finally(() => setLoading(false));
  }, [orderId, navigate]);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="result-page"><div className="result-card"><div className="result-loading">Checking payment status...</div></div></div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="result-page">
        <div className="result-card">
          <div className="result-icon">❌</div>
          <h1 className="result-title">Payment Unsuccessful</h1>
          <p className="result-sub">
            Your donation could not be completed. No amount has been charged. Please try again or contact us if you need assistance.
          </p>

          {donation && (
            <div style={{ marginBottom: 8 }}>
              <div className="result-detail"><span>Order ID</span><span>{donation.orderId}</span></div>
              <div className="result-detail"><span>Payment Status</span><span>{donation.paymentStatus}</span></div>
              {donation.amount && (
                <div className="result-detail"><span>Attempted Amount</span><span>₹{Number(donation.amount).toLocaleString("en-IN")}</span></div>
              )}
            </div>
          )}

          <button type="button" className="result-btn result-btn-primary" onClick={() => navigate("/donate")}>
            Try Again
          </button>
          <Link to="/" className="result-btn result-btn-secondary">Back to Home</Link>
        </div>
      </div>
    </>
  );
}
