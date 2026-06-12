import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function ResearchIdeasMegaMenu() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .research-menu {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .research-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-top: 3px solid #2563eb;
          box-shadow:
            0 10px 25px -5px rgba(0, 0, 0, 0.08),
            0 8px 10px -6px rgba(0, 0, 0, 0.05);
          border-radius: 12px;
        }

        .research-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          letter-spacing: 0.01em;
          display: inline-flex;
          align-items: center;
          position: relative;
          padding-bottom: 1px;
          transition: all 0.25s ease;
        }

        .research-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #2563eb;
          transition: width 0.3s ease;
        }

        .research-link:hover {
          color: #2563eb;
          letter-spacing: 0.02em;
        }

        .research-link:hover::after {
          width: 100%;
        }

        .research-link-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s ease;
          font-size: 12px;
          margin-left: 6px;
          color: #2563eb;
        }

        .research-link:hover .research-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .research-number {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #2563eb;
          opacity: 0.7;
          min-width: 20px;
          padding-top: 2px;
        }

        .research-tag {
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

      <div className="research-menu absolute left-1/2 top-full mt-5 -translate-x-1/2 z-50"
        style={{ width: '340px' }}
      >
        <div className="research-panel overflow-hidden">

          {/* Top accent */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%)',
            borderRadius: '2px 2px 0 0'
          }} />

          <div className="px-8 py-7">

            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BookOpen size={14} style={{ color: '#2563eb', opacity: 0.85 }} />
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#2563eb',
                }}>
                  Blog
                </span>
              </div>
              <div className="research-tag">INSIGHTS</div>
            </div>

            {/* Thin separator */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(37,99,235,0.05), rgba(37,99,235,0.15), rgba(37,99,235,0.05))',
              marginBottom: '22px'
            }} />

            {/* Eyebrow */}
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#64748b',
              fontWeight: 600,
              marginBottom: '18px',
            }}>
              Explore Topics
            </p>

            {/* Links */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: "AI & Machine Learning", to: "/blogs/ai-ml", num: "01" },
                { label: "Data Science", to: "/blogs/data-science", num: "02" },
                { label: "STEM Education", to: "/blogs/education", num: "03" },
              ].map(({ label, to, num }, i, arr) => (
                <li key={to}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
                    <span className="research-number">{num}</span>
                    <Link to={to} className="research-link">
                      {label}
                      <span className="research-link-arrow">→</span>
                    </Link>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, rgba(37,99,235,0.1), transparent)',
                    }} />
                  )}
                </li>
              ))}
            </ul>

            {/* Bottom separator */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(37,99,235,0.05), rgba(37,99,235,0.15), rgba(37,99,235,0.05))',
              marginTop: '20px',
              marginBottom: '14px'
            }} />

            {/* Footer link */}
            <div className="flex justify-end">
              <Link
                to="/blogs"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2563eb',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'gap 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                All Articles <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}