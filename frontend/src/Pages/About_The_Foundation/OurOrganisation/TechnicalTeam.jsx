import React, { useState, useEffect, useRef } from "react";
import { Code, Globe, Zap, Terminal, Github } from "lucide-react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

// ── Local images matched exactly to your Technicalteam folder ──
import vikasImg   from "../../../assets/Technicalteam/vikasimg1.webp";
import devanshImg from "../../../assets/Technicalteam/devanshjindal.webp";

// ─── DATA ────────────────────────────────────────────────────────────────────
const techTeam = [
  {
    name: "Vikas Rathore",
    role: "Software Developer",
    tech: ["React", "JavaScript", "Node.js", "Java", "Git"],
    image: vikasImg,
    bio: "Passionate software developer building scalable and innovative solutions for the MTTF platform. Driven by curiosity and a love for clean, efficient code.",
    icon: Code,
    github: "https://github.com/Vikasr9",
    linkedin: "#",
    num: "01",
    contributions: "Platform frontend development",
  },
  {
    name: "Devansh Jindal",
    role: "Software Developer",
    tech: ["React", "Spring Boot", "Java", "Microservices", "REST API"],
    image: devanshImg,
    bio: "Full-stack developer with expertise in Java and React ecosystems. Committed to building robust backend services and dynamic user interfaces.",
    icon: Globe,
    github: "#",
    linkedin: "https://www.linkedin.com/in/devanshjindal01/",
    num: "02",
    contributions: "Backend services & API design",
  },
];

const stats = [
  { label: "Lines of Code",     value: "50K+",   icon: Code    },
  { label: "Features Shipped",  value: "100+",   icon: Zap     },
  { label: "Uptime",            value: "99.9%",  icon: Globe   },
  { label: "Response Time",     value: "<200ms", icon: Terminal },
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

// ─── FADE WRAPPER ─────────────────────────────────────────────────────────────
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

// ─── MEMBER CARD ──────────────────────────────────────────────────────────────
function MemberCard({ member, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView();
  const Icon = member.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.5s ease, box-shadow 0.35s ease`,
        background: hovered ? "rgba(201,168,76,0.04)" : "#FBF6EC",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(139,112,72,0.15)"}`,
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered ? "0 20px 48px rgba(139,112,72,0.12)" : "none",
        position: "relative",
      }}
    >
      {/* Top gold bar */}
      <div style={{
        height: hovered ? "2px" : "1px",
        background: "linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)",
        transition: "height 0.3s ease",
        flexShrink: 0,
      }} />

      {/* Profile image area */}
      <div style={{
        position: "relative",
        padding: "2rem 2rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}>
        {/* Icon badge */}
        <div style={{
          position: "absolute",
          top: "1.25rem", right: "1.25rem",
          width: "34px", height: "34px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hovered ? "rgba(201,168,76,0.14)" : "rgba(201,168,76,0.07)",
          border: `1px solid ${hovered ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.2)"}`,
          borderRadius: "2px", color: "#C9A84C",
          transition: "background 0.3s, border-color 0.3s",
          zIndex: 1,
        }}>
          <Icon size={16} />
        </div>

        {/* Card number */}
        <div style={{
          position: "absolute",
          top: "1.25rem", left: "1.25rem",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.68rem", color: "#C9A84C",
          letterSpacing: "0.15em", fontWeight: 600,
          zIndex: 1,
        }}>{member.num}</div>

        {/* Avatar — rectangular to match Leaders style */}
        <div style={{
          position: "relative",
          width: "120px", height: "120px",
          flexShrink: 0,
          marginTop: "0.5rem",
        }}>
          <div style={{
            position: "absolute", inset: "-3px",
            borderRadius: "4px",
            border: `2px solid ${hovered ? "#C9A84C" : "#E8D89A"}`,
            transition: "border-color 0.35s ease",
          }} />
          <img
            src={member.image}
            alt={member.name}
            style={{
              width: "100%", height: "100%",
              borderRadius: "4px",
              objectFit: "cover", display: "block",
              position: "relative", zIndex: 1,
              transition: "transform 0.35s ease",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
            onError={e => { e.target.style.background = "#F5EFD8"; }}
          />
          <div style={{
            position: "absolute", top: "-8px", right: "-8px",
            width: "26px", height: "26px",
            background: "#C9A84C", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #FBF6EC", zIndex: 2,
          }}>
            <Zap size={11} color="#fff" />
          </div>
        </div>

        {/* Name + role */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem", fontWeight: 700,
            color: "#1A120A", margin: "0 0 0.25rem",
            letterSpacing: "-0.01em",
          }}>{member.name}</h3>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.7rem", color: "#C9A84C",
            letterSpacing: "0.12em", textTransform: "uppercase",
            margin: 0, fontWeight: 500,
          }}>{member.role}</p>
        </div>
      </div>

      {/* Animated divider */}
      <div style={{
        height: "1px",
        background: "rgba(201,168,76,0.15)",
        margin: "1.25rem 2rem",
        width: hovered ? "calc(100% - 4rem)" : "40%",
        transition: "width 0.4s ease",
      }} />

      {/* Body */}
      <div style={{ padding: "0 2rem 2rem", display: "flex", flexDirection: "column", flex: 1, gap: "1rem" }}>
        {/* Bio */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.82rem", color: "#7A6040",
          lineHeight: 1.78, margin: 0, fontWeight: 300,
          textAlign: "center",
        }}>{member.bio}</p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
          {member.tech.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem", color: "#8B7048",
              background: "rgba(201,168,76,0.07)",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "0.2rem 0.6rem", borderRadius: "1px",
              letterSpacing: "0.08em", fontWeight: 400,
            }}>{t}</span>
          ))}
        </div>

        {/* Contributions row */}
        <div style={{
          display: "flex",
          border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: "1px", overflow: "hidden",
          background: "rgba(201,168,76,0.03)",
        }}>
          <div style={{
            padding: "0.85rem 0.75rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            flex: 1,
          }}>
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.68rem", color: "#8B7048",
              lineHeight: 1.5, textAlign: "center", fontWeight: 300,
            }}>{member.contributions}</span>
          </div>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginTop: "auto" }}>
          <a
            href="mailto:contactus@mttf.in"
            style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "#F5EFD8", border: "1px solid #E8D89A",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.85rem", cursor: "pointer",
              transition: "all 0.3s ease", textDecoration: "none",
            }}
            title="contactus@mttf.in"
            onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.transform = "translateY(-2px) rotate(5deg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#F5EFD8"; e.currentTarget.style.borderColor = "#E8D89A"; e.currentTarget.style.transform = "none"; }}
          >📧</a>

          {member.github && member.github !== "#" && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "#F5EFD8", border: "1px solid #E8D89A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem", cursor: "pointer",
                transition: "all 0.3s ease", textDecoration: "none",
              }}
              title="GitHub Profile"
              onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.transform = "translateY(-2px) rotate(5deg)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F5EFD8"; e.currentTarget.style.borderColor = "#E8D89A"; e.currentTarget.style.transform = "none"; }}
            >🐙</a>
          )}

          {member.linkedin && member.linkedin !== "#" && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "#F5EFD8", border: "1px solid #E8D89A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem", cursor: "pointer",
                transition: "all 0.3s ease", textDecoration: "none",
              }}
              title="LinkedIn Profile"
              onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.transform = "translateY(-2px) rotate(5deg)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F5EFD8"; e.currentTarget.style.borderColor = "#E8D89A"; e.currentTarget.style.transform = "none"; }}
            >💼</a>
          )}
        </div>
      </div>

      {/* Bottom hover rule */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg,transparent,#C9A84C,transparent)",
        opacity: hovered ? 1 : 0, transition: "opacity 0.35s",
      }} />
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
const TechnicalTeam = () => {
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
          0%, 100% { transform: translateY(0); opacity: 0.3; }
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
            minHeight: "68vh",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "7rem 2rem 5rem",
            textAlign: "center", overflow: "hidden",
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
            border: "1px solid rgba(201,168,76,0.08)", borderRadius: "50%",
            animation: "rotateSlow 42s linear infinite",
          }} />
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "50%", left: "50%",
            width: "620px", height: "620px",
            border: "1px dashed rgba(201,168,76,0.05)", borderRadius: "50%",
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

          {/* Content */}
          <div style={{
            position: "relative", zIndex: 1,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}>
            {/* Icon badge */}
            <div style={{
              width: "72px", height: "72px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(201,168,76,0.07)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "2px", color: "#C9A84C",
              margin: "0 auto 2rem",
            }}>
              <Code size={28} />
            </div>

            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.7rem",
              border: "1px solid rgba(201,168,76,0.28)",
              padding: "0.45rem 1.3rem", marginBottom: "2.25rem",
              background: "rgba(201,168,76,0.05)", borderRadius: "1px",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#C9A84C", fontWeight: 500,
              }}>MathTech Thinking Foundation</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 700, lineHeight: 1.02,
              letterSpacing: "-0.025em", color: "#1A120A",
              margin: "0 0 0.5rem",
            }}>
              Technical{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(120deg, #C9A84C 0%, #E8C97A 38%, #B8965A 72%, #C9A84C 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "goldShimmer 5s linear infinite",
              }}>Team</span>
            </h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
              fontStyle: "italic", color: "rgba(90,65,40,0.52)",
              maxWidth: "560px", margin: "1.25rem auto 2.5rem",
              lineHeight: 1.75,
            }}>
              The skilled developers powering the MTTF platform with innovation and dedication.
            </p>

            {/* Stats bar */}
            <div style={{
              display: "inline-flex", flexWrap: "wrap",
              border: "1px solid rgba(201,168,76,0.2)",
              background: "rgba(201,168,76,0.03)",
              borderRadius: "2px",
            }}>
              {stats.map(({ value, label }, i, arr) => (
                <div key={label} style={{
                  padding: "1rem 1.5rem", textAlign: "center",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(201,168,76,0.15)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.55rem", fontWeight: 700,
                    color: "#C9A84C", lineHeight: 1,
                  }}>{value}</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
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
            "A team defined not just by technical excellence, but by a shared
            commitment to building technology that educates, empowers, and endures."
          </p>
        </div>

        {/* ── TEAM GRID ── */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
          <FadeIn>
            <div style={{
              display: "flex", alignItems: "center",
              gap: "1.25rem", marginBottom: "3rem", flexWrap: "wrap",
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700, color: "#1A120A",
                letterSpacing: "-0.02em", margin: 0, flexShrink: 0,
              }}>Meet the Team</h2>
              <div style={{ flex: 1, height: "1px", background: "rgba(139,112,72,0.15)", minWidth: "24px" }} />
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem", color: "rgba(201,168,76,0.65)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 500, flexShrink: 0,
              }}>{techTeam.length} Developers</div>
            </div>
          </FadeIn>

          {/* Centered 2-column grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem",
            maxWidth: "760px",
            margin: "0 auto",
          }}>
            {techTeam.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: "#1A120A",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "60px", height: "60px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "2px", color: "#C9A84C",
                  margin: "0 auto 1.5rem",
                }}>
                  <Terminal size={24} />
                </div>

                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.6rem", color: "#C9A84C",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  marginBottom: "1rem", fontWeight: 500,
                }}>Join the Team</div>

                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 700, color: "#E8D9C0",
                  letterSpacing: "-0.02em", margin: "0 0 1rem", lineHeight: 1.2,
                }}>
                  Build the Future With Us
                </h2>

                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.9rem", color: "rgba(232,217,192,0.45)",
                  lineHeight: 1.8, maxWidth: "520px",
                  margin: "0 auto 2.5rem", fontWeight: 300,
                }}>
                  We're always looking for talented developers to join our mission.
                  Build the future of STEM education technology with us.
                </p>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.72rem", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#fff",
                      background: "#C9A84C", border: "none",
                      padding: "0.9rem 2.2rem", cursor: "pointer",
                      borderRadius: "1px", fontWeight: 500,
                      transition: "background 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={e => { e.target.style.background = "#B8965A"; e.target.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.target.style.background = "#C9A84C"; e.target.style.transform = "translateY(0)"; }}
                  >
                    View Open Positions
                  </button>
                  <button
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.72rem", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#C9A84C",
                      background: "transparent",
                      border: "1px solid rgba(201,168,76,0.4)",
                      padding: "0.9rem 2.2rem", cursor: "pointer",
                      borderRadius: "1px", fontWeight: 400,
                      transition: "border-color 0.3s ease, background 0.3s ease",
                    }}
                    onMouseEnter={e => { e.target.style.background = "rgba(201,168,76,0.08)"; e.target.style.borderColor = "rgba(201,168,76,0.8)"; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(201,168,76,0.4)"; }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default TechnicalTeam;