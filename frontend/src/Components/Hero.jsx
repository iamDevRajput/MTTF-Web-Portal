//OPTION 1 NODE

import React from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --mttf-primary: #2563eb;
    --mttf-primary-light: #2563eb;
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

  /* Network pulse for nodes */
  @keyframes nodePulse {
    0%, 100% { opacity: 0.55; }
    50%      { opacity: 1; }
  }

  /* Slow drifting rotation for the outer node ring */
  @keyframes networkDrift {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .hero-network-rotate {
    animation: networkDrift 120s linear infinite;
    transform-origin: 720px 450px;
  }

  .hero-network-node {
    animation: nodePulse 3.4s ease-in-out infinite;
  }

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
    color: #2563eb;
    margin-bottom: 24px;
    background: #eef4ff;
    border: 1px solid rgba(37, 99, 235, 0.18);
    padding: 6px 16px;
    border-radius: 9999px;
  }

  .hero-eyebrow-line {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2563eb;
    opacity: 0.7;
  }

  /* Headline */
  .hero-headline {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(38px, 6.5vw, 76px);
    font-weight: 800;
    line-height: 1.12;
    color: #0b1329;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .hero-headline-accent {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    font-style: normal;
  }

  /* Ambient Rule */
  .hero-rule {
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.35), transparent);
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
    color: #1e3a6e;
    background: #f1f6ff;
    border: 1px solid rgba(37, 99, 235, 0.16);
    padding: 6px 16px;
    border-radius: 9999px;
    transition: all 0.3s ease;
  }

  .hero-badge:hover {
    background: #e3edfe;
    border-color: rgba(37, 99, 235, 0.3);
    transform: translateY(-1px);
  }

  .hero-badge-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.3);
  }

  /* Subheading */
  .hero-sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(15px, 1.8vw, 18px);
    font-weight: 400;
    color: #475569;
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
    background: #ffffff;
    color: #0b1329;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    border: 1px solid rgba(11, 19, 41, 0.15);
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-btn-secondary:hover {
    background: #f8fafc;
    border-color: rgba(11, 19, 41, 0.28);
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
    color: rgba(11, 19, 41, 0.22);
    z-index: 20;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .hero-vertical-label { display: none; }
    .hero-network-rotate { animation: none; }
  }
`;

export default function MTTFHero() {
  return (
    <>
      <style>{styles}</style>

      <section className="relative h-screen w-full overflow-hidden">

        {/* Digital STEM Network background */}
        <div className="absolute inset-0 bg-white">

          {/* Base wash, near-white with a whisper of blue at the edges */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 45%, #ffffff 0%, #f6f9ff 60%, #eef4fd 100%)",
            }}
          />

          {/* Full network graph */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1440 900"
          >
            <defs>
              <radialGradient id="node-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.15" />
              </radialGradient>
              <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(37,99,235,0.16)" />
                <stop offset="60%" stopColor="rgba(37,99,235,0.05)" />
                <stop offset="100%" stopColor="rgba(37,99,235,0)" />
              </radialGradient>
            </defs>

            {/* Ambient hub glow centered behind the headline */}
            <circle cx="720" cy="430" r="420" fill="url(#hub-glow)" />

            {/* ---- Static long-range connector lines (full network, fixed) ---- */}
            <g stroke="rgba(37,99,235,0.16)" strokeWidth="1" fill="none">
              <line x1="120" y1="140" x2="430" y2="260" />
              <line x1="430" y1="260" x2="300" y2="470" />
              <line x1="300" y1="470" x2="120" y2="140" />
              <line x1="430" y1="260" x2="720" y2="200" />
              <line x1="720" y1="200" x2="1020" y2="260" />
              <line x1="1020" y1="260" x2="1310" y2="150" />
              <line x1="1020" y1="260" x2="1150" y2="460" />
              <line x1="1150" y1="460" x2="1310" y2="700" />
              <line x1="1150" y1="460" x2="980" y2="640" />
              <line x1="980" y1="640" x2="720" y2="720" />
              <line x1="720" y1="720" x2="450" y2="660" />
              <line x1="450" y1="660" x2="260" y2="780" />
              <line x1="450" y1="660" x2="300" y2="470" />
              <line x1="720" y1="200" x2="720" y2="430" />
              <line x1="720" y1="430" x2="980" y2="640" />
              <line x1="720" y1="430" x2="450" y2="660" />
              <line x1="720" y1="430" x2="300" y2="470" />
              <line x1="720" y1="430" x2="1150" y2="460" />
              <line x1="120" y1="780" x2="260" y2="780" />
              <line x1="1310" y1="150" x2="1380" y2="380" />
              <line x1="1380" y1="380" x2="1150" y2="460" />
            </g>

            {/* ---- Slowly rotating outer node ring, adds quiet life without distracting ---- */}
            <g className="hero-network-rotate" stroke="rgba(59,130,246,0.14)" strokeWidth="1" fill="none">
              <circle cx="720" cy="450" r="360" strokeDasharray="2 10" />
              <circle cx="720" cy="450" r="360" />
              <circle cx="220" cy="450" r="3" fill="#3b82f6" />
              <circle cx="1220" cy="450" r="3" fill="#3b82f6" />
              <circle cx="720" cy="90"  r="3" fill="#3b82f6" />
              <circle cx="720" cy="810" r="3" fill="#3b82f6" />
            </g>

            {/* ---- Nodes: small (data points) ---- */}
            <g fill="url(#node-core)">
              <circle className="hero-network-node" cx="120" cy="140" r="4" style={{ animationDelay: "0s" }} />
              <circle className="hero-network-node" cx="300" cy="470" r="4" style={{ animationDelay: "0.4s" }} />
              <circle className="hero-network-node" cx="260" cy="780" r="4" style={{ animationDelay: "0.8s" }} />
              <circle className="hero-network-node" cx="120" cy="780" r="3.5" style={{ animationDelay: "1.2s" }} />
              <circle className="hero-network-node" cx="980" cy="640" r="4" style={{ animationDelay: "0.6s" }} />
              <circle className="hero-network-node" cx="1310" cy="700" r="4" style={{ animationDelay: "1.6s" }} />
              <circle className="hero-network-node" cx="1380" cy="380" r="3.5" style={{ animationDelay: "1s" }} />
              <circle className="hero-network-node" cx="1310" cy="150" r="4" style={{ animationDelay: "0.3s" }} />
            </g>

            {/* ---- Nodes: medium (junctions) ---- */}
            <g fill="url(#node-core)">
              <circle className="hero-network-node" cx="430" cy="260" r="5.5" style={{ animationDelay: "0.2s" }} />
              <circle className="hero-network-node" cx="1020" cy="260" r="5.5" style={{ animationDelay: "0.9s" }} />
              <circle className="hero-network-node" cx="1150" cy="460" r="5.5" style={{ animationDelay: "1.4s" }} />
              <circle className="hero-network-node" cx="450" cy="660" r="5.5" style={{ animationDelay: "0.5s" }} />
            </g>

            {/* ---- Hub nodes (larger, anchor points framing the headline) ---- */}
            <g>
              <circle cx="720" cy="200" r="7" fill="url(#node-core)" className="hero-network-node" style={{ animationDelay: "0s" }} />
              <circle cx="720" cy="720" r="7" fill="url(#node-core)" className="hero-network-node" style={{ animationDelay: "1.1s" }} />
              <circle cx="720" cy="430" r="8" fill="url(#node-core)" />
              <circle cx="720" cy="430" r="14" fill="none" stroke="rgba(37,99,235,0.3)" strokeWidth="1" />
            </g>

            {/* ---- Faint coordinate ticks along the baseline, STEM signature, very quiet ---- */}
            <g stroke="rgba(11,19,41,0.12)" strokeWidth="1">
              <line x1="60" y1="850" x2="60" y2="862" />
              <line x1="160" y1="850" x2="160" y2="858" />
              <line x1="260" y1="850" x2="260" y2="862" />
              <line x1="1180" y1="850" x2="1180" y2="858" />
              <line x1="1280" y1="850" x2="1280" y2="862" />
              <line x1="1380" y1="850" x2="1380" y2="858" />
              <line x1="60" y1="850" x2="1380" y2="850" strokeDasharray="1 6" />
            </g>
          </svg>

          {/* Soft vignette to keep edges calm and the center clear for text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 60% at 50% 48%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%)",
            }}
          />
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





































































//OPTION 2 UNSPLASH DYNAMIC


// import React, { useEffect, useState } from "react";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

//   :root {
//     --mttf-primary: #2563eb;
//     --mttf-primary-light: #60a5fa;
//     --mttf-accent: #3b82f6;
//     --mttf-charcoal: #0b1329;
//   }

//   /* Slide ken-burns */
//   @keyframes kenBurns {
//     0%   { transform: scale(1); }
//     100% { transform: scale(1.06); }
//   }

//   .hero-slide-active {
//     animation: kenBurns 7s ease-in-out forwards;
//   }

//   /* Fade up entrance */
//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .hero-fade-1 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
//   .hero-fade-2 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
//   .hero-fade-3 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
//   .hero-fade-4 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }
//   .hero-fade-5 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }

//   /* Eyebrow label */
//   .hero-eyebrow {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 0.15em;
//     text-transform: uppercase;
//     color: var(--mttf-primary-light);
//     margin-bottom: 24px;
//     background: rgba(37, 99, 235, 0.08);
//     border: 1px solid rgba(37, 99, 235, 0.15);
//     padding: 6px 16px;
//     border-radius: 9999px;
//   }

//   .hero-eyebrow-line {
//     display: block;
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background: var(--mttf-primary-light);
//     opacity: 0.8;
//   }

//   /* Headline */
//   .hero-headline {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: clamp(38px, 6.5vw, 76px);
//     font-weight: 800;
//     line-height: 1.12;
//     color: #fff;
//     margin-bottom: 16px;
//     letter-spacing: -0.02em;
//   }

//   .hero-headline-accent {
//     background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     font-weight: 800;
//     font-style: normal;
//   }

//   /* Ambient Rule */
//   .hero-rule {
//     width: 80px;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.4), transparent);
//     margin: 20px auto;
//   }

//   /* Badge row */
//   .hero-badge-row {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 12px;
//     margin-bottom: 24px;
//     flex-wrap: wrap;
//   }

//   .hero-badge {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.02em;
//     color: rgba(255,255,255,0.9);
//     background: rgba(255, 255, 255, 0.04);
//     border: 1px solid rgba(255, 255, 255, 0.08);
//     padding: 6px 16px;
//     border-radius: 9999px;
//     backdrop-filter: blur(8px);
//     transition: all 0.3s ease;
//   }

//   .hero-badge:hover {
//     background: rgba(255, 255, 255, 0.08);
//     border-color: rgba(255, 255, 255, 0.15);
//     transform: translateY(-1px);
//   }

//   .hero-badge-dot {
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.25);
//   }

//   /* Subheading */
//   .hero-sub {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: clamp(15px, 1.8vw, 18px);
//     font-weight: 400;
//     color: #94a3b8;
//     max-width: 640px;
//     margin: 0 auto 36px;
//     line-height: 1.625;
//     letter-spacing: -0.01em;
//   }

//   /* CTA group */
//   .hero-cta-group {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 16px;
//     flex-wrap: wrap;
//   }

//   .hero-btn-primary {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 14px 32px;
//     background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//     color: #ffffff;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 600;
//     letter-spacing: 0.02em;
//     border: none;
//     border-radius: 9999px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     box-shadow: 0 4px 20px rgba(37, 99, 235, 0.25);
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .hero-btn-primary::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .hero-btn-primary:hover {
//     box-shadow: 0 6px 24px rgba(37, 99, 235, 0.4);
//     transform: translateY(-2px);
//   }

//   .hero-btn-primary:hover::before { opacity: 1; }
//   .hero-btn-primary span, .hero-btn-primary svg { position: relative; z-index: 1; }
//   .hero-btn-primary svg { transition: transform 0.2s ease; }
//   .hero-btn-primary:hover svg { transform: translateX(3px); }

//   .hero-btn-secondary {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 13px 30px;
//     background: rgba(255, 255, 255, 0.03);
//     color: #ffffff;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     letter-spacing: 0.02em;
//     border: 1px solid rgba(255, 255, 255, 0.12);
//     border-radius: 9999px;
//     cursor: pointer;
//     backdrop-filter: blur(8px);
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .hero-btn-secondary:hover {
//     background: rgba(255, 255, 255, 0.08);
//     border-color: rgba(255, 255, 255, 0.25);
//     transform: translateY(-2px);
//   }

//   /* Slide indicators */
//   .hero-indicators {
//     position: absolute;
//     bottom: 40px;
//     left: 50%;
//     transform: translateX(-50%);
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     z-index: 20;
//   }

//   .hero-indicator {
//     height: 4px;
//     background: rgba(255, 255, 255, 0.25);
//     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//     cursor: pointer;
//     width: 12px;
//     border-radius: 9999px;
//   }

//   .hero-indicator.active {
//     background: var(--mttf-primary-light);
//     width: 32px;
//   }

//   /* Slide counter */
//   .hero-counter {
//     position: absolute;
//     bottom: 40px;
//     right: 48px;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 13px;
//     font-weight: 500;
//     color: rgba(255, 255, 255, 0.4);
//     letter-spacing: 0.05em;
//     z-index: 20;
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .hero-counter-current {
//     color: var(--mttf-primary-light);
//     font-size: 15px;
//     font-weight: 700;
//   }

//   /* Vertical label */
//   .hero-vertical-label {
//     position: absolute;
//     left: 40px;
//     top: 50%;
//     transform: translateY(-50%) rotate(-90deg);
//     transform-origin: center center;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: rgba(255, 255, 255, 0.25);
//     z-index: 20;
//     white-space: nowrap;
//   }

//   @media (max-width: 768px) {
//     .hero-vertical-label { display: none; }
//     .hero-counter { display: none; }
//   }
// `;

// const images = [
//   // AI / neural network / futuristic technology
//   "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2000&q=80",
//   // data analytics / dashboard / business intelligence
//   "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
//   // modern software development workspace
//   "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80",
//   // abstract glowing digital network / tech lines
//   "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80",
//   // innovation / research / futuristic concept (mathematics / scientific visualization)
//   "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=2000&q=80",
// ];

// export default function MTTFHero() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 6000); // slide every 6 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <style>{styles}</style>

//       <section className="relative h-screen w-full overflow-hidden">

//         {/* Background Slider */}
//         <div className="absolute inset-0">
//           {images.map((img, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out
//                 ${index === current ? `opacity-100 hero-slide-active` : "opacity-0"}
//               `}
//               style={{ backgroundImage: `url(${img})` }}
//             />
//           ))}

//           {/* Rich layered overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
          
//           {/* Ambient neon radial glow */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
//         </div>

//         {/* Vertical label */}
//         <div className="hero-vertical-label">MathTech Thinking Foundation</div>

//         {/* Hero Content */}
//         <div className="relative z-10 flex items-center justify-center h-full px-6">
//           <div style={{ maxWidth: "860px", textAlign: "center" }}>

//             {/* Eyebrow */}
//             <div className="hero-eyebrow hero-fade-1">
//               <span className="hero-eyebrow-line" />
//               Est. Foundation
//               <span className="hero-eyebrow-line" />
//             </div>

//             {/* Headline */}
//             <h1 className="hero-headline hero-fade-2">
//               MathTech Thinking <br />
//               <span className="hero-headline-accent">Foundation</span>
//             </h1>

//             {/* Gold rule */}
//             <div className="hero-rule hero-fade-3" />

//             {/* Badge row */}
//             <div className="hero-badge-row hero-fade-3">
//               <span className="hero-badge">Udyam-Registered MSME</span>
//               <span className="hero-badge-dot" />
//               <span className="hero-badge">Section 8</span>
//               <span className="hero-badge-dot" />
//               <span className="hero-badge">12AB</span>
//             </div>

//             {/* Subheading */}
//             <p className="hero-sub hero-fade-4">
//               An international educational foundation empowering learners and
//               professionals through Science, Technology, Engineering, and Mathematics.
//             </p>

//             {/* CTA Buttons */}
//             <div className="hero-cta-group hero-fade-5">
//               <button className="hero-btn-primary">
//                 <span>Explore Programs</span>
//                 <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//                   <path d="M1 6.5H12M7.5 2L12 6.5L7.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//               <button className="hero-btn-secondary">
//                 Contact Us
//               </button>
//             </div>

//           </div>
//         </div>

//         {/* Slide counter */}
//         <div className="hero-counter">
//           <span className="hero-counter-current">0{current + 1}</span>
//           <span style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
//           <span>0{images.length}</span>
//         </div>

//         {/* Slide Indicators */}
//         <div className="hero-indicators">
//           {images.map((_, i) => (
//             <div
//               key={i}
//               className={`hero-indicator${i === current ? " active" : ""}`}
//             />
//           ))}
//         </div>

//       </section>
//     </>
//   );
// }











































//LIGHT BLUE FINAL


// import React from "react";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

//   :root {
//     --mttf-primary: #2563eb;
//     --mttf-primary-light: #2563eb;
//     --mttf-accent: #3b82f6;
//     --mttf-charcoal: #0b1329;
//   }

//   /* Fade up entrance */
//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .hero-fade-1 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
//   .hero-fade-2 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
//   .hero-fade-3 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
//   .hero-fade-4 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }
//   .hero-fade-5 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }

//   /* Eyebrow label */
//   .hero-eyebrow {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 0.15em;
//     text-transform: uppercase;
//     color: #2563eb;
//     margin-bottom: 24px;
//     background: rgba(37, 99, 235, 0.07);
//     border: 1px solid rgba(37, 99, 235, 0.18);
//     padding: 6px 16px;
//     border-radius: 9999px;
//   }

//   .hero-eyebrow-line {
//     display: block;
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background: #2563eb;
//     opacity: 0.7;
//   }

//   /* Headline */
//   .hero-headline {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: clamp(38px, 6.5vw, 76px);
//     font-weight: 800;
//     line-height: 1.12;
//     color: #0b1329;
//     margin-bottom: 16px;
//     letter-spacing: -0.02em;
//   }

//   .hero-headline-accent {
//     background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     font-weight: 800;
//     font-style: normal;
//   }

//   /* Ambient Rule */
//   .hero-rule {
//     width: 80px;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.35), transparent);
//     margin: 20px auto;
//   }

//   /* Badge row */
//   .hero-badge-row {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 12px;
//     margin-bottom: 24px;
//     flex-wrap: wrap;
//   }

//   .hero-badge {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.02em;
//     color: #1e3a6e;
//     background: rgba(37, 99, 235, 0.07);
//     border: 1px solid rgba(37, 99, 235, 0.16);
//     padding: 6px 16px;
//     border-radius: 9999px;
//     backdrop-filter: blur(8px);
//     transition: all 0.3s ease;
//   }

//   .hero-badge:hover {
//     background: rgba(37, 99, 235, 0.12);
//     border-color: rgba(37, 99, 235, 0.28);
//     transform: translateY(-1px);
//   }

//   .hero-badge-dot {
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: rgba(37, 99, 235, 0.25);
//   }

//   /* Subheading */
//   .hero-sub {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: clamp(15px, 1.8vw, 18px);
//     font-weight: 400;
//     color: #475569;
//     max-width: 640px;
//     margin: 0 auto 36px;
//     line-height: 1.625;
//     letter-spacing: -0.01em;
//   }

//   /* CTA group */
//   .hero-cta-group {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 16px;
//     flex-wrap: wrap;
//   }

//   .hero-btn-primary {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 14px 32px;
//     background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//     color: #ffffff;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 600;
//     letter-spacing: 0.02em;
//     border: none;
//     border-radius: 9999px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     box-shadow: 0 4px 20px rgba(37, 99, 235, 0.25);
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .hero-btn-primary::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .hero-btn-primary:hover {
//     box-shadow: 0 6px 24px rgba(37, 99, 235, 0.4);
//     transform: translateY(-2px);
//   }

//   .hero-btn-primary:hover::before { opacity: 1; }
//   .hero-btn-primary span, .hero-btn-primary svg { position: relative; z-index: 1; }
//   .hero-btn-primary svg { transition: transform 0.2s ease; }
//   .hero-btn-primary:hover svg { transform: translateX(3px); }

//   .hero-btn-secondary {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 13px 30px;
//     background: #ffffff;
//     color: #0b1329;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     letter-spacing: 0.02em;
//     border: 1px solid rgba(11, 19, 41, 0.15);
//     border-radius: 9999px;
//     cursor: pointer;
//     backdrop-filter: blur(8px);
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .hero-btn-secondary:hover {
//     background: #f1f5f9;
//     border-color: rgba(11, 19, 41, 0.25);
//     transform: translateY(-2px);
//   }

//   /* Vertical label */
//   .hero-vertical-label {
//     position: absolute;
//     left: 40px;
//     top: 50%;
//     transform: translateY(-50%) rotate(-90deg);
//     transform-origin: center center;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: rgba(11, 19, 41, 0.2);
//     z-index: 20;
//     white-space: nowrap;
//   }

//   @media (max-width: 768px) {
//     .hero-vertical-label { display: none; }
//   }
// `;

// export default function MTTFHero() {
//   return (
//     <>
//       <style>{styles}</style>

//       <section className="relative h-screen w-full overflow-hidden">

//         {/* Premium Light Background */}
//         <div className="absolute inset-0" style={{
//           background: "linear-gradient(160deg, #f0f7ff 0%, #f8fbff 40%, #ffffff 70%, #f5f9ff 100%)",
//         }}>

//           {/* Full-canvas SVG atmospheric layer */}
//           <svg
//             className="absolute inset-0 w-full h-full pointer-events-none"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="xMidYMid slice"
//             viewBox="0 0 1440 900"
//           >
//             <defs>
//               {/* Fine grid pattern */}
//               <pattern id="grid-fine" width="48" height="48" patternUnits="userSpaceOnUse">
//                 <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(37,99,235,0.055)" strokeWidth="0.5"/>
//               </pattern>
//               {/* Larger accent grid */}
//               <pattern id="grid-large" width="192" height="192" patternUnits="userSpaceOnUse">
//                 <path d="M 192 0 L 0 0 0 192" fill="none" stroke="rgba(37,99,235,0.09)" strokeWidth="0.75"/>
//               </pattern>
//               {/* Center radial glow */}
//               <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
//                 <stop offset="0%"   stopColor="rgba(37,99,235,0.10)"/>
//                 <stop offset="45%"  stopColor="rgba(37,99,235,0.04)"/>
//                 <stop offset="100%" stopColor="rgba(37,99,235,0)"/>
//               </radialGradient>
//               {/* Top-left wash */}
//               <radialGradient id="glow-tl" cx="0%" cy="0%" r="60%">
//                 <stop offset="0%"   stopColor="rgba(96,165,250,0.09)"/>
//                 <stop offset="100%" stopColor="rgba(96,165,250,0)"/>
//               </radialGradient>
//               {/* Bottom-right wash */}
//               <radialGradient id="glow-br" cx="100%" cy="100%" r="55%">
//                 <stop offset="0%"   stopColor="rgba(37,99,235,0.07)"/>
//                 <stop offset="100%" stopColor="rgba(37,99,235,0)"/>
//               </radialGradient>
//             </defs>

//             {/* Base grids */}
//             <rect width="1440" height="900" fill="url(#grid-fine)"/>
//             <rect width="1440" height="900" fill="url(#grid-large)"/>

//             {/* Radial glows */}
//             <rect width="1440" height="900" fill="url(#glow-tl)"/>
//             <rect width="1440" height="900" fill="url(#glow-br)"/>
//             <ellipse cx="720" cy="450" rx="580" ry="420" fill="url(#glow-center)"/>

//             {/* ── Geometric arc system (top-right corner) ── */}
//             <g opacity="0.18" fill="none" stroke="#2563eb" strokeWidth="0.75">
//               <circle cx="1340" cy="80"  r="140"/>
//               <circle cx="1340" cy="80"  r="210"/>
//               <circle cx="1340" cy="80"  r="290"/>
//               <circle cx="1340" cy="80"  r="380"/>
//             </g>
//             {/* Arc ticks on outer ring */}
//             <g opacity="0.12" stroke="#2563eb" strokeWidth="1">
//               {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
//                 const rad = (deg * Math.PI) / 180;
//                 const cx = 1340, cy = 80, r = 380;
//                 const x1 = cx + (r - 8) * Math.cos(rad);
//                 const y1 = cy + (r - 8) * Math.sin(rad);
//                 const x2 = cx + (r + 8) * Math.cos(rad);
//                 const y2 = cy + (r + 8) * Math.sin(rad);
//                 return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>;
//               })}
//             </g>

//             {/* ── Geometric arc system (bottom-left corner) ── */}
//             <g opacity="0.13" fill="none" stroke="#3b82f6" strokeWidth="0.75">
//               <circle cx="100"  cy="820" r="120"/>
//               <circle cx="100"  cy="820" r="200"/>
//               <circle cx="100"  cy="820" r="290"/>
//             </g>

//             {/* ── Diagonal construction lines ── */}
//             <g opacity="0.06" stroke="#1d4ed8" strokeWidth="0.75">
//               <line x1="0"    y1="0"   x2="1440" y2="900"/>
//               <line x1="1440" y1="0"   x2="0"    y2="900"/>
//               <line x1="720"  y1="0"   x2="720"  y2="900"/>
//               <line x1="0"    y1="450" x2="1440" y2="450"/>
//             </g>

//             {/* ── Dot matrix: top-left cluster ── */}
//             <g fill="rgba(37,99,235,0.15)">
//               {Array.from({length: 6}).map((_, row) =>
//                 Array.from({length: 10}).map((_, col) => (
//                   <circle key={`tl-${row}-${col}`} cx={60 + col * 28} cy={60 + row * 28} r="1.5"/>
//                 ))
//               )}
//             </g>

//             {/* ── Dot matrix: bottom-right cluster ── */}
//             <g fill="rgba(37,99,235,0.12)">
//               {Array.from({length: 5}).map((_, row) =>
//                 Array.from({length: 8}).map((_, col) => (
//                   <circle key={`br-${row}-${col}`} cx={1160 + col * 28} cy={740 + row * 28} r="1.5"/>
//                 ))
//               )}
//             </g>

//             {/* ── Faint mathematical / STEM glyphs ── */}
//             <g
//               fontFamily="'Plus Jakarta Sans', Georgia, serif"
//               fill="rgba(37,99,235,0.055)"
//               fontSize="13"
//               fontWeight="400"
//               letterSpacing="0.05em"
//             >
//               {/* Top-left region */}
//               <text x="68"   y="210">∑ n²</text>
//               <text x="110"  y="260">∫ dx</text>
//               <text x="60"   y="310">π ≈ 3.14</text>
//               <text x="115"  y="360">∇ · F</text>

//               {/* Right side */}
//               <text x="1290" y="320">e = mc²</text>
//               <text x="1310" y="370">λ → 0</text>
//               <text x="1275" y="420">∂²u/∂t²</text>
//               <text x="1300" y="470">lim f(x)</text>

//               {/* Bottom center */}
//               <text x="600"  y="830">φ = (1 + √5) / 2</text>
//               <text x="820"  y="860">Ax = λx</text>
//             </g>

//             {/* ── Connector lines between dot clusters and arc ── */}
//             <g opacity="0.07" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="4 6">
//               <line x1="340" y1="60"  x2="960" y2="60"/>
//               <line x1="60"  y1="228" x2="60"  y2="672"/>
//               <line x1="1380" y1="470" x2="1380" y2="820"/>
//             </g>

//             {/* ── Small accent diamonds (corner markers) ── */}
//             <g fill="none" stroke="rgba(37,99,235,0.18)" strokeWidth="0.75">
//               <rect x="96"  y="96"  width="8" height="8" transform="rotate(45 100 100)"/>
//               <rect x="1336" y="836" width="8" height="8" transform="rotate(45 1340 840)"/>
//               <rect x="1336" y="96"  width="8" height="8" transform="rotate(45 1340 100)"/>
//               <rect x="96"  y="836" width="8" height="8" transform="rotate(45 100 840)"/>
//             </g>

//             {/* ── Subtle horizontal rule at vertical center ── */}
//             <line x1="80" y1="450" x2="360" y2="450" stroke="rgba(37,99,235,0.1)" strokeWidth="0.5" strokeDasharray="3 5"/>
//             <line x1="1080" y1="450" x2="1360" y2="450" stroke="rgba(37,99,235,0.1)" strokeWidth="0.5" strokeDasharray="3 5"/>
//           </svg>
//         </div>

//         {/* Vertical label */}
//         <div className="hero-vertical-label">MathTech Thinking Foundation</div>

//         {/* Hero Content */}
//         <div className="relative z-10 flex items-center justify-center h-full px-6">
//           <div style={{ maxWidth: "860px", textAlign: "center" }}>

//             {/* Eyebrow */}
//             <div className="hero-eyebrow hero-fade-1">
//               <span className="hero-eyebrow-line" />
//               Est. Foundation
//               <span className="hero-eyebrow-line" />
//             </div>

//             {/* Headline */}
//             <h1 className="hero-headline hero-fade-2">
//               MathTech Thinking <br />
//               <span className="hero-headline-accent">Foundation</span>
//             </h1>

//             {/* Gold rule */}
//             <div className="hero-rule hero-fade-3" />

//             {/* Badge row */}
//             <div className="hero-badge-row hero-fade-3">
//               <span className="hero-badge">Udyam-Registered MSME</span>
//               <span className="hero-badge-dot" />
//               <span className="hero-badge">Section 8</span>
//               <span className="hero-badge-dot" />
//               <span className="hero-badge">12AB</span>
//             </div>

//             {/* Subheading */}
//             <p className="hero-sub hero-fade-4">
//               An international educational foundation empowering learners and
//               professionals through Science, Technology, Engineering, and Mathematics.
//             </p>

//             {/* CTA Buttons */}
//             <div className="hero-cta-group hero-fade-5">
//               <button className="hero-btn-primary">
//                 <span>Explore Programs</span>
//                 <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//                   <path d="M1 6.5H12M7.5 2L12 6.5L7.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//               <button className="hero-btn-secondary">
//                 Contact Us
//               </button>
//             </div>

//           </div>
//         </div>

//       </section>
//     </>
//   );
// }












































//OPTION 4 DARK

// import React from "react";
 
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
 
//   :root {
//     --mttf-primary: #2563eb;
//     --mttf-primary-light: #60a5fa;
//     --mttf-accent: #3b82f6;
//     --mttf-charcoal: #0b1329;
//   }
 
//   /* Fade up entrance */
//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
 
//   .hero-fade-1 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
//   .hero-fade-2 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
//   .hero-fade-3 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
//   .hero-fade-4 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }
//   .hero-fade-5 { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }
 
//   /* Eyebrow label */
//   .hero-eyebrow {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 0.15em;
//     text-transform: uppercase;
//     color: var(--mttf-primary-light);
//     margin-bottom: 24px;
//     background: rgba(37, 99, 235, 0.08);
//     border: 1px solid rgba(37, 99, 235, 0.15);
//     padding: 6px 16px;
//     border-radius: 9999px;
//   }
 
//   .hero-eyebrow-line {
//     display: block;
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background: var(--mttf-primary-light);
//     opacity: 0.8;
//   }
 
//   /* Headline */
//   .hero-headline {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: clamp(38px, 6.5vw, 76px);
//     font-weight: 800;
//     line-height: 1.12;
//     color: #fff;
//     margin-bottom: 16px;
//     letter-spacing: -0.02em;
//   }
 
//   .hero-headline-accent {
//     background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     font-weight: 800;
//     font-style: normal;
//   }
 
//   /* Ambient Rule */
//   .hero-rule {
//     width: 80px;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.4), transparent);
//     margin: 20px auto;
//   }
 
//   /* Badge row */
//   .hero-badge-row {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 12px;
//     margin-bottom: 24px;
//     flex-wrap: wrap;
//   }
 
//   .hero-badge {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.02em;
//     color: rgba(255,255,255,0.9);
//     background: rgba(255, 255, 255, 0.04);
//     border: 1px solid rgba(255, 255, 255, 0.08);
//     padding: 6px 16px;
//     border-radius: 9999px;
//     backdrop-filter: blur(8px);
//     transition: all 0.3s ease;
//   }
 
//   .hero-badge:hover {
//     background: rgba(255, 255, 255, 0.08);
//     border-color: rgba(255, 255, 255, 0.15);
//     transform: translateY(-1px);
//   }
 
//   .hero-badge-dot {
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.25);
//   }
 
//   /* Subheading */
//   .hero-sub {
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: clamp(15px, 1.8vw, 18px);
//     font-weight: 400;
//     color: #94a3b8;
//     max-width: 640px;
//     margin: 0 auto 36px;
//     line-height: 1.625;
//     letter-spacing: -0.01em;
//   }
 
//   /* CTA group */
//   .hero-cta-group {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 16px;
//     flex-wrap: wrap;
//   }
 
//   .hero-btn-primary {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 14px 32px;
//     background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//     color: #ffffff;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 600;
//     letter-spacing: 0.02em;
//     border: none;
//     border-radius: 9999px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     box-shadow: 0 4px 20px rgba(37, 99, 235, 0.25);
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }
 
//   .hero-btn-primary::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }
 
//   .hero-btn-primary:hover {
//     box-shadow: 0 6px 24px rgba(37, 99, 235, 0.4);
//     transform: translateY(-2px);
//   }
 
//   .hero-btn-primary:hover::before { opacity: 1; }
//   .hero-btn-primary span, .hero-btn-primary svg { position: relative; z-index: 1; }
//   .hero-btn-primary svg { transition: transform 0.2s ease; }
//   .hero-btn-primary:hover svg { transform: translateX(3px); }
 
//   .hero-btn-secondary {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 13px 30px;
//     background: rgba(255, 255, 255, 0.03);
//     color: #ffffff;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     letter-spacing: 0.02em;
//     border: 1px solid rgba(255, 255, 255, 0.12);
//     border-radius: 9999px;
//     cursor: pointer;
//     backdrop-filter: blur(8px);
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }
 
//   .hero-btn-secondary:hover {
//     background: rgba(255, 255, 255, 0.08);
//     border-color: rgba(255, 255, 255, 0.25);
//     transform: translateY(-2px);
//   }
 
//   /* Vertical label */
//   .hero-vertical-label {
//     position: absolute;
//     left: 40px;
//     top: 50%;
//     transform: translateY(-50%) rotate(-90deg);
//     transform-origin: center center;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: rgba(255, 255, 255, 0.25);
//     z-index: 20;
//     white-space: nowrap;
//   }
 
//   @media (max-width: 768px) {
//     .hero-vertical-label { display: none; }
//   }
// `;
 
// export default function MTTFHero() {
//   return (
//     <>
//       <style>{styles}</style>
 
//       <section className="relative h-screen w-full overflow-hidden">
 
//         {/* Static Background Image */}
//         <div className="absolute inset-0">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: `url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80)`,
//             }}
//           />
 
//           {/* Rich layered overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
 
//           {/* Ambient neon radial glow */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
//         </div>
 
//         {/* Vertical label */}
//         <div className="hero-vertical-label">MathTech Thinking Foundation</div>
 
//         {/* Hero Content */}
//         <div className="relative z-10 flex items-center justify-center h-full px-6">
//           <div style={{ maxWidth: "860px", textAlign: "center" }}>
 
//             {/* Eyebrow */}
//             <div className="hero-eyebrow hero-fade-1">
//               <span className="hero-eyebrow-line" />
//               Est. Foundation
//               <span className="hero-eyebrow-line" />
//             </div>
 
//             {/* Headline */}
//             <h1 className="hero-headline hero-fade-2">
//               MathTech Thinking <br />
//               <span className="hero-headline-accent">Foundation</span>
//             </h1>
 
//             {/* Gold rule */}
//             <div className="hero-rule hero-fade-3" />
 
//             {/* Badge row */}
//             <div className="hero-badge-row hero-fade-3">
//               <span className="hero-badge">Udyam-Registered MSME</span>
//               <span className="hero-badge-dot" />
//               <span className="hero-badge">Section 8</span>
//               <span className="hero-badge-dot" />
//               <span className="hero-badge">12AB</span>
//             </div>
 
//             {/* Subheading */}
//             <p className="hero-sub hero-fade-4">
//               An international educational foundation empowering learners and
//               professionals through Science, Technology, Engineering, and Mathematics.
//             </p>
 
//             {/* CTA Buttons */}
//             <div className="hero-cta-group hero-fade-5">
//               <button className="hero-btn-primary">
//                 <span>Explore Programs</span>
//                 <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//                   <path d="M1 6.5H12M7.5 2L12 6.5L7.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//               <button className="hero-btn-secondary">
//                 Contact Us
//               </button>
//             </div>
 
//           </div>
//         </div>
 
//       </section>
//     </>
//   );
// }
 