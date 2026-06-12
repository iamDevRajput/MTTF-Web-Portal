import React from 'react';
import { Link } from 'react-router-dom';

function MTTFContact() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes pulseAccent {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50%       { transform: translateY(-7px); opacity: 0.65; }
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.9rem 2.4rem;
          background: #2563eb;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: 1px solid #2563eb;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.35s ease;
          text-decoration: none;
        }
        .contact-btn:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(37, 99, 235,0.3);
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(158deg, #f8fafc 0%, #f1f5f9 55%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '5rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>

        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          pointerEvents: 'none',
        }} />

        {/* Warm radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(37, 99, 235,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Rotating rings */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '460px', height: '460px',
          border: '1px solid rgba(37, 99, 235,0.08)',
          borderRadius: '50%',
          animation: 'rotateSlow 40s linear infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '640px', height: '640px',
          border: '1px dashed rgba(37, 99, 235,0.05)',
          borderRadius: '50%',
          animation: 'rotateSlow 65s linear infinite reverse',
          pointerEvents: 'none',
        }} />

        {/* Corner brackets */}
        {[
          { top: '2rem', left: '2rem', borderTop: '1px solid #2563eb', borderLeft: '1px solid #2563eb' },
          { top: '2rem', right: '2rem', borderTop: '1px solid #2563eb', borderRight: '1px solid #2563eb' },
          { bottom: '2rem', left: '2rem', borderBottom: '1px solid #2563eb', borderLeft: '1px solid #2563eb' },
          { bottom: '2rem', right: '2rem', borderBottom: '1px solid #2563eb', borderRight: '1px solid #2563eb' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 52, height: 52, opacity: 0.4, ...s }} />
        ))}

        {/* Floating dots */}
        {[
          { top: '18%', left: '10%',  delay: '0s',    dur: '3.4s' },
          { top: '75%', left: '8%',   delay: '0.8s',  dur: '3.8s' },
          { top: '20%', right: '10%', delay: '0.4s',  dur: '4.2s' },
          { top: '72%', right: '12%', delay: '1.1s',  dur: '3.5s' },
        ].map((dot, i) => (
          <div key={i} style={{
            position: 'absolute', width: 4, height: 4, borderRadius: '50%',
            background: '#2563eb',
            animation: `floatDot ${dot.dur} ease-in-out infinite`,
            animationDelay: dot.delay,
            top: dot.top, left: dot.left, right: dot.right,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Card */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          padding: '3.5rem 3rem',
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(37, 99, 235,0.1), 0 4px 16px rgba(37, 99, 235,0.06)',
          animation: 'fadeUp 0.9s ease both',
          overflow: 'hidden',
        }}>
          {/* Gold top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)',
          }} />

          {/* Clipped corner accent */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 20, height: 20, background: '#2563eb',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }} />

          {/* Icon */}
          <div style={{
            width: '64px', height: '64px',
            background: '#F5EFD8', border: '1px solid #E8D89A',
            borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.75rem',
          }}>
            <svg width="28" height="28" fill="none" stroke="#2563eb" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: '1.25rem',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: '#2563eb', opacity: 0.6 }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.62rem',
              letterSpacing: '0.22em', color: '#2563eb', textTransform: 'uppercase', fontWeight: 500,
            }}>
              Get In Touch
            </span>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: '#2563eb', opacity: 0.6 }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 700, letterSpacing: '-0.02em',
            color: '#0f172a', margin: '0 0 0.25rem', lineHeight: 1.1,
          }}>
            Contact
          </h2>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 700, letterSpacing: '-0.02em',
            margin: '0 0 1.25rem', lineHeight: 1.1,
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 40%, #60a5fa 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
          }}>
            Page
          </h2>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #2563eb50, transparent)',
            margin: '0 auto 1.5rem', maxWidth: '200px',
          }} />

          {/* Body */}
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.9rem',
            color: '#6B5C3E', lineHeight: 1.8, margin: '0 0 2.5rem', fontWeight: 300,
          }}>
            This page is linked from the MTTF About section. For the full contact
            experience, please visit our main contact page.
          </p>

          {/* CTA */}
          <Link to="/contact" className="contact-btn">
            Go to Contact Page
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </>
  );
}

export default MTTFContact;