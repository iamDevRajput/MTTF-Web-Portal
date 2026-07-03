import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MTTF_LOGO from "../../assets/MTTF_REC.jfif";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

let razorpaySdkPromise;

const loadRazorpaySdk = () => {
  if (window.Razorpay) {
    return Promise.resolve(window.Razorpay);
  }

  if (!razorpaySdkPromise) {
    razorpaySdkPromise = new Promise((resolve, reject) => {
      const existingScript = document.getElementById("razorpay-sdk");
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.Razorpay));
        existingScript.addEventListener("error", () => reject(new Error("Razorpay SDK failed to load.")));
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        if (window.Razorpay) resolve(window.Razorpay);
        else reject(new Error("Razorpay SDK is unavailable."));
      };
      script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
      document.body.appendChild(script);
    });
  }

  return razorpaySdkPromise;
};

const BENEFITS = {
  individual: [
    "Access to all MTTF research publications",
    "Invitation to annual MathTech conferences",
    "Mentorship from industry experts",
    "Exclusive workshops & webinars",
    "Digital membership certificate",
    "Priority access to new programs",
    "MTTF community forum access",
  ],
  institutional: [
    "All Individual benefits included",
    "Bulk student enrollment support",
    "Custom curriculum development",
    "Institutional research partnerships",
    "Annual impact & progress reports",
    "Dedicated MTTF program liaison",
    "Featured on MTTF partner page",
    "Co-branding opportunities",
  ],
};

export default function PaymentPage() {
  const navigate = useNavigate();
  const [prices, setPrices] = useState({});
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  let user = null;
  try { user = userRaw ? JSON.parse(userRaw) : null; } catch { user = null; }
  const membershipType = user?.membershipType || "individual";
  const price = prices[membershipType];

  useEffect(() => {
    if (!user || !token) { navigate("/auth"); return; }

    const headers = { Authorization: `Bearer ${token}` };
    const loadPaymentContext = async () => {
      setLoadingPrice(true);
      setError("");
      try {
        const [meRes, configRes] = await Promise.all([
          fetch(`${API}/auth/me`, { headers }),
          fetch(`${API}/payments/config`, { headers }),
        ]);

        if (meRes.status === 401 || configRes.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/auth");
          return;
        }

        const meData = await meRes.json();
        const configData = await configRes.json();

        if (meData.success) {
          localStorage.setItem("user", JSON.stringify(meData.user));
          setPaid(Boolean(meData.user.isMembershipPaid));
        }
        if (configData.success) {
          setPrices(configData.prices || {});
        } else {
          setError(configData.message || "Unable to load membership price.");
        }
      } catch {
        setError("Unable to load secure payment configuration.");
      } finally {
        setLoadingPrice(false);
      }
    };

    loadPaymentContext();
  }, []);

  const handlePay = async () => {
    setError("");
    setPaying(true);
    try {
      const res = await fetch(`${API}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/auth");
        return;
      }
      if (!res.ok || !data.success) {
        if (res.status === 409) setPaid(true);
        throw new Error(data.message || "Unable to create secure payment order.");
      }

      if (data.order.razorpayOrderId.startsWith("order_mock_")) {
        setTimeout(() => {
          window.location.href = `/payment/status?order_id=${data.order.orderId}`;
        }, 1000);
        return;
      }

      await loadRazorpaySdk();

      const options = {
        key: data.order.razorpayKeyId,
        amount: data.order.amount * 100, // Razorpay expects paise
        currency: data.order.currency,
        name: "MathTech Thinking Foundation",
        description: "Membership Payment",
        order_id: data.order.razorpayOrderId,
        handler: function (response) {
          window.location.href = `/payment/status?order_id=${data.order.orderId}`;
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#2563EB",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        window.location.href = `/payment/status?order_id=${data.order.orderId}`;
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "Payment could not be started. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

  return (
    <>
      <style>{`
        .payment-wrapper {
          min-height: 100vh;
          background: #f8faff;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* ── Minimal Checkout Header ── */
        .pay-minimal-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(37,99,235,0.08);
          padding: 0 32px;
          height: 60px;
          display: flex; align-items: center; justify-content: space-between;
          box-shadow: 0 1px 12px rgba(37,99,235,0.06);
        }
        .pay-logo-wrap {
          display: flex; align-items: center; gap: 12px;
        }
        .pay-logo-wrap img {
          height: 40px; width: auto; object-fit: contain;
        }
        .pay-logo-divider {
          width: 1px; height: 22px; background: rgba(37,99,235,0.15);
        }
        .pay-logo-label {
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #2563eb;
        }
        .pay-back-link {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 500; letter-spacing: 1px;
          text-transform: uppercase; color: #64748b;
          background: none; border: none; cursor: pointer;
          transition: color 0.2s; padding: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .pay-back-link:hover { color: #2563eb; }
        .pay-back-link:hover svg { transform: translateX(-3px); }
        .pay-back-link svg { transition: transform 0.2s; }

        /* ── Lock badge ── */
        .pay-lock-badge {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; color: #94a3b8; font-weight: 500;
        }

        /* ── Hero Banner ── */
        .pay-hero {
          background: linear-gradient(135deg, #0b1329 0%, #1e3a8a 60%, #2563eb 100%);
          padding: 110px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pay-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .pay-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #93c5fd; font-size: 10px; font-weight: 600; letter-spacing: 2.5px;
          text-transform: uppercase; padding: 6px 16px; border-radius: 999px;
          margin-bottom: 20px;
        }
        .pay-hero-eyebrow span { width: 5px; height: 5px; border-radius: 50%; background: #60a5fa; }
        .pay-hero h1 {
          font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: #fff;
          letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 12px;
        }
        .pay-hero h1 em { font-style: normal; color: #60a5fa; }
        .pay-hero p {
          font-size: 15px; color: rgba(255,255,255,0.6); font-weight: 300; max-width: 440px; margin: 0 auto;
        }

        /* ── Breadcrumb ── */
        .pay-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: rgba(255,255,255,0.45); margin-bottom: 28px;
          justify-content: center;
        }
        .pay-breadcrumb a {
          color: rgba(255,255,255,0.45); text-decoration: none; cursor: pointer;
          transition: color 0.2s;
        }
        .pay-breadcrumb a:hover { color: #60a5fa; }

        /* ── Content Section ── */
        .pay-content {
          max-width: 1000px; margin: -32px auto 0;
          padding: 0 24px 80px; position: relative; z-index: 2;
        }

        /* ── Grid ── */
        .pay-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .pay-grid { grid-template-columns: 1fr; }
        }

        /* ── Left Card ── */
        .pay-left-card {
          background: #fff;
          border: 1px solid rgba(37,99,235,0.12);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(37,99,235,0.06);
          overflow: hidden;
          animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .pay-card-header {
          padding: 28px 32px 24px;
          border-bottom: 1px solid rgba(37,99,235,0.08);
          background: linear-gradient(135deg, rgba(37,99,235,0.04), rgba(37,99,235,0.01));
        }
        .mem-type-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(37,99,235,0.08); border: 1px solid rgba(37,99,235,0.2);
          color: #2563eb; font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 4px 12px; border-radius: 999px;
          margin-bottom: 14px;
        }
        .mem-type-badge span { width: 5px; height: 5px; border-radius: 50%; background: #2563eb; }
        .pay-card-header h2 {
          font-size: 22px; font-weight: 700; color: #0b1329; margin-bottom: 6px;
          letter-spacing: -0.02em;
        }
        .pay-card-header p {
          font-size: 13px; color: #475569; font-weight: 300; line-height: 1.6;
        }

        .pay-card-body { padding: 28px 32px; }

        .benefits-title {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #2563eb; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;
        }
        .benefits-title::after {
          content: ''; flex: 1; height: 1px; background: rgba(37,99,235,0.12);
        }

        .benefits-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        @media (max-width: 600px) {
          .benefits-grid { grid-template-columns: 1fr; }
        }

        .benefit-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: #334155; font-weight: 400; line-height: 1.5;
          animation: fadeIn 0.4s both;
        }
        .benefit-icon {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          background: rgba(37,99,235,0.08); border: 1px solid rgba(37,99,235,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }
        .benefit-icon svg { color: #2563eb; }

        /* ── Right Card ── */
        .pay-right-card {
          background: #fff;
          border: 1px solid rgba(37,99,235,0.12);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(37,99,235,0.06);
          overflow: hidden;
          position: sticky;
          top: 96px;
          animation: slideUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .pay-right-header {
          background: linear-gradient(135deg, #0b1329, #1e3a8a);
          padding: 28px 28px 24px;
        }
        .price-label-sm {
          font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 8px;
        }
        .price-display {
          display: flex; align-items: flex-start; gap: 4px; margin-bottom: 4px;
        }
        .price-currency { font-size: 20px; font-weight: 500; color: rgba(255,255,255,0.7); padding-top: 8px; }
        .price-amount { font-size: 52px; font-weight: 800; color: #fff; line-height: 1; letter-spacing: -0.02em; }
        .price-period { font-size: 12px; color: rgba(255,255,255,0.4); }

        .pay-right-body { padding: 24px 28px; }

        .summary-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0; border-bottom: 1px solid rgba(37,99,235,0.06);
          font-size: 13px;
        }
        .summary-row:last-child { border-bottom: none; }
        .summary-row .label { color: #64748b; font-weight: 400; }
        .summary-row .val { color: #0b1329; font-weight: 500; text-transform: capitalize; }
        .summary-row.total { padding-top: 16px; margin-top: 4px; border-top: 2px solid rgba(37,99,235,0.12); border-bottom: none; }
        .summary-row.total .label { color: #0b1329; font-weight: 600; font-size: 14px; }
        .summary-row.total .val { color: #2563eb; font-weight: 700; font-size: 18px; }

        .pay-btn {
          width: 100%; padding: 16px; margin-top: 20px;
          background: #2563eb; border: none; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
          border-radius: 999px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }
        .pay-btn:hover:not(:disabled) {
          background: #1d4ed8;
          box-shadow: 0 8px 28px rgba(37,99,235,0.45);
          transform: translateY(-1px);
        }
        .pay-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .pay-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }

        .pay-error {
          background: #fef2f2; border: 1px solid #fecaca;
          color: #dc2626; font-size: 12px; padding: 10px 14px;
          margin-top: 12px; border-radius: 8px; text-align: center; line-height: 1.5;
        }

        .secure-badges {
          display: flex; align-items: center; justify-content: center; gap: 20px;
          margin-top: 18px; padding-top: 18px; border-top: 1px solid rgba(37,99,235,0.08);
        }
        .badge {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; color: #94a3b8; font-weight: 500;
        }
        .badge svg { color: #2563eb; }

        /* ── Loading ── */
        .loading-price {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #94a3b8;
        }
        .loading-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #e2e8f0;
          animation: pulse 1s infinite;
        }

        /* ── Success ── */
        .pay-success {
          text-align: center; padding: 12px 0 8px;
        }
        .success-ring {
          width: 64px; height: 64px; border-radius: 50%;
          border: 2px solid #16a34a; background: rgba(22,163,74,0.06);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px; animation: pop 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .pay-success h3 { font-size: 20px; font-weight: 700; color: #0b1329; margin-bottom: 8px; }
        .pay-success p { font-size: 13px; color: #475569; line-height: 1.7; font-weight: 300; }
        .success-go {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 24px; padding: 12px 28px;
          background: #2563eb; color: #fff; border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border-radius: 999px; cursor: pointer;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          transition: all 0.25s;
        }
        .success-go:hover { background: #1d4ed8; transform: translateY(-1px); }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="payment-wrapper">

        {/* Minimal Checkout Header */}
        <header className="pay-minimal-header">
          <div className="pay-logo-wrap">
            <img src={MTTF_LOGO} alt="MTTF" />
            <span className="pay-logo-divider" />
            <span className="pay-logo-label">Secure Checkout</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span className="pay-lock-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#16a34a" strokeWidth="1.8"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>256-bit SSL</span>
            </span>
            <button className="pay-back-link" onClick={() => navigate("/")}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Site
            </button>
          </div>
        </header>

        {/* Hero */}
        <div className="pay-hero">
          <div className="pay-breadcrumb">
            <a onClick={() => navigate("/")}>Home</a>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Membership Payment</span>
          </div>
          <div className="pay-hero-eyebrow">
            <span />
            Secure Checkout
          </div>
          <h1>Complete Your <em>Membership</em></h1>
          <p>One-time payment · Lifetime access to all MTTF programs and resources</p>
        </div>

        {/* Content */}
        <div className="pay-content">
          <div className="pay-grid">

            {/* Left: Benefits */}
            <div className="pay-left-card">
              <div className="pay-card-header">
                <div className="mem-type-badge">
                  <span />
                  {membershipType === "institutional" ? "Institutional" : "Individual"} Membership
                </div>
                <h2>What's included in your membership</h2>
                <p>Join a growing community of mathematicians, technologists, and innovators shaping the future of STEM education.</p>
              </div>
              <div className="pay-card-body">
                <div className="benefits-title">All Benefits Included</div>
                <div className="benefits-grid">
                  {BENEFITS[membershipType].map((b, i) => (
                    <div key={i} className="benefit-item" style={{ animationDelay: `${i * 50}ms` }}>
                      <span className="benefit-icon">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Payment Summary */}
            <div className="pay-right-card">
              {paid ? (
                <div style={{ padding: "32px 28px" }}>
                  <div className="pay-success">
                    <div className="success-ring">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Membership Active!</h3>
                    <p>Your membership is already active.<br/>You have full access to all MTTF programs.</p>
                    <button className="success-go" onClick={() => navigate("/")}>
                      Go to Homepage
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6H11M7 2L11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="pay-right-header">
                    <div className="price-label-sm">Membership Fee</div>
                    {loadingPrice ? (
                      <div className="loading-price">
                        <span className="loading-dot" /><span className="loading-dot" style={{ animationDelay: "0.2s" }} /><span className="loading-dot" style={{ animationDelay: "0.4s" }} />
                      </div>
                    ) : !price ? (
                      <div className="price-period">Price unavailable</div>
                    ) : (
                      <>
                        <div className="price-display">
                          <span className="price-currency">₹</span>
                          <span className="price-amount">{Number(price).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="price-period">One-time · Lifetime membership</div>
                      </>
                    )}
                  </div>

                  <div className="pay-right-body">
                    <div className="summary-row">
                      <span className="label">Member Name</span>
                      <span className="val">{user?.name || "—"}</span>
                    </div>
                    <div className="summary-row">
                      <span className="label">Membership Type</span>
                      <span className="val">{membershipType}</span>
                    </div>
                    <div className="summary-row">
                      <span className="label">GST (18%)</span>
                      <span className="val">Included</span>
                    </div>
                    <div className="summary-row total">
                      <span className="label">Total Payable</span>
                      <span className="val">{loadingPrice ? "—" : price ? fmt(price) : "Unavailable"}</span>
                    </div>

                    <button className="pay-btn" onClick={handlePay} disabled={paying || loadingPrice || !price}>
                      {paying ? (
                        <><span className="pay-spinner" /> Processing…</>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
                          </svg>
                          Pay {loadingPrice || !price ? "" : fmt(price)} Securely
                        </>
                      )}
                    </button>

                    {error && <div className="pay-error">{error}</div>}

                    <div className="secure-badges">
                      <span className="badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        SSL Secured
                      </span>
                      <span className="badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Verified Activation
                      </span>
                      <span className="badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        RBI Compliant
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
