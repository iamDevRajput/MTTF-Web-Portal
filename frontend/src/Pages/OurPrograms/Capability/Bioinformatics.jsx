import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dna,
  Microscope,
  Activity,
  Pill,
  ArrowLeft,
} from "lucide-react";

import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

function Bioinformatics() {
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

  const researchAreas = [
    {
      icon: Dna,
      title: "Genomics",
      description:
        "DNA sequence analysis, genome mapping, genetic variation studies, and next-generation sequencing analysis.",
      number: "01",
    },
    {
      icon: Microscope,
      title: "Proteomics",
      description:
        "Protein structure prediction, function analysis, protein-protein interactions, and computational modeling.",
      number: "02",
    },
    {
      icon: Activity,
      title: "Systems Biology",
      description:
        "Computational modeling of biological systems, pathway analysis, and network-based approaches.",
      number: "03",
    },
    {
      icon: Pill,
      title: "Drug Discovery",
      description:
        "Computational drug design, molecular docking, virtual screening, and pharmaceutical research.",
      number: "04",
    },
  ];

  const applications = [
    {
      title: "Personalized Medicine",
      description: "Tailored treatments based on genetic profiles",
      icon: "🧬",
    },
    {
      title: "Disease Research",
      description: "Understanding genetic basis of diseases",
      icon: "🔬",
    },
    {
      title: "Drug Development",
      description: "Accelerating pharmaceutical innovation",
      icon: "💊",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .bio-page * { box-sizing: border-box; }

        .bio-page {
          --mttf-bg-alt: #f8fafc;
          --mttf-border-light: #F0EBE1;
          --mttf-bg: #ffffff;
          --mttf-primary: #D4A843;
          --mttf-primary-light: #F5E6C0;
          --mttf-text: #0f172a;
          --text-mid: #4A3F35;
          --text-light: #8A7A6E;
          --border: #E8E0D4;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--mttf-bg-alt);
          min-height: 100vh;
        }

        .bio-page h1, .bio-page h2, .bio-page h3, .bio-page h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Hero */
        .bio-hero {
          background: var(--mttf-text);
          min-height: 65vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .bio-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1600&q=80') center/cover;
          opacity: 0.14;
        }

        .bio-hero-line {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--mttf-primary), transparent);
        }

        /* Back button */
        .bio-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(212,168,67,0.8);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.3s ease;
          margin-bottom: 40px;
        }

        .bio-back:hover { color: var(--mttf-primary); }
        .bio-back svg { width: 14px; height: 14px; }

        .bio-hero-badge {
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
          color: var(--mttf-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 500;
        }

        .bio-hero-badge span.dot {
          width: 5px; height: 5px;
          background: var(--mttf-primary);
          border-radius: 50%;
          display: inline-block;
        }

        .bio-hero h1 {
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 300;
          color: #f8fafc;
          line-height: 1.0;
          margin: 0 0 24px;
          letter-spacing: -1px;
        }

        .bio-hero h1 em {
          font-style: italic;
          color: var(--mttf-primary);
        }

        .bio-hero p {
          font-size: 16px;
          color: rgba(250,247,242,0.6);
          max-width: 540px;
          line-height: 1.9;
          font-weight: 300;
          margin: 0 0 40px;
        }

        .bio-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--mttf-primary);
          color: var(--mttf-text);
          padding: 14px 32px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .bio-btn-primary:hover {
          background: #c49a38;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(212,168,67,0.3);
        }

        /* Sections */
        .bio-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .bio-section-sm {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        .bio-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--mttf-primary);
          font-weight: 500;
          margin-bottom: 16px;
          display: block;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .bio-section-title {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 300;
          color: var(--mttf-text);
          line-height: 1.1;
          margin: 0 0 20px;
        }

        .bio-section-title em {
          font-style: italic;
          color: var(--mttf-primary);
        }

        .bio-divider {
          width: 60px;
          height: 1px;
          background: var(--mttf-primary);
          margin: 0 0 48px;
        }

        /* Overview */
        .bio-overview {
          background: var(--mttf-bg);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 64px;
        }

        @media (max-width: 768px) {
          .bio-overview { padding: 40px 32px; }
        }

        .bio-overview-inner {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .bio-overview-inner { grid-template-columns: 1fr; gap: 32px; }
        }

        .bio-overview p {
          font-size: 15px;
          color: var(--text-mid);
          line-height: 1.9;
          margin: 0 0 16px;
          font-weight: 300;
        }

        .bio-quote {
          border-left: 2px solid var(--mttf-primary);
          padding: 20px 24px;
          background: var(--mttf-primary-light);
          border-radius: 0 2px 2px 0;
        }

        .bio-quote p {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-style: italic;
          color: var(--mttf-text);
          margin: 0;
          line-height: 1.5;
          font-weight: 400;
        }

        /* Research Areas */
        .bio-areas-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .bio-areas-grid { grid-template-columns: 1fr; }
        }

        .bio-area-card {
          background: var(--mttf-bg);
          padding: 48px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .bio-area-card:hover { background: var(--mttf-text); }

        .bio-area-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 48px; right: 48px;
          height: 1px;
          background: var(--mttf-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .bio-area-card:hover::after { transform: scaleX(1); }

        .bio-area-num {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 64px;
          font-weight: 300;
          color: var(--border);
          position: absolute;
          top: 12px; right: 28px;
          line-height: 1;
          transition: color 0.3s ease;
        }

        .bio-area-card:hover .bio-area-num { color: rgba(212,168,67,0.12); }

        .bio-area-icon {
          width: 48px; height: 48px;
          background: var(--mttf-primary-light);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: background 0.3s ease;
        }

        .bio-area-card:hover .bio-area-icon { background: rgba(212,168,67,0.2); }
        .bio-area-icon svg { width: 22px; height: 22px; color: var(--mttf-primary); }

        .bio-area-card h3 {
          font-size: 22px;
          font-weight: 400;
          color: var(--mttf-text);
          margin: 0 0 12px;
          transition: color 0.3s ease;
        }

        .bio-area-card:hover h3 { color: var(--mttf-bg-alt); }

        .bio-area-card p {
          font-size: 14px;
          color: var(--text-light);
          line-height: 1.8;
          font-weight: 300;
          margin: 0;
          transition: color 0.3s ease;
        }

        .bio-area-card:hover p { color: rgba(250,247,242,0.55); }

        .bio-area-arrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--mttf-primary);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          font-weight: 500;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .bio-area-card:hover .bio-area-arrow { opacity: 1; transform: translateX(0); }

        /* Applications */
        .bio-apps {
          background: var(--mttf-text);
          padding: 72px 64px;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .bio-apps { padding: 40px 32px; }
        }

        .bio-apps::before {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%);
        }

        .bio-apps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.07);
          margin-top: 48px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .bio-apps-grid { grid-template-columns: 1fr; }
        }

        .bio-app-item {
          background: rgba(255,255,255,0.02);
          padding: 40px 32px;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .bio-app-item:hover { background: rgba(212,168,67,0.07); }

        .bio-app-emoji {
          font-size: 32px;
          display: block;
          margin-bottom: 20px;
        }

        .bio-app-item h4 {
          font-size: 20px;
          font-weight: 400;
          color: var(--mttf-bg-alt);
          margin: 0 0 10px;
        }

        .bio-app-item p {
          font-size: 13px;
          color: rgba(250,247,242,0.45);
          line-height: 1.8;
          margin: 0;
          font-weight: 300;
        }

        /* CTA */
        .bio-cta {
          background: var(--mttf-primary-light);
          border: 1px solid rgba(212,168,67,0.3);
          border-radius: 4px;
          padding: 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .bio-cta { padding: 48px 32px; }
        }

        .bio-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A843' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .bio-cta h2 {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 300;
          color: var(--mttf-text);
          margin: 0 0 16px;
          position: relative;
        }

        .bio-cta h2 em { font-style: italic; color: #c49a38; }

        .bio-cta p {
          font-size: 15px;
          color: var(--text-mid);
          margin: 0 0 40px;
          font-weight: 300;
          position: relative;
        }

        @media (max-width: 600px) {
          .bio-section { padding: 48px 20px; }
          .bio-section-sm { padding: 0 20px 48px; }
        }
      `}</style>

      <Header />

      <main className="bio-page">
        {/* Hero */}
        <section className="bio-hero">
          <div className="bio-hero-line" />
          <div className="bio-section" style={{ paddingTop: 100, paddingBottom: 88 }}>
            <Link to="/programs/capability" className="bio-back">
              <ArrowLeft />
              Back to Capabilities
            </Link>
            <div className="bio-hero-badge">
              <span className="dot" />
              Life Sciences
            </div>
            <h1>
              Bio<em>informatics</em>
            </h1>
            <p>
              Bridging biology and computational science to analyze biological data
              and advance life sciences research through innovative approaches.
            </p>
            <Link to="/membership" className="bio-btn-primary">
              Get Started
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Overview */}
        <div
          className="bio-section"
          ref={(el) => (observerRefs.current[0] = el)}
          style={{ opacity: isVisible[0] ? 1 : 0, transform: isVisible[0] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}
        >
          <span className="bio-label">About the Field</span>
          <h2 className="bio-section-title">Overview of <em>Bioinformatics</em></h2>
          <div className="bio-divider" />

          <div className="bio-overview">
            <div className="bio-overview-inner">
              <div>
                <p>
                  Our Bioinformatics program combines biology, computer science, and mathematics
                  to understand and analyze complex biological data.
                </p>
                <p>
                  Through interdisciplinary collaboration and cutting-edge research, we empower
                  students and researchers to tackle challenging problems in modern biology and medicine.
                </p>
              </div>
              <div className="bio-quote">
                <p>
                  "Where biology meets computation, breakthroughs are born."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div
          className="bio-section-sm"
          ref={(el) => (observerRefs.current[1] = el)}
          style={{ opacity: isVisible[1] ? 1 : 0, transform: isVisible[1] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.1s' }}
        >
          <div style={{ marginBottom: 40 }}>
            <span className="bio-label">Specializations</span>
            <h2 className="bio-section-title">Research <em>Areas</em></h2>
            <div className="bio-divider" />
          </div>

          <div className="bio-areas-grid">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="bio-area-card">
                  <span className="bio-area-num">{area.number}</span>
                  <div className="bio-area-icon">
                    <Icon />
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <div className="bio-area-arrow">
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

        {/* Applications */}
        <div
          className="bio-section-sm"
          ref={(el) => (observerRefs.current[2] = el)}
          style={{ opacity: isVisible[2] ? 1 : 0, transform: isVisible[2] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.2s' }}
        >
          <div className="bio-apps">
            <span className="bio-label" style={{ color: 'var(--mttf-primary)' }}>Impact</span>
            <h2 className="bio-section-title" style={{ color: 'var(--mttf-bg-alt)' }}>
              Real-World <em>Applications</em>
            </h2>
            <p style={{ color: 'rgba(250,247,242,0.5)', fontSize: 14, lineHeight: 1.9, maxWidth: 500, fontWeight: 300 }}>
              Bioinformatics plays a crucial role in advancing healthcare, agriculture, and environmental conservation.
            </p>

            <div className="bio-apps-grid">
              {applications.map((app, i) => (
                <div key={i} className="bio-app-item">
                  <span className="bio-app-emoji">{app.icon}</span>
                  <h4>{app.title}</h4>
                  <p>{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="bio-section-sm"
          ref={(el) => (observerRefs.current[3] = el)}
          style={{ opacity: isVisible[3] ? 1 : 0, transform: isVisible[3] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s' }}
        >
          <div className="bio-cta">
            <span className="bio-label" style={{ position: 'relative' }}>Community</span>
            <h2>Shape the Future of <em>Life Sciences</em></h2>
            <p>Join our bioinformatics community and contribute to groundbreaking discoveries.</p>
            <Link to="/membership" className="bio-btn-primary" style={{ position: 'relative' }}>
              Get Started
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Bioinformatics;