
import React from "react";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
 
  :root {
    --mttf-primary: #2563eb;
    --mttf-primary-light: #60a5fa;
    --mttf-accent: #3b82f6;
    --mttf-charcoal: #0b1329;
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
    color: var(--mttf-primary-light);
    margin-bottom: 24px;
    background: rgba(37, 99, 235, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.15);
    padding: 6px 16px;
    border-radius: 9999px;
  }
 
  .hero-eyebrow-line {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--mttf-primary-light);
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
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    font-style: normal;
  }
 
  /* Ambient Rule */
  .hero-rule {
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.4), transparent);
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
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
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
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.25);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
 
  .hero-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
 
  .hero-btn-primary:hover {
    box-shadow: 0 6px 24px rgba(37, 99, 235, 0.4);
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
  }
`;
 
export default function MTTFHero() {
  return (
    <>
      <style>{styles}</style>
 
      <section className="relative h-screen w-full overflow-hidden">
 
        {/* Static Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80)`,
            }}
          />
 
          {/* Rich layered overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
 
          {/* Ambient neon radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
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
 
      </section>
    </>
  );
}
 