import { useState, useEffect, useRef } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const sections = [
  {
    id: 1,
    icon: "🌐",
    title: "Complex Challenges",
    subtitle: "Beyond Analytical Limits",
    body: "The present era is characterized by increasingly complex scientific and technological challenges. Computational science provides tools to simulate, model, and analyze complex systems — enabling researchers to understand and solve intricate problems that traditional analytical methods alone cannot address.",
    accent: "#C9A84C",
  },
  {
    id: 2,
    icon: "📊",
    title: "Big Data & Insights",
    subtitle: "Mining the Data Ocean",
    body: "We live in the era of big data — vast amounts generated across every field. Computational science handles and analyzes this data to extract meaningful insights, identify patterns, and drive informed decisions. Algorithms for processing and visualizing large datasets lead to valuable discoveries.",
    accent: "#C9A84C",
  },
  {
    id: 3,
    icon: "⚙️",
    title: "Optimization & Efficiency",
    subtitle: "Peak Performance by Design",
    body: "In a world where efficiency is paramount, computational science offers powerful tools to optimize processes, designs, and systems — from supply chains to energy grids and manufacturing. Computational methods identify optimal solutions, reduce costs, and maximize resource utilization.",
    accent: "#C9A84C",
  },
  {
    id: 4,
    icon: "🔮",
    title: "Prediction & Forecasting",
    subtitle: "Seeing Tomorrow, Today",
    body: "Computational models and simulations enable accurate prediction of diverse phenomena — weather patterns, financial trends, disease spread. These capabilities provide invaluable insights that aid in informed decision-making, policy planning, and proactive problem solving.",
    accent: "#C9A84C",
  },
  {
    id: 5,
    icon: "🤝",
    title: "Interdisciplinary Collaboration",
    subtitle: "Where Disciplines Converge",
    body: "The present era demands collaboration across disciplines. Computational science serves as common ground where researchers from diverse fields exchange ideas and leverage shared tools to solve multidisciplinary challenges — integrating knowledge and expertise for innovative solutions.",
    accent: "#C9A84C",
  },
  {
    id: 6,
    icon: "🚀",
    title: "Technological Advancements",
    subtitle: "Power Beyond Imagination",
    body: "Advances in computing power, algorithms, and software have vastly expanded computational capabilities. High-performance computing, parallel processing, and sophisticated algorithms now let researchers tackle problems and run simulations at scales previously considered unimaginable.",
    accent: "#C9A84C",
  },
  {
    id: 7,
    icon: "💡",
    title: "Innovation & Discovery",
    subtitle: "The Virtual Laboratory",
    body: "Computational science fosters innovation and drives breakthroughs. It lets researchers explore ideas, simulate scenarios, test hypotheses, and uncover patterns that lead to discoveries across fields. By accelerating experimentation, it propels scientific progress and technological innovation.",
    accent: "#C9A84C",
  },
];

// HexGrid recolored with warm gold tones
function HexGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const hexSize = 36;
    const hexW = hexSize * Math.sqrt(3);
    const hexH = hexSize * 2;

    function drawHex(x, y, size, opacity) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(201,168,76,${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.004;
      const cols = Math.ceil(canvas.width / hexW) + 2;
      const rows = Math.ceil(canvas.height / (hexH * 0.75)) + 2;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexW + (row % 2 === 0 ? 0 : hexW / 2);
          const y = row * hexH * 0.75;
          const dist = Math.sin(col * 0.3 + row * 0.5 + t) * 0.5 + 0.5;
          drawHex(x, y, hexSize - 2, dist * 0.1);
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function Card({ section, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#FEFCF7" : "#FAF8F2",
        border: `1px solid ${hovered ? "#C9A84C" : "#E8E0CC"}`,
        borderRadius: "4px",
        padding: "2.25rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-6px) scale(1.005)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 24px 48px rgba(139,109,56,0.14), 0 2px 8px rgba(139,109,56,0.08)"
          : "0 2px 12px rgba(139,109,56,0.04)",
        animationDelay: `${index * 0.09}s`,
        animation: "cardIn 0.65s cubic-bezier(0.23,1,0.32,1) both",
      }}
    >
      {/* Top gold bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: hovered ? "100%" : "0%",
          height: "2px",
          background: "linear-gradient(90deg, #C9A84C, #E8C96A, transparent)",
          transition: "width 0.45s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Bottom left accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: hovered ? "40%" : "0%",
          background: "linear-gradient(90deg, #C9A84C60, transparent)",
          transition: "width 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s",
        }}
      />

      {/* Clipped top-right corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "18px",
          height: "18px",
          background: hovered ? "#C9A84C" : "#E8DFC4",
          transition: "background 0.3s ease",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />

      {/* Card number - top right */}
      <div
        style={{
          position: "absolute",
          top: "1.1rem",
          right: "1.5rem",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.72rem",
          color: hovered ? "#8B6D38" : "#C4B08A",
          letterSpacing: "0.1em",
          fontWeight: 600,
          transition: "color 0.3s",
        }}
      >
        {String(section.id).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div
        style={{
          width: "52px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          background: hovered ? "#FDF5E0" : "#F5EFD8",
          border: "1px solid #E8D89A",
          borderRadius: "4px",
          marginBottom: "1.25rem",
          transition: "all 0.3s ease",
          transform: hovered ? "rotate(6deg) scale(1.08)" : "rotate(0deg) scale(1)",
          boxShadow: hovered ? "0 4px 16px rgba(201,168,76,0.2)" : "none",
        }}
      >
        {section.icon}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem",
          color: "#C9A84C",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: "0.35rem",
          opacity: hovered ? 1 : 0.75,
          transition: "opacity 0.3s",
        }}
      >
        {section.subtitle}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.45rem",
          fontWeight: 700,
          color: "#1C1208",
          margin: "0 0 0.9rem",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {section.title}
      </h3>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: hovered
            ? "linear-gradient(90deg, #C9A84C50, transparent)"
            : "#EDE4CC",
          marginBottom: "0.9rem",
          transition: "background 0.3s",
        }}
      />

      {/* Body */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#6B5C3E",
          lineHeight: 1.8,
          margin: 0,
          fontWeight: 300,
        }}
      >
        {section.body}
      </p>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,700;0,900;1,600;1,700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F7F3EA", color: "#1C1208" }}
    >
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGold {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scanGold {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F7F3EA; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }

        .luxury-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          background: #1C1208;
          color: #F7F3EA;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid #1C1208;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.35s ease;
          text-decoration: none;
        }
        .luxury-cta:hover {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(201,168,76,0.28);
        }

        .metric-cell {
          padding: 1.6rem 2.5rem;
          text-align: center;
          flex: 1 1 140px;
          position: relative;
        }
        .metric-cell:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 30px;
          width: 1px;
          background: #D8CBA8;
        }
      `}</style>

      <Header />

      {/* Subtle gold scanline */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
          animation: "scanGold 8s linear infinite",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <main className="flex-grow" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* ── Hero Section ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "7rem 2rem 5rem",
            textAlign: "center",
            background:
              "linear-gradient(158deg, #F7F3EA 0%, #EDE5CC 55%, #E4D5A8 100%)",
            borderBottom: "1px solid #D8CBA8",
          }}
        >
          <HexGrid />

          {/* Radial warm glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "700px",
              height: "420px",
              background:
                "radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Decorative corner brackets */}
          {[
            { top: "1.8rem", left: "1.8rem", borderTop: "1px solid #C9A84C", borderLeft: "1px solid #C9A84C" },
            { top: "1.8rem", right: "1.8rem", borderTop: "1px solid #C9A84C", borderRight: "1px solid #C9A84C" },
            { bottom: "1.8rem", left: "1.8rem", borderBottom: "1px solid #C9A84C", borderLeft: "1px solid #C9A84C" },
            { bottom: "1.8rem", right: "1.8rem", borderBottom: "1px solid #C9A84C", borderRight: "1px solid #C9A84C" },
          ].map((style, i) => (
            <div
              key={i}
              style={{ position: "absolute", width: 52, height: 52, opacity: 0.5, ...style }}
            />
          ))}

          <div
            style={{
              position: "relative",
              zIndex: 1,
              animation: "heroIn 0.9s cubic-bezier(0.23,1,0.32,1) both",
            }}
          >
            {/* Date badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "2px",
                padding: "0.4rem 1.2rem",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#C9A84C",
                  display: "inline-block",
                  animation: "pulseGold 2s ease infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  color: "#8B6D38",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Wed Mar 25, 2026
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                marginBottom: "1.25rem",
                color: "#1C1208",
              }}
            >
              Why{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #C9A84C 0%, #8B6D38 40%, #E8C96A 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                Computational
              </span>
              <br />
              Science{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#C4B08A",
                  fontSize: "clamp(1.5rem, 4vw, 2.9rem)",
                }}
              >
                Matters
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#6B5C3E",
                maxWidth: "520px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.75,
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              From big data to breakthroughs — how computational science powers the
              present era of discovery, optimization, and interdisciplinary innovation.
            </p>

            <a href="#pillars" className="luxury-cta">
              Explore All Pillars
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Gold Divider ── */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #C9A84C70, transparent)",
          }}
        />

        {/* ── Metrics Strip ── */}
        <div
          style={{
            background: "#FEFCF5",
            borderBottom: "1px solid #E8DFC4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            ["07", "Pillars of Impact"],
            ["∞", "Data Generated"],
            ["2026", "Publication Date"],
            ["01", "Common Ground"],
          ].map(([val, label]) => (
            <div className="metric-cell" key={label}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.2rem",
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  color: "#9C8B6E",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Intro Text ── */}
        <div
          style={{
            maxWidth: "720px",
            margin: "4.5rem auto 0",
            padding: "0 2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                flex: 1,
                maxWidth: "80px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #C9A84C)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                color: "#C9A84C",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Editorial
            </span>
            <span
              style={{
                flex: 1,
                maxWidth: "80px",
                height: "1px",
                background: "linear-gradient(90deg, #C9A84C, transparent)",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.25rem",
              color: "#3D2E14",
              lineHeight: 1.75,
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Computational science holds{" "}
            <span
              style={{
                color: "#C9A84C",
                fontStyle: "normal",
                fontWeight: 700,
              }}
            >
              significant importance
            </span>{" "}
            in the present era — a key enabler of scientific progress, innovation,
            and informed decision-making in today's rapidly evolving world.
          </p>
        </div>

        {/* ── Section Header ── */}
        <div
          id="pillars"
          style={{
            maxWidth: "1200px",
            margin: "4rem auto 0",
            padding: "0 2rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                color: "#C9A84C",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: "0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "22px",
                  height: "1px",
                  background: "#C9A84C",
                }}
              />
              Seven Pillars
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 700,
                color: "#1C1208",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Why It Matters,{" "}
              <span style={{ fontStyle: "italic", color: "#8B6D38" }}>
                Precisely Defined
              </span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              color: "#6B5C3E",
              maxWidth: "340px",
              lineHeight: 1.78,
              margin: 0,
              fontWeight: 300,
            }}
          >
            A structured exploration of the core reasons computational science
            shapes modern research, industry, and global progress.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2.5rem 2rem 7rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {sections.map((section, i) => (
            <Card key={section.id} section={section} index={i} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}