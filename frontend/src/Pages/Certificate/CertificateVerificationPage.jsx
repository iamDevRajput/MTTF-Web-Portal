import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  .cert-verify-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f8fafc;
    padding: 24px;
    background-image: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,.06) 0%, transparent 60%);
  }

  .cert-card {
    max-width: 600px;
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(37,99,235,.12);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(37,99,235,.08);
  }

  .cert-header {
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    padding-bottom: 24px;
    margin-bottom: 24px;
  }

  .cert-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  .badge-valid {
    background: #dcfce7;
    color: #166534;
  }

  .badge-invalid {
    background: #fee2e2;
    color: #991b1b;
  }

  .cert-title {
    font-size: 24px;
    font-weight: 800;
    color: #0b1329;
    margin-bottom: 8px;
  }

  .cert-id {
    font-size: 14px;
    color: #64748b;
    font-family: monospace;
  }

  .cert-detail-group {
    margin-bottom: 20px;
  }

  .cert-label {
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .cert-value {
    font-size: 16px;
    color: #0f172a;
    font-weight: 600;
  }

  .cert-value-large {
    font-size: 20px;
    font-weight: 700;
    color: #2563eb;
  }

  .cert-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    background: #f8fafc;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 24px;
  }

  .cert-actions {
    display: flex;
    gap: 12px;
    margin-top: 32px;
  }

  .cert-btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 9999px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    border: none;
  }

  .cert-btn-primary {
    background: #2563eb;
    color: white;
    box-shadow: 0 4px 14px rgba(37,99,235,0.25);
  }
  .cert-btn-primary:hover {
    background: #1d4ed8;
  }

  .cert-btn-secondary {
    background: white;
    color: #475569;
    border: 1px solid #cbd5e1;
  }
  .cert-btn-secondary:hover {
    background: #f8fafc;
  }

  @media (max-width: 600px) {
    .cert-card { padding: 24px; }
    .cert-grid { grid-template-columns: 1fr; }
    .cert-actions { flex-direction: column; }
  }
`;

const formatEventDate = (startDate, endDate) => {
  if (!startDate) return "—";
  const start = new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" }).format(new Date(startDate));
  if (!endDate) return `${start}, ${new Date(startDate).getFullYear()}`;
  const end = new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric", year: "numeric" }).format(new Date(endDate));
  return `${start} – ${end}`;
};

const formatDateTime = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata"
  }).format(new Date(date)) + " IST";
};

export default function CertificateVerificationPage() {
  const { certificateId } = useParams();
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const res = await fetch(`${API}/certificates/verify/${certificateId}`);
        const data = await res.json();
        if (data.success && data.certificate) {
          setCertData(data.certificate);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCert();
  }, [certificateId]);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="cert-verify-page">
          <div className="cert-card" style={{ textAlign: "center", color: "#64748b" }}>
            Verifying certificate...
          </div>
        </div>
      </>
    );
  }

  if (error || !certData) {
    return (
      <>
        <style>{styles}</style>
        <div className="cert-verify-page">
          <div className="cert-card" style={{ textAlign: "center" }}>
            <div className="cert-badge badge-invalid">Invalid Certificate</div>
            <h1 className="cert-title">Certificate Not Found</h1>
            <p style={{ color: "#64748b", margin: "16px 0" }}>
              The certificate ID <strong>{certificateId}</strong> could not be verified. It may be invalid, expired, or tampered with.
            </p>
            <Link to="/" className="cert-btn cert-btn-secondary">Back to Home</Link>
          </div>
        </div>
      </>
    );
  }

  const isDonation = certData.certificateType === "DONATION";

  return (
    <>
      <style>{styles}</style>
      <div className="cert-verify-page">
        <div className="cert-card">
          <div className="cert-header">
            <div className="cert-badge badge-valid">✓ VERIFIED AUTHENTIC</div>
            <h1 className="cert-title">
              {isDonation ? "Certificate of Contribution" : "Certificate of Participation"}
            </h1>
            <div className="cert-id">ID: {certData.certificateId}</div>
          </div>

          <div className="cert-detail-group">
            <div className="cert-label">Presented To</div>
            <div className="cert-value-large">{certData.participantName}</div>
            {!isDonation && certData.institution && (
              <div style={{ color: "#64748b", marginTop: 4 }}>{certData.institution}</div>
            )}
          </div>

          <div className="cert-grid">
            <div className="cert-detail-group" style={{ marginBottom: 0 }}>
              <div className="cert-label">{isDonation ? "Purpose" : "Event"}</div>
              <div className="cert-value">{isDonation ? certData.purpose : certData.eventName}</div>
            </div>
            
            <div className="cert-detail-group" style={{ marginBottom: 0 }}>
              <div className="cert-label">{isDonation ? "Amount" : "Event Dates"}</div>
              <div className="cert-value">
                {isDonation 
                  ? `₹${Number(certData.amount).toLocaleString("en-IN")}`
                  : formatEventDate(certData.eventStartDate, certData.eventEndDate)}
              </div>
            </div>
          </div>

          <div className="cert-detail-group">
            <div className="cert-label">Date of Issue</div>
            <div className="cert-value">{formatDateTime(certData.issuedAt)}</div>
          </div>

          <div className="cert-actions">
            <a 
              href={`${API}/certificates/download/${certData.certificateId}`} 
              target="_blank" 
              rel="noreferrer" 
              className="cert-btn cert-btn-primary"
            >
              Download PDF
            </a>
            <Link to="/" className="cert-btn cert-btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
