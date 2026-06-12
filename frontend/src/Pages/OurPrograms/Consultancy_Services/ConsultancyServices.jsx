import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import {
  Users,
  Truck,
  Calendar,
  ArrowRight,
  CheckCircle,
  Briefcase,
} from "lucide-react";

// ─── DATA (unchanged) ────────────────────────────────────────────────────────
const services = [
  {
    title: "Expert Consultancy Services",
    icon: <Users size={26} />,
    description:
      "Access world-class expertise in STEM fields with our panel of distinguished consultants and subject matter experts.",
    link: "/programs/consultancy-services/expert-consultancy",
    features: [
      "Industry Expert Network",
      "Academic Consultants",
      "Research Guidance",
      "Strategic Advisory",
    ],
  },
  {
    title: "Logistic Support Services",
    icon: <Truck size={26} />,
    description:
      "Comprehensive logistical support for your research projects, events, and organizational initiatives.",
    link: "/programs/consultancy-services/logistic-support",
    features: [
      "Event Management",
      "Resource Coordination",
      "Equipment Support",
      "Venue Arrangements",
    ],
  },
  {
    title: "Conference Support Services",
    icon: <Calendar size={26} />,
    description:
      "End-to-end support for organizing successful national and international conferences and symposiums.",
    link: "/programs/consultancy-services/conference-support",
    features: [
      "Conference Planning",
      "Speaker Coordination",
      "Publication Support",
      "Technical Assistance",
    ],
  },
];

const stats = [
  { value: "500+", label: "Projects Supported" },
  { value: "100+", label: "Expert Consultants" },
  { value: "50+",  label: "Conferences Organized" },
];

// ─── HOOK ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
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

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(28px)",
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease`,
        background: hovered ? "rgba(37, 99, 235,0.04)" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.4)" : "rgba(100, 116, 139,0.15)"}`,
        borderRadius: "2px",
        padding: "2.25rem 2rem 2rem 2.25rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered ? "0 20px 48px rgba(100, 116, 139,0.12)" : "none",
      }}
    >
      {/* Top gold bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? "2px" : "1px",
        background: "linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)",
        transition: "height 0.3s ease",
      }} />

      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hovered ? "3px" : "2px",
        background: "linear-gradient(180deg, #2563eb 0%, #60a5fa 100%)",
        transition: "width 0.3s ease",
      }} />

      {/* Ghost number */}
      <div style={{
        position: "absolute", right: "1.25rem", bottom: "1.25rem",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "5rem", fontWeight: 700,
        color: "rgba(37, 99, 235,0.06)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div style={{
        width: "52px", height: "52px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(37, 99, 235,0.12)" : "rgba(37, 99, 235,0.06)",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.4)" : "rgba(37, 99, 235,0.18)"}`,
        borderRadius: "2px", color: "#2563eb",
        marginBottom: "1.5rem",
        transition: "background 0.3s, border-color 0.3s, transform 0.35s",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}>
        {service.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1.2rem", fontWeight: 700,
        color: "#0f172a", margin: "0 0 0.5rem",
        letterSpacing: "-0.01em", lineHeight: 1.25,
      }}>{service.title}</h3>

      {/* Divider */}
      <div style={{
        height: "1px", background: "rgba(37, 99, 235,0.18)",
        width: hovered ? "100%" : "38%",
        transition: "width 0.4s ease", marginBottom: "1rem",
      }} />

      {/* Description */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.85rem", color: "#475569",
        lineHeight: 1.8, margin: "0 0 1.25rem",
        fontWeight: 300,
      }}>{service.description}</p>

      {/* Features */}
      <ul style={{
        listStyle: "none", margin: "0 0 1.75rem", padding: 0,
        display: "flex", flexDirection: "column", gap: "0.5rem",
        flex: 1,
      }}>
        {service.features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <CheckCircle size={13} style={{ color: "#6B9E5E", flexShrink: 0, marginTop: "0.2rem" }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.8rem", color: "#475569",
              lineHeight: 1.6, fontWeight: 300,
            }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA link */}
      <Link
        to={service.link}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: hovered ? "0.65rem" : "0.4rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#2563eb",
          textDecoration: "none",
          fontWeight: 500,
          transition: "gap 0.25s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.gap = "0.75rem"}
        onMouseLeave={e => e.currentTarget.style.gap = hovered ? "0.65rem" : "0.4rem"}
      >
        Learn More
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ value, label, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5rem 2rem",
        textAlign: "center",
        background: hovered ? "rgba(37, 99, 235,0.08)" : "rgba(255,255,255,0.02)",
        transition: "background 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 700, color: "#2563eb", lineHeight: 1,
        marginBottom: "0.5rem",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}>{value}</div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.72rem", color: "rgba(232,217,192,0.5)",
        letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 400,
      }}>{label}</div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function ConsultancyServices() {
  const [heroRef, heroVisible] = useInView(0.05);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc", color: "#0f172a" }}>
      <style>{`
        @keyframes accentShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50%       { transform: translateY(-7px); opacity: 0.65; }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
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
            minHeight: "68vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "7rem 2rem 5rem",
            textAlign: "center",
            overflow: "hidden",
            borderBottom: "1px solid rgba(100, 116, 139,0.1)",
          }}
        >
          {/* Grid */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }} />
          {/* Glow */}
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "700px", height: "480px",
            background: "radial-gradient(ellipse, rgba(37, 99, 235,0.1) 0%, transparent 70%)",
            transform: "translate(-50%,-50%)",
          }} />
          {/* Rings */}
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "440px", height: "440px",
            border: "1px solid rgba(37, 99, 235,0.08)", borderRadius: "50%",
            animation: "rotateSlow 42s linear infinite",
          }} />
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "620px", height: "620px",
            border: "1px dashed rgba(37, 99, 235,0.05)", borderRadius: "50%",
            animation: "rotateSlow 68s linear infinite reverse",
          }} />
          {/* Floating dots */}
          {[
            { top: "16%", left: "10%",  delay: "0s",   dur: "3.2s" },
            { top: "76%", left: "8%",   delay: "0.9s", dur: "3.8s" },
            { top: "18%", right: "9%",  delay: "0.4s", dur: "4.2s" },
            { top: "72%", right: "12%", delay: "1.3s", dur: "3.5s" },
          ].map((d, i) => (
            <div key={i} style={{
              position: "absolute", pointerEvents: "none",
              width: 4, height: 4, borderRadius: "50%", background: "#2563eb",
              animation: `floatDot ${d.dur} ease-in-out infinite`,
              animationDelay: d.delay,
              top: d.top, left: d.left, right: d.right,
            }} />
          ))}

          {/* Content */}
          <div style={{
            position: "relative", zIndex: 1,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.65rem",
              border: "1px solid rgba(37, 99, 235,0.28)",
              padding: "0.45rem 1.3rem", marginBottom: "2.25rem",
              background: "rgba(37, 99, 235,0.05)", borderRadius: "1px",
            }}>
              <Briefcase size={12} style={{ color: "#2563eb" }} />
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#2563eb", fontWeight: 500,
              }}>Our Programs</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 700, lineHeight: 1.02,
              letterSpacing: "-0.025em", color: "#0f172a",
              margin: "0 0 0.5rem",
            }}>
              Consultancy{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(120deg, #2563eb 0%, #60a5fa 38%, #1d4ed8 72%, #2563eb 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "goldShimmer 5s linear infinite",
              }}>Services</span>
            </h1>

            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
              fontStyle: "italic", color: "rgba(90,65,40,0.52)",
              maxWidth: "580px", margin: "1.25rem auto 2.5rem",
              lineHeight: 1.75,
            }}>
              Empowering organizations and researchers with expert guidance,
              logistical excellence, and comprehensive conference support.
            </p>

            {/* Stat bar */}
            <div style={{
              display: "inline-flex", flexWrap: "wrap",
              border: "1px solid rgba(37, 99, 235,0.2)",
              background: "rgba(37, 99, 235,0.03)", borderRadius: "2px",
            }}>
              {stats.map(({ value, label }, i, arr) => (
                <div key={label} style={{
                  padding: "1rem 1.5rem", textAlign: "center",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(37, 99, 235,0.15)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "1.55rem", fontWeight: 700,
                    color: "#2563eb", lineHeight: 1,
                  }}>{value}</div>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.52rem", color: "rgba(90,65,40,0.38)",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    marginTop: "0.3rem", fontWeight: 400,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRO STRIP ── */}
        <div style={{
          background: "rgba(37, 99, 235,0.03)",
          borderBottom: "1px solid rgba(100, 116, 139,0.1)",
          padding: "3rem 2rem", textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(1rem, 2.3vw, 1.4rem)",
            fontStyle: "italic", color: "rgba(90,65,40,0.58)",
            maxWidth: "780px", margin: "0 auto", lineHeight: 1.75,
          }}>
            "With years of experience in STEM education and research,
            we provide unparalleled support tailored to your specific needs."
          </p>
        </div>

        {/* ── SERVICES GRID ── */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeIn>
            <div style={{
              display: "flex", alignItems: "center",
              gap: "1.25rem", marginBottom: "3rem", flexWrap: "wrap",
            }}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700, color: "#0f172a",
                letterSpacing: "-0.02em", margin: 0, flexShrink: 0,
              }}>Our Services</h2>
              <div style={{ flex: 1, height: "1px", background: "rgba(100, 116, 139,0.15)", minWidth: "24px" }} />
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.6rem", color: "rgba(37, 99, 235,0.65)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 500, flexShrink: 0,
              }}>{services.length} Tracks</div>
            </div>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{
          background: "#0f172a",
          borderTop: "1px solid rgba(37, 99, 235,0.15)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.6rem", color: "#2563eb",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  marginBottom: "0.75rem", fontWeight: 500,
                }}>Why MTTF</div>
                <h2 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  fontWeight: 700, color: "#E8D9C0",
                  letterSpacing: "-0.02em", margin: "0 0 0.85rem", lineHeight: 1.2,
                }}>Why Choose MTTF Consultancy Services?</h2>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.92rem", color: "rgba(232,217,192,0.4)",
                  fontWeight: 300, maxWidth: "520px", margin: "0 auto", lineHeight: 1.8,
                }}>
                  Years of experience in STEM education and research — delivering
                  unparalleled support tailored to your specific needs.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1px",
                background: "rgba(37, 99, 235,0.15)",
                border: "1px solid rgba(37, 99, 235,0.15)",
                borderRadius: "2px", overflow: "hidden",
              }}>
                {stats.map(({ value, label }, i) => (
                  <StatCard key={i} value={value} label={label} index={i} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeIn>
            <div style={{
              border: "1px solid rgba(37, 99, 235,0.25)",
              background: "rgba(37, 99, 235,0.03)",
              borderRadius: "2px", padding: "4rem 3rem",
              textAlign: "center", position: "relative", overflow: "hidden",
            }}>
              {/* Top gold bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)",
              }} />

              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.6rem", color: "#2563eb",
                letterSpacing: "0.25em", textTransform: "uppercase",
                marginBottom: "1rem", fontWeight: 500,
              }}>Get Started</div>

              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700, color: "#0f172a",
                letterSpacing: "-0.02em", margin: "0 0 0.85rem", lineHeight: 1.2,
              }}>
                Ready to Get Started?
              </h2>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.92rem", color: "rgba(90,65,40,0.55)",
                marginBottom: "2.25rem", lineHeight: 1.75, fontWeight: 300,
              }}>
                Contact us today to discuss how our consultancy services can support your goals.
              </p>

              <Link
                to="/contacts"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#fff",
                  background: "#2563eb", border: "none",
                  padding: "0.9rem 2.4rem", cursor: "pointer",
                  borderRadius: "1px", fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Contact Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </section>

      </main>

      <Footer />
    </div>
  );
}