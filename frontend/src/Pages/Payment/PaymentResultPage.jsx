import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MTTF_LOGO from "../../assets/MTTF_REC.jfif";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export default function PaymentResultPage({ fallbackStatus = "status" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const syncLocalUser = (paymentData) => {
    if (!paymentData?.isMembershipPaid) return;
    const raw = localStorage.getItem("user");
    const currentUser = raw ? JSON.parse(raw) : {};
    localStorage.setItem("user", JSON.stringify({
      ...currentUser,
      isMembershipPaid: true,
      membershipId: paymentData.membershipId,
      membershipActivatedAt: paymentData.membershipActivatedAt,
    }));
  };

  const fetchStatus = async () => {
    if (!orderId) return;
    const res = await fetch(`${API}/payments/status/${orderId}`, { headers });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Unable to fetch payment status.");
    }
    setPayment(data.payment);
    syncLocalUser(data.payment);
  };

  const verifyPayment = async () => {
    if (!orderId) {
      setError("Payment order id is missing.");
      setLoading(false);
      return;
    }

    if (!token) {
      navigate("/auth");
      return;
    }

    setChecking(true);
    try {
      const res = await fetch(`${API}/payments/verify`, {
        method: "POST",
        headers,
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/auth");
        return;
      }

      if (!res.ok || !data.success) {
        await fetchStatus();
      } else {
        setPayment(data.payment);
        syncLocalUser(data.payment);
      }
    } catch (err) {
      try {
        await fetchStatus();
      } catch (statusError) {
        setError(err.message || statusError.message || "Unable to verify payment.");
      }
    } finally {
      setChecking(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [orderId]);

  useEffect(() => {
    if (!orderId || !token) return undefined;
    const terminal = ["FAILED", "REFUNDED", "CANCELLED"].includes(payment?.paymentStatus);
    const active = payment?.paymentStatus === "SUCCESS" && payment?.isMembershipPaid;
    if (terminal || active) return undefined;

    const interval = setInterval(() => {
      fetchStatus().catch(() => {});
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, token, payment?.paymentStatus, payment?.isMembershipPaid]);

  const view = useMemo(() => {
    if (error) return "error";
    if (!payment) return fallbackStatus;
    if (payment.paymentStatus === "SUCCESS" && payment.isMembershipPaid) return "success";
    if (payment.paymentStatus === "SUCCESS" && !payment.isMembershipPaid) return "pending";
    if (["FAILED", "REFUNDED", "CANCELLED"].includes(payment.paymentStatus)) return "failure";
    return "pending";
  }, [error, payment, fallbackStatus]);

  const content = {
    success: {
      title: "Membership Active",
      message: "Your payment is verified and your lifetime membership is active.",
      tone: "#16a34a",
      icon: "M5 13L9 17L19 7",
      action: "Go to Homepage",
      onAction: () => navigate("/"),
    },
    pending: {
      title: "Verification Pending",
      message: "Payment confirmation is being verified by the secure webhook. This page will update automatically.",
      tone: "#2563eb",
      icon: "M12 8v4l3 3",
      action: checking ? "Checking..." : "Check Again",
      onAction: verifyPayment,
    },
    failure: {
      title: "Payment Not Completed",
      message: "The payment was not successful or was cancelled. No membership activation was performed.",
      tone: "#dc2626",
      icon: "M6 6l12 12M18 6L6 18",
      action: "Try Payment Again",
      onAction: () => navigate("/payment"),
    },
    error: {
      title: "Unable to Verify",
      message: error || "We could not verify this payment order.",
      tone: "#dc2626",
      icon: "M12 9v4M12 17h.01",
      action: "Back to Payment",
      onAction: () => navigate("/payment"),
    },
    status: {
      title: "Checking Payment",
      message: "Please wait while we check your payment status.",
      tone: "#2563eb",
      icon: "M12 8v4l3 3",
      action: "Check Again",
      onAction: verifyPayment,
    },
  }[view];

  return (
    <>
      <style>{`
        .result-shell {
          min-height: 100vh;
          background: #f8faff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }
        .result-header {
          height: 60px;
          background: rgba(255,255,255,0.96);
          border-bottom: 1px solid rgba(37,99,235,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }
        .result-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .result-logo img {
          height: 40px;
          width: auto;
          object-fit: contain;
        }
        .result-label {
          border-left: 1px solid rgba(37,99,235,0.15);
          padding-left: 12px;
          color: #2563eb;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .pay-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #64748b;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .pay-back-link:hover { color: #2563eb; }
        .pay-spinner {
          width: 22px;
          height: 22px;
          border: 2px solid rgba(37,99,235,0.2);
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: resultSpin 0.7s linear infinite;
        }
        .result-main {
          flex: 1;
          display: grid;
          place-items: center;
          padding: 40px 20px;
          background:
            linear-gradient(135deg, rgba(11,19,41,0.96), rgba(37,99,235,0.9)) top/100% 320px no-repeat,
            #f8faff;
        }
        .result-card {
          width: min(520px, 100%);
          background: #fff;
          border: 1px solid rgba(37,99,235,0.12);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(15,23,42,0.16);
          padding: 36px;
          text-align: center;
        }
        .result-icon {
          width: 72px;
          height: 72px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          margin: 0 auto 22px;
        }
        .result-title {
          color: #0b1329;
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 10px;
        }
        .result-message {
          color: #475569;
          font-size: 14px;
          line-height: 1.7;
          margin: 0 auto 24px;
          max-width: 390px;
        }
        .result-meta {
          display: grid;
          gap: 8px;
          padding: 16px;
          background: #f8faff;
          border: 1px solid rgba(37,99,235,0.08);
          border-radius: 12px;
          margin-bottom: 24px;
          text-align: left;
        }
        .result-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          color: #64748b;
          font-size: 12px;
        }
        .result-row strong {
          color: #0b1329;
          font-weight: 700;
          text-align: right;
        }
        .result-action {
          border: none;
          background: #2563eb;
          color: #fff;
          border-radius: 999px;
          padding: 13px 28px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 10px 26px rgba(37,99,235,0.28);
        }
        .result-action:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        @keyframes resultSpin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="result-shell">
        <header className="result-header">
          <div className="result-logo">
            <img src={MTTF_LOGO} alt="MTTF" />
            <span className="result-label">Payment Status</span>
          </div>
          <button className="pay-back-link" onClick={() => navigate("/")}>Back to Site</button>
        </header>

        <main className="result-main">
          <section className="result-card">
            <div className="result-icon" style={{ background: `${content.tone}12`, border: `1px solid ${content.tone}30` }}>
              {loading ? (
                <span className="pay-spinner" style={{ borderTopColor: content.tone, borderColor: `${content.tone}30`, borderTopWidth: 2 }} />
              ) : (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d={content.icon} stroke={content.tone} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  {view === "pending" && <circle cx="12" cy="12" r="10" stroke={content.tone} strokeWidth="1.8" />}
                  {view === "error" && <circle cx="12" cy="12" r="10" stroke={content.tone} strokeWidth="1.8" />}
                </svg>
              )}
            </div>

            <h1 className="result-title">{loading ? "Checking Payment" : content.title}</h1>
            <p className="result-message">{loading ? "Please wait while we securely verify this order." : content.message}</p>

            <div className="result-meta">
              <div className="result-row"><span>Order ID</span><strong>{orderId || "Missing"}</strong></div>
              <div className="result-row"><span>Payment Status</span><strong>{payment?.paymentStatus || "Checking"}</strong></div>
              <div className="result-row"><span>Webhook Verified</span><strong>{payment?.webhookVerified ? "Yes" : "No"}</strong></div>
              {payment?.membershipId && (
                <div className="result-row"><span>Membership ID</span><strong>{payment.membershipId}</strong></div>
              )}
            </div>

            <button className="result-action" onClick={content.onAction} disabled={checking || loading}>
              {loading ? "Checking..." : content.action}
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
