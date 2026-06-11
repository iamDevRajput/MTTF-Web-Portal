import React, { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --gold-pale: rgba(201,168,76,0.15);
    --cream: #FAF8F3;
    --charcoal: #1C1A17;
  }

  /* Slide ken-burns */
  @keyframes kenBurns {
    0%   { transform: scale(1); }
    100% { transform: scale(1.08); }
  }

  .hero-slide-active {
    animation: kenBurns 7s ease-in-out forwards;
  }

  /* Fade up entrance */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-fade-1 { animation: fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s both; }
  .hero-fade-2 { animation: fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.45s both; }
  .hero-fade-3 { animation: fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.65s both; }
  .hero-fade-4 { animation: fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.85s both; }
  .hero-fade-5 { animation: fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) 1.05s both; }

  /* Eyebrow label */
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 28px;
  }

  .hero-eyebrow-line {
    display: block;
    width: 36px;
    height: 1px;
    background: var(--gold);
    opacity: 0.7;
  }

  /* Headline */
  .hero-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 7vw, 88px);
    font-weight: 300;
    line-height: 1.08;
    color: #fff;
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  .hero-headline-accent {
    font-style: italic;
    color: var(--gold-light);
    font-weight: 400;
  }

  /* Gold rule */
  .hero-rule {
    width: 64px;
    height: 1px;
    background: var(--gold);
    margin: 28px auto;
    opacity: 0.6;
  }

  /* Badge row */
  .hero-badge-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .hero-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-light);
    border: 1px solid rgba(201,168,76,0.35);
    padding: 5px 14px;
    opacity: 0.9;
  }

  .hero-badge-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(201,168,76,0.4);
  }

  /* Subheading */
  .hero-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(15px, 1.8vw, 18px);
    font-weight: 300;
    color: rgba(255,255,255,0.72);
    max-width: 680px;
    margin: 0 auto 48px;
    line-height: 1.75;
    letter-spacing: 0.01em;
  }

  /* CTA group */
  .hero-cta-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .hero-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: var(--gold);
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  .hero-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold-light);
    transform: translateX(-101%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  .hero-btn-primary:hover::before { transform: translateX(0); }
  .hero-btn-primary span, .hero-btn-primary svg { position: relative; z-index: 1; }
  .hero-btn-primary svg { transition: transform 0.3s ease; }
  .hero-btn-primary:hover svg { transform: translateX(3px); }

  .hero-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 30px;
    background: transparent;
    color: rgba(255,255,255,0.85);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.35);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  .hero-btn-secondary:hover {
    border-color: var(--gold);
    color: var(--gold-light);
  }

  /* Slide indicators */
  .hero-indicators {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 20;
  }

  .hero-indicator {
    height: 1px;
    background: rgba(255,255,255,0.3);
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    cursor: pointer;
    width: 24px;
  }

  .hero-indicator.active {
    background: var(--gold);
    width: 48px;
  }

  /* Slide counter */
  .hero-counter {
    position: absolute;
    bottom: 40px;
    right: 48px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.1em;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hero-counter-current {
    color: var(--gold-light);
    font-size: 16px;
  }

  /* Vertical label */
  .hero-vertical-label {
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    transform-origin: center center;
    font-family: 'DM Sans', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    z-index: 20;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .hero-vertical-label { display: none; }
    .hero-counter { display: none; }
  }
`;

const images = [
  // AI & ML
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2000&q=80",
  // Data Science
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
  // Mathematics
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=2000&q=80",
  // Programming / Technology
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
  // Research & Innovation
  "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?auto=format&fit=crop&w=2000&q=80",
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