import React, { useState, useEffect, useRef } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

// ─── DATA (unchanged) ────────────────────────────────────────────────────────
const benefits = [
  {
    id: "01",
    category: "Access to Resources",
    items: [
      {
        title: "Journals & Publications",
        desc: "Gain unlimited access to a vast array of scholarly journals, publications, and databases, providing valuable research materials to support academic and scientific endeavors.",
      },
      {
        title: "Educational Materials",
        desc: "Benefit from comprehensive access to a variety of educational resources, including webinars, online courses, and training modules, designed to enhance learning and skill development.",
      },
    ],
  },
  {
    id: "02",
    category: "Professional Development",
    items: [
      {
        title: "Workshops & Conferences",
        desc: "Enjoy discounted or complimentary registration for MTTF-organized workshops, conferences, and seminars, ensuring your institution stays updated on the latest advancements in STEM.",
      },
      {
        title: "Certification Programs",
        desc: "Access certification and credentialing programs that enhance the qualifications and expertise of your staff members.",
      },
    ],
  },
  {
    id: "03",
    category: "Networking Opportunities",
    items: [
      {
        title: "Events & Meetups",
        desc: "Receive invitations to exclusive networking events, regional meetups, and forums, providing opportunities to connect with peers, industry leaders, and experts in STEM fields.",
      },
      {
        title: "Special Interest Groups",
        desc: "Participate in special interest groups or committees that align with your institution's focus areas, fostering targeted discussions and collaborations.",
      },
    ],
  },
  {
    id: "04",
    category: "Collaboration & Partnerships",
    items: [
      {
        title: "Research Collaborations",
        desc: "Engage in collaborative research projects with other member institutions, gaining access to funding opportunities and grants to support innovative research.",
      },
      {
        title: "Industry Partnerships",
        desc: "Establish partnerships with industry leaders for internships, joint ventures, and knowledge exchange, bridging the gap between academia and industry.",
      },
    ],
  },
  {
    id: "05",
    category: "Recognition & Awards",
    items: [
      {
        title: "Institutional Awards",
        desc: "Become eligible for institutional awards and recognition, celebrating and honoring your institution's contributions to the STEM community and beyond.",
      },
      {
        title: "Member Achievements",
        desc: "Highlight the individual and collective achievements of your institution's members in MTTF publications and at events, showcasing your institution's excellence.",
      },
    ],
  },
  {
    id: "06",
    category: "Community Engagement",
    items: [
      {
        title: "Outreach Programs",
        desc: "Participate in outreach and community engagement programs aimed at promoting STEM education and raising awareness about the importance of STEM in society.",
      },
      {
        title: "Mentorship Opportunities",
        desc: "Engage in mentorship programs, offering both mentoring and mentee opportunities to support the professional growth of your staff and students.",
      },
    ],
  },
  {
    id: "07",
    category: "Exclusive Member Benefits",
    items: [
      {
        title: "Customized Training",
        desc: "Access tailored training programs and workshops specifically designed to meet the unique needs and goals of your institution.",
      },
      {
        title: "Institutional Representation",
        desc: "Gain representation in MTTF's governance and decision-making processes, giving your institution a voice in shaping the policies and initiatives of the foundation.",
      },
    ],
  },
];

const pricing = [
  {
    tier: "Small",
    sub: "Up to 100 members",
    amount: "INR 50,000",
    tag: "Starter",
    featured: false,
  },
  {
    tier: "Medium",
    sub: "101 to 500 members",
    amount: "INR 1,00,000",
    tag: "Most Popular",
    featured: true,
  },
  {
    tier: "Large",
    sub: "Over 500 members",
    amount: "INR 2,00,000",
    tag: "Enterprise",
    featured: false,
  },
];

// ─── HOOK (unchanged) ────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── BENEFIT CARD (luxury redesign) ──────────────────────────────────────────
function BenefitCard({ benefit, index }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s, background 0.35s ease, border-color 0.35s ease`,
        background: hovered ? "rgba(37, 99, 235,0.04)" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.35)" : "rgba(100, 116, 139,0.12)"}`,
        borderRadius: "2px",
        padding: "2rem 2rem 2rem 2.25rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: hovered ? "3px" : "2px",
        background: "linear-gradient(180deg, #2563eb 0%, #60a5fa 100%)",
        transition: "width 0.3s ease",
      }} />

      {/* Ghost number */}
      <div style={{
        position: "absolute",
        right: "1rem", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "5rem", fontWeight: 700,
        color: "rgba(37, 99, 235,0.06)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>
        {benefit.id}
      </div>

      {/* ID */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.65rem",
        color: "#2563eb",
        letterSpacing: "0.2em",
        marginBottom: "0.5rem",
        fontWeight: 600,
      }}>
        {benefit.id} / {String(benefits.length).padStart(2, "0")}
      </div>

      {/* Category */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#0f172a",
        margin: "0 0 0.75rem",
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
      }}>
        {benefit.category}
      </h3>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: "rgba(37, 99, 235,0.2)",
        width: hovered ? "100%" : "36%",
        transition: "width 0.4s ease",
        marginBottom: "1.25rem",
      }} />

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {benefit.items.map((item, i) => (
          <div key={i}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.3rem",
            }}>
              <span style={{
                width: 4, height: 4,
                borderRadius: "50%",
                background: "#2563eb",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "#2563eb",
                letterSpacing: "0.01em",
              }}>
                {item.title}
              </span>
            </div>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.8rem",
              color: "#475569",
              lineHeight: 1.8,
              margin: 0,
              paddingLeft: "0.75rem",
              fontWeight: 300,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRICING CARD (luxury redesign) ──────────────────────────────────────────
function PricingCard({ plan, index }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? plan.featured ? "scale(1.04)" : "scale(1)"
          : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        position: "relative",
        background: plan.featured ? "#0f172a" : "#f8fafc",
        border: plan.featured
          ? "1px solid rgba(37, 99, 235,0.4)"
          : `1px solid ${hovered ? "rgba(37, 99, 235,0.3)" : "rgba(100, 116, 139,0.15)"}`,
        borderRadius: "2px",
        padding: "2.5rem 2rem",
        overflow: "hidden",
        boxShadow: plan.featured
          ? "0 20px 50px rgba(26,18,10,0.18)"
          : hovered ? "0 12px 32px rgba(100, 116, 139,0.1)" : "none",
        cursor: "default",
        flexShrink: 0,
        flex: plan.featured ? "0 0 calc(34% - 1rem)" : "0 0 calc(28% - 1rem)",
      }}
    >
      {/* Top gold bar */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: plan.featured ? "2px" : "1px",
        background: plan.featured
          ? "linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)"
          : "rgba(100, 116, 139,0.15)",
      }} />

      {/* Tag */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: plan.featured ? "#2563eb" : "#475569",
        marginBottom: "1.5rem",
        padding: "0.25rem 0.65rem",
        border: `1px solid ${plan.featured ? "rgba(37, 99, 235,0.35)" : "rgba(100, 116, 139,0.2)"}`,
        display: "inline-block",
        borderRadius: "1px",
        fontWeight: 500,
      }}>
        {plan.tag}
      </div>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "2rem",
        fontWeight: 700,
        color: plan.featured ? "#E8D9C0" : "#0f172a",
        marginBottom: "0.25rem",
        letterSpacing: "-0.02em",
      }}>
        {plan.tier}
      </div>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.78rem",
        color: plan.featured ? "rgba(232,217,192,0.4)" : "rgba(90,65,40,0.45)",
        marginBottom: "1.75rem",
        letterSpacing: "0.02em",
        fontWeight: 300,
      }}>
        {plan.sub}
      </div>

      <div style={{
        height: "1px",
        background: plan.featured ? "rgba(37, 99, 235,0.2)" : "rgba(100, 116, 139,0.12)",
        marginBottom: "1.5rem",
      }} />

      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.6rem",
        color: plan.featured ? "rgba(232,217,192,0.35)" : "rgba(90,65,40,0.4)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        marginBottom: "0.4rem",
        fontWeight: 400,
      }}>
        Annual Fee
      </div>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1.9rem",
        fontWeight: 700,
        color: "#2563eb",
        letterSpacing: "-0.02em",
        lineHeight: 1,
      }}>
        {plan.amount}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Institutional() {
  const [heroRef, heroVisible] = useInView(0.05);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc", color: "#0f172a" }}>
      <style>{`
        @keyframes accentShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-7px); opacity: 0.6; }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 1px; }
      `}</style>

      <Header />

      <main style={{ flex: 1 }}>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 2rem",
            textAlign: "center",
            overflow: "hidden",
            background: "#f8fafc",
            borderBottom: "1px solid rgba(100, 116, 139,0.1)",
          }}
        >
          {/* Subtle grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            pointerEvents: "none",
          }} />

          {/* Warm radial glow */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px", height: "500px",
            background: "radial-gradient(ellipse, rgba(37, 99, 235,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Rotating rings */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "420px", height: "420px",
            border: "1px solid rgba(37, 99, 235,0.08)",
            borderRadius: "50%",
            animation: "rotateSlow 40s linear infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "600px", height: "600px",
            border: "1px dashed rgba(37, 99, 235,0.05)",
            borderRadius: "50%",
            animation: "rotateSlow 65s linear infinite reverse",
            pointerEvents: "none",
          }} />

          {/* Floating dots */}
          {[
            { top: "18%", left: "12%", delay: "0s", dur: "3.2s" },
            { top: "74%", left: "9%", delay: "0.8s", dur: "3.7s" },
            { top: "20%", right: "10%", delay: "0.4s", dur: "4.1s" },
            { top: "70%", right: "14%", delay: "1.2s", dur: "3.4s" },
          ].map((dot, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 4, height: 4,
              borderRadius: "50%",
              background: "#2563eb",
              animation: `floatDot ${dot.dur} ease-in-out infinite`,
              animationDelay: dot.delay,
              top: dot.top, left: dot.left, right: dot.right,
              pointerEvents: "none",
            }} />
          ))}

          {/* Hero content */}
          <div style={{
            position: "relative", zIndex: 1,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              border: "1px solid rgba(37, 99, 235,0.25)",
              padding: "0.45rem 1.3rem",
              marginBottom: "2.5rem",
              background: "rgba(37, 99, 235,0.05)",
              borderRadius: "1px",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#2563eb",
                fontWeight: 500,
              }}>
                MathTech Thinking Foundation
              </span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.025em",
              marginBottom: "0.5rem",
              color: "#0f172a",
            }}>
              Institutional
              <br />
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(120deg, #2563eb 0%, #60a5fa 40%, #1d4ed8 75%, #2563eb 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "goldShimmer 5s linear infinite",
              }}>
                Membership
              </span>
            </h1>

            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(90,65,40,0.55)",
              maxWidth: "540px",
              margin: "1.5rem auto 3rem",
              lineHeight: 1.85,
              fontWeight: 300,
            }}>
              Joining MTTF provides organizations with the tools and opportunities needed to drive
              innovation, foster professional development, and contribute significantly to the global
              STEM community.
            </p>

            {/* Stat bar */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              border: "1px solid rgba(37, 99, 235,0.2)",
              background: "rgba(37, 99, 235,0.03)",
              maxWidth: "560px",
              margin: "0 auto",
              borderRadius: "2px",
            }}>
              {[["07", "Benefit Areas"], ["03", "Membership Tiers"], ["∞", "STEM Reach"]].map(([val, label], i) => (
                <div key={label} style={{
                  flex: "1 1 140px",
                  padding: "1.25rem 1rem",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(37, 99, 235,0.15)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#2563eb",
                    lineHeight: 1,
                  }}>{val}</div>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.58rem",
                    color: "rgba(90,65,40,0.35)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                    fontWeight: 400,
                  }}>{label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button style={{
              marginTop: "2.5rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fff",
              background: "#2563eb",
              border: "none",
              padding: "0.9rem 2.4rem",
              cursor: "pointer",
              borderRadius: "1px",
              transition: "all 0.3s ease",
              fontWeight: 500,
            }}
              onMouseEnter={e => { e.target.style.background = "#1d4ed8"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "#2563eb"; e.target.style.transform = "translateY(0)"; }}
            >
              Contact Now
            </button>
          </div>
        </section>

        {/* ── INTRO STRIP ── */}
        <section style={{
          borderTop: "1px solid rgba(100, 116, 139,0.1)",
          borderBottom: "1px solid rgba(100, 116, 139,0.1)",
          background: "rgba(37, 99, 235,0.03)",
          padding: "3.5rem 2rem",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontStyle: "italic",
            color: "rgba(90,65,40,0.6)",
            maxWidth: "820px",
            margin: "0 auto",
            lineHeight: 1.75,
            fontWeight: 400,
          }}>
            "Be a part of a prestigious network dedicated to advancing science, technology,
            engineering, and mathematics."
          </p>
        </section>

        {/* ── BENEFITS ── */}
        <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "5rem 2rem" }}>
          {/* Section header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.025em",
              margin: 0,
              flexShrink: 0,
            }}>
              Member Benefits
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(100, 116, 139,0.15)", minWidth: "30px" }} />
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.62rem",
              color: "rgba(37, 99, 235,0.6)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              flexShrink: 0,
              fontWeight: 500,
            }}>
              07 Areas
            </div>
          </div>

          {/* Benefits grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1px",
            background: "rgba(100, 116, 139,0.1)",
            border: "1px solid rgba(100, 116, 139,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}>
            {benefits.map((benefit, i) => (
              <div key={benefit.id} style={{ background: "#f8fafc" }}>
                <BenefitCard benefit={benefit} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section style={{
          background: "#0f172a",
          borderTop: "1px solid rgba(37, 99, 235,0.15)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#2563eb",
                marginBottom: "1rem",
                fontWeight: 500,
              }}>
                Annual Fee Structure
              </div>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                fontWeight: 700,
                color: "#E8D9C0",
                letterSpacing: "-0.025em",
                marginBottom: "1rem",
              }}>
                Institutional Membership Fee
              </h2>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(232,217,192,0.4)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.85,
                fontWeight: 300,
              }}>
                MTTF offers a tiered membership fee structure to accommodate institutions of varying
                sizes and needs.
              </p>
            </div>

            {/* Pricing cards */}
            <div style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}>
              {pricing.map((plan, i) => (
                <PricingCard key={plan.tier} plan={plan} index={i} />
              ))}
            </div>

            {/* Note */}
            <div style={{
              marginTop: "3rem",
              padding: "2rem 2.5rem",
              border: "1px solid rgba(37, 99, 235,0.15)",
              background: "rgba(37, 99, 235,0.03)",
              borderRadius: "2px",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(232,217,192,0.4)",
                lineHeight: 1.85,
                margin: "0 auto",
                maxWidth: "720px",
                fontWeight: 300,
              }}>
                These fees provide institutions with comprehensive access to MTTF's resources,
                professional development programs, and networking opportunities, ensuring that all
                members can benefit from the extensive offerings of the foundation.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}