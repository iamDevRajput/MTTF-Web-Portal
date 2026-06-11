import React from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

function About() {
  return (
    <>
      <Header />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,700;0,900;1,600;1,700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseGold {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        .about-page {
          background: #F7F3EA;
          color: #1C1208;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          padding-top: 5rem;
        }

        /* ── Utility ── */
        .gold-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C70, transparent);
          margin: 0;
        }
        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          color: #C9A84C;
          text-transform: uppercase;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .eyebrow-line {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #C9A84C;
        }

        /* ── Luxury button ── */
        .btn-dark {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2.25rem;
          background: #1C1208;
          color: #F7F3EA;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid #1C1208;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.35s ease;
          text-decoration: none;
        }
        .btn-dark:hover {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(201,168,76,0.28);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2.25rem;
          background: transparent;
          color: #1C1208;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid #C9A84C;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .btn-outline:hover {
          background: #C9A84C;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(201,168,76,0.2);
        }

        /* ── Cards ── */
        .mv-card {
          background: #FAF8F2;
          border: 1px solid #E8E0CC;
          border-radius: 4px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .mv-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, #E8C96A, transparent);
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .mv-card:hover::before { width: 100%; }
        .mv-card:hover {
          border-color: #C9A84C;
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(139,109,56,0.13);
          background: #FEFCF7;
        }

        .value-card {
          background: #FAF8F2;
          border: 1px solid #E8E0CC;
          border-radius: 4px;
          padding: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .value-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .value-card:hover::after { width: 100%; }
        .value-card:hover {
          border-color: #C9A84C;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(139,109,56,0.12);
          background: #FEFCF7;
        }

        .what-card {
          background: #FAF8F2;
          border: 1px solid #E8E0CC;
          border-radius: 4px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          animation: fadeUp 0.6s ease both;
        }
        .what-card:hover {
          border-color: #C9A84C;
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(139,109,56,0.13);
          background: #FEFCF7;
        }

        .stat-item { text-align: center; padding: 1.5rem 2rem; position: relative; }
        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          height: 40px; width: 1px;
          background: #D8CBA8;
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F7F3EA; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }
      `}</style>

      <div className="about-page">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(158deg, #F7F3EA 0%, #EDE5CC 55%, #E4D5A8 100%)',
          padding: '6rem 1.5rem 5rem',
          textAlign: 'center',
          borderBottom: '1px solid #D8CBA8',
        }}>
          {/* Corner brackets */}
          {[
            { top:'1.8rem', left:'1.8rem', borderTop:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
            { top:'1.8rem', right:'1.8rem', borderTop:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
            { bottom:'1.8rem', left:'1.8rem', borderBottom:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
            { bottom:'1.8rem', right:'1.8rem', borderBottom:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
          ].map((s, i) => (
            <div key={i} style={{ position:'absolute', width:52, height:52, opacity:0.45, ...s }} />
          ))}

          {/* Warm glow */}
          <div style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            width:'700px', height:'400px',
            background:'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
            pointerEvents:'none',
          }} />

          <div style={{ position:'relative', zIndex:1, animation:'fadeUp 0.9s ease both' }}>
            {/* Badge */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'0.65rem',
              background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)',
              borderRadius:'2px', padding:'0.4rem 1.2rem', marginBottom:'1.75rem',
            }}>
              <span style={{
                width:5, height:5, borderRadius:'50%', background:'#C9A84C',
                display:'inline-block', animation:'pulseGold 2s ease infinite',
              }} />
              <span style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem',
                color:'#8B6D38', letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:500,
              }}>
                🏛️ About MTTF
              </span>
            </div>

            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:'clamp(2.6rem, 6.5vw, 5.2rem)',
              fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em',
              color:'#1C1208', marginBottom:'0.5rem',
            }}>
              MathTech Thinking
            </h1>
            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:'clamp(2.6rem, 6.5vw, 5.2rem)',
              fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em',
              marginBottom:'1.5rem',
              background:'linear-gradient(135deg, #C9A84C 0%, #8B6D38 40%, #E8C96A 100%)',
              backgroundSize:'200% auto',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              animation:'shimmer 4s linear infinite',
              fontStyle:'italic',
            }}>
              Foundation
            </h1>

            <p style={{
              fontFamily:"'DM Sans', sans-serif", fontSize:'1.1rem',
              color:'#6B5C3E', maxWidth:'560px', margin:'0 auto',
              lineHeight:1.75, fontWeight:300,
            }}>
              Empowering the next generation of mathematical thinkers and technology innovators
            </p>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ══════════════════════════════════
            MISSION & VISION
        ══════════════════════════════════ */}
        <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'5rem 1.5rem' }}>
          <div className="eyebrow">
            <span className="eyebrow-line" />
            Our Purpose
            <span className="eyebrow-line" />
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700,
            color:'#1C1208', textAlign:'center', marginBottom:'3rem',
            letterSpacing:'-0.02em',
          }}>
            Mission &{' '}
            <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Vision</span>
          </h2>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem' }}>
            {/* Mission */}
            <div className="mv-card">
              <div style={{
                width:'52px', height:'52px',
                background:'#F5EFD8', border:'1px solid #E8D89A',
                borderRadius:'4px', display:'flex', alignItems:'center',
                justifyContent:'center', marginBottom:'1.25rem',
              }}>
                <svg width="24" height="24" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem',
                letterSpacing:'0.2em', color:'#C9A84C', textTransform:'uppercase',
                fontWeight:500, marginBottom:'0.4rem',
              }}>
                Our Mission
              </div>
              <h3 style={{
                fontFamily:"'Cormorant Garamond', serif", fontSize:'1.6rem',
                fontWeight:700, color:'#1C1208', margin:'0 0 1rem',
              }}>
                Transform Ideas Into Reality
              </h3>
              <div style={{ height:'1px', background:'#E8DFC4', marginBottom:'1rem' }} />
              <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.9rem', color:'#6B5C3E', lineHeight:1.8, margin:0, fontWeight:300 }}>
                To foster mathematical thinking and technological innovation among students and professionals,
                creating a platform where ideas transform into reality through collaborative learning and research.
              </p>
            </div>

            {/* Vision */}
            <div className="mv-card">
              <div style={{
                width:'52px', height:'52px',
                background:'#F5EFD8', border:'1px solid #E8D89A',
                borderRadius:'4px', display:'flex', alignItems:'center',
                justifyContent:'center', marginBottom:'1.25rem',
              }}>
                <svg width="24" height="24" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem',
                letterSpacing:'0.2em', color:'#C9A84C', textTransform:'uppercase',
                fontWeight:500, marginBottom:'0.4rem',
              }}>
                Our Vision
              </div>
              <h3 style={{
                fontFamily:"'Cormorant Garamond', serif", fontSize:'1.6rem',
                fontWeight:700, color:'#1C1208', margin:'0 0 1rem',
              }}>
                A Global Hub of Excellence
              </h3>
              <div style={{ height:'1px', background:'#E8DFC4', marginBottom:'1rem' }} />
              <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.9rem', color:'#6B5C3E', lineHeight:1.8, margin:0, fontWeight:300 }}>
                To become a global hub for mathematical excellence and technological advancement,
                where innovation knows no boundaries and every mind has the opportunity to shine.
              </p>
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ══════════════════════════════════
            CORE VALUES
        ══════════════════════════════════ */}
        <section style={{ background:'#FEFCF5', padding:'5rem 1.5rem' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              What Guides Us
              <span className="eyebrow-line" />
            </div>
            <h2 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700,
              color:'#1C1208', textAlign:'center', marginBottom:'3rem',
              letterSpacing:'-0.02em',
            }}>
              Core{' '}
              <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Values</span>
            </h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem' }}>
              {[
                {
                  label:'Excellence',
                  desc:'Pursuing the highest standards in mathematical thinking and innovation',
                  icon: (
                    <svg width="22" height="22" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  label:'Collaboration',
                  desc:'Building partnerships that foster growth and innovation',
                  icon: (
                    <svg width="22" height="22" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  label:'Learning',
                  desc:'Continuous education and knowledge sharing for all members',
                  icon: (
                    <svg width="22" height="22" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                },
                {
                  label:'Innovation',
                  desc:'Encouraging creative solutions and groundbreaking ideas',
                  icon: (
                    <svg width="22" height="22" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
              ].map((v, i) => (
                <div
                  className="value-card"
                  key={v.label}
                  style={{ animationDelay:`${i*0.08}s`, animation:'fadeUp 0.6s ease both' }}
                >
                  {/* Clipped corner */}
                  <div style={{
                    position:'absolute', top:0, right:0, width:16, height:16,
                    background:'#E8DFC4', clipPath:'polygon(100% 0, 0 0, 100% 100%)',
                    transition:'background 0.3s',
                  }} />

                  <div style={{
                    width:'48px', height:'48px',
                    background:'#F5EFD8', border:'1px solid #E8D89A',
                    borderRadius:'4px', display:'flex', alignItems:'center',
                    justifyContent:'center', margin:'0 auto 1.25rem',
                  }}>
                    {v.icon}
                  </div>
                  <h3 style={{
                    fontFamily:"'Cormorant Garamond', serif", fontSize:'1.25rem',
                    fontWeight:700, color:'#1C1208', marginBottom:'0.5rem',
                  }}>
                    {v.label}
                  </h3>
                  <p style={{
                    fontFamily:"'DM Sans', sans-serif", fontSize:'0.83rem',
                    color:'#6B5C3E', lineHeight:1.7, margin:0, fontWeight:300,
                  }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ══════════════════════════════════
            WHAT WE DO
        ══════════════════════════════════ */}
        <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'5rem 1.5rem' }}>
          <div className="eyebrow">
            <span className="eyebrow-line" />
            Our Services
            <span className="eyebrow-line" />
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700,
            color:'#1C1208', textAlign:'center', marginBottom:'3rem',
            letterSpacing:'-0.02em',
          }}>
            What We{' '}
            <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Do</span>
          </h2>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            {[
              {
                num:'01',
                title:'Research & Development',
                desc:'Conducting cutting-edge research in mathematics and technology, pushing the boundaries of what\'s possible.',
                icon:(
                  <svg width="24" height="24" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
              },
              {
                num:'02',
                title:'Education & Training',
                desc:'Providing comprehensive training programs, workshops, and courses to enhance mathematical and technological skills.',
                icon:(
                  <svg width="24" height="24" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                num:'03',
                title:'Consultancy Services',
                desc:'Offering expert consultancy services to organizations seeking mathematical and technological solutions.',
                icon:(
                  <svg width="24" height="24" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                className="what-card"
                key={item.num}
                style={{ animationDelay:`${i*0.1}s` }}
              >
                <div style={{
                  display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem',
                }}>
                  <span style={{
                    fontFamily:"'Cormorant Garamond', serif", fontSize:'0.75rem',
                    fontWeight:700, color:'#C9A84C', letterSpacing:'0.1em',
                  }}>
                    {item.num}
                  </span>
                  <span style={{ flex:1, height:'1px', background:'#E8DFC4' }} />
                  <div style={{
                    width:'44px', height:'44px', background:'#F5EFD8',
                    border:'1px solid #E8D89A', borderRadius:'4px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    {item.icon}
                  </div>
                </div>
                <h3 style={{
                  fontFamily:"'Cormorant Garamond', serif", fontSize:'1.4rem',
                  fontWeight:700, color:'#1C1208', margin:'0 0 0.75rem',
                  letterSpacing:'-0.01em',
                }}>
                  {item.title}
                </h3>
                <div style={{ height:'1px', background:'#E8DFC4', marginBottom:'0.85rem' }} />
                <p style={{
                  fontFamily:"'DM Sans', sans-serif", fontSize:'0.875rem',
                  color:'#6B5C3E', lineHeight:1.8, margin:0, fontWeight:300,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="gold-rule" />

        {/* ══════════════════════════════════
            IMPACT / STATS
        ══════════════════════════════════ */}
        <section style={{ background:'#FEFCF5', padding:'5rem 1.5rem', borderBottom:'1px solid #E8DFC4' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Our Impact
              <span className="eyebrow-line" />
            </div>
            <h2 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700,
              color:'#1C1208', textAlign:'center', marginBottom:'3.5rem',
              letterSpacing:'-0.02em',
            }}>
              Numbers That{' '}
              <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Speak</span>
            </h2>

            <div style={{
              background:'#FAF8F2', border:'1px solid #E8E0CC', borderRadius:'4px',
              display:'flex', flexWrap:'wrap', justifyContent:'center',
              position:'relative', overflow:'hidden',
            }}>
              {/* Gold top bar */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:'2px',
                background:'linear-gradient(90deg, transparent, #C9A84C, transparent)',
              }} />

              {[
                ['5000+', 'Students Mentored'],
                ['50+',   'Research Projects'],
                ['100+',  'Workshops Conducted'],
                ['25+',   'Partner Institutions'],
              ].map(([val, label]) => (
                <div className="stat-item" key={label}>
                  <div style={{
                    fontFamily:"'Cormorant Garamond', serif", fontSize:'3rem',
                    fontWeight:700, color:'#C9A84C', letterSpacing:'-0.03em', lineHeight:1,
                    marginBottom:'0.4rem',
                  }}>
                    {val}
                  </div>
                  <div style={{
                    fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
                    color:'#6B5C3E', letterSpacing:'0.1em', textTransform:'uppercase',
                    fontWeight:500,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CTA
        ══════════════════════════════════ */}
        <section style={{ padding:'5rem 1.5rem', background:'#F7F3EA' }}>
          <div style={{ maxWidth:'820px', margin:'0 auto' }}>
            <div style={{
              background:'linear-gradient(158deg, #1C1208 0%, #2E1F08 100%)',
              border:'1px solid #3D2A0A',
              borderRadius:'4px', padding:'4rem 3rem', textAlign:'center',
              position:'relative', overflow:'hidden',
            }}>
              {/* Gold top accent */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:'2px',
                background:'linear-gradient(90deg, transparent, #C9A84C, transparent)',
              }} />
              {/* Corner brackets */}
              {[
                { top:'1.2rem', left:'1.2rem', borderTop:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { top:'1.2rem', right:'1.2rem', borderTop:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
                { bottom:'1.2rem', left:'1.2rem', borderBottom:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { bottom:'1.2rem', right:'1.2rem', borderBottom:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
              ].map((s, i) => (
                <div key={i} style={{ position:'absolute', width:36, height:36, ...s }} />
              ))}

              <div style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem',
                letterSpacing:'0.22em', color:'#C9A84C', textTransform:'uppercase',
                fontWeight:500, marginBottom:'1.25rem',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              }}>
                <span style={{ display:'inline-block', width:22, height:'1px', background:'#C9A84C' }} />
                Join Our Community
                <span style={{ display:'inline-block', width:22, height:'1px', background:'#C9A84C' }} />
              </div>

              <h2 style={{
                fontFamily:"'Playfair Display', serif",
                fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:700,
                color:'#F7F3EA', letterSpacing:'-0.02em', margin:'0 0 1.25rem',
              }}>
                Shape the Future of{' '}
                <span style={{
                  fontStyle:'italic',
                  background:'linear-gradient(135deg, #C9A84C, #E8C96A)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                }}>
                  Mathematical Thinking
                </span>
              </h2>

              <p style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.95rem',
                color:'rgba(247,243,234,0.65)', maxWidth:'520px', margin:'0 auto 2.5rem',
                lineHeight:1.78, fontWeight:300,
              }}>
                Be part of a vibrant community of mathematicians, technologists, and innovators.
                Together, we can shape the future of mathematical thinking and technological advancement.
              </p>

              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                <button className="btn-dark" style={{ background:'#C9A84C', borderColor:'#C9A84C', color:'#fff' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#B8973B'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  Become a Member
                </button>
                <button className="btn-outline" style={{ borderColor:'rgba(247,243,234,0.35)', color:'#F7F3EA' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(247,243,234,0.1)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

export default About;