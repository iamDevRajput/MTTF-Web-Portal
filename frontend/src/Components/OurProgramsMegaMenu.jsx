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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .prog-menu {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .prog-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-top: 3px solid #2563eb;
          box-shadow:
            0 10px 25px -5px rgba(0, 0, 0, 0.08),
            0 8px 10px -6px rgba(0, 0, 0, 0.05);
          border-radius: 12px;
        }

        .prog-section-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2563eb;
        }

        .prog-section-icon {
          color: #2563eb;
          opacity: 0.85;
        }

        .prog-divider-v {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
        }

        .prog-link {
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

        .prog-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #2563eb;
          transition: width 0.3s ease;
        }

        .prog-link:hover {
          color: #2563eb;
          letter-spacing: 0.02em;
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
          color: #2563eb;
        }

        .prog-link:hover .prog-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .prog-footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .prog-cta {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
          background: #2563eb;
          padding: 10px 24px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
        }

        .prog-cta:hover {
          background: #1d4ed8;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .prog-tag {
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

      <div className="prog-menu absolute left-1/2 top-full mt-5 -translate-x-1/2 w-[85vw] max-w-5xl z-50">
        <div className="prog-panel overflow-hidden">

          {/* Top accent */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%)', borderRadius: '2px 2px 0 0' }} />

          <div className="px-10 py-8">

            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#64748b',
                fontWeight: 600,
              }}>
                Programs & Initiatives
              </p>
              <div className="prog-tag">MTTF</div>
            </div>

            {/* Thin separator */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(37,99,235,0.05), rgba(37,99,235,0.15), rgba(37,99,235,0.05))', marginBottom: '28px' }} />

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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '11px',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.04em',
              fontWeight: 500,
            }}>
              <Lightbulb size={14} style={{ color: '#2563eb' }} />
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