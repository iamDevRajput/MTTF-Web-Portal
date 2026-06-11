import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, PieChart, LineChart, Database, ArrowLeft, TrendingUp, Activity, Layers } from 'lucide-react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

function DataAnalytics() {
  const [isVisible, setIsVisible] = useState({});
  const [chartProgress, setChartProgress] = useState([]);
  const observerRefs = useRef([]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;0,900;1,600&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [index]: true }));
              if (index === 1) setTimeout(() => setChartProgress([0, 1, 2, 3]), 300);
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

  const capabilities = [
    {
      icon: PieChart,
      num: '01',
      title: 'Descriptive Analytics',
      description: 'Understanding historical data patterns through visualization and statistical summaries.',
      percentage: 85,
    },
    {
      icon: Database,
      num: '02',
      title: 'Diagnostic Analytics',
      description: 'Identifying causes and correlations to understand why events occurred.',
      percentage: 92,
    },
    {
      icon: LineChart,
      num: '03',
      title: 'Predictive Analytics',
      description: 'Forecasting trends using ML models and statistical algorithms.',
      percentage: 88,
    },
    {
      icon: BarChart3,
      num: '04',
      title: 'Prescriptive Analytics',
      description: 'Optimizing decisions and outcomes through advanced modeling.',
      percentage: 95,
    },
  ];

  const metrics = [
    { value: '10TB+', label: 'Data Processed', icon: Database },
    { value: '95%',   label: 'Accuracy',       icon: TrendingUp },
    { value: '1M+',   label: 'Insights',       icon: Activity },
    { value: '24/7',  label: 'Analysis',       icon: Layers },
  ];

  const industries = [
    { name: 'E-Commerce', impact: 'Customer behavior & sales optimization',     icon: TrendingUp },
    { name: 'Healthcare', impact: 'Patient outcomes & operational efficiency',   icon: Activity },
    { name: 'Finance',    impact: 'Risk assessment & fraud detection',           icon: BarChart3 },
  ];

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGold {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 1000; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0);   opacity: 0.3; }
          50%       { transform: translateY(-8px); opacity: 0.7; }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%,-50%) rotate(0deg);   }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }

        .da-page { background: #F7F3EA; color: #1C1208; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .gold-rule { height: 1px; background: linear-gradient(90deg, transparent, #C9A84C70, transparent); }

        .eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.22em;
          color: #C9A84C; text-transform: uppercase; font-weight: 500;
          display: flex; align-items: center; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;
        }
        .eyebrow-line { display: inline-block; width: 28px; height: 1px; background: #C9A84C; }

        .cap-card {
          background: #FAF8F2; border: 1px solid #E8E0CC; border-radius: 4px;
          padding: 2.25rem; position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .cap-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, #E8C96A, transparent);
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .cap-card:hover::before { width: 100%; }
        .cap-card:hover { border-color: #C9A84C; transform: translateY(-5px); box-shadow: 0 20px 44px rgba(139,109,56,0.12); background: #FEFCF7; }

        .ind-card {
          background: #FAF8F2; border: 1px solid #E8E0CC; border-radius: 4px;
          padding: 2rem; position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .ind-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .ind-card:hover::after { transform: scaleX(1); }
        .ind-card:hover { border-color: #C9A84C; transform: translateY(-4px); box-shadow: 0 16px 36px rgba(139,109,56,0.1); }

        .stat-pill {
          background: #FAF8F2; border: 1px solid #E8E0CC; border-radius: 4px;
          padding: 1.25rem 1.5rem; text-align: center;
          transition: all 0.35s ease; cursor: default;
        }
        .stat-pill:hover { border-color: #C9A84C; transform: translateY(-3px); box-shadow: 0 12px 28px rgba(139,109,56,0.1); }

        .btn-gold {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2.25rem; background: #C9A84C; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: 1px solid #C9A84C; border-radius: 2px;
          cursor: pointer; transition: all 0.35s ease; text-decoration: none;
        }
        .btn-gold:hover { background: #B8965A; border-color: #B8965A; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(201,168,76,0.28); }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F7F3EA; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }
      `}</style>

      <div className="da-page">
        <Header />

        {/* ── Breadcrumb ── */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '7rem 2rem 1.5rem' }}>
          <Link
            to="/programs/capability"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem',
              color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#8B6D38'}
            onMouseLeave={e => e.currentTarget.style.color = '#C9A84C'}
          >
            <ArrowLeft size={14} />
            Back to Capabilities
          </Link>
        </div>

        {/* ── Hero ── */}
        <section
          ref={el => (observerRefs.current[0] = el)}
          style={{
            position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(158deg, #F7F3EA 0%, #EDE5CC 55%, #E4D5A8 100%)',
            padding: '3.5rem 2rem 5.5rem', textAlign: 'center',
            borderBottom: '1px solid #D8CBA8',
          }}
        >
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(201,168,76,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.05) 1px,transparent 1px)`,
            backgroundSize: '72px 72px', pointerEvents: 'none',
          }} />
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)', width: '700px', height: '420px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Rotating rings */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '460px', height: '460px', border: '1px solid rgba(201,168,76,0.08)', borderRadius: '50%', animation: 'rotateSlow 40s linear infinite', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '640px', height: '640px', border: '1px dashed rgba(201,168,76,0.05)', borderRadius: '50%', animation: 'rotateSlow 65s linear infinite reverse', pointerEvents: 'none' }} />
          {/* Corner brackets */}
          {[
            { top:'1.8rem', left:'1.8rem', borderTop:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
            { top:'1.8rem', right:'1.8rem', borderTop:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
            { bottom:'1.8rem', left:'1.8rem', borderBottom:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
            { bottom:'1.8rem', right:'1.8rem', borderBottom:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
          ].map((s,i) => <div key={i} style={{ position:'absolute', width:52, height:52, opacity:0.45, ...s }} />)}

          <div style={{
            position: 'relative', zIndex: 1,
            opacity: isVisible[0] ? 1 : 0,
            transform: isVisible[0] ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}>
            {/* Icon */}
            <div style={{
              width: '64px', height: '64px', margin: '0 auto 1.75rem',
              background: '#F5EFD8', border: '1px solid #E8D89A',
              borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#C9A84C',
            }}>
              <BarChart3 size={28} />
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '2px', padding: '0.4rem 1.2rem', marginBottom: '1.75rem',
            }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#C9A84C', display:'inline-block', animation:'pulseGold 2s ease infinite' }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.65rem', color:'#8B6D38', letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:500 }}>
                Analytics & Intelligence
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.4rem,6vw,5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', color:'#1C1208', marginBottom:'0.4rem' }}>
              Data
            </h1>
            <h1 style={{
              fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.4rem,6vw,5rem)',
              fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', marginBottom:'1.25rem', fontStyle:'italic',
              background:'linear-gradient(135deg,#C9A84C 0%,#8B6D38 40%,#E8C96A 100%)', backgroundSize:'200% auto',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite',
            }}>
              Analytics
            </h1>

            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.95rem', color:'#6B5C3E', maxWidth:'560px', margin:'0 auto 3rem', lineHeight:1.8, fontWeight:300 }}>
              Turning data into actionable intelligence through advanced analytics and visualization.
            </p>

            {/* Metrics strip */}
            <div style={{
              display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem',
              maxWidth: '680px', margin: '0 auto',
            }}>
              {metrics.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div className="stat-pill" key={i} style={{ flex: '1 1 130px' }}>
                    <Icon size={16} color="#C9A84C" style={{ margin: '0 auto 0.4rem', display: 'block' }} />
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.6rem', fontWeight:700, color:'#C9A84C', lineHeight:1 }}>{m.value}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', color:'#9C8B6E', letterSpacing:'0.14em', textTransform:'uppercase', marginTop:'0.25rem', fontWeight:500 }}>{m.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Analytics Journey ── */}
        <section style={{ padding: '5rem 2rem', background: '#FEFCF5' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="eyebrow" style={{ justifyContent: 'flex-start' }}>
                <span className="eyebrow-line" />
                Overview
              </div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:700, color:'#1C1208', letterSpacing:'-0.02em', margin:'0 0 1.5rem', lineHeight:1.15 }}>
                The Analytics{' '}
                <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Journey</span>
              </h2>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.9rem', color:'#6B5C3E', lineHeight:1.8, marginBottom:'0.75rem', fontWeight:300 }}>
                From raw data to strategic insights, our comprehensive analytics approach helps organizations make data-driven decisions.
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.9rem', color:'#6B5C3E', lineHeight:1.8, fontWeight:300 }}>
                We combine descriptive, diagnostic, predictive, and prescriptive analytics to deliver complete business intelligence solutions.
              </p>
            </div>

            {/* SVG Chart */}
            <div style={{
              background: '#FAF8F2', border: '1px solid #E8E0CC', borderRadius: '4px',
              padding: '1.75rem', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', color:'#C9A84C', letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:500, marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ width:16, height:1, background:'#C9A84C', display:'inline-block' }} />
                Analytics Trend
              </div>
              <svg viewBox="0 0 300 160" style={{ width:'100%' }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d="M0,120 L50,95 L100,110 L150,60 L200,78 L250,42 L300,65 L300,160 L0,160 Z" fill="url(#areaGrad)" />
                <path d="M0,120 L50,95 L100,110 L150,60 L200,78 L250,42 L300,65" fill="none" stroke="#C9A84C" strokeWidth="2"
                  strokeDasharray="1000" style={{ animation: isVisible[0] ? 'drawLine 2s ease-out forwards' : 'none' }} />
                {[0,50,100,150,200,250,300].map((x,i) => {
                  const ys = [120,95,110,60,78,42,65];
                  return <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#C9A84C" style={{ animation:'pulseGold 2s ease-in-out infinite', animationDelay:`${i*0.2}s` }} />;
                })}
                {/* Y-axis guide lines */}
                {[40,80,120].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(201,168,76,0.08)" strokeWidth="1" />)}
              </svg>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'0.5rem' }}>
                {['Q1','Q2','Q3','Q4','Q5','Q6','Q7'].map(q => (
                  <span key={q} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', color:'#C4B08A', letterSpacing:'0.08em' }}>{q}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Capabilities ── */}
        <section
          ref={el => (observerRefs.current[1] = el)}
          style={{ padding: '5rem 2rem' }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="eyebrow"><span className="eyebrow-line" />Capabilities<span className="eyebrow-line" /></div>
            <h2 style={{
              fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700,
              color:'#1C1208', textAlign:'center', marginBottom:'3rem', letterSpacing:'-0.02em',
            }}>
              Our Analytics{' '}
              <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Capabilities</span>
            </h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.5rem' }}>
              {capabilities.map((cap, i) => (
                <CapabilityCard key={i} cap={cap} index={i} animated={chartProgress.includes(i)} visible={isVisible[1]} />
              ))}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Industries ── */}
        <section style={{ background: '#FEFCF5', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="eyebrow"><span className="eyebrow-line" />Applications<span className="eyebrow-line" /></div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, color:'#1C1208', textAlign:'center', marginBottom:'3rem', letterSpacing:'-0.02em' }}>
              Industry{' '}
              <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Applications</span>
            </h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1.5rem' }}>
              {industries.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div className="ind-card" key={i} style={{ animationDelay:`${i*0.08}s`, animation:'fadeUp 0.6s ease both' }}>
                    <div style={{ position:'absolute', top:0, right:0, width:18, height:18, background:'#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)' }} />
                    <div style={{ width:'44px', height:'44px', background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem', color:'#C9A84C' }}>
                      <Icon size={20} />
                    </div>
                    <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.25rem', fontWeight:700, color:'#1C1208', margin:'0 0 0.5rem' }}>{ind.name}</h4>
                    <div style={{ height:'1px', background:'#EDE4CC', marginBottom:'0.75rem' }} />
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.85rem', color:'#6B5C3E', lineHeight:1.75, margin:0, fontWeight:300 }}>{ind.impact}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── CTA ── */}
        <section style={{ padding: '5rem 2rem', background: '#F7F3EA' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(158deg,#1C1208 0%,#2E1F08 100%)',
              border: '1px solid #3D2A0A', borderRadius: '4px',
              padding: '4rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
              {[
                { top:'1.2rem', left:'1.2rem', borderTop:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { top:'1.2rem', right:'1.2rem', borderTop:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
                { bottom:'1.2rem', left:'1.2rem', borderBottom:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { bottom:'1.2rem', right:'1.2rem', borderBottom:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
              ].map((s,i) => <div key={i} style={{ position:'absolute', width:36, height:36, ...s }} />)}

              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'1.25rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}>
                <span style={{ display:'inline-block', width:22, height:1, background:'#C9A84C' }} />
                Get Started
                <span style={{ display:'inline-block', width:22, height:1, background:'#C9A84C' }} />
              </div>

              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:'#F7F3EA', letterSpacing:'-0.02em', margin:'0 0 1rem' }}>
                Unlock the Power of{' '}
                <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#C9A84C,#E8C96A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Your Data
                </span>
              </h2>

              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.92rem', color:'rgba(247,243,234,0.55)', maxWidth:'480px', margin:'0 auto 2.5rem', lineHeight:1.78, fontWeight:300 }}>
                Start your analytics journey and transform raw data into strategic insights.
              </p>

              <Link to="/membership" className="btn-gold">
                Get Started Now
                <TrendingUp size={14} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// ── Capability Card ──
function CapabilityCard({ cap, index, animated, visible }) {
  const [hovered, setHovered] = useState(false);
  const Icon = cap.icon;
  const circumference = 2 * Math.PI * 26;

  return (
    <div
      className="cap-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${index*0.12}s, transform 0.7s ease ${index*0.12}s, border-color 0.4s, box-shadow 0.4s, background 0.4s`,
      }}
    >
      {/* Clipped corner */}
      <div style={{ position:'absolute', top:0, right:0, width:18, height:18, background: hovered ? '#C9A84C' : '#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)', transition:'background 0.3s' }} />

      {/* Header row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.7rem', color:'#C9A84C', letterSpacing:'0.15em', fontWeight:600 }}>{cap.num}</span>
          <div style={{
            width:'44px', height:'44px', background: hovered ? '#FDF5E0' : '#F5EFD8',
            border:'1px solid #E8D89A', borderRadius:'4px',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#C9A84C',
            transition:'all 0.3s', transform: hovered ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
          }}>
            <Icon size={20} />
          </div>
        </div>

        {/* Progress circle */}
        <div style={{ position:'relative', width:52, height:52 }}>
          <svg width="52" height="52" style={{ transform:'rotate(-90deg)' }}>
            <circle cx="26" cy="26" r="22" stroke="rgba(201,168,76,0.12)" strokeWidth="3" fill="none" />
            <circle
              cx="26" cy="26" r="22"
              stroke="#C9A84C" strokeWidth="3" fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - (animated ? cap.percentage : 0) / 100)}
              style={{ transition:'stroke-dashoffset 1.2s ease-out' }}
            />
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cormorant Garamond',serif", fontSize:'0.75rem', fontWeight:700, color:'#C9A84C' }}>
            {cap.percentage}%
          </div>
        </div>
      </div>

      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', fontWeight:700, color:'#1C1208', margin:'0 0 0.5rem', letterSpacing:'-0.01em', lineHeight:1.2 }}>
        {cap.title}
      </h3>

      {/* Divider */}
      <div style={{ height:'1px', background: hovered ? 'linear-gradient(90deg,#C9A84C40,transparent)' : '#EDE4CC', marginBottom:'0.85rem', transition:'background 0.3s' }} />

      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.85rem', color:'#6B5C3E', lineHeight:1.8, margin:'0 0 1.25rem', fontWeight:300 }}>
        {cap.description}
      </p>

      {/* Mini bar chart */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:'3px', height:'28px' }}>
        {[65,80,45,90,55,75,85,60].map((h, idx) => (
          <div key={idx} style={{
            flex:1, background: hovered ? 'linear-gradient(180deg,#C9A84C,#E8C97A)' : 'linear-gradient(180deg,#D8CBA8,#EDE4CC)',
            borderRadius:'2px 2px 0 0',
            height: animated ? `${h}%` : '0%',
            transition: `height 0.8s ease ${idx*0.06}s, background 0.3s`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default DataAnalytics;