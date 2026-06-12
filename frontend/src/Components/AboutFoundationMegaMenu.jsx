import React from "react";
import { Link } from "react-router-dom";
import { Users, Building2, Award, GraduationCap } from "lucide-react";

export default function AboutFoundationMegaMenu() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .luxury-menu {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .luxury-menu-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-top: 3px solid #2563eb;
          box-shadow:
            0 10px 25px -5px rgba(0, 0, 0, 0.08),
            0 8px 10px -6px rgba(0, 0, 0, 0.05);
          border-radius: 12px;
        }

        .luxury-section-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2563eb;
        }

        .luxury-section-icon {
          color: #2563eb;
          opacity: 0.85;
        }

        .luxury-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
          opacity: 0.8;
        }

        .luxury-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          letter-spacing: 0.01em;
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
          height: 1.5px;
          background: #2563eb;
          transition: width 0.3s ease;
        }

        .luxury-link:hover {
          color: #2563eb;
          letter-spacing: 0.02em;
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
          color: #2563eb;
        }

        .luxury-link:hover .luxury-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .luxury-top-accent {
          height: 3px;
          background: linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%);
          border-radius: 2px 2px 0 0;
        }

        .luxury-tag {
          font-size: 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #2563eb;
          border: 1px solid #2563eb;
          padding: 2px 10px;
          border-radius: 9999px;
          background: rgba(37, 99, 235, 0.05);
        }
      `}</style>

      <div className="luxury-menu absolute left-1/2 top-full mt-5 w-[860px] -translate-x-1/2 z-50">
        <div className="luxury-menu-panel overflow-hidden">

          {/* Top accent line */}
          <div className="luxury-top-accent" />

          <div className="px-10 py-8">

            {/* Header row */}
            <div className="flex items-center justify-between mb-7">
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#64748b',
                fontWeight: 600,
              }}>
                Foundation Overview
              </p>
              <div className="luxury-tag">EST. 2020</div>
            </div>

            {/* Thin separator */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(37,99,235,0.05), rgba(37,99,235,0.15), rgba(37,99,235,0.05))', marginBottom: '28px' }} />

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
            <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(37,99,235,0.05), rgba(37,99,235,0.15), rgba(37,99,235,0.05))', marginTop: '28px', marginBottom: '16px' }} />
            <div className="flex items-center justify-between">
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '11px',
                color: '#64748b',
                letterSpacing: '0.04em',
                fontWeight: 500,
              }}>
                MathTech Trust Foundation
              </p>
              <Link
                to="/about/mttf/about"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2563eb',
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