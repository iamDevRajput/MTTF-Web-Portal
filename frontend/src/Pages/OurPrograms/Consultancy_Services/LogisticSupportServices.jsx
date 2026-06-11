import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import {
  Truck,
  Box,
  MapPin,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

// ─── DATA (unchanged) ────────────────────────────────────────────────────────
const services = [
  {
    icon: <Calendar size={24} />,
    title: "Event Management",
    description: "Complete planning and execution of academic and research events",
    features: [
      "Venue booking and setup",
      "Registration management",
      "Catering arrangements",
      "Audio-visual equipment",
    ],
  },
  {
    icon: <Box size={24} />,
    title: "Resource Coordination",
    description: "Efficient management of resources for research and educational projects",
    features: [
      "Equipment procurement",
      "Material sourcing",
      "Inventory management",
      "Distribution logistics",
    ],
  },
  {
    icon: <MapPin size={24} />,
    title: "Venue & Facilities",
    description: "Access to world-class facilities and venues for your events",
    features: [
      "Conference halls",
      "Laboratory spaces",
      "Meeting rooms",
      "Exhibition areas",
    ],
  },
  {
    icon: <Truck size={24} />,
    title: "Transportation Services",
    description: "Reliable transportation solutions for equipment and participants",
    features: [
      "Equipment transport",
      "Participant shuttles",
      "International shipping",
      "On-site mobility",
    ],
  },
];

const benefits = [
  {
    icon: <Clock size={22} />,
    title: "Time Efficiency",
    description: "Focus on your core work while we handle the logistics",
  },
  {
    icon: <Shield size={22} />,
    title: "Reliable Support",
    description: "Dependable service backed by years of experience",
  },
  {
    icon: <Zap size={22} />,
    title: "Quick Response",
    description: "Rapid deployment and problem resolution",
  },
];

const processPhases = [
  {
    step: "01",
    title: "Needs Assessment",
    description:
      "We begin by understanding your specific logistical requirements, timeline, and budget constraints.",
  },
  {
    step: "02",
    title: "Planning & Coordination",
    description:
      "Our team develops a comprehensive logistics plan, coordinating all necessary resources and vendors.",
  },
  {
    step: "03",
    title: "Execution & Monitoring",
    description:
      "We implement the plan with precision, continuously monitoring progress and adjusting as needed.",
  },
  {
    step: "04",
    title: "Follow-up & Support",
    description:
      "Post-event analysis and ongoing support to ensure everything meets your expectations.",
  },
];

const stats = [
  { value: "300+", label: "Events Supported" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

// ─── HOOK ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

// ─── ANIMATED SECTION ─────────────────────────────────────────────────────────
function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "3rem" }}>
      {eyebrow && (
        <div style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.6rem", color: "#C9A84C",
          letterSpacing: "0.25em", textTransform: "uppercase",
          marginBottom: "0.75rem", fontWeight: 500,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
        fontWeight: 700, color: "#1A120A",
        letterSpacing: "-0.02em", margin: "0 0 0.85rem", lineHeight: 1.2,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.92rem", color: "rgba(90,65,40,0.55)",
          maxWidth: center ? "520px" : "none",
          margin: center ? "0 auto" : 0,
          lineHeight: 1.8, fontWeight: 300,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function LogisticSupportServices() {
  const [heroRef, heroVisible] = useInView(0.05);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FBF6EC", color: "#1A120A" }}>
      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0);    opacity: 0.3; }
          50%       { transform: translateY(-7px); opacity: 0.65; }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #FBF6EC; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 1px; }
      `}</style>

      <Header />

      <main style={{ flex: 1 }}>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: "72vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "7rem 2rem 5rem",
            textAlign: "center",
            overflow: "hidden",
            borderBottom: "1px solid rgba(139,112,72,0.1)",
          }}
        >
          {/* Grid */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }} />

          {/* Glow */}
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "700px", height: "480px",
            background: "radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)",
            transform: "translate(-50%,-50%)",
          }} />

          {/* Rings */}
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "440px", height: "440px",
            border: "1px solid rgba(201,168,76,0.08)",
            borderRadius: "50%",
            animation: "rotateSlow 42s linear infinite",
          }} />
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "620px", height: "620px",
            border: "1px dashed rgba(201,168,76,0.05)",
            borderRadius: "50%",
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
              width: 4, height: 4, borderRadius: "50%", background: "#C9A84C",
              animation: `floatDot ${d.dur} ease-in-out infinite`,
              animationDelay: d.delay,
              top: d.top, left: d.left, right: d.right,
            }} />
          ))}

          {/* Breadcrumb */}
          <div style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 2 }}>
            <Link
              to="/programs/consultancy-services"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.72rem", letterSpacing: "0.1em",
                color: "#8B7048", textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#C9A84C"}
              onMouseLeave={e => e.currentTarget.style.color = "#8B7048"}
            >
              <ArrowLeft size={14} />
              Back to Consultancy Services
            </Link>
          </div>

          {/* Hero content */}
          <div style={{
            position: "relative", zIndex: 1,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.65rem",
              border: "1px solid rgba(201,168,76,0.28)",
              padding: "0.45rem 1.3rem", marginBottom: "2.25rem",
              background: "rgba(201,168,76,0.05)", borderRadius: "1px",
            }}>
              <Truck size={12} style={{ color: "#C9A84C" }} />
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#C9A84C", fontWeight: 500,
              }}>
                Section 1 · Logistic Support
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)",
              fontWeight: 700, lineHeight: 1.04,
              letterSpacing: "-0.025em", color: "#1A120A",
              margin: "0 0 0.5rem",
            }}>
              Logistic Support
              <br />
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(120deg, #C9A84C 0%, #E8C97A 38%, #B8965A 72%, #C9A84C 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "goldShimmer 5s linear infinite",
              }}>
                Services
              </span>
            </h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
              fontStyle: "italic",
              color: "rgba(90,65,40,0.5)",
              margin: "0.5rem 0 0.25rem",
            }}>
              From Planning to Execution
            </p>

            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.92rem", color: "rgba(90,65,40,0.5)",
              maxWidth: "600px", margin: "1.25rem auto 2.5rem",
              lineHeight: 1.85, fontWeight: 300,
            }}>
              Comprehensive logistical solutions designed to streamline your research projects,
              academic events, and organisational initiatives — so you can focus on what matters most.
            </p>

            {/* Stat bar */}
            <div style={{
              display: "inline-flex", flexWrap: "wrap",
              border: "1px solid rgba(201,168,76,0.2)",
              background: "rgba(201,168,76,0.03)", borderRadius: "2px",
            }}>
              {stats.map(({ value, label }, i, arr) => (
                <div key={label} style={{
                  padding: "1rem 1.5rem", textAlign: "center",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(201,168,76,0.15)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.7rem", fontWeight: 700,
                    color: "#C9A84C", lineHeight: 1,
                  }}>{value}</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.55rem", color: "rgba(90,65,40,0.38)",
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    marginTop: "0.3rem", fontWeight: 400,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRO STRIP ── */}
        <div style={{
          background: "rgba(201,168,76,0.03)",
          borderBottom: "1px solid rgba(139,112,72,0.1)",
          padding: "3rem 2rem", textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2.3vw, 1.4rem)",
            fontStyle: "italic", color: "rgba(90,65,40,0.58)",
            maxWidth: "780px", margin: "0 auto", lineHeight: 1.75,
          }}>
            "From venue coordination to equipment management, our experienced team handles every
            detail — bringing decades of combined expertise to every project."
          </p>
        </div>

        {/* ── SERVICES GRID ── */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeSection>
            <SectionHeader
              eyebrow="What We Offer"
              title="Our Logistic Support Services"
              subtitle="End-to-end solutions across event management, resource coordination, venues, and transportation."
            />
          </FadeSection>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(139,112,72,0.1)",
            border: "1px solid rgba(139,112,72,0.1)",
            borderRadius: "2px", overflow: "hidden",
          }}>
            {services.map((svc, i) => (
              <FadeSection key={i} delay={i * 0.07}>
                <ServiceCard service={svc} index={i} />
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section style={{
          background: "rgba(201,168,76,0.03)",
          borderTop: "1px solid rgba(139,112,72,0.1)",
          borderBottom: "1px solid rgba(139,112,72,0.1)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <FadeSection>
              <SectionHeader
                eyebrow="Why Us"
                title="Why Choose Our Logistic Support?"
              />
            </FadeSection>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}>
              {benefits.map((b, i) => (
                <FadeSection key={i} delay={i * 0.1}>
                  <BenefitCard benefit={b} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeSection>
            <SectionHeader
              eyebrow="How It Works"
              title="Our Support Process"
              subtitle="A structured four-phase approach that guarantees precision at every step."
            />
          </FadeSection>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {processPhases.map((phase, i) => (
              <FadeSection key={i} delay={i * 0.09}>
                <ProcessRow phase={phase} index={i} isLast={i === processPhases.length - 1} />
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{
          background: "#1A120A",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <FadeSection>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1px",
                background: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "2px", overflow: "hidden",
              }}>
                {stats.map(({ value, label }, i) => (
                  <StatCard key={i} value={value} label={label} index={i} />
                ))}
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ maxWidth: "860px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeSection>
            <div style={{
              border: "1px solid rgba(201,168,76,0.25)",
              background: "rgba(201,168,76,0.03)",
              borderRadius: "2px", padding: "4rem 3rem",
              textAlign: "center", position: "relative", overflow: "hidden",
            }}>
              {/* Top gold bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)",
              }} />

              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem", color: "#C9A84C",
                letterSpacing: "0.25em", textTransform: "uppercase",
                marginBottom: "1rem", fontWeight: 500,
              }}>Get Started</div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700, color: "#1A120A",
                letterSpacing: "-0.02em", margin: "0 0 0.85rem", lineHeight: 1.2,
              }}>
                Need Logistic Support?
              </h2>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.92rem", color: "rgba(90,65,40,0.55)",
                marginBottom: "2.25rem", lineHeight: 1.75, fontWeight: 300,
              }}>
                Let us handle the logistics while you focus on your research and innovation.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  to="/contacts"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.72rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#fff",
                    background: "#C9A84C", border: "none",
                    padding: "0.9rem 2.2rem", cursor: "pointer",
                    borderRadius: "1px", fontWeight: 500,
                    textDecoration: "none", display: "inline-block",
                    transition: "background 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#B8965A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Request Support
                </Link>
                <Link
                  to="/programs/consultancy-services"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.72rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#C9A84C",
                    background: "transparent",
                    border: "1px solid rgba(201,168,76,0.45)",
                    padding: "0.9rem 2.2rem", cursor: "pointer",
                    borderRadius: "1px", fontWeight: 400,
                    textDecoration: "none", display: "inline-block",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.07)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.8)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.45)"; }}
                >
                  View All Services
                </Link>
              </div>
            </div>
          </FadeSection>
        </section>

      </main>

      <Footer />
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(201,168,76,0.04)" : "#FBF6EC",
        padding: "2rem 2rem 2rem 2.25rem",
        position: "relative", overflow: "hidden",
        cursor: "default",
        transition: "background 0.35s ease",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hovered ? "3px" : "2px",
        background: "linear-gradient(180deg, #C9A84C 0%, #E8C97A 100%)",
        transition: "width 0.3s ease",
      }} />

      {/* Ghost number */}
      <div style={{
        position: "absolute", right: "1rem", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Playfair Display', serif",
        fontSize: "4.5rem", fontWeight: 700,
        color: "rgba(201,168,76,0.06)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div style={{
        width: "50px", height: "50px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.18)"}`,
        borderRadius: "2px", color: "#C9A84C",
        marginBottom: "1.25rem",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {service.icon}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem", fontWeight: 700,
        color: "#1A120A", margin: "0 0 0.5rem",
        letterSpacing: "-0.01em", lineHeight: 1.3,
      }}>{service.title}</h3>

      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.8rem", color: "#8B7048",
        lineHeight: 1.7, margin: "0 0 1rem", fontWeight: 300,
      }}>{service.description}</p>

      <div style={{
        height: "1px", background: "rgba(201,168,76,0.18)",
        width: hovered ? "100%" : "36%",
        transition: "width 0.4s ease", marginBottom: "1rem",
      }} />

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {service.features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <CheckCircle2 size={12} style={{ color: "#6B9E5E", flexShrink: 0, marginTop: "0.2rem" }} />
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.78rem", color: "#7A6040",
              lineHeight: 1.6, fontWeight: 300,
            }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BenefitCard({ benefit }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(201,168,76,0.04)" : "#FBF6EC",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.35)" : "rgba(139,112,72,0.15)"}`,
        borderRadius: "2px", padding: "2rem",
        textAlign: "center", position: "relative", overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s, transform 0.35s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? "2px" : "1px",
        background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
        transition: "height 0.3s",
      }} />

      <div style={{
        width: "52px", height: "52px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.18)"}`,
        borderRadius: "2px", color: "#C9A84C",
        margin: "0 auto 1.25rem",
        transition: "background 0.3s, border-color 0.3s, transform 0.35s",
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}>
        {benefit.icon}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.05rem", fontWeight: 700,
        color: "#1A120A", margin: "0 0 0.6rem",
      }}>{benefit.title}</h3>

      <div style={{
        height: "1px", background: "rgba(201,168,76,0.18)",
        width: hovered ? "60%" : "30%",
        margin: "0 auto 0.85rem",
        transition: "width 0.4s ease",
      }} />

      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.82rem", color: "#7A6040",
        lineHeight: 1.75, margin: 0, fontWeight: 300,
      }}>{benefit.description}</p>
    </div>
  );
}

function ProcessRow({ phase, index, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "flex-start",
        padding: "2rem 1.5rem",
        borderBottom: isLast ? "none" : "1px solid rgba(139,112,72,0.1)",
        background: hovered ? "rgba(201,168,76,0.03)" : "transparent",
        transition: "background 0.3s ease, padding-left 0.3s ease",
        paddingLeft: hovered ? "2rem" : "1.5rem",
        position: "relative",
      }}
    >
      {/* Left gold bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hovered ? "3px" : "2px",
        background: "linear-gradient(180deg, #C9A84C 0%, #E8C97A 100%)",
        transition: "width 0.3s ease",
      }} />

      {/* Step number */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "3.5rem", fontWeight: 700,
        color: "rgba(201,168,76,0.15)",
        lineHeight: 1, flexShrink: 0,
        minWidth: "64px",
        transition: "color 0.3s ease",
        ...(hovered ? { color: "rgba(201,168,76,0.25)" } : {}),
      }}>
        {phase.step}
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.15rem", fontWeight: 700,
          color: "#1A120A", margin: "0 0 0.5rem", lineHeight: 1.3,
        }}>{phase.title}</h3>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.85rem", color: "#7A6040",
          lineHeight: 1.8, margin: 0, fontWeight: 300,
        }}>{phase.description}</p>
      </div>
    </div>
  );
}

function StatCard({ value, label, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5rem 2rem",
        textAlign: "center",
        background: hovered ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.02)",
        transition: "background 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 700, color: "#C9A84C",
        lineHeight: 1, marginBottom: "0.5rem",
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}>{value}</div>
      <div style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.72rem", color: "rgba(232,217,192,0.5)",
        letterSpacing: "0.12em", textTransform: "uppercase",
        fontWeight: 400,
      }}>{label}</div>
    </div>
  );
}