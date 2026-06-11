import React from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  Briefcase,
  Award,
  CalendarDays,
  Lightbulb,
} from "lucide-react";

const programSections = [
  {
    title: "Capability",
    icon: <Cpu size={14} />,
    items: [
      { name: "Artificial Intelligence", path: "/programs/capability/artificial-intelligence" },
      { name: "Business Intelligence", path: "/programs/capability/business-intelligence" },
      { name: "Bioinformatics", path: "/programs/capability/bioinformatics" },
      { name: "Computational Mathematics", path: "/programs/capability/computational-mathematics" },
      { name: "Data Analytics", path: "/programs/capability/data-analytics" },
      { name: "Quantum Computing", path: "/programs/capability/quantum-computing" },
    ],
  },
  {
    title: "Consultancy Services",
    icon: <Briefcase size={14} />,
    items: [
      { name: "Expert Consultancy Services", path: "/programs/consultancy-services/expert-consultancy" },
      { name: "Logistic Support Services", path: "/programs/consultancy-services/logistic-support" },
      { name: "National & International Conference Support", path: "/programs/consultancy-services/conference-support" },
    ],
  },
  {
    title: "Awards",
    icon: <Award size={14} />,
    items: [
      { name: "Awards 2025", path: "/programs/awards/2025" },
      { name: "Awards 2024", path: "/programs/awards/2024" },
    ],
  },
  {
    title: "Events",
    icon: <CalendarDays size={14} />,
    items: [
      { name: "Upcoming Events", path: "/programs/events" },
    ],
  },
];

export default function OurProgramsMegaMenu() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .prog-menu {
          font-family: 'Jost', sans-serif;
        }

        .prog-panel {
          background: #FDFAF5;
          border: 1px solid #E8DCC8;
          border-top: 3px solid #C9A84C;
          box-shadow:
            0 4px 6px -1px rgba(139, 109, 56, 0.06),
            0 20px 60px -10px rgba(139, 109, 56, 0.15),
            0 0 0 1px rgba(201, 168, 76, 0.08);
        }

        .prog-section-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C9A84C;
        }

        .prog-section-icon {
          color: #C9A84C;
          opacity: 0.85;
        }

        .prog-divider-v {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #D4C4A080, transparent);
        }

        .prog-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 400;
          color: #5C4A2A;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          position: relative;
          padding-bottom: 1px;
          transition: all 0.25s ease;
        }

        .prog-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #C9A84C;
          transition: width 0.3s ease;
        }

        .prog-link:hover {
          color: #8B6D38;
          letter-spacing: 0.04em;
        }

        .prog-link:hover::after {
          width: 100%;
        }

        .prog-link-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s ease;
          font-size: 12px;
          margin-left: 4px;
          color: #C9A84C;
        }

        .prog-link:hover .prog-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .prog-footer {
          background: #F5EDD8;
          border-top: 1px solid #E8DCC8;
        }

        .prog-cta {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FDFAF5;
          background: #C9A84C;
          padding: 10px 24px;
          border-radius: 2px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
        }

        .prog-cta:hover {
          background: #8B6D38;
          gap: 12px;
        }

        .prog-tag {
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

      <div className="prog-menu absolute left-1/2 top-full mt-5 -translate-x-1/2 w-[85vw] max-w-5xl z-50">
        <div className="prog-panel rounded-sm overflow-hidden">

          {/* Gold top accent */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)', borderRadius: '2px 2px 0 0' }} />

          <div className="px-10 py-8">

            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#A08858',
                fontWeight: 300,
              }}>
                Programs & Initiatives
              </p>
              <div className="prog-tag">MTTF</div>
            </div>

            {/* Thin separator */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, #C9A84C22, #C9A84C66, #C9A84C22)', marginBottom: '28px' }} />

            {/* 4-column grid */}
            <div className="grid grid-cols-4 gap-0">
              {programSections.map((section, i) => (
                <div key={i} className="flex">
                  {/* Vertical divider (skip for first) */}
                  {i !== 0 && <div className="prog-divider-v mr-8" />}

                  <div className="flex-1" style={{ paddingRight: i < programSections.length - 1 ? '0' : '0' }}>
                    {/* Section header */}
                    <div className="flex items-center gap-2 mb-5">
                      <span className="prog-section-icon">{section.icon}</span>
                      <span className="prog-section-label">{section.title}</span>
                    </div>

                    {/* Links */}
                    <ul className="space-y-[14px]">
                      {section.items.map((item, j) => (
                        <li key={j}>
                          <Link to={item.path} className="prog-link">
                            {item.name}
                            <span className="prog-link-arrow">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="prog-footer px-10 py-5 flex justify-between items-center">
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '12px',
              color: '#A08858',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.04em',
            }}>
              <Lightbulb size={14} style={{ color: '#C9A84C' }} />
              Discover MTTF's capabilities, consultancy, awards & events
            </p>

            <Link to="/programs" className="prog-cta">
              Explore All <span>→</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}