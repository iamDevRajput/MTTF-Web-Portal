import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MTTF_LOGO from "../../assets/MTTF_REC.jfif";

const API = "http://localhost:8000/api/admin";

function useAdminAuth() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const logout = () => { localStorage.removeItem("adminToken"); navigate("/mttf-admin-2025"); };
  return { token, headers, logout };
}

function StatCard({ label, value, sub, icon, accentColor }) {
  return (
    <div className="adm-stat-card">
      <div className="adm-stat-icon" style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}25` }}>
        <span style={{ color: accentColor }}>{icon}</span>
      </div>
      <div>
        <div className="adm-stat-value" style={{ color: accentColor }}>{value ?? "—"}</div>
        <div className="adm-stat-label">{label}</div>
        {sub && <div className="adm-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { headers, logout } = useAdminAuth();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [prices, setPrices] = useState({ individual: 2000, institutional: 5000 });
  const [priceForm, setPriceForm] = useState({ individual: 2000, institutional: 5000 });
  const [users, setUsers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [savingPrice, setSavingPrice] = useState(false);
  const [priceMsg, setPriceMsg] = useState({ text: "", ok: true });
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) { navigate("/mttf-admin-2025"); return; }
    loadOverview();
  }, []);

  const loadOverview = async () => {
    setLoadingStats(true);
    try {
      const [sRes, pRes] = await Promise.all([
        fetch(`${API}/stats`, { headers }),
        fetch(`${API}/settings`, { headers }),
      ]);
      if (sRes.status === 401) { logout(); return; }
      const sData = await sRes.json();
      const pData = await pRes.json();
      if (sData.success) setStats(sData.stats);
      if (pData.success) { setPrices(pData.prices); setPriceForm(pData.prices); }
    } catch {}
    finally { setLoadingStats(false); }
  };

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch(`${API}/users`, { headers });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch {}
    finally { setLoadingUsers(false); }
  }, []);

  useEffect(() => { if (tab === "users") loadUsers(); }, [tab]);

  const savePrice = async () => {
    setSavingPrice(true); setPriceMsg({ text: "", ok: true });
    try {
      const res = await fetch(`${API}/settings`, {
        method: "PUT", headers,
        body: JSON.stringify({ individual: Number(priceForm.individual), institutional: Number(priceForm.institutional) }),
      });
      const data = await res.json();
      if (data.success) {
        setPrices(data.prices);
        setPriceMsg({ text: "Prices updated successfully!", ok: true });
      } else {
        setPriceMsg({ text: data.message || "Failed.", ok: false });
      }
    } catch { setPriceMsg({ text: "Network error.", ok: false }); }
    finally {
      setSavingPrice(false);
      setTimeout(() => setPriceMsg({ text: "", ok: true }), 3500);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

  const TABS = [
    { key: "overview", label: "Overview", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg> },
    { key: "pricing", label: "Pricing", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { key: "users", label: "Members", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .adm-dash-shell {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f1f5f9;
        }
        @media (max-width: 900px) {
          .adm-dash-shell { grid-template-columns: 1fr; }
          .adm-sidebar { display: none; }
        }

        /* ── Sidebar ── */
        .adm-sidebar {
          background: linear-gradient(180deg, #0b1329 0%, #1e3a8a 100%);
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0; width: 240px;
          z-index: 50;
        }

        .adm-sidebar-logo {
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 10px;
        }
        .adm-sidebar-logo img {
          height: 36px; width: auto; object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .adm-sidebar-logo-txt {
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
          border-left: 1px solid rgba(255,255,255,0.15); padding-left: 10px;
          line-height: 1.4;
        }

        .adm-sidebar-section {
          padding: 28px 12px 8px;
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(255,255,255,0.25);
          padding-left: 16px;
        }

        .adm-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px; margin: 2px 8px;
          border-radius: 10px; cursor: pointer;
          font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.55);
          background: none; border: none; width: calc(100% - 16px);
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.2s; text-align: left;
        }
        .adm-nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
        .adm-nav-item.active {
          background: rgba(37,99,235,0.25); color: #fff;
          border: 1px solid rgba(37,99,235,0.35);
        }
        .adm-nav-item.active svg { color: #60a5fa; }

        .adm-sidebar-footer {
          margin-top: auto; padding: 20px 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .adm-admin-info {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; margin-bottom: 8px;
          background: rgba(255,255,255,0.04); border-radius: 10px;
        }
        .adm-admin-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(37,99,235,0.3); border: 1.5px solid rgba(37,99,235,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #93c5fd;
          flex-shrink: 0;
        }
        .adm-admin-name { font-size: 12px; font-weight: 600; color: #fff; }
        .adm-admin-role {
          font-size: 10px; color: rgba(255,255,255,0.35);
          display: flex; align-items: center; gap: 5px;
        }
        .adm-online-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; }
        .adm-logout-btn {
          width: 100%; padding: 10px; background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2); border-radius: 10px;
          color: rgba(255,255,255,0.4); font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .adm-logout-btn:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); color: #fca5a5; }

        /* ── Main ── */
        .adm-main {
          margin-left: 240px;
          display: flex; flex-direction: column;
          min-height: 100vh;
        }
        @media (max-width: 900px) { .adm-main { margin-left: 0; } }

        /* ── Top Bar ── */
        .adm-topbar {
          background: #fff; border-bottom: 1px solid rgba(37,99,235,0.08);
          padding: 0 32px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 40;
          box-shadow: 0 1px 12px rgba(37,99,235,0.04);
        }
        .adm-topbar-left { display: flex; flex-direction: column; }
        .adm-page-title { font-size: 17px; font-weight: 700; color: #0b1329; }
        .adm-page-sub { font-size: 12px; color: #64748b; font-weight: 300; }
        .adm-topbar-right { display: flex; align-items: center; gap: 12px; }

        .adm-refresh-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; background: rgba(37,99,235,0.06);
          border: 1px solid rgba(37,99,235,0.15); border-radius: 999px;
          color: #2563eb; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .adm-refresh-btn:hover { background: rgba(37,99,235,0.1); }

        /* ── Content ── */
        .adm-content { padding: 32px; flex: 1; }

        /* ── Stat Cards ── */
        .adm-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px;
        }
        @media (max-width: 1100px) { .adm-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .adm-stats-grid { grid-template-columns: 1fr; } }

        .adm-stat-card {
          background: #fff; border: 1px solid rgba(37,99,235,0.1);
          border-radius: 14px; padding: 22px 20px;
          display: flex; align-items: center; gap: 16px;
          box-shadow: 0 2px 12px rgba(37,99,235,0.04);
          transition: box-shadow 0.2s, transform 0.2s;
          animation: fadeUp 0.4s both;
        }
        .adm-stat-card:hover { box-shadow: 0 6px 24px rgba(37,99,235,0.1); transform: translateY(-2px); }

        .adm-stat-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .adm-stat-value { font-size: 28px; font-weight: 800; line-height: 1; letter-spacing: -0.02em; }
        .adm-stat-label { font-size: 12px; color: #64748b; font-weight: 400; margin-top: 4px; }
        .adm-stat-sub { font-size: 11px; color: #94a3b8; margin-top: 2px; }

        /* ── Section ── */
        .adm-section-wrap {
          background: #fff; border: 1px solid rgba(37,99,235,0.1);
          border-radius: 16px; padding: 28px;
          box-shadow: 0 2px 12px rgba(37,99,235,0.04);
          margin-bottom: 24px;
        }
        .adm-section-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px;
        }
        .adm-section-title { font-size: 16px; font-weight: 700; color: #0b1329; }
        .adm-section-sub { font-size: 12px; color: #64748b; font-weight: 300; margin-top: 2px; }

        /* ── Price Cards (Overview) ── */
        .adm-price-overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) { .adm-price-overview-grid { grid-template-columns: 1fr; } }

        .adm-price-overview-card {
          padding: 20px 22px; border-radius: 12px;
          border: 1.5px solid rgba(37,99,235,0.15);
          background: linear-gradient(135deg, rgba(37,99,235,0.04), rgba(37,99,235,0.01));
        }
        .adm-price-overview-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #2563eb; margin-bottom: 8px;
        }
        .adm-price-overview-val {
          font-size: 30px; font-weight: 800; color: #0b1329; letter-spacing: -0.02em;
        }
        .adm-price-overview-sub { font-size: 11px; color: #94a3b8; margin-top: 4px; }

        /* ── Pricing Form ── */
        .adm-price-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        @media (max-width: 600px) { .adm-price-grid { grid-template-columns: 1fr; } }

        .adm-price-field label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 1.8px;
          text-transform: uppercase; color: #475569; margin-bottom: 8px;
        }
        .adm-price-input-wrap { position: relative; }
        .adm-price-currency {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          font-size: 16px; font-weight: 600; color: #64748b;
        }
        .adm-price-input {
          width: 100%; padding: 14px 16px 14px 34px;
          background: #f8faff; border: 1.5px solid rgba(37,99,235,0.12);
          border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px; font-weight: 700; color: #0b1329; outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .adm-price-input:focus {
          border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }
        .adm-price-hint { font-size: 11px; color: #94a3b8; margin-top: 6px; }

        .adm-save-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; background: #2563eb; border: none;
          color: #fff; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border-radius: 999px; cursor: pointer;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          transition: all 0.25s;
        }
        .adm-save-btn:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.4); }
        .adm-save-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .adm-save-spin {
          width: 13px; height: 13px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite;
        }

        .adm-price-msg {
          display: inline-flex; align-items: center; gap: 6px;
          margin-left: 12px; font-size: 12px; font-weight: 500;
        }

        /* ── Users Table ── */
        .adm-search {
          padding: 10px 16px;
          background: #f8faff; border: 1.5px solid rgba(37,99,235,0.12);
          border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; color: #0b1329; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s; width: 280px;
        }
        .adm-search::placeholder { color: #cbd5e1; }
        .adm-search:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }

        .adm-table { width: 100%; border-collapse: collapse; }
        .adm-table th {
          text-align: left; padding: 12px 16px;
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          color: #64748b; border-bottom: 2px solid rgba(37,99,235,0.08);
          background: #f8faff;
        }
        .adm-table th:first-child { border-radius: 8px 0 0 0; }
        .adm-table th:last-child { border-radius: 0 8px 0 0; }
        .adm-table td {
          padding: 14px 16px; font-size: 13px; font-weight: 400;
          color: #334155; border-bottom: 1px solid rgba(37,99,235,0.05);
          vertical-align: middle;
        }
        .adm-table tr:last-child td { border-bottom: none; }
        .adm-table tr:hover td { background: rgba(37,99,235,0.02); }

        .adm-status-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px;
        }
        .adm-status-pill.paid { background: rgba(22,163,74,0.08); color: #16a34a; border: 1px solid rgba(22,163,74,0.25); }
        .adm-status-pill.pending { background: rgba(245,158,11,0.08); color: #d97706; border: 1px solid rgba(245,158,11,0.25); }
        .adm-status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

        .adm-type-badge {
          display: inline-block; padding: 3px 10px; border-radius: 999px;
          font-size: 10px; font-weight: 600; text-transform: capitalize;
          background: rgba(37,99,235,0.08); color: #2563eb; border: 1px solid rgba(37,99,235,0.2);
        }

        .adm-row-num { font-size: 11px; color: #cbd5e1; font-weight: 400; }

        .adm-empty { padding: 48px; text-align: center; color: #94a3b8; font-size: 14px; }

        .adm-loading {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; padding: 48px; color: #64748b; font-size: 13px;
        }
        .adm-loading-spin {
          width: 18px; height: 18px;
          border: 2px solid rgba(37,99,235,0.15); border-top-color: #2563eb;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="adm-dash-shell">

        {/* ── Sidebar ── */}
        <aside className="adm-sidebar">
          <div className="adm-sidebar-logo">
            <img src={MTTF_LOGO} alt="MTTF" />
            <span className="adm-sidebar-logo-txt">Admin<br/>Portal</span>
          </div>

          <div className="adm-sidebar-section">Navigation</div>

          {TABS.map(t => (
            <button
              key={t.key}
              className={`adm-nav-item ${tab === t.key ? "active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}

          <div className="adm-sidebar-footer">
            <div className="adm-admin-info">
              <div className="adm-admin-avatar">A</div>
              <div>
                <div className="adm-admin-name">Administrator</div>
                <div className="adm-admin-role"><span className="adm-online-dot" /> Online</div>
              </div>
            </div>
            <button className="adm-logout-btn" onClick={logout}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="adm-main">
          {/* Top Bar */}
          <div className="adm-topbar">
            <div className="adm-topbar-left">
              <div className="adm-page-title">
                {tab === "overview" ? "Dashboard Overview" : tab === "pricing" ? "Membership Pricing" : "Member Registry"}
              </div>
              <div className="adm-page-sub">
                {tab === "overview" ? "Live stats and membership summary" : tab === "pricing" ? "Set fees for Individual & Institutional members" : `${users.length} registered members`}
              </div>
            </div>
            <div className="adm-topbar-right">
              <button className="adm-refresh-btn" onClick={loadOverview}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="adm-content">

            {/* ── OVERVIEW ── */}
            {tab === "overview" && (
              <>
                {loadingStats ? (
                  <div className="adm-loading"><span className="adm-loading-spin" /> Loading dashboard…</div>
                ) : (
                  <>
                    <div className="adm-stats-grid">
                      <StatCard label="Total Members" value={stats?.totalUsers} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>} accentColor="#2563eb" />
                      <StatCard label="Paid Members" value={stats?.paidUsers} sub="Active membership" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} accentColor="#16a34a" />
                      <StatCard label="Pending Payment" value={stats?.pendingUsers} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>} accentColor="#d97706" />
                      <StatCard label="Est. Revenue" value={stats?.revenue != null ? fmt(stats.revenue) : null} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>} accentColor="#7c3aed" />
                    </div>

                    <div className="adm-section-wrap">
                      <div className="adm-section-head">
                        <div>
                          <div className="adm-section-title">Current Membership Prices</div>
                          <div className="adm-section-sub">Prices users see on the payment page</div>
                        </div>
                        <button className="adm-refresh-btn" onClick={() => setTab("pricing")}>
                          Edit Prices →
                        </button>
                      </div>
                      <div className="adm-price-overview-grid">
                        {[
                          { label: "Individual", val: prices.individual },
                          { label: "Institutional", val: prices.institutional },
                        ].map(p => (
                          <div key={p.label} className="adm-price-overview-card">
                            <div className="adm-price-overview-label">{p.label}</div>
                            <div className="adm-price-overview-val">{fmt(p.val)}</div>
                            <div className="adm-price-overview-sub">One-time · Lifetime membership</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* ── PRICING ── */}
            {tab === "pricing" && (
              <div className="adm-section-wrap">
                <div className="adm-section-head">
                  <div>
                    <div className="adm-section-title">Set Membership Prices</div>
                    <div className="adm-section-sub">Changes apply immediately on the payment page for all new users</div>
                  </div>
                </div>

                <div className="adm-price-grid">
                  {[
                    { key: "individual", label: "Individual Membership", hint: "For personal use — students, researchers, professionals" },
                    { key: "institutional", label: "Institutional Membership", hint: "For organizations, universities, and companies" },
                  ].map(f => (
                    <div key={f.key} className="adm-price-field">
                      <label>{f.label}</label>
                      <div className="adm-price-input-wrap">
                        <span className="adm-price-currency">₹</span>
                        <input
                          className="adm-price-input"
                          type="number" min="1"
                          value={priceForm[f.key]}
                          onChange={e => setPriceForm(p => ({ ...p, [f.key]: e.target.value }))}
                        />
                      </div>
                      <div className="adm-price-hint">{f.hint}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <button className="adm-save-btn" onClick={savePrice} disabled={savingPrice}>
                    {savingPrice ? <span className="adm-save-spin" /> : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <polyline points="17 21 17 13 7 13 7 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <polyline points="7 3 7 8 15 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    )}
                    {savingPrice ? "Saving…" : "Save Prices"}
                  </button>
                  {priceMsg.text && (
                    <span className="adm-price-msg" style={{ color: priceMsg.ok ? "#16a34a" : "#dc2626" }}>
                      {priceMsg.ok ? "✓" : "✕"} {priceMsg.text}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* ── USERS ── */}
            {tab === "users" && (
              <div className="adm-section-wrap">
                <div className="adm-section-head">
                  <div>
                    <div className="adm-section-title">Member Registry</div>
                    <div className="adm-section-sub">{filteredUsers.length} of {users.length} members</div>
                  </div>
                  <input
                    className="adm-search"
                    placeholder="Search name or email…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>

                {loadingUsers ? (
                  <div className="adm-loading"><span className="adm-loading-spin" /> Loading members…</div>
                ) : filteredUsers.length === 0 ? (
                  <div className="adm-empty">No members found.</div>
                ) : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Type</th>
                        <th>Payment</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u, i) => (
                        <tr key={u._id}>
                          <td><span className="adm-row-num">{i + 1}</span></td>
                          <td style={{ fontWeight: 600, color: "#0b1329" }}>{u.name}</td>
                          <td>{u.email}</td>
                          <td style={{ fontFamily: "monospace", fontSize: 12, color: "#475569" }}>{u.phone}</td>
                          <td><span className="adm-type-badge">{u.membershipType}</span></td>
                          <td>
                            <span className={`adm-status-pill ${u.isMembershipPaid ? "paid" : "pending"}`}>
                              <span className="adm-status-dot" />
                              {u.isMembershipPaid ? "Paid" : "Pending"}
                            </span>
                          </td>
                          <td style={{ fontSize: 12, color: "#94a3b8" }}>
                            {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}
