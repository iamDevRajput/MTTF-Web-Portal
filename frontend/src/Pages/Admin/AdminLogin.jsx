import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MTTF_LOGO from "../../assets/MTTF_REC.jfif";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/admin`;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Invalid credentials.");
      } else {
        localStorage.setItem("adminToken", data.token);
        navigate("/mttf-admin-2025/dashboard");
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .adm-login-shell {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        @media (max-width: 768px) {
          .adm-login-shell { grid-template-columns: 1fr; }
          .adm-left-panel { display: none; }
        }

        /* ── Left Brand Panel ── */
        .adm-left-panel {
          background: linear-gradient(160deg, #0b1329 0%, #1e3a8a 55%, #2563eb 100%);
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative; overflow: hidden;
        }
        .adm-left-panel::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M50 50v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zm0-40V2h-4v8h-8v4h8v8h4v-8h8V10h-8zM10 50v-8H6v8H0v4h6v8h4v-8h8v-4H10zM10 10V2H6v8H0v4h6v8h4v-8h8V10H10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .adm-left-top { position: relative; z-index: 2; }
        .adm-left-logo {
          display: flex; align-items: center; gap: 14px; margin-bottom: 64px;
        }
        .adm-left-logo img {
          height: 48px; width: auto; object-fit: contain;
          border-radius: 6px;
        }
        .adm-left-logo-text {
          font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.5);
          border-left: 1px solid rgba(255,255,255,0.2);
          padding-left: 14px;
        }

        .adm-left-heading {
          font-size: clamp(28px, 3vw, 40px); font-weight: 800;
          color: #fff; line-height: 1.2; letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .adm-left-heading em { font-style: normal; color: #60a5fa; }
        .adm-left-desc {
          font-size: 14px; color: rgba(255,255,255,0.5);
          line-height: 1.7; font-weight: 300; max-width: 320px;
        }

        .adm-left-features { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 16px; }
        .adm-left-feat {
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 300;
        }
        .adm-feat-icon {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
        }
        .adm-feat-icon svg { color: #93c5fd; }

        .adm-left-footer {
          position: relative; z-index: 2;
          font-size: 11px; color: rgba(255,255,255,0.2);
          letter-spacing: 0.5px;
        }

        /* ── Right Form Panel ── */
        .adm-right-panel {
          background: #f8faff;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
        }

        .adm-form-wrap { width: 100%; max-width: 380px; }

        .adm-form-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(37,99,235,0.06); border: 1px solid rgba(37,99,235,0.15);
          color: #2563eb; font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 5px 12px; border-radius: 999px;
          margin-bottom: 24px;
        }
        .adm-form-eyebrow span { width: 5px; height: 5px; border-radius: 50%; background: #2563eb; }

        .adm-form-title {
          font-size: 28px; font-weight: 800; color: #0b1329;
          letter-spacing: -0.02em; margin-bottom: 6px;
        }
        .adm-form-sub {
          font-size: 13px; color: #64748b; font-weight: 300;
          margin-bottom: 36px; line-height: 1.6;
        }

        .adm-card {
          background: #fff;
          border: 1px solid rgba(37,99,235,0.12);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(37,99,235,0.06);
          padding: 32px 28px;
        }

        .adm-field { margin-bottom: 18px; }
        .adm-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 1.8px;
          text-transform: uppercase; color: #475569; margin-bottom: 8px;
        }
        .adm-input-wrap { position: relative; }
        .adm-input {
          width: 100%; padding: 13px 16px;
          background: #f8faff;
          border: 1.5px solid rgba(37,99,235,0.12);
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
          font-weight: 300; color: #0b1329; outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .adm-input::placeholder { color: #cbd5e1; }
        .adm-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }
        .adm-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #94a3b8;
          cursor: pointer; font-size: 11px; font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: 0.5px;
          padding: 0; transition: color 0.2s;
        }
        .adm-eye:hover { color: #2563eb; }

        .adm-error {
          background: #fef2f2; border: 1px solid #fecaca;
          color: #dc2626; font-size: 12px; padding: 10px 14px;
          margin-bottom: 16px; border-radius: 8px; text-align: center;
          line-height: 1.5;
        }

        .adm-submit {
          width: 100%; padding: 15px;
          background: #2563eb; border: none; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border-radius: 999px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          margin-top: 8px;
        }
        .adm-submit:hover:not(:disabled) {
          background: #1d4ed8;
          box-shadow: 0 8px 28px rgba(37,99,235,0.4);
          transform: translateY(-1px);
        }
        .adm-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .adm-spin {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }

        .adm-security-note {
          display: flex; align-items: flex-start; gap: 8px;
          margin-top: 20px; padding-top: 20px;
          border-top: 1px solid rgba(37,99,235,0.08);
          font-size: 11px; color: #94a3b8; line-height: 1.6;
        }
        .adm-security-note svg { flex-shrink: 0; color: #2563eb; margin-top: 1px; }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="adm-login-shell">
        {/* ── Left: Brand Panel ── */}
        <div className="adm-left-panel">
          <div className="adm-left-top">
            <div className="adm-left-logo">
              <img src={MTTF_LOGO} alt="MTTF" />
              <span className="adm-left-logo-text">Admin Portal</span>
            </div>
            <h1 className="adm-left-heading">
              MTTF <em>Control</em><br />Center
            </h1>
            <p className="adm-left-desc">
              Manage membership pricing, review registered users, and monitor platform analytics — all in one secure dashboard.
            </p>
          </div>

          <div className="adm-left-features">
            {[
              { label: "Membership price control — Individual & Institutional", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { label: "Full user registry with payment status", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { label: "Live stats — revenue, paid & pending members", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 16l4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            ].map((f, i) => (
              <div key={i} className="adm-left-feat">
                <span className="adm-feat-icon">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>

          <div className="adm-left-footer">
            © {new Date().getFullYear()} MathTech Thinking Foundation · Restricted Access
          </div>
        </div>

        {/* ── Right: Form Panel ── */}
        <div className="adm-right-panel">
          <div className="adm-form-wrap">
            <div className="adm-form-eyebrow">
              <span />
              Restricted Access
            </div>
            <h1 className="adm-form-title">Admin Sign In</h1>
            <p className="adm-form-sub">Authorized personnel only. All access attempts are logged.</p>

            <div className="adm-card">
              <form onSubmit={handleLogin}>
                {error && <div className="adm-error">{error}</div>}

                <div className="adm-field">
                  <label className="adm-label">Admin Email</label>
                  <input
                    className="adm-input"
                    type="email"
                    placeholder="admin@mttf.in"
                    autoComplete="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="adm-field">
                  <label className="adm-label">Password</label>
                  <div className="adm-input-wrap">
                    <input
                      className="adm-input"
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••••"
                      autoComplete="off"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      style={{ paddingRight: "52px" }}
                    />
                    <button type="button" className="adm-eye" onClick={() => setShowPass(p => !p)}>
                      {showPass ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                <button className="adm-submit" type="submit" disabled={loading}>
                  {loading ? <span className="adm-spin" /> : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  )}
                  {loading ? "Authenticating…" : "Access Dashboard"}
                </button>
              </form>

              <div className="adm-security-note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                This is a private admin portal. Unauthorized access is strictly prohibited and will be reported.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
