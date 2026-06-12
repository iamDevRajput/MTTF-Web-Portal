// frontend/src/Pages/OurPrograms/Awards/Awards2024.jsx
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import AwardCard from "./AwardCard";
import { awards2024 } from "./awards2024Data";

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

function Awards2024() {
  const [heroRef, heroVisible] = useInView(0.05);
  const [gridRef, gridVisible] = useInView(0.05);

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
            minHeight: "68vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "7rem 2rem 5rem",
            textAlign: "center",
            overflow: "hidden",
            background: "#f8fafc",
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
            width: "680px", height: "480px",
            background: "radial-gradient(ellipse, rgba(37, 99, 235,0.1) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
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
            { top: "16%", left: "10%",  delay: "0s",    dur: "3.2s" },
            { top: "76%", left: "8%",   delay: "0.9s",  dur: "3.8s" },
            { top: "18%", right: "9%",  delay: "0.45s", dur: "4.2s" },
            { top: "72%", right: "12%", delay: "1.3s",  dur: "3.5s" },
            { top: "45%", left: "3%",   delay: "0.6s",  dur: "5.1s" },
          ].map((d, i) => (
            <div key={i} style={{
              position: "absolute", pointerEvents: "none",
              width: 4, height: 4, borderRadius: "50%",
              background: "#2563eb",
              animation: `floatDot ${d.dur} ease-in-out infinite`,
              animationDelay: d.delay,
              top: d.top, left: d.left, right: d.right,
            }} />
          ))}

          {/* Content */}
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
              gap: "0.7rem",
              border: "1px solid rgba(37, 99, 235,0.28)",
              padding: "0.45rem 1.3rem",
              marginBottom: "2.25rem",
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
                Awards · 2024
              </span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2.8rem, 7.5vw, 6rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#0f172a",
              marginBottom: "0.5rem",
            }}>
              MTTF{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(120deg, #2563eb 0%, #60a5fa 38%, #1d4ed8 72%, #2563eb 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "goldShimmer 5s linear infinite",
              }}>
                Awards 2024
              </span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
              fontStyle: "italic",
              color: "rgba(90,65,40,0.55)",
              maxWidth: "520px",
              margin: "1.25rem auto 2.5rem",
              lineHeight: 1.75,
              fontWeight: 400,
            }}>
              Celebrating excellence and achievements in Science, Technology,
              Engineering, and Mathematics.
            </p>

            {/* Stat bar */}
            <div style={{
              display: "inline-flex",
              flexWrap: "wrap",
              border: "1px solid rgba(37, 99, 235,0.2)",
              background: "rgba(37, 99, 235,0.03)",
              borderRadius: "2px",
            }}>
              {[
                [String(awards2024.length), "Award Categories"],
                ["2024", "Edition"],
                ["Closed", "Applications"],
              ].map(([val, label], i, arr) => (
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
        <div style={{
          borderBottom: "1px solid rgba(100, 116, 139,0.1)",
          background: "rgba(37, 99, 235,0.03)",
          padding: "3rem 2rem",
          textAlign: "center",
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
            "Honouring those who demonstrated exceptional commitment to advancing
            STEM knowledge, education, and innovation throughout 2024."
          </p>
        </div>

        {/* ── AWARD CARDS ── */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem 6rem" }}>

          {/* Section label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              margin: 0,
              flexShrink: 0,
            }}>
              2024 Award Categories
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(100, 116, 139,0.15)", minWidth: "24px" }} />
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.6rem",
              color: "rgba(37, 99, 235,0.65)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
              flexShrink: 0,
            }}>
              {awards2024.length} Award{awards2024.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Cards grid */}
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gap: "1px",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              background: "rgba(100, 116, 139,0.1)",
              border: "1px solid rgba(100, 116, 139,0.1)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {awards2024.map((award, i) => (
              <div
                key={award.id}
                style={{
                  background: "#f8fafc",
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.65s ease ${i * 0.07}s, transform 0.65s ease ${i * 0.07}s`,
                }}
              >
                <AwardCard award={award} />
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING BANNER ── */}
        <section style={{
          background: "#0f172a",
          borderTop: "1px solid rgba(37, 99, 235,0.15)",
          padding: "4rem 2rem",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.65rem",
            color: "#2563eb",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            fontWeight: 600,
          }}>
            MathTech Thinking Foundation
          </div>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
            fontWeight: 700,
            color: "rgba(232,217,192,0.85)",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            lineHeight: 1.4,
            letterSpacing: "-0.015em",
          }}>
            Thank you to all 2024 nominees and recipients.
          </p>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <div style={{ width: "36px", height: "1px", background: "rgba(37, 99, 235,0.4)" }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(37, 99, 235,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>Awards · 2024</span>
            <div style={{ width: "36px", height: "1px", background: "rgba(37, 99, 235,0.4)" }} />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Awards2024;