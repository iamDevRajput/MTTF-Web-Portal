import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import {
  Users,
  Brain,
  Target,
  Award,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Rocket,
  TrendingUp,
  Code,
  BookOpen,
  Zap,
  User,
  Building2,
  ChevronRight,
} from "lucide-react";

// ─── DATA (unchanged) ────────────────────────────────────────────────────────
const expertiseAreas = [
  {
    title: "Technology & Innovation Consulting",
    icon: <Code size={26} />,
    points: [
      "AI, ML, and Data Science guidance",
      "Software product strategy",
      "Technology roadmap planning",
      "Emerging tech adoption (AI, IoT, Cloud)",
    ],
  },
  {
    title: "Research & Development Support",
    icon: <BookOpen size={26} />,
    points: [
      "Assistance in research projects",
      "Literature review & methodology support",
      "Prototype development guidance",
      "Industry-relevant problem statements",
    ],
  },
  {
    title: "Startup & Entrepreneurship Consulting",
    icon: <Rocket size={26} />,
    points: [
      "Idea validation",
      "Business model planning",
      "Pitch deck preparation",
      "MVP (Minimum Viable Product) guidance",
    ],
  },
  {
    title: "Academic & Industry Mentorship",
    icon: <GraduationCap size={26} />,
    points: [
      "Project mentorship for students",
      "Industry expert sessions",
      "Career roadmap planning",
      "Skill development guidance",
    ],
  },
];

const consultancyServices = [
  {
    title: "Research Consultation",
    points: [
      "Research methodology guidance",
      "Literature review assistance",
      "Data analysis support",
      "Publication strategy",
    ],
  },
  {
    title: "Industry Solutions",
    points: [
      "Technology implementation",
      "Process optimization",
      "Innovation workshops",
      "Custom solutions development",
    ],
  },
  {
    title: "Academic Support",
    points: [
      "Curriculum development",
      "Faculty training programs",
      "Student mentorship",
      "Project evaluation",
    ],
  },
  {
    title: "Strategic Advisory",
    points: [
      "Technology roadmap planning",
      "Digital transformation",
      "R&D strategy",
      "Innovation management",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand Your Need",
    description: "Meeting + problem discussion",
    icon: <Users size={22} />,
  },
  {
    number: "02",
    title: "Analyze & Plan",
    description: "Identify best approach",
    icon: <Target size={22} />,
  },
  {
    number: "03",
    title: "Expert Guidance",
    description: "Mentorship, strategy, and technical support",
    icon: <Brain size={22} />,
  },
  {
    number: "04",
    title: "Implementation & Review",
    description: "Execution + feedback loop",
    icon: <CheckCircle2 size={22} />,
  },
];

const benefits = [
  "Industry-ready knowledge",
  "Practical problem-solving skills",
  "Real-world project exposure",
  "Strong technical foundation",
  "Career & startup guidance",
];

const targetAudience = [
  {
    icon: <User size={28} />,
    title: "Students",
    points: ["Final year projects", "Internships", "Research work"],
  },
  {
    icon: <Rocket size={28} />,
    title: "Entrepreneurs",
    points: ["Early-stage startups", "Idea validation", "Product development"],
  },
  {
    icon: <Building2 size={28} />,
    title: "Institutions & Organizations",
    points: ["Tech collaborations", "Workshops", "Consultancy projects"],
  },
];

const highlightProjects = [
  { title: "AI-based Smart Agriculture System", category: "Agriculture Tech" },
  { title: "Campus Automation Platform", category: "Education Tech" },
  { title: "Healthcare Analytics Dashboard", category: "Healthcare" },
  { title: "Startup MVP: AI Chatbot", category: "AI & ML" },
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

// ─── ANIMATED SECTION WRAPPER ─────────────────────────────────────────────────
function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
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
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.6rem",
          color: "#2563eb",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
          fontWeight: 500,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
        fontWeight: 700,
        color: "#0f172a",
        letterSpacing: "-0.02em",
        margin: "0 0 0.85rem",
        lineHeight: 1.2,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.92rem",
          color: "rgba(90,65,40,0.55)",
          maxWidth: center ? "520px" : "none",
          margin: center ? "0 auto" : 0,
          lineHeight: 1.8,
          fontWeight: 300,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div style={{
      height: "1px",
      background: "linear-gradient(90deg, transparent, rgba(37, 99, 235,0.4) 30%, rgba(37, 99, 235,0.6) 50%, rgba(37, 99, 235,0.4) 70%, transparent)",
      margin: "0",
    }} />
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ExpertConsultancyServices() {
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
          0%, 100% { transform: translateY(0);    opacity: 0.3; }
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
            minHeight: "72vh",
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
            border: "1px solid rgba(37, 99, 235,0.08)",
            borderRadius: "50%",
            animation: "rotateSlow 42s linear infinite",
          }} />
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "620px", height: "620px",
            border: "1px dashed rgba(37, 99, 235,0.05)",
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
              width: 4, height: 4, borderRadius: "50%", background: "#2563eb",
              animation: `floatDot ${d.dur} ease-in-out infinite`,
              animationDelay: d.delay,
              top: d.top, left: d.left, right: d.right,
            }} />
          ))}

          {/* Breadcrumb */}
          <div style={{
            position: "absolute",
            top: "2rem", left: "2rem",
            zIndex: 2,
          }}>
            <Link
              to="/programs/consultancy-services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                color: "#475569",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#2563eb"}
              onMouseLeave={e => e.currentTarget.style.color = "#475569"}
            >
              <ArrowLeft size={14} />
              Back to Consultancy Services
            </Link>
          </div>

          {/* Hero content */}
          <div style={{
            position: "relative", zIndex: 1,
            opacity:   heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
              border: "1px solid rgba(37, 99, 235,0.28)",
              padding: "0.45rem 1.3rem",
              marginBottom: "2.25rem",
              background: "rgba(37, 99, 235,0.05)",
              borderRadius: "1px",
            }}>
              <Zap size={12} style={{ color: "#2563eb" }} />
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#2563eb",
                fontWeight: 500,
              }}>
                Section 1 · Expert Consultancy
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "#0f172a",
              margin: "0 0 0.5rem",
            }}>
              Expert Consultancy
              <br />
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(120deg, #2563eb 0%, #60a5fa 38%, #1d4ed8 72%, #2563eb 100%)",
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
              fontStyle: "italic",
              color: "rgba(90,65,40,0.5)",
              margin: "0.5rem 0 0.25rem",
            }}>
              From Ideas to Impact
            </p>

            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.92rem",
              color: "rgba(90,65,40,0.5)",
              maxWidth: "620px",
              margin: "1.25rem auto 2.5rem",
              lineHeight: 1.85,
              fontWeight: 300,
            }}>
              Connect with leading experts in Science, Technology, Engineering, and Mathematics.
              Our distinguished panel of consultants brings decades of combined experience to help
              you achieve your research, academic, and industry objectives.
            </p>

            {/* Stat bar */}
            <div style={{
              display: "inline-flex",
              flexWrap: "wrap",
              border: "1px solid rgba(37, 99, 235,0.2)",
              background: "rgba(37, 99, 235,0.03)",
              borderRadius: "2px",
            }}>
              {[["4", "Expertise Areas"], ["4", "Service Tracks"], ["3", "Audience Types"]].map(([val, label], i, arr) => (
                <div key={label} style={{
                  padding: "1rem 1.5rem",
                  textAlign: "center",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(37, 99, 235,0.15)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "1.7rem",
                    fontWeight: 700,
                    color: "#2563eb",
                    lineHeight: 1,
                  }}>{val}</div>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.55rem",
                    color: "rgba(90,65,40,0.38)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                    fontWeight: 400,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRO STRIP ── */}
        <GoldDivider />
        <div style={{
          background: "rgba(37, 99, 235,0.03)",
          padding: "3rem 2rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(100, 116, 139,0.1)",
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(1rem, 2.3vw, 1.4rem)",
            fontStyle: "italic",
            color: "rgba(90,65,40,0.58)",
            maxWidth: "780px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}>
            "Industry-aligned guidance for innovation, research, and real-world problem solving —
            bridging the gap between academic excellence and industry impact."
          </p>
        </div>

        {/* ── AREAS OF EXPERTISE ── */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeSection>
            <SectionHeader
              eyebrow="What We Do"
              title="Our Areas of Expertise"
              subtitle="Comprehensive consulting services across technology, research, entrepreneurship, and mentorship."
            />
          </FadeSection>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(100, 116, 139,0.1)",
            border: "1px solid rgba(100, 116, 139,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}>
            {expertiseAreas.map((area, i) => (
              <ExpertiseCard key={i} area={area} index={i} />
            ))}
          </div>
        </section>

        {/* ── CONSULTANCY SERVICES ── */}
        <section style={{
          background: "rgba(37, 99, 235,0.03)",
          borderTop: "1px solid rgba(100, 116, 139,0.1)",
          borderBottom: "1px solid rgba(100, 116, 139,0.1)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <FadeSection>
              <SectionHeader
                eyebrow="Services"
                title="Consultancy Services We Offer"
              />
            </FadeSection>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}>
              {consultancyServices.map((svc, i) => (
                <FadeSection key={i} delay={i * 0.07}>
                  <ServiceCard service={svc} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeSection>
            <SectionHeader
              eyebrow="Process"
              title="How We Work"
              subtitle="Our proven 4-step process ensures successful outcomes for every project."
            />
          </FadeSection>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "1.5rem",
          }}>
            {processSteps.map((step, i) => (
              <FadeSection key={i} delay={i * 0.08}>
                <ProcessCard step={step} index={i} isLast={i === processSteps.length - 1} />
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── WHAT YOU GAIN ── */}
        <section style={{
          background: "#0f172a",
          borderTop: "1px solid rgba(37, 99, 235,0.15)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <FadeSection>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.6rem",
                  color: "#2563eb",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                  fontWeight: 500,
                }}>Benefits</div>
                <h2 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#E8D9C0",
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.75rem",
                }}>What You Gain</h2>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(232,217,192,0.4)",
                  fontWeight: 300,
                }}>Transform your ideas into impactful solutions with expert guidance.</p>
              </div>
            </FadeSection>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1px",
              background: "rgba(37, 99, 235,0.12)",
              border: "1px solid rgba(37, 99, 235,0.12)",
              borderRadius: "2px",
              overflow: "hidden",
            }}>
              {benefits.map((text, i) => (
                <FadeSection key={i} delay={i * 0.07}>
                  <BenefitRow text={text} index={i} dark />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── TARGET AUDIENCE ── */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeSection>
            <SectionHeader
              eyebrow="Who It's For"
              title="Who Can Avail This?"
              subtitle="Our consultancy services are designed for diverse stakeholders across academia, industry, and beyond."
            />
          </FadeSection>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}>
            {targetAudience.map((aud, i) => (
              <FadeSection key={i} delay={i * 0.1}>
                <AudienceCard audience={aud} />
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── HIGHLIGHT PROJECTS ── */}
        <section style={{
          background: "rgba(37, 99, 235,0.03)",
          borderTop: "1px solid rgba(100, 116, 139,0.1)",
          borderBottom: "1px solid rgba(100, 116, 139,0.1)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <FadeSection>
              <SectionHeader
                eyebrow="Portfolio"
                title="Highlight Projects"
                subtitle="Real-world projects that showcase the power of expert consultancy."
              />
            </FadeSection>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}>
              {highlightProjects.map((project, i) => (
                <FadeSection key={i} delay={i * 0.07}>
                  <ProjectCard project={project} />
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ maxWidth: "860px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeSection>
            <div style={{
              border: "1px solid rgba(37, 99, 235,0.25)",
              background: "rgba(37, 99, 235,0.03)",
              borderRadius: "2px",
              padding: "4rem 3rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Top gold bar */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)",
              }} />

              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.6rem",
                color: "#2563eb",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                fontWeight: 500,
              }}>Get Started</div>

              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.02em",
                margin: "0 0 0.85rem",
                lineHeight: 1.2,
              }}>
                Connect with Our Experts Today
              </h2>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.92rem",
                color: "rgba(90,65,40,0.55)",
                marginBottom: "2.25rem",
                lineHeight: 1.75,
                fontWeight: 300,
              }}>
                Let our experienced consultants guide you toward success.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  to="/contacts"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#fff",
                    background: "#2563eb",
                    border: "none",
                    padding: "0.9rem 2.2rem",
                    cursor: "pointer",
                    borderRadius: "1px",
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                  onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                >
                  Request Consultation
                </Link>
                <Link
                  to="/programs/consultancy-services"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#2563eb",
                    background: "transparent",
                    border: "1px solid rgba(37, 99, 235,0.45)",
                    padding: "0.9rem 2.2rem",
                    cursor: "pointer",
                    borderRadius: "1px",
                    fontWeight: 400,
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(37, 99, 235,0.07)"; e.currentTarget.style.borderColor = "rgba(37, 99, 235,0.8)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(37, 99, 235,0.45)"; }}
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

function ExpertiseCard({ area, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(37, 99, 235,0.04)" : "#f8fafc",
        padding: "2rem 2rem 2rem 2.25rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "background 0.35s ease",
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
        position: "absolute", right: "1rem", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "4.5rem", fontWeight: 700,
        color: "rgba(37, 99, 235,0.06)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div style={{
        width: "50px", height: "50px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(37, 99, 235,0.12)" : "rgba(37, 99, 235,0.06)",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.4)" : "rgba(37, 99, 235,0.18)"}`,
        borderRadius: "2px",
        color: "#2563eb",
        marginBottom: "1.25rem",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {area.icon}
      </div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1.08rem", fontWeight: 700,
        color: "#0f172a", margin: "0 0 0.6rem",
        letterSpacing: "-0.01em", lineHeight: 1.3,
      }}>{area.title}</h3>

      <div style={{
        height: "1px", background: "rgba(37, 99, 235,0.18)",
        width: hovered ? "100%" : "36%",
        transition: "width 0.4s ease", marginBottom: "1rem",
      }} />

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {area.points.map((point, i) => (
          <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <ChevronRight size={13} style={{ color: "#2563eb", flexShrink: 0, marginTop: "0.2rem" }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.8rem", color: "#475569",
              lineHeight: 1.6, fontWeight: 300,
            }}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(37, 99, 235,0.04)" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.35)" : "rgba(100, 116, 139,0.15)"}`,
        borderRadius: "2px",
        padding: "1.75rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? "2px" : "1px",
        background: "linear-gradient(90deg, transparent, #2563eb, transparent)",
        transition: "height 0.3s",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <Award size={16} style={{ color: "#2563eb", flexShrink: 0 }} />
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "1rem", fontWeight: 700,
          color: "#0f172a", margin: 0, letterSpacing: "-0.01em",
        }}>{service.title}</h3>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {service.points.map((point, i) => (
          <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <CheckCircle2 size={12} style={{ color: "#6B9E5E", flexShrink: 0, marginTop: "0.2rem" }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.78rem", color: "#475569",
              lineHeight: 1.6, fontWeight: 300,
            }}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessCard({ step, index, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(37, 99, 235,0.04)" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.35)" : "rgba(100, 116, 139,0.15)"}`,
        borderRadius: "2px",
        padding: "2rem 1.75rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Step number badge */}
      <div style={{
        position: "absolute", top: "1rem", right: "1rem",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "2.5rem", fontWeight: 700,
        color: "rgba(37, 99, 235,0.1)", lineHeight: 1,
        userSelect: "none",
      }}>{step.number}</div>

      {/* Icon box */}
      <div style={{
        width: "48px", height: "48px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(37, 99, 235,0.12)" : "rgba(37, 99, 235,0.06)",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.4)" : "rgba(37, 99, 235,0.18)"}`,
        borderRadius: "2px", color: "#2563eb",
        marginBottom: "1.25rem",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {step.icon}
      </div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1rem", fontWeight: 700,
        color: "#0f172a", margin: "0 0 0.5rem", lineHeight: 1.3,
      }}>{step.title}</h3>
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.8rem", color: "#475569",
        lineHeight: 1.7, margin: 0, fontWeight: 300,
      }}>{step.description}</p>

      {/* Connector arrow */}
      {!isLast && (
        <div style={{
          position: "absolute", top: "50%", right: "-0.75rem",
          transform: "translateY(-50%)", color: "rgba(37, 99, 235,0.4)",
          zIndex: 1,
        }}>
          <ChevronRight size={20} />
        </div>
      )}
    </div>
  );
}

function BenefitRow({ text, dark }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        padding: "1.25rem 1.5rem",
        background: hovered
          ? dark ? "rgba(37, 99, 235,0.08)" : "rgba(37, 99, 235,0.04)"
          : dark ? "rgba(255,255,255,0.02)" : "#f8fafc",
        transition: "background 0.3s ease",
        cursor: "default",
      }}
    >
      <CheckCircle2 size={16} style={{ color: "#2563eb", flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.85rem",
        color: dark ? "rgba(232,217,192,0.75)" : "#5C4A32",
        fontWeight: 400,
        letterSpacing: "0.02em",
      }}>{text}</span>
    </div>
  );
}

function AudienceCard({ audience }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(37, 99, 235,0.04)" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.35)" : "rgba(100, 116, 139,0.15)"}`,
        borderRadius: "2px",
        padding: "2.25rem 2rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s, transform 0.35s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        textAlign: "center",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? "2px" : "1px",
        background: "linear-gradient(90deg, transparent, #2563eb, transparent)",
        transition: "height 0.3s",
      }} />

      <div style={{
        width: "60px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(37, 99, 235,0.12)" : "rgba(37, 99, 235,0.06)",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.4)" : "rgba(37, 99, 235,0.18)"}`,
        borderRadius: "2px", color: "#2563eb",
        margin: "0 auto 1.25rem",
        transition: "background 0.3s, border-color 0.3s, transform 0.35s",
        transform: hovered ? "scale(1.07)" : "scale(1)",
      }}>
        {audience.icon}
      </div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1.15rem", fontWeight: 700,
        color: "#0f172a", margin: "0 0 1rem",
      }}>{audience.title}</h3>

      <div style={{ height: "1px", background: "rgba(37, 99, 235,0.18)", marginBottom: "1rem", width: hovered ? "60%" : "36%", margin: "0 auto 1rem", transition: "width 0.4s ease" }} />

      <ul style={{ listStyle: "none", margin: 0, padding: 0, textAlign: "left", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {audience.points.map((point, i) => (
          <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#475569", fontWeight: 300 }}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(37, 99, 235,0.06)" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.4)" : "rgba(100, 116, 139,0.15)"}`,
        borderRadius: "2px",
        padding: "1.75rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "background 0.3s, border-color 0.3s, transform 0.35s, box-shadow 0.35s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 14px 36px rgba(100, 116, 139,0.1)" : "none",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? "2px" : "1px",
        background: "linear-gradient(90deg, transparent, #2563eb, transparent)",
        transition: "height 0.3s",
      }} />

      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <TrendingUp size={18} style={{ color: hovered ? "#2563eb" : "rgba(100, 116, 139,0.25)", transition: "color 0.3s" }} />
      </div>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.58rem",
        color: "#2563eb",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: "0.6rem",
        fontWeight: 500,
      }}>{project.category}</div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1rem", fontWeight: 700,
        color: "#0f172a", margin: 0,
        lineHeight: 1.35, letterSpacing: "-0.01em",
      }}>{project.title}</h3>

      <div style={{
        position: "absolute", bottom: "1rem", right: "1rem",
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
        color: "#2563eb",
      }}>
        <ChevronRight size={16} />
      </div>
    </div>
  );
}