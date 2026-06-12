import React, { useState, useEffect } from "react";
// Fix these import paths based on your actual project structure
// Option 1: If Components folder is at project root
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

// Option 2: If you're using absolute imports with @ alias
// import Header from "@/Components/Header";
// import Footer from "@/Components/Footer";

// Option 3: If Components is in src folder
// import Header from "../../../Components/Header";
// import Footer from "../../../Components/Footer";

// ─── SAMPLE MEMBER DATA (matches mttfhub.com/members structure) ──────────────
const allMembers = [
  { id: "MTTF11658809", name: "A. JAMAL BARAKATH",        registered: "29/12/2021" },
  { id: "MTTF2415382",  name: "AAKASH MITTAL",            registered: "12/4/2021"  },
  { id: "MTTF4244390",  name: "ABDULRAHEEM SHERIF ADAVURUKU", registered: "26/7/2021" },
  { id: "MTTF1179878",  name: "ABHISHEK CHANDA",          registered: "14/12/2021" },
  { id: "MTTF2216889",  name: "ABU SAID",                 registered: "10/4/2021"  },
  { id: "MTTF8514918",  name: "ABUBAKAR SADIQ MUHAMMAD",  registered: "30/9/2021"  },
  { id: "MTTF3127645",  name: "ADEBAYO OLUWASEUN",        registered: "15/3/2022"  },
  { id: "MTTF5521034",  name: "AHMED HASSAN AL-RASHID",   registered: "22/6/2021"  },
  { id: "MTTF6634221",  name: "AISHA BELLO MOHAMMED",     registered: "8/11/2021"  },
  { id: "MTTF7745990",  name: "AJAY KUMAR SHARMA",        registered: "3/2/2022"   },
  { id: "MTTF8856771",  name: "AKOSUA MENSAH",            registered: "17/9/2021"  },
  { id: "MTTF9967442",  name: "ALAAELDIN IBRAHIM",        registered: "29/5/2022"  },
  { id: "MTTF1023110",  name: "ALEX OSEI BONSU",          registered: "11/1/2022"  },
  { id: "MTTF1134982",  name: "ALICIA FERNANDEZ RUIZ",    registered: "4/8/2021"   },
  { id: "MTTF1245673",  name: "AMARA DIALLO",             registered: "19/10/2021" },
  { id: "MTTF1356344",  name: "AMIT VERMA",               registered: "6/3/2022"   },
  { id: "MTTF1467015",  name: "AMJAD HUSSAIN KHAN",       registered: "25/7/2021"  },
  { id: "MTTF1577886",  name: "ANA PAULA RODRIGUES",      registered: "13/12/2021" },
  { id: "MTTF1688557",  name: "ANANYA KRISHNAMURTHY",     registered: "2/5/2022"   },
  { id: "MTTF1799228",  name: "ANDERSON LIMA SILVA",      registered: "21/9/2021"  },
  { id: "MTTF1810099",  name: "ANITA OKONKWO",            registered: "9/2/2022"   },
  { id: "MTTF1920870",  name: "ANJALI SINGH RAWAT",       registered: "27/6/2021"  },
  { id: "MTTF2031541",  name: "ANTHONY NWOSU",            registered: "14/11/2021" },
  { id: "MTTF2142212",  name: "ARJUN PATEL",              registered: "1/4/2022"   },
  { id: "MTTF2252883",  name: "ARYAN GUPTA",              registered: "18/8/2021"  },
];

// ─── AVATAR PLACEHOLDER ──────────────────────────────────────────────────────
function AvatarIcon() {
  return (
    <div style={{
      width: 52,
      height: 52,
      borderRadius: "50%",
      background: "#e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      border: "1px solid rgba(100, 116, 139,0.15)",
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill="#94a3b8" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

// ─── MEMBER CARD ─────────────────────────────────────────────────────────────
function MemberCard({ member }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1.1rem 1.5rem",
        background: hovered ? "#ffffff" : "#FFFFFF",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.25)" : "rgba(100, 116, 139,0.12)"}`,
        borderRadius: "6px",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 2px 12px rgba(37, 99, 235,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Left: Avatar + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <AvatarIcon />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans', sans-serif",
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "#0f172a",
          letterSpacing: "0.01em",
        }}>
          {member.name}
        </span>
      </div>

      {/* Right: Badge + Date */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", flexShrink: 0 }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 500,
          color: "#4A7CC9",
          background: "rgba(74,124,201,0.1)",
          border: "1px solid rgba(74,124,201,0.2)",
          borderRadius: "4px",
          padding: "0.2rem 0.6rem",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}>
          Member ID: {member.id}
        </span>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans', sans-serif",
          fontSize: "0.72rem",
          color: "#64748b",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#64748b" strokeWidth="1.8" fill="none"/>
            <path d="M16 2v4M8 2v4M3 10h18" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Registered: {member.registered}
        </span>
      </div>
    </div>
  );
}

// ─── MAIN MEMBERS PAGE ────────────────────────────────────────────────────────
export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(allMembers);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      setFiltered(allMembers);
    } else {
      setFiltered(
        allMembers.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.id.toLowerCase().includes(q)
        )
      );
    }
  }, [search]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#f8fafc",
      color: "#0f172a",
    }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "96px" /* offset for fixed header */ }}>

        {/* ── PAGE HEADER STRIP ── */}
        <div style={{
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(100, 116, 139,0.12)",
          padding: "2.5rem 2rem",
        }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 600,
              color: "#0f172a",
              margin: "0 0 0.25rem",
              letterSpacing: "-0.01em",
            }}>
              Registered Users
            </h1>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.82rem",
              color: "#64748b",
              margin: 0,
            }}>
              {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 2rem 4rem" }}>

          {/* Search bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "#FFFFFF",
            border: "1px solid rgba(100, 116, 139,0.18)",
            borderRadius: "6px",
            padding: "0.65rem 1rem",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="1.8" fill="none"/>
              <path d="M16.5 16.5L21 21" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.88rem",
                color: "#0f172a",
                fontWeight: 300,
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: "1rem",
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Members list */}
          {filtered.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {filtered.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "4rem 2rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#94a3b8",
              fontSize: "0.9rem",
            }}>
              No members found for "<strong>{search}</strong>"
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}