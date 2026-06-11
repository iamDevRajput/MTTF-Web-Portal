import { useState, useEffect, useRef } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const sections = [
  {
    id: 1,
    icon: "⚡",
    title: "Computational Power",
    subtitle: "The Engine of Intelligence",
    body: "AI and ML algorithms require substantial computational power to process large datasets, train complex models, and make accurate predictions. High-performance resources—including GPUs and TPUs—are essential for handling these demanding tasks.",
    accent: "#C9A84C",
  },
  {
    id: 2,
    icon: "🗄️",
    title: "Data Processing",
    subtitle: "Turning Raw Into Refined",
    body: "AI and ML rely on extensive data processing and analysis. Computing enables efficient preprocessing, cleaning, and transformation of raw data. Parallel processing and distributed computing handle large-scale tasks with speed and precision.",
    accent: "#C9A84C",
  },
  {
    id: 3,
    icon: "🧠",
    title: "Model Training",
    subtitle: "Learning Through Iteration",
    body: "Training AI and ML models involves iterative computations and optimizations. Techniques like gradient descent, backpropagation, and stochastic optimization rely heavily on computational power to update model parameters and minimize errors.",
    accent: "#C9A84C",
  },
  {
    id: 4,
    icon: "🔬",
    title: "Deep Learning",
    subtitle: "Layers of Intelligence",
    body: "Deep Learning uses neural networks with multiple layers, requiring extensive resources for forward and backward passes, gradient computation, and weight updates. High-performance computing enables faster training and breakthroughs across domains.",
    accent: "#C9A84C",
  },
  {
    id: 5,
    icon: "⚙️",
    title: "Real-Time Inference",
    subtitle: "Thinking at the Speed of Now",
    body: "AI and ML models must make predictions in real-time. Computing resources enable efficient deployment for rapid decision-making in image recognition, NLP, autonomous vehicles, and recommendation systems.",
    accent: "#C9A84C",
  },
  {
    id: 6,
    icon: "🔧",
    title: "Algorithm Optimization",
    subtitle: "Refining the Edge",
    body: "Computing facilitates development and optimization of AI algorithms. Researchers fine-tune models, explore hyperparameter spaces, and conduct experiments to enhance performance, increase accuracy, and reduce computational complexity.",
    accent: "#C9A84C",
  },
  {
    id: 7,
    icon: "☁️",
    title: "Scalability & Deployment",
    subtitle: "From Lab to the World",
    body: "Cloud computing and distributed systems allow flexible, scalable deployment of AI/ML applications. Organizations handle increasing workloads, adapt to changing demands, and deploy solutions in production environments at any scale.",
    accent: "#C9A84C",
  },
];

// Keep original particle canvas, just retheme colors to warm gold
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.4,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });
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
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 48px rgba(139,109,56,0.14), 0 2px 8px rgba(139,109,56,0.08)"
          : "0 2px 12px rgba(139,109,56,0.05)",
        animationDelay: `${index * 0.08}s`,
        animation: "fadeSlideIn 0.6s ease both",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: hovered ? "100%" : "0%",
          height: "2px",
          background: "linear-gradient(90deg, #C9A84C, #E8C96A)",
          transition: "width 0.45s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Left accent border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: hovered ? "100%" : "0%",
          background: "linear-gradient(180deg, #C9A84C, transparent)",
          transition: "height 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Number label */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.7rem",
          fontWeight: 600,
          color: "#C9A84C",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: hovered ? "#C9A84C" : "transparent",
            border: "1px solid #C9A84C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.65rem",
            color: hovered ? "#fff" : "#C9A84C",
            transition: "all 0.3s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {String(section.id).padStart(2, "0")}
        </span>
        {section.subtitle}
      </div>

      {/* Icon + Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            background: hovered ? "#FDF5E0" : "#F5EFD8",
            border: "1px solid #E8D89A",
            borderRadius: "4px",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1)",
          }}
        >
          {section.icon}
        </span>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.45rem",
            fontWeight: 700,
            color: "#1C1208",
            margin: 0,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            paddingTop: "0.1rem",
          }}
        >
          {section.title}
        </h3>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: hovered
            ? "linear-gradient(90deg, #C9A84C40, transparent)"
            : "#E8E0CC",
          marginBottom: "1rem",
          transition: "background 0.3s ease",
        }}
      />

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#6B5C3E",
          lineHeight: 1.8,
          margin: 0,
          fontWeight: 400,
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
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F7F3EA", color: "#1C1208" }}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGold {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F7F3EA; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }

        .luxury-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          background: #1C1208;
          color: #F7F3EA;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid #1C1208;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .luxury-btn:hover {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(201,168,76,0.3);
        }

        .stat-item {
          text-align: center;
          padding: 0 2rem;
          position: relative;
        }
        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 32px;
          width: 1px;
          background: #D8CBA8;
        }
      `}</style>

      <Header />

      <main className="flex-grow">
        {/* ── Hero Section ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "7rem 2rem 5rem",
            textAlign: "center",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(160deg, #F7F3EA 0%, #EDE5CC 60%, #E5D8AD 100%)",
          }}
        >
          <ParticleCanvas />

          {/* Subtle grain texture overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
              pointerEvents: "none",
              opacity: 0.4,
            }}
          />

          {/* Decorative corner lines */}
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              width: "60px",
              height: "60px",
              borderTop: "1px solid #C9A84C",
              borderLeft: "1px solid #C9A84C",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              width: "60px",
              height: "60px",
              borderTop: "1px solid #C9A84C",
              borderRight: "1px solid #C9A84C",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              width: "60px",
              height: "60px",
              borderBottom: "1px solid #C9A84C",
              borderLeft: "1px solid #C9A84C",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
              width: "60px",
              height: "60px",
              borderBottom: "1px solid #C9A84C",
              borderRight: "1px solid #C9A84C",
              opacity: 0.5,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              animation: "headerIn 0.9s ease both",
            }}
          >
            {/* Eyebrow label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "2px",
                padding: "0.4rem 1.25rem",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  animation: "pulseGold 2.5s ease infinite",
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  background: "#C9A84C",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  color: "#8B6D38",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Mar 25, 2026 &nbsp;·&nbsp; Computing in AI & ML
              </span>
              <span
                style={{
                  animation: "pulseGold 2.5s ease infinite 1.2s",
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  background: "#C9A84C",
                  borderRadius: "50%",
                }}
              />
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
                color: "#1C1208",
              }}
            >
              Computing at the
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #8B6D38 40%, #E8C96A 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                  fontStyle: "italic",
                }}
              >
                Heart of Tomorrow
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#6B5C3E",
                maxWidth: "520px",
                lineHeight: 1.75,
                margin: "0 auto 2.5rem",
                fontWeight: 300,
              }}
            >
              Exploring how computational power, data infrastructure, and intelligent
              systems converge to drive the next wave of AI breakthroughs.
            </p>

            <a href="#pillars" className="luxury-btn">
              Explore All Pillars
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Thin Gold Divider ── */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C60, transparent)" }} />

        {/* ── Stats Bar ── */}
        <div
          style={{
            background: "#FEFCF5",
            borderBottom: "1px solid #E8DFC4",
            padding: "1.75rem 2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
            flexWrap: "wrap",
          }}
        >
          {[
            ["7", "Core Pillars"],
            ["∞", "Possibilities"],
            ["2026", "Updated"],
          ].map(([val, label]) => (
            <div className="stat-item" key={label}>
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
                  fontSize: "0.62rem",
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

        {/* ── Section Header ── */}
        <div
          id="pillars"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "5rem 2rem 0",
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
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                color: "#C9A84C",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "#C9A84C" }} />
              Core Framework
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
              Seven Pillars of AI<br />
              <span style={{ fontStyle: "italic", color: "#8B6D38" }}>Computing Excellence</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "#6B5C3E",
              maxWidth: "340px",
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 300,
            }}
          >
            A comprehensive overview of the foundational technologies enabling modern
            artificial intelligence and machine learning systems.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "3rem 2rem 7rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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