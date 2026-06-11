import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart, Target, Database, ArrowLeft, LineChart, PieChart } from 'lucide-react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

function BusinessIntelligence() {
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

  const services = [
    {
      icon: BarChart,
      title: "Data Visualization",
      description: "Interactive dashboards, real-time reporting, and visual analytics for better decision-making.",
      stats: "95%",
      statLabel: "Clarity",
      number: "01",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecasting future trends, behavior prediction, and advanced statistical modeling.",
      stats: "87%",
      statLabel: "Accuracy",
      number: "02",
    },
    {
      icon: Target,
      title: "Performance Metrics",
      description: "KPI tracking, performance monitoring, and strategic business intelligence solutions.",
      stats: "92%",
      statLabel: "Efficiency",
      number: "03",
    },
    {
      icon: Database,
      title: "Data Warehousing",
      description: "Centralized data management, ETL processes, and enterprise data integration.",
      stats: "99%",
      statLabel: "Reliability",
      number: "04",
    }
  ];

  const benefits = [
    { label: "Faster Decisions", value: "3x", icon: TrendingUp },
    { label: "Cost Reduction", value: "40%", icon: Target },
    { label: "Data Accuracy", value: "99%", icon: BarChart },
    { label: "ROI Increase", value: "250%", icon: LineChart }
  ];

  const useCases = [
    { title: "Retail Analytics", desc: "Customer behavior tracking and sales optimization", icon: "🛒" },
    { title: "Financial Forecasting", desc: "Revenue prediction and risk analysis", icon: "📈" },
    { title: "Healthcare Insights", desc: "Patient data analysis and treatment optimization", icon: "🏥" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .bi-page * { box-sizing: border-box; }

        .bi-page {
          --cream: #FAF7F2;
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

        .bi-page h1, .bi-page h2, .bi-page h3, .bi-page h4 {
          font-family: 'Cormorant Garamond', serif;
        }

        /* Hero */
        .bi-hero {
          background: var(--text-dark);
          min-height: 65vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .bi-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80') center/cover;
          opacity: 0.12;
        }

        .bi-hero-line {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-yellow), transparent);
        }

        .bi-back {
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
          font-family: 'DM Sans', sans-serif;
        }

        .bi-back:hover { color: var(--accent-yellow); }
        .bi-back svg { width: 14px; height: 14px; }

        .bi-hero-badge {
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

        .bi-hero-badge .dot {
          width: 5px; height: 5px;
          background: var(--accent-yellow);
          border-radius: 50%;
          display: inline-block;
        }

        .bi-hero h1 {
          font-size: clamp(44px, 7vw, 88px);
          font-weight: 300;
          color: #FAF7F2;
          line-height: 1.0;
          margin: 0 0 24px;
          letter-spacing: -1px;
          max-width: 800px;
        }

        .bi-hero h1 em {
          font-style: italic;
          color: var(--accent-yellow);
        }

        .bi-hero p {
          font-size: 16px;
          color: rgba(250,247,242,0.6);
          max-width: 520px;
          line-height: 1.9;
          font-weight: 300;
          margin: 0 0 40px;
        }

        .bi-btn-primary {
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

        .bi-btn-primary:hover {
          background: #c49a38;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(212,168,67,0.3);
        }

        /* Sections */
        .bi-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .bi-section-sm {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        .bi-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent-yellow);
          font-weight: 500;
          margin-bottom: 16px;
          display: block;
          font-family: 'DM Sans', sans-serif;
        }

        .bi-section-title {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 300;
          color: var(--text-dark);
          line-height: 1.1;
          margin: 0 0 20px;
        }

        .bi-section-title em {
          font-style: italic;
          color: var(--accent-yellow);
        }

        .bi-divider {
          width: 60px;
          height: 1px;
          background: var(--accent-yellow);
          margin: 0 0 48px;
        }

        /* Metrics strip */
        .bi-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          background: var(--warm-white);
        }

        @media (max-width: 768px) {
          .bi-metrics { grid-template-columns: repeat(2, 1fr); }
        }

        .bi-metric {
          padding: 36px 32px;
          border-right: 1px solid var(--border);
          text-align: center;
          transition: background 0.3s ease;
          cursor: default;
        }

        .bi-metric:last-child { border-right: none; }
        .bi-metric:hover { background: var(--accent-yellow-light); }

        .bi-metric-icon {
          width: 36px; height: 36px;
          color: var(--accent-yellow);
          margin: 0 auto 12px;
        }

        .bi-metric .val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 300;
          color: var(--text-dark);
          display: block;
          line-height: 1;
          margin-bottom: 6px;
        }

        .bi-metric .lbl {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-light);
          font-weight: 500;
        }

        /* Overview split */
        .bi-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .bi-overview { grid-template-columns: 1fr; }
        }

        .bi-overview-text {
          background: var(--warm-white);
          padding: 56px;
        }

        .bi-overview-text p {
          font-size: 15px;
          color: var(--text-mid);
          line-height: 1.9;
          margin: 0 0 16px;
          font-weight: 300;
        }

        .bi-overview-chart {
          background: var(--text-dark);
          padding: 56px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 12px;
        }

        .bi-chart-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bi-chart-bar-label {
          font-size: 11px;
          color: rgba(250,247,242,0.5);
          width: 80px;
          text-align: right;
          font-weight: 300;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .bi-chart-bar-track {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }

        .bi-chart-bar-fill {
          height: 100%;
          background: var(--accent-yellow);
          border-radius: 3px;
          transition: width 1.2s ease;
        }

        .bi-chart-bar-val {
          font-size: 12px;
          color: var(--accent-yellow);
          font-weight: 500;
          width: 36px;
          flex-shrink: 0;
        }

        /* Services list */
        .bi-services-list {
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          background: var(--warm-white);
        }

        .bi-service-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 32px;
          align-items: center;
          padding: 40px 48px;
          border-bottom: 1px solid var(--border);
          transition: background 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .bi-service-item:last-child { border-bottom: none; }

        .bi-service-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--accent-yellow);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .bi-service-item:hover { background: #fdfaf5; }
        .bi-service-item:hover::before { transform: scaleY(1); }

        .bi-service-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 300;
          color: var(--border);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .bi-service-item:hover .bi-service-num { color: var(--accent-yellow); }

        .bi-service-icon {
          width: 44px; height: 44px;
          background: var(--accent-yellow-light);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.3s ease;
        }

        .bi-service-item:hover .bi-service-icon { background: var(--accent-yellow); }
        .bi-service-item:hover .bi-service-icon svg { color: var(--text-dark); }
        .bi-service-icon svg { width: 20px; height: 20px; color: var(--accent-yellow); transition: color 0.3s ease; }

        .bi-service-body {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
        }

        .bi-service-text h3 {
          font-size: 22px;
          font-weight: 400;
          color: var(--text-dark);
          margin: 0 0 6px;
        }

        .bi-service-text p {
          font-size: 13px;
          color: var(--text-light);
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
          max-width: 360px;
        }

        .bi-service-stat {
          text-align: right;
          flex-shrink: 0;
        }

        .bi-service-stat .val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: var(--accent-yellow);
          display: block;
          line-height: 1;
        }

        .bi-service-stat .lbl {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-light);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .bi-service-item { grid-template-columns: 1fr; padding: 32px; gap: 16px; }
          .bi-service-body { flex-direction: column; align-items: flex-start; }
        }

        /* Use cases */
        .bi-usecases {
          background: var(--text-dark);
          padding: 72px 64px;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .bi-usecases { padding: 40px 32px; }
        }

        .bi-usecases-grid {
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
          .bi-usecases-grid { grid-template-columns: 1fr; }
        }

        .bi-usecase-item {
          background: rgba(255,255,255,0.02);
          padding: 40px 32px;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .bi-usecase-item:hover { background: rgba(212,168,67,0.07); }
        .bi-usecase-emoji { font-size: 32px; display: block; margin-bottom: 20px; }

        .bi-usecase-item h4 {
          font-size: 20px;
          font-weight: 400;
          color: var(--cream);
          margin: 0 0 10px;
        }

        .bi-usecase-item p {
          font-size: 13px;
          color: rgba(250,247,242,0.45);
          line-height: 1.8;
          margin: 0;
          font-weight: 300;
        }

        /* CTA */
        .bi-cta {
          background: var(--accent-yellow-light);
          border: 1px solid rgba(212,168,67,0.3);
          border-radius: 4px;
          padding: 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .bi-cta { padding: 48px 32px; }
        }

        .bi-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A843' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .bi-cta h2 {
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 300;
          color: var(--text-dark);
          margin: 0 0 16px;
          position: relative;
        }

        .bi-cta h2 em { font-style: italic; color: #c49a38; }

        .bi-cta p {
          font-size: 15px;
          color: var(--text-mid);
          margin: 0 0 40px;
          font-weight: 300;
          position: relative;
        }

        @media (max-width: 600px) {
          .bi-section { padding: 48px 20px; }
          .bi-section-sm { padding: 0 20px 48px; }
        }
      `}</style>

      <Header />

      <div className="bi-page">
        {/* Hero */}
        <section className="bi-hero">
          <div className="bi-hero-line" />
          <div className="bi-section" style={{ paddingTop: 100, paddingBottom: 88 }}>
            <Link to="/programs/capability" className="bi-back">
              <ArrowLeft />
              Back to Capabilities
            </Link>
            <div className="bi-hero-badge">
              <span className="dot" />
              Analytics & Strategy
            </div>
            <h1>
              Business <em>Intelligence</em>
            </h1>
            <p>
              Transform data into actionable insights and drive strategic decision-making
              with cutting-edge analytics.
            </p>
            <Link to="/membership" className="bi-btn-primary">
              Get Started Today
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Metrics */}
        <div
          className="bi-section"
          ref={(el) => (observerRefs.current[0] = el)}
          style={{ opacity: isVisible[0] ? 1 : 0, transform: isVisible[0] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}
        >
          <div className="bi-metrics">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="bi-metric">
                  <Icon className="bi-metric-icon" />
                  <span className="val">{b.value}</span>
                  <span className="lbl">{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overview */}
        <div
          className="bi-section-sm"
          ref={(el) => (observerRefs.current[1] = el)}
          style={{ opacity: isVisible[1] ? 1 : 0, transform: isVisible[1] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.1s' }}
        >
          <div style={{ marginBottom: 40 }}>
            <span className="bi-label">Why It Matters</span>
            <h2 className="bi-section-title">Why Business <em>Intelligence?</em></h2>
            <div className="bi-divider" />
          </div>

          <div className="bi-overview">
            <div className="bi-overview-text">
              <p>
                In today's data-driven world, organizations need powerful tools to extract
                meaningful insights from their data and make informed decisions quickly.
              </p>
              <p>
                Our BI solutions combine advanced analytics, intuitive visualization, and
                predictive modeling to give you a competitive edge.
              </p>
            </div>
            <div className="bi-overview-chart">
              <p style={{ color: 'rgba(250,247,242,0.4)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 20px', fontFamily: 'DM Sans', fontWeight: 500 }}>
                Performance Overview
              </p>
              {[
                { label: 'Q1', val: 65 },
                { label: 'Q2', val: 78 },
                { label: 'Q3', val: 85 },
                { label: 'Q4', val: 92 },
              ].map((bar, i) => (
                <div key={i} className="bi-chart-bar-row">
                  <span className="bi-chart-bar-label">{bar.label}</span>
                  <div className="bi-chart-bar-track">
                    <div
                      className="bi-chart-bar-fill"
                      style={{ width: isVisible[1] ? `${bar.val}%` : '0%', transitionDelay: `${i * 150}ms` }}
                    />
                  </div>
                  <span className="bi-chart-bar-val">{bar.val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div
          className="bi-section-sm"
          ref={(el) => (observerRefs.current[2] = el)}
          style={{ opacity: isVisible[2] ? 1 : 0, transform: isVisible[2] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.1s' }}
        >
          <div style={{ marginBottom: 40 }}>
            <span className="bi-label">What We Offer</span>
            <h2 className="bi-section-title">Our <em>Services</em></h2>
            <div className="bi-divider" />
          </div>

          <div className="bi-services-list">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bi-service-item">
                  <span className="bi-service-num">{s.number}</span>
                  <div className="bi-service-body">
                    <div className="bi-service-icon">
                      <Icon />
                    </div>
                    <div className="bi-service-text">
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                    </div>
                  </div>
                  <div className="bi-service-stat">
                    <span className="val">{s.stats}</span>
                    <span className="lbl">{s.statLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Use Cases */}
        <div
          className="bi-section-sm"
          ref={(el) => (observerRefs.current[3] = el)}
          style={{ opacity: isVisible[3] ? 1 : 0, transform: isVisible[3] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.2s' }}
        >
          <div className="bi-usecases">
            <span className="bi-label" style={{ color: 'var(--accent-yellow)' }}>Applications</span>
            <h2 className="bi-section-title" style={{ color: 'var(--cream)' }}>
              Real-World <em>Applications</em>
            </h2>
            <p style={{ color: 'rgba(250,247,242,0.5)', fontSize: 14, lineHeight: 1.9, maxWidth: 480, fontWeight: 300 }}>
              Start leveraging business intelligence to make smarter decisions and drive growth.
            </p>

            <div className="bi-usecases-grid">
              {useCases.map((uc, i) => (
                <div key={i} className="bi-usecase-item">
                  <span className="bi-usecase-emoji">{uc.icon}</span>
                  <h4>{uc.title}</h4>
                  <p>{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="bi-section-sm"
          ref={(el) => (observerRefs.current[4] = el)}
          style={{ opacity: isVisible[4] ? 1 : 0, transform: isVisible[4] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s' }}
        >
          <div className="bi-cta">
            <span className="bi-label" style={{ position: 'relative' }}>Get Started</span>
            <h2>Ready to Transform <em>Your Data?</em></h2>
            <p>Start leveraging business intelligence to make smarter decisions and drive growth.</p>
            <Link to="/membership" className="bi-btn-primary" style={{ position: 'relative' }}>
              Get Started Today
              <TrendingUp style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BusinessIntelligence;