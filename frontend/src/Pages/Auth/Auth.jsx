import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [page, setPage] = useState("login");
  const [membershipType, setMembershipType] = useState("individual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    institutionSize: "",
  });

  const API = "http://localhost:8000/api/auth";

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          password: form.password,
          membershipType,
          institutionSize: form.institutionSize,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Signup failed.");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        alert("Account created successfully!");
        setPage("membership");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed.");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setPage("membership");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 16, 8, 0.72);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          font-family: 'DM Sans', sans-serif;
          padding: 20px;
        }

        .auth-modal {
          background: #fef9ef;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(185,148,60,0.15);
          animation: modalIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .auth-modal-topbar {
          height: 3px;
          background: linear-gradient(90deg, #b9943c, #e8c96a, #b9943c);
        }

        .auth-modal-body { padding: 40px 44px 44px; }

        .auth-back {
          position: absolute; top: 18px; left: 20px;
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          color: #8a7a5a; font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 500; letter-spacing: 1.5px;
          text-transform: uppercase; transition: color 0.2s; padding: 0;
        }
        .auth-back:hover { color: #b9943c; }
        .auth-back svg { transition: transform 0.2s; }
        .auth-back:hover svg { transform: translateX(-3px); }

        .auth-close {
          position: absolute; top: 18px; right: 20px;
          background: none; border: none; cursor: pointer;
          color: #8a7a5a; font-size: 20px; line-height: 1;
          transition: color 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .auth-close:hover { color: #1a1610; }

        .auth-eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          font-weight: 400; letter-spacing: 2.5px; text-transform: uppercase;
          color: #b9943c; margin-bottom: 8px; text-align: center;
        }

        .auth-title {
          font-family: 'Cormorant Garamond', serif; font-size: 30px;
          font-weight: 500; color: #1a1610; text-align: center;
          line-height: 1.15; margin-bottom: 28px;
        }

        .auth-toggle-wrap {
          display: flex; background: #f0e8d4; padding: 4px;
          margin-bottom: 32px; border: 1px solid rgba(185,148,60,0.2);
        }

        .auth-toggle-btn {
          flex: 1; padding: 9px 0; border: none; background: none;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 1.6px; text-transform: uppercase; color: #8a7a5a;
          cursor: pointer; transition: all 0.25s ease;
        }
        .auth-toggle-btn.active { background: #1a1610; color: #f0e4c4; }

        .auth-field { margin-bottom: 18px; }

        .auth-label {
          display: block; font-size: 10px; font-weight: 500;
          letter-spacing: 1.8px; text-transform: uppercase;
          color: #8a7a5a; margin-bottom: 8px;
        }

        .auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }

        .auth-input-wrap { position: relative; }

        .auth-input {
          width: 100%; padding: 12px 16px; background: #fff;
          border: 1px solid rgba(185,148,60,0.25); border-radius: 0;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          font-weight: 300; color: #1a1610; outline: none; transition: border-color 0.25s;
        }
        .auth-input::placeholder { color: #bfb49a; }
        .auth-input:focus { border-color: #b9943c; }
        .auth-input.with-btn { padding-right: 90px; }

        .auth-verify-btn {
          position: absolute; right: 0; top: 0; bottom: 0; padding: 0 18px;
          background: #b9943c; border: none; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: background 0.2s;
        }
        .auth-verify-btn:hover { background: #9a7a2e; }

        .mem-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px; }

        .mem-type-card {
          padding: 16px; border: 1.5px solid rgba(185,148,60,0.25);
          background: #fff; cursor: pointer; text-align: center; transition: all 0.22s ease;
        }
        .mem-type-card.selected { border-color: #b9943c; background: rgba(185,148,60,0.07); }

        .mem-type-name {
          font-family: 'Cormorant Garamond', serif; font-size: 17px;
          font-weight: 600; color: #1a1610; display: block; margin-bottom: 3px;
        }
        .mem-type-desc { font-size: 11px; color: #8a7a5a; letter-spacing: 0.5px; }

        .auth-select {
          width: 100%; padding: 12px 16px; background: #fff;
          border: 1px solid rgba(185,148,60,0.25); border-radius: 0;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 300;
          color: #1a1610; outline: none; appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23b9943c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 16px center;
          cursor: pointer; transition: border-color 0.25s;
        }
        .auth-select:focus { border-color: #b9943c; }

        .inst-reveal { animation: revealDown 0.3s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes revealDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .auth-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,148,60,0.3), transparent);
          margin: 24px 0;
        }

        .auth-error {
          background: #fff0f0; border: 1px solid #f5c0c0;
          color: #c0392b; font-size: 12px; padding: 10px 14px;
          margin-bottom: 16px; text-align: center; letter-spacing: 0.3px;
        }

        .auth-submit {
          width: 100%; padding: 14px; background: #1a1610;
          border: 1px solid #1a1610; color: #f0e4c4;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s ease; position: relative; overflow: hidden; margin-top: 4px;
        }
        .auth-submit::before {
          content: ''; position: absolute; inset: 0;
          background: #b9943c; transform: translateX(-100%); transition: transform 0.35s ease;
        }
        .auth-submit:hover::before { transform: translateX(0); }
        .auth-submit span { position: relative; z-index: 1; }
        .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-footer-link { text-align: center; margin-top: 20px; font-size: 12px; color: #8a7a5a; }
        .auth-footer-link button {
          background: none; border: none; color: #b9943c;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          cursor: pointer; text-decoration: underline; text-underline-offset: 3px;
        }

        .mem-welcome { text-align: center; padding: 16px 0 8px; }
        .mem-icon {
          width: 56px; height: 56px; margin: 0 auto 16px;
          border: 1.5px solid #b9943c; display: flex; align-items: center; justify-content: center;
        }

        .mem-pay-btn {
          width: 100%; padding: 16px; background: #b9943c; border: none; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 1.8px; text-transform: uppercase; cursor: pointer;
          margin-top: 24px; transition: background 0.25s;
        }
        .mem-pay-btn:hover { background: #9a7a2e; }

        .mem-logout {
          background: none; border: none; color: #8a7a5a;
          font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer;
          text-decoration: underline; text-underline-offset: 3px;
          display: block; margin: 16px auto 0; letter-spacing: 0.5px; transition: color 0.2s;
        }
        .mem-logout:hover { color: #1a1610; }

        .auth-modal::-webkit-scrollbar { width: 4px; }
        .auth-modal::-webkit-scrollbar-track { background: transparent; }
        .auth-modal::-webkit-scrollbar-thumb { background: rgba(185,148,60,0.3); }
      `}</style>

      <div className="auth-overlay">
        <div className="auth-modal">
          <div className="auth-modal-topbar" />
          <div className="auth-modal-body">
            <button className="auth-back" onClick={() => navigate("/")}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <button className="auth-close" onClick={() => navigate("/")}>✕</button>

            {page === "membership" ? (
              <>
                <p className="auth-eyebrow">Access Granted</p>
                <h2 className="auth-title">Welcome, {user?.name}</h2>
                <div className="auth-divider" />
                <div className="mem-welcome">
                  <div className="mem-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#b9943c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p style={{ color: "#4a3f2a", fontSize: "13.5px", lineHeight: 1.7, fontWeight: 300 }}>
                    Your membership is active. Complete your onboarding by paying the membership fee to unlock all programs and resources.
                  </p>
                  <button className="mem-pay-btn">Pay ₹2,000 Membership Fee</button>
                  <button className="mem-logout" onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                    setPage("login");
                  }}>Sign Out</button>
                </div>
              </>
            ) : (
              <>
                <p className="auth-eyebrow">MathTech Thinking Foundation</p>
                <h2 className="auth-title">
                  {page === "signup" ? "Create an Account" : "Welcome Back"}
                </h2>

                <div className="auth-toggle-wrap">
                  <button className={`auth-toggle-btn ${page === "login" ? "active" : ""}`} onClick={() => { setPage("login"); setError(""); }}>
                    Sign In
                  </button>
                  <button className={`auth-toggle-btn ${page === "signup" ? "active" : ""}`} onClick={() => { setPage("signup"); setError(""); }}>
                    Sign Up
                  </button>
                </div>

                {error && <div className="auth-error">{error}</div>}

                {page === "signup" && (
                  <form onSubmit={handleSignup}>
                    <div className="auth-row">
                      <div>
                        <label className="auth-label">Full Name</label>
                        <input className="auth-input" type="text" placeholder="John Doe" required
                          onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="auth-label">Phone</label>
                        <input className="auth-input" type="tel" placeholder="+91 12345 67890"
                          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">Email Address</label>
                      <div className="auth-input-wrap">
                        <input className="auth-input with-btn" type="email" placeholder="example@gmail.com" required
                          onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <button type="button" className="auth-verify-btn">Verify</button>
                      </div>
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">Membership Type</label>
                      <div className="mem-type-grid">
                        <div className={`mem-type-card ${membershipType === "individual" ? "selected" : ""}`}
                          onClick={() => setMembershipType("individual")}>
                          <span className="mem-type-name">Individual</span>
                          <span className="mem-type-desc">For personal use</span>
                        </div>
                        <div className={`mem-type-card ${membershipType === "institutional" ? "selected" : ""}`}
                          onClick={() => setMembershipType("institutional")}>
                          <span className="mem-type-name">Institutional</span>
                          <span className="mem-type-desc">For organizations</span>
                        </div>
                      </div>
                    </div>

                    {membershipType === "institutional" && (
                      <div className="auth-field inst-reveal">
                        <label className="auth-label">Institution Size</label>
                        <select className="auth-select" required value={form.institutionSize}
                          onChange={(e) => setForm({ ...form, institutionSize: e.target.value })}>
                          <option value="" disabled>Select institution size</option>
                          <option value="small">Small — Up to 100 members</option>
                          <option value="medium">Medium — Up to 500 members</option>
                          <option value="large">Large — 500+ members</option>
                        </select>
                      </div>
                    )}

                    <div className="auth-field">
                      <label className="auth-label">Password</label>
                      <input className="auth-input" type="password" placeholder="········" required
                        onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">Confirm Password</label>
                      <input className="auth-input" type="password" placeholder="········" required
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
                    </div>

                    <div className="auth-divider" />
                    <button type="submit" className="auth-submit" disabled={loading}>
                      <span>{loading ? "Creating Account..." : "Create Account"}</span>
                    </button>
                    <p className="auth-footer-link">
                      Already have an account?{" "}
                      <button type="button" onClick={() => { setPage("login"); setError(""); }}>Sign In</button>
                    </p>
                  </form>
                )}

                {page === "login" && (
                  <form onSubmit={handleLogin}>
                    <div className="auth-field">
                      <label className="auth-label">Email Address</label>
                      <input className="auth-input" type="email" placeholder="example@gmail.com" required
                        onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">Password</label>
                      <input className="auth-input" type="password" placeholder="········" required
                        onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>

                    <div className="auth-divider" />
                    <button type="submit" className="auth-submit" disabled={loading}>
                      <span>{loading ? "Signing In..." : "Sign In"}</span>
                    </button>
                    <p className="auth-footer-link">
                      New member?{" "}
                      <button type="button" onClick={() => { setPage("signup"); setError(""); }}>Create Account</button>
                    </p>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}