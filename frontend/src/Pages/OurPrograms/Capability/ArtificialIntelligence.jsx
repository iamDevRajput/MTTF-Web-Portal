import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Network,
  Eye,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

function ArtificialIntelligence() {
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [index]: true }));
            }
          });
        },
        { threshold: 0.1 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const keyAreas = [
    {
      icon: Brain,
      title: "Machine Learning",
      description:
        "Advanced ML algorithms, supervised and unsupervised learning, and predictive modeling techniques.",
      number: "01",
    },
    {
      icon: Network,
      title: "Neural Networks",
      description:
        "Deep learning architectures, convolutional networks, and recurrent neural networks for complex pattern recognition.",
      number: "02",
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description:
        "Text analysis, sentiment analysis, language understanding, and generation technologies.",
      number: "03",
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description:
        "Image recognition, object detection, facial recognition, and visual data processing.",
      number: "04",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .ai-page * { box-sizing: border-box; }

        .ai-page {
          --cream: #FAF7F2;
          --beige: #F0EBE1;
          --warm-white: #FDFBF8;
          --accent-yellow: #D4A843;
          --accent-yellow-light: #F5E6C0;
          --text-dark: #1A1614;
          --text-mid: #4A3F35;
          --text-light: #8A7A6E;
          --border: #E8E0D4;
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          min-height: 100vh;
        }

        .ai-page h1, .ai-page h2, .ai-page h3 {
          font-family: 'Cormorant Garamond', serif;
        }

        /* Hero */
        .ai-hero {
          background: var(--text-dark);
          min-height: 70vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .ai-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80') center/cover;
          opacity: 0.18;
        }

        .ai-hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .ai-hero-line {
          position: absolute;
          left: 0; right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-yellow), transparent);
        }

        .ai-hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
        }

        .ai-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border: 1px solid rgba(212,168,67,0.4);
          border-radius: 2px;
          margin-bottom: 32px;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--accent-yellow);
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }

        .ai-hero-badge span.dot {
          width: 5px; height: 5px;
          background: var(--accent-yellow);
          border-radius: 50%;
          display: inline-block;
        }

        .ai-hero h1 {
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 300;
          color: #FAF7F2;
          line-height: 1.0;
          margin: 0 0 24px;
          letter-spacing: -1px;
        }

        .ai-hero h1 em {
          font-style: italic;
          color: var(--accent-yellow);
        }

        .ai-hero p {
          font-size: 17px;
          color: rgba(250,247,242,0.65);
          max-width: 560px;
          line-height: 1.8;
          font-weight: 300;
          margin: 0 0 40px;
        }

        .ai-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent-yellow);
          color: var(--text-dark);
          padding: 14px 32px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .ai-btn-primary:hover {
          background: #c49a38;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(212,168,67,0.3);
        }

        .ai-btn-primary svg {
          width: 16px; height: 16px;
          transition: transform 0.3s ease;
        }

        .ai-btn-primary:hover svg {
          transform: translateX(4px);
        }

        /* Sections */
        .ai-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .ai-section-sm {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        .ai-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent-yellow);
          font-weight: 500;
          margin-bottom: 16px;
          display: block;
        }

        .ai-section-title {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 300;
          color: var(--text-dark);
          line-height: 1.1;
          margin: 0 0 20px;
        }

        .ai-section-title em {
          font-style: italic;
          color: var(--accent-yellow);
        }

        .ai-divider {
          width: 60px;
          height: 1px;
          background: var(--accent-yellow);
          margin: 0 0 40px;
        }

        /* Overview */
        .ai-overview {
          background: var(--warm-white);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 64px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .ai-overview { grid-template-columns: 1fr; padding: 40px; gap: 32px; }
        }

        .ai-overview p {
          font-size: 16px;
          color: var(--text-mid);
          line-height: 1.9;
          margin: 0 0 16px;
          font-weight: 300;
        }

        .ai-overview-stat {
          text-align: center;
          padding: 32px;
          border: 1px solid var(--border);
          border-radius: 2px;
        }

        .ai-overview-stat .num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 300;
          color: var(--accent-yellow);
          display: block;
          line-height: 1;
          margin-bottom: 8px;
        }

        .ai-overview-stat .lbl {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-light);
          font-weight: 500;
        }

        .ai-overview-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Key Areas */
        .ai-areas-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .ai-areas-grid { grid-template-columns: 1fr; }
        }

        .ai-area-card {
          background: var(--warm-white);
          padding: 48px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .ai-area-card:hover {
          background: var(--text-dark);
        }

        .ai-area-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 48px; right: 48px;
          height: 1px;
          background: var(--accent-yellow);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .ai-area-card:hover::after {
          transform: scaleX(1);
        }

        .ai-area-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px;
          font-weight: 300;
          color: var(--border);
          position: absolute;
          top: 16px; right: 32px;
          line-height: 1;
          transition: color 0.3s ease;
        }

        .ai-area-card:hover .ai-area-num {
          color: rgba(212,168,67,0.15);
        }

        .ai-area-icon {
          width: 48px; height: 48px;
          background: var(--accent-yellow-light);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: background 0.3s ease;
        }

        .ai-area-card:hover .ai-area-icon {
          background: rgba(212,168,67,0.2);
        }

        .ai-area-icon svg {
          width: 22px; height: 22px;
          color: var(--accent-yellow);
        }

        .ai-area-card h3 {
          font-size: 24px;
          font-weight: 400;
          color: var(--text-dark);
          margin: 0 0 12px;
          transition: color 0.3s ease;
        }

        .ai-area-card:hover h3 { color: var(--cream); }

        .ai-area-card p {
          font-size: 14px;
          color: var(--text-light);
          line-height: 1.8;
          font-weight: 300;
          margin: 0;
          transition: color 0.3s ease;
        }

        .ai-area-card:hover p { color: rgba(250,247,242,0.6); }

        .ai-area-arrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent-yellow);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .ai-area-card:hover .ai-area-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Research */
        .ai-research {
          background: var(--text-dark);
          padding: 80px;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .ai-research { padding: 40px; }
        }

        .ai-research::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .ai-research .ai-label { color: var(--accent-yellow); }

        .ai-research .ai-section-title { color: var(--cream); }

        .ai-research-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.08);
          margin-top: 48px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .ai-research-grid { grid-template-columns: 1fr; }
        }

        .ai-research-item {
          background: rgba(255,255,255,0.03);
          padding: 40px 32px;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .ai-research-item:hover {
          background: rgba(212,168,67,0.08);
        }

        .ai-research-emoji {
          font-size: 32px;
          display: block;
          margin-bottom: 20px;
        }

        .ai-research-item h4 {
          font-size: 20px;
          font-weight: 400;
          color: var(--cream);
          margin: 0 0 10px;
        }

        .ai-research-item p {
          font-size: 13px;
          color: rgba(250,247,242,0.5);
          line-height: 1.8;
          margin: 0;
          font-weight: 300;
        }

        /* CTA */
        .ai-cta {
          background: var(--accent-yellow-light);
          border: 1px solid rgba(212,168,67,0.3);
          border-radius: 4px;
          padding: 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .ai-cta { padding: 48px 32px; }
        }

        .ai-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A843' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .ai-cta h2 {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 300;
          color: var(--text-dark);
          margin: 0 0 16px;
          position: relative;
        }

        .ai-cta p {
          font-size: 16px;
          color: var(--text-mid);
          margin: 0 0 40px;
          font-weight: 300;
          position: relative;
        }

        /* Fade in animation */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 600px) {
          .ai-section { padding: 48px 20px; }
          .ai-section-sm { padding: 0 20px 48px; }
          .ai-hero-content { padding: 0 20px; }
        }
      `}</style>

      <Header />

      <main className="ai-page">
        {/* Hero */}
        <section className="ai-hero">
          <div className="ai-hero-noise" />
          <div className="ai-hero-line" />
          <div className="ai-section" style={{ paddingTop: 120, paddingBottom: 100 }}>
            <div className="ai-hero-content">
              <div className="ai-hero-badge">
                <span className="dot" />
                Field of Study
              </div>
              <h1>
                Artificial<br />
                <em>Intelligence</em>
              </h1>
              <p>
                Engineering intelligent systems that learn, reason, and evolve —
                shaping the next era of digital intelligence.
              </p>
              <Link to="/membership" className="ai-btn-primary">
                Get Started
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Overview */}
        <div
          className="ai-section fade-up"
          ref={(el) => (observerRefs.current[0] = el)}
          style={{ opacity: isVisible[0] ? 1 : 0, transform: isVisible[0] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}
        >
          <span className="ai-label">About the Field</span>
          <h2 className="ai-section-title">Overview of <em>AI</em></h2>
          <div className="ai-divider" />

          <div className="ai-overview">
            <div>
              <p>
                Our Artificial Intelligence program advances intelligent technologies by blending
                theory, experimentation, and real-world deployment of AI systems.
              </p>
              <p>
                From predictive intelligence to cognitive automation, we cultivate innovation-driven
                minds prepared for the challenges of tomorrow.
              </p>
            </div>
            <div className="ai-overview-stats">
              {[
                { num: "4+", lbl: "Core Domains" },
                { num: "∞", lbl: "Possibilities" },
                { num: "100+", lbl: "Projects" },
                { num: "500+", lbl: "Learners" },
              ].map((s, i) => (
                <div key={i} className="ai-overview-stat">
                  <span className="num">{s.num}</span>
                  <span className="lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Areas */}
        <div
          className="ai-section-sm"
          ref={(el) => (observerRefs.current[1] = el)}
          style={{ opacity: isVisible[1] ? 1 : 0, transform: isVisible[1] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.1s' }}
        >
          <div style={{ marginBottom: 40 }}>
            <span className="ai-label">What We Cover</span>
            <h2 className="ai-section-title">Key Areas <em>of Focus</em></h2>
            <div className="ai-divider" />
          </div>

          <div className="ai-areas-grid">
            {keyAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="ai-area-card">
                  <span className="ai-area-num">{area.number}</span>
                  <div className="ai-area-icon">
                    <Icon />
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <div className="ai-area-arrow">
                    <span>Explore</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Research & Innovation */}
        <div
          className="ai-section-sm"
          ref={(el) => (observerRefs.current[2] = el)}
          style={{ opacity: isVisible[2] ? 1 : 0, transform: isVisible[2] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.2s' }}
        >
          <div className="ai-research">
            <span className="ai-label">Pushing Boundaries</span>
            <h2 className="ai-section-title" style={{ color: 'var(--cream)' }}>
              Research & <em>Innovation</em>
            </h2>
            <p style={{ color: 'rgba(250,247,242,0.55)', fontSize: 15, lineHeight: 1.8, maxWidth: 560, fontWeight: 300, marginTop: 8 }}>
              We explore ethical, scalable, and industry-ready AI systems through interdisciplinary
              research and applied innovation.
            </p>

            <div className="ai-research-grid">
              {[
                { title: "Ethical AI", desc: "Transparent, fair and accountable AI systems", icon: "🛡️" },
                { title: "Industry Applications", desc: "Healthcare, fintech, education & automation", icon: "🏭" },
                { title: "Future Technologies", desc: "AGI, self-learning & adaptive systems", icon: "🚀" },
              ].map(({ title, desc, icon }, i) => (
                <div key={i} className="ai-research-item">
                  <span className="ai-research-emoji">{icon}</span>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="ai-section-sm"
          ref={(el) => (observerRefs.current[3] = el)}
          style={{ opacity: isVisible[3] ? 1 : 0, transform: isVisible[3] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s' }}
        >
          <div className="ai-cta">
            <span className="ai-label" style={{ position: 'relative' }}>Community</span>
            <h2>Join Our <em>AI Community</em></h2>
            <p>Collaborate, innovate, and build the intelligent systems of tomorrow.</p>
            <Link to="/membership" className="ai-btn-primary" style={{ position: 'relative' }}>
              <Sparkles style={{ width: 16, height: 16 }} />
              Get Started
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ArtificialIntelligence;