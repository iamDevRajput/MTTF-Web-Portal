import React, { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --brand-indigo: #6366f1;
    --brand-indigo-light: #818cf8;
    --brand-violet: #8b5cf6;
    --charcoal: #090d16;
  }

  /* Slide ken-burns */
  @keyframes kenBurns {
    0%   { transform: scale(1); }
    100% { transform: scale(1.06); }
  }

  .hero-slide-active {
    animation: kenBurns 7s ease-in-out forwards;
  }

  /* Fade up entrance */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-fade-1 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
  .hero-fade-2 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
  .hero-fade-3 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
  .hero-fade-4 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }
  .hero-fade-5 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }

  /* Eyebrow label */
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--brand-indigo-light);
    margin-bottom: 24px;
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.15);
    padding: 6px 16px;
    border-radius: 9999px;
  }

  .hero-eyebrow-line {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--brand-indigo-light);
    opacity: 0.8;
  }

  /* Headline */
  .hero-headline {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(38px, 6.5vw, 76px);
    font-weight: 800;
    line-height: 1.12;
    color: #fff;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .hero-headline-accent {
    background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    font-style: normal;
  }

  /* Ambient Rule */
  .hero-rule {
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent);
    margin: 20px auto;
  }

  /* Badge row */
  .hero-badge-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .hero-badge {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: rgba(255,255,255,0.9);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 6px 16px;
    border-radius: 9999px;
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
  }

  .hero-badge:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  .hero-badge-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
  }

  /* Subheading */
  .hero-sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(15px, 1.8vw, 18px);
    font-weight: 400;
    color: #94a3b8;
    max-width: 640px;
    margin: 0 auto 36px;
    line-height: 1.625;
    letter-spacing: -0.01em;
  }

  /* CTA group */
  .hero-cta-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hero-btn-primary:hover {
    box-shadow: 0 6px 24px rgba(99, 102, 241, 0.4);
    transform: translateY(-2px);
  }

  .hero-btn-primary:hover::before { opacity: 1; }
  .hero-btn-primary span, .hero-btn-primary svg { position: relative; z-index: 1; }
  .hero-btn-primary svg { transition: transform 0.2s ease; }
  .hero-btn-primary:hover svg { transform: translateX(3px); }

  .hero-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 30px;
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 9999px;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  /* Slide indicators */
  .hero-indicators {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 20;
  }

  .hero-indicator {
    height: 4px;
    background: rgba(255, 255, 255, 0.25);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    width: 12px;
    border-radius: 9999px;
  }

  .hero-indicator.active {
    background: var(--brand-indigo-light);
    width: 32px;
  }

  /* Slide counter */
  .hero-counter {
    position: absolute;
    bottom: 40px;
    right: 48px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.05em;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hero-counter-current {
    color: var(--brand-indigo-light);
    font-size: 15px;
    font-weight: 700;
  }

  /* Vertical label */
  .hero-vertical-label {
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    transform-origin: center center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.25);
    z-index: 20;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .hero-vertical-label { display: none; }
    .hero-counter { display: none; }
  }
`;

const images = [
  // AI / neural network / futuristic technology
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2000&q=80",
  // data analytics / dashboard / business intelligence
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
  // modern software development workspace
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80",
  // abstract glowing digital network / tech lines
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80",
  // innovation / research / futuristic concept (mathematics / scientific visualization)
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=2000&q=80",
];

export default function MTTFHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // slide every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section className="relative h-screen w-full overflow-hidden">

        {/* Background Slider */}
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out
                ${index === current ? `opacity-100 hero-slide-active` : "opacity-0"}
              `}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}

          {/* Rich layered overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
          
          {/* Ambient neon radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Vertical label */}
        <div className="hero-vertical-label">MathTech Thinking Foundation</div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div style={{ maxWidth: "860px", textAlign: "center" }}>

            {/* Eyebrow */}
            <div className="hero-eyebrow hero-fade-1">
              <span className="hero-eyebrow-line" />
              Est. Foundation
              <span className="hero-eyebrow-line" />
            </div>

            {/* Headline */}
            <h1 className="hero-headline hero-fade-2">
              MathTech Thinking <br />
              <span className="hero-headline-accent">Foundation</span>
            </h1>

            {/* Gold rule */}
            <div className="hero-rule hero-fade-3" />

            {/* Badge row */}
            <div className="hero-badge-row hero-fade-3">
              <span className="hero-badge">Udyam-Registered MSME</span>
              <span className="hero-badge-dot" />
              <span className="hero-badge">Section 8</span>
              <span className="hero-badge-dot" />
              <span className="hero-badge">12AB</span>
            </div>

            {/* Subheading */}
            <p className="hero-sub hero-fade-4">
              An international educational foundation empowering learners and
              professionals through Science, Technology, Engineering, and Mathematics.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group hero-fade-5">
              <button className="hero-btn-primary">
                <span>Explore Programs</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5H12M7.5 2L12 6.5L7.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="hero-btn-secondary">
                Contact Us
              </button>
            </div>

          </div>
        </div>

        {/* Slide counter */}
        <div className="hero-counter">
          <span className="hero-counter-current">0{current + 1}</span>
          <span style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
          <span>0{images.length}</span>
        </div>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {images.map((_, i) => (
            <div
              key={i}
              className={`hero-indicator${i === current ? " active" : ""}`}
            />
          ))}
        </div>

      </section>
    </>
  );
}