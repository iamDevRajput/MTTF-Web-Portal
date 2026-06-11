import { useState, useEffect, useRef } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const paragraphs = [
  {
    id: 1,
    icon: "🔬",
    tag: "Definition",
    title: "What is Computational Science?",
    body: "Computational science, also known as scientific computing, is a multidisciplinary field that utilizes computer simulations, modeling, and data analysis to solve complex problems in science, engineering, and other domains. It combines elements of mathematics, computer science, and specific scientific disciplines to develop algorithms, software, and computational models.",
    accent: "#8B6914",
    highlight: "multidisciplinary field",
  },
  {
    id: 2,
    icon: "🧮",
    tag: "Methodology",
    title: "How Researchers Work",
    body: "In computational science, researchers use computational tools and techniques to simulate and analyze systems that are too complex or impractical to study through traditional analytical approaches. By leveraging computational power, scientists can explore a wide range of scenarios, analyze large datasets, and make predictions or gain insights into complex phenomena.",
    accent: "#5C7A2E",
    highlight: "leveraging computational power",
  },
  {
    id: 3,
    icon: "🌍",
    tag: "Applications",
    title: "Across Every Domain",
    body: "Computational science has numerous applications across various fields. It plays a critical role in areas such as physics, chemistry, biology, engineering, finance, climate modeling, drug discovery, and more. It enables researchers to conduct virtual experiments, optimize processes, analyze and visualize large datasets, and make data-driven decisions.",
    accent: "#9B4A1A",
    highlight: "physics, chemistry, biology",
  },
  {
    id: 4,
    icon: "⚡",
    tag: "Infrastructure",
    title: "Built on Power & Precision",
    body: "The field of computational science relies on the development of efficient algorithms, mathematical models, and computational techniques. High-performance computing (HPC) systems and advanced software tools are utilized to execute complex simulations and handle large-scale computational tasks.",
    accent: "#6B3D8A",
    highlight: "High-performance computing",
  },
  {
    id: 5,
    icon: "🏆",
    tag: "Impact",
    title: "Driving Innovation Forward",
    body: "Through computational science, researchers can tackle complex problems, gain a deeper understanding of natural phenomena, make predictions, optimize designs, and contribute to scientific advancements. It offers a powerful and versatile set of tools that enhance research capabilities, promote interdisciplinary collaboration, and drive innovation in diverse domains.",
    accent: "#1A6B4A",
    highlight: "interdisciplinary collaboration",
  },
];

const disciplines = [
  "Physics", "Chemistry", "Biology", "Engineering",
  "Finance", "Climate Modeling", "Drug Discovery", "Mathematics",
  "Computer Science", "Data Analysis", "Simulations", "HPC",
];

function OrbitCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId, t = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;

    const rings = [
      { radius: 90, speed: 0.004, nodes: 6, color: "#B8960C" },
      { radius: 145, speed: -0.003, nodes: 9, color: "#7A9B3A" },
      { radius: 195, speed: 0.002, nodes: 12, color: "#9B6B2A" },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.arc(cx(), cy(), ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}25`;
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < ring.nodes; i++) {
          const angle = (Math.PI * 2 * i) / ring.nodes + t * ring.speed;
          const nx = cx() + ring.radius * Math.cos(angle);
          const ny = cy() + ring.radius * Math.sin(angle);

          ctx.beginPath();
          ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = ring.color;
          ctx.globalAlpha = 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.moveTo(cx(), cy());
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = `${ring.color}15`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      const gradient = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), 30);
      gradient.addColorStop(0, "rgba(184,150,12,0.35)");
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx(), cy(), 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx(), cy(), 8, 0, Math.PI * 2);
      ctx.fillStyle = "#B8960C";
      ctx.globalAlpha = 0.75;
      ctx.fill();
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
  );
}

function ParagraphCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: isEven ? "auto 1fr" : "1fr auto",
        gap: "2rem",
        alignItems: "flex-start",
        padding: "2.5rem",
        background: hovered ? `${item.accent}10` : "transparent",
        borderLeft: isEven ? `3px solid ${hovered ? item.accent : "rgba(100,75,20,0.15)"}` : "3px solid transparent",
        borderRight: !isEven ? `3px solid ${hovered ? item.accent : "rgba(100,75,20,0.15)"}` : "3px solid transparent",
        borderTop: "1px solid rgba(100,75,20,0.1)",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        cursor: "default",
        animationDelay: `${index * 0.12}s`,
        animation: "slideIn 0.7s cubic-bezier(0.23,1,0.32,1) both",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        [isEven ? "right" : "left"]: "-0.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Playfair Display', serif",
        fontSize: "8rem",
        fontWeight: 900,
        color: `${item.accent}10`,
        lineHeight: 1,
        userSelect: "none",
        transition: "color 0.3s",
      }}>
        {String(item.id).padStart(2, "0")}
      </div>

      {isEven && (
        <div style={{
          width: "64px",
          height: "64px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          background: `${item.accent}12`,
          border: `1px solid ${item.accent}40`,
          transition: "all 0.35s",
          transform: hovered ? "scale(1.12) rotate(-6deg)" : "scale(1)",
          boxShadow: hovered ? `0 0 24px ${item.accent}30` : "none",
        }}>
          {item.icon}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexDirection: isEven ? "row" : "row-reverse" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.65rem",
            color: item.accent,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.2rem 0.6rem",
            border: `1px solid ${item.accent}40`,
            background: `${item.accent}08`,
            fontWeight: 600,
          }}>
            {item.tag}
          </span>
          <span style={{
            width: "32px",
            height: "1px",
            background: `${item.accent}50`,
            display: "inline-block",
          }} />
        </div>

        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "#1C150A",
          margin: "0 0 0.85rem",
          letterSpacing: "-0.02em",
          textAlign: isEven ? "left" : "right",
        }}>
          {item.title}
        </h3>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.05rem",
          color: "rgba(40,28,8,0.62)",
          lineHeight: 1.85,
          margin: 0,
          textAlign: isEven ? "left" : "right",
        }}>
          {item.body.split(item.highlight).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span style={{ color: item.accent, fontWeight: 600 }}>{item.highlight}</span>
              </span>
            ) : part
          )}
        </p>
      </div>

      {!isEven && (
        <div style={{
          width: "64px",
          height: "64px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          background: `${item.accent}12`,
          border: `1px solid ${item.accent}40`,
          transition: "all 0.35s",
          transform: hovered ? "scale(1.12) rotate(6deg)" : "scale(1)",
          boxShadow: hovered ? `0 0 24px ${item.accent}30` : "none",
        }}>
          {item.icon}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F5EDD6", color: "#1C150A" }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: scale(0.97) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes tagFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F5EDD6; }
        ::-webkit-scrollbar-thumb { background: #B8960C; }
      `}</style>

      <Header />

      <main className="flex-grow" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {/* Hero */}
        <div style={{
          position: "relative",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 2rem 3rem",
          textAlign: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(184,150,12,0.18)",
          background: "linear-gradient(160deg, #F5EDD6 0%, #EDE0B8 50%, #F0E8CC 100%)",
        }}>
          <OrbitCanvas />

          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(184,150,12,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, animation: "heroFade 0.9s cubic-bezier(0.23,1,0.32,1) both" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(184,150,12,0.08)",
              border: "1px solid rgba(184,150,12,0.28)",
              padding: "0.4rem 1.1rem",
              marginBottom: "2rem",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                color: "#8B6914",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>
                Note · Mar 25, 2026
              </span>
              <span style={{ width: 4, height: 4, background: "#B8960C", borderRadius: "50%", display: "inline-block" }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                color: "rgba(139,105,20,0.55)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>Scientific Computing</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 6.5vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}>
              <span style={{ color: "#1C150A" }}>Note on</span>
              <br />
              <span style={{
                background: "linear-gradient(110deg, #8B6914 0%, #5C7A2E 50%, #9B4A1A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Computational
              </span>
              <br />
              <span style={{ color: "#1C150A" }}>Science</span>
            </h1>

            <div style={{
              fontStyle: "italic",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.15rem",
              color: "rgba(40,28,8,0.45)",
              marginTop: "1.25rem",
              letterSpacing: "0.01em",
            }}>
              Revolutionizing Research with Computational Precision
            </div>
          </div>
        </div>

        {/* Discipline Tags */}
        <div style={{
          padding: "2rem",
          borderBottom: "1px solid rgba(100,75,20,0.1)",
          background: "rgba(184,150,12,0.03)",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.62rem",
            color: "rgba(40,28,8,0.3)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            textAlign: "center",
            fontWeight: 600,
          }}>
            Domains & Disciplines
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
            {disciplines.map((d, i) => {
              const colors = ["#8B6914", "#5C7A2E", "#9B4A1A", "#6B3D8A", "#1A6B4A"];
              const color = colors[i % colors.length];
              const isActive = activeTag === d;
              return (
                <button
                  key={d}
                  onClick={() => setActiveTag(isActive ? null : d)}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.7rem",
                    color: isActive ? "#F5EDD6" : color,
                    background: isActive ? color : `${color}10`,
                    border: `1px solid ${color}50`,
                    padding: "0.3rem 0.85rem",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "all 0.25s",
                    fontWeight: 600,
                    animation: `tagFloat ${2 + i * 0.15}s ease-in-out infinite`,
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem 6rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "2rem 1.5rem 1rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(100,75,20,0.12)" }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.65rem",
              color: "rgba(40,28,8,0.3)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}>
              05 Key Sections
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(100,75,20,0.12)" }} />
          </div>

          {paragraphs.map((item, i) => (
            <ParagraphCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Summary Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(184,150,12,0.12) 0%, rgba(92,122,46,0.09) 50%, rgba(155,74,26,0.12) 100%)",
          borderTop: "1px solid rgba(184,150,12,0.18)",
          borderBottom: "1px solid rgba(184,150,12,0.18)",
          padding: "3rem 2rem",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 3vw, 1.7rem)",
            fontWeight: 700,
            color: "rgba(28,21,10,0.82)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
          }}>
            "A powerful and versatile set of tools that{" "}
            <span style={{ color: "#8B6914" }}>enhance research capabilities</span>,{" "}
            promote{" "}
            <span style={{ color: "#5C7A2E" }}>interdisciplinary collaboration</span>, and drive{" "}
            <span style={{ color: "#9B4A1A" }}>innovation in diverse domains</span>."
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}