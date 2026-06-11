import React from "react";
import { Link } from "react-router-dom";
import { Users, Building2, Award, GraduationCap } from "lucide-react";

export default function AboutFoundationMegaMenu() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .luxury-menu {
          font-family: 'Jost', sans-serif;
        }

        .luxury-menu-panel {
          background: #FDFAF5;
          border: 1px solid #E8DCC8;
          border-top: 3px solid #C9A84C;
          box-shadow:
            0 4px 6px -1px rgba(139, 109, 56, 0.06),
            0 20px 60px -10px rgba(139, 109, 56, 0.15),
            0 0 0 1px rgba(201, 168, 76, 0.08);
        }

        .luxury-section-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C9A84C;
        }

        .luxury-section-icon {
          color: #C9A84C;
          opacity: 0.85;
        }

        .luxury-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #D4C4A0, transparent);
          opacity: 0.6;
        }

        .luxury-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 400;
          color: #5C4A2A;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          gap: 0px;
          transition: all 0.25s ease;
          position: relative;
          padding-bottom: 1px;
        }

        .luxury-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #C9A84C;
          transition: width 0.3s ease;
        }

        .luxury-link:hover {
          color: #8B6D38;
          letter-spacing: 0.04em;
        }

        .luxury-link:hover::after {
          width: 100%;
        }

        .luxury-link-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s ease;
          font-size: 12px;
          margin-left: 4px;
          color: #C9A84C;
        }

        .luxury-link:hover .luxury-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .luxury-top-accent {
          height: 3px;
          background: linear-gradient(90deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%);
          border-radius: 2px 2px 0 0;
        }

        .luxury-tag {
          font-size: 9px;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #C9A84C;
          border: 1px solid #C9A84C;
          padding: 1px 6px;
          border-radius: 2px;
          opacity: 0.7;
        }
      `}</style>

      <div className="luxury-menu absolute left-1/2 top-full mt-5 w-[860px] -translate-x-1/2 z-50">
        <div className="luxury-menu-panel rounded-sm overflow-hidden">

          {/* Gold top accent line */}
          <div className="luxury-top-accent" />

          <div className="px-10 py-8">

            {/* Header row */}
            <div className="flex items-center justify-between mb-7">
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#A08858',
                fontWeight: 300,
              }}>
                Foundation Overview
              </p>
              <div className="luxury-tag">EST. 2020</div>
            </div>

            {/* Thin separator */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, #C9A84C22, #C9A84C66, #C9A84C22)', marginBottom: '28px' }} />

            {/* 4-column grid */}
            <div className="grid grid-cols-4 gap-0">

              {/* OUR ORGANISATION */}
              <div className="pr-8">
                <div className="flex items-center gap-2 mb-5">
                  <Users size={14} className="luxury-section-icon" />
                  <span className="luxury-section-label">Our Organisation</span>
                </div>
                <ul className="space-y-[14px]">
                  {[
                    { label: "Advisors", to: "/about/organisation/advisors" },
                    { label: "Leaders", to: "/about/organisation/leaders" },
                    { label: "Executives", to: "/about/organisation/executives" },
                    { label: "Mentors", to: "/about/organisation/mentors" },
                    { label: "Technical Team", to: "/about/organisation/technical-team" },
                  ].map(({ label, to }) => (
                    <li key={to}>
                      <Link to={to} className="luxury-link">
                        {label}
                        <span className="luxury-link-arrow">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="flex">
                <div className="luxury-divider mx-0 mr-8" />
                {/* ABOUT MTTF */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-5">
                    <Building2 size={14} className="luxury-section-icon" />
                    <span className="luxury-section-label">About MTTF</span>
                  </div>
                  <ul className="space-y-[14px]">
                    {[
                      { label: "About", to: "/about/mttf/about" },
                      { label: "Contact", to: "/about/mttf/contact" },
                    ].map(({ label, to }) => (
                      <li key={to}>
                        <Link to={to} className="luxury-link">
                          {label}
                          <span className="luxury-link-arrow">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="flex">
                <div className="luxury-divider mx-0 mr-8" />
                {/* MATHTECH CIRCLE */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-5">
                    <Award size={14} className="luxury-section-icon" />
                    <span className="luxury-section-label">MathTech Circle</span>
                  </div>
                  <ul className="space-y-[14px]">
                    {[
                      { label: "Individual Membership", to: "/about/mathtech/individual" },
                      { label: "Institutional Membership", to: "/about/mathtech/institutional" },
                    ].map(({ label, to }) => (
                      <li key={to}>
                        <Link to={to} className="luxury-link">
                          {label}
                          <span className="luxury-link-arrow">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="flex">
                <div className="luxury-divider mx-0 mr-8" />
                {/* CHAPTERS */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-5">
                    <GraduationCap size={14} className="luxury-section-icon" />
                    <span className="luxury-section-label">Chapters</span>
                  </div>
                  <ul className="space-y-[14px]">
                    {[
                      { label: "Student Chapter", to: "/about/mathtech/student-chapter" },
                      { label: "About Chapter", to: "/about/mathtech/about-chapter" },
                    ].map(({ label, to }) => (
                      <li key={to}>
                        <Link to={to} className="luxury-link">
                          {label}
                          <span className="luxury-link-arrow">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Bottom bar */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, #C9A84C22, #C9A84C44, #C9A84C22)', marginTop: '28px', marginBottom: '16px' }} />
            <div className="flex items-center justify-between">
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px',
                color: '#B8A080',
                letterSpacing: '0.06em',
              }}>
                MathTech Trust Foundation
              </p>
              <Link
                to="/about/mttf/about"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'gap 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                View All <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}