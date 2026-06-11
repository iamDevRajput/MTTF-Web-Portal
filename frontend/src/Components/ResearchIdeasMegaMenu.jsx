import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function ResearchIdeasMegaMenu() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .research-menu {
          font-family: 'Jost', sans-serif;
        }

        .research-panel {
          background: #FDFAF5;
          border: 1px solid #E8DCC8;
          border-top: 3px solid #C9A84C;
          box-shadow:
            0 4px 6px -1px rgba(139, 109, 56, 0.06),
            0 20px 60px -10px rgba(139, 109, 56, 0.15),
            0 0 0 1px rgba(201, 168, 76, 0.08);
        }

        .research-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 400;
          color: #5C4A2A;
          letter-spacing: 0.02em;
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
          height: 1px;
          background: #C9A84C;
          transition: width 0.3s ease;
        }

        .research-link:hover {
          color: #8B6D38;
          letter-spacing: 0.04em;
        }

        .research-link:hover::after {
          width: 100%;
        }

        .research-link-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s ease;
          font-size: 13px;
          margin-left: 6px;
          color: #C9A84C;
        }

        .research-link:hover .research-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .research-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-style: italic;
          color: #C9A84C;
          opacity: 0.7;
          min-width: 20px;
          padding-top: 2px;
        }

        .research-tag {
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

      <div className="research-menu absolute left-1/2 top-full mt-5 -translate-x-1/2 z-50"
        style={{ width: '340px' }}
      >
        <div className="research-panel rounded-sm overflow-hidden">

          {/* Gold top accent */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
            borderRadius: '2px 2px 0 0'
          }} />

          <div className="px-8 py-7">

            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BookOpen size={14} style={{ color: '#C9A84C', opacity: 0.85 }} />
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                }}>
                  Blog
                </span>
              </div>
              <div className="research-tag">INSIGHTS</div>
            </div>

            {/* Thin separator */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, #C9A84C22, #C9A84C66, #C9A84C22)',
              marginBottom: '22px'
            }} />

            {/* Eyebrow */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#A08858',
              fontWeight: 300,
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
                      background: 'linear-gradient(90deg, #C9A84C33, transparent)',
                    }} />
                  )}
                </li>
              ))}
            </ul>

            {/* Bottom separator */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, #C9A84C22, #C9A84C44, #C9A84C22)',
              marginTop: '20px',
              marginBottom: '14px'
            }} />

            {/* Footer link */}
            <div className="flex justify-end">
              <Link
                to="/blogs"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
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