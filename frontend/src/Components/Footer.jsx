import React from "react";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --gold-pale: rgba(201,168,76,0.12);
    --cream: #FAF8F3;
    --charcoal: #1C1A17;
    --mid: #6B6560;
    --divider: rgba(201,168,76,0.18);
    --divider-dark: rgba(250,248,243,0.08);
  }

  /* ── Footer shell ── */
  .lux-footer {
    background: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Subtle grain texture overlay */
  .lux-footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* Top gold accent line */
  .lux-footer-topline {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent);
    opacity: 0.35;
  }

  .lux-footer-inner {
    position: relative;
    z-index: 1;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 48px;
  }

  /* ── CTA Strip ── */
  .lux-footer-cta {
    border-bottom: 1px solid var(--divider-dark);
    padding: 72px 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }

  .lux-footer-cta-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 52px);
    font-weight: 400;
    color: var(--cream);
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  .lux-footer-cta-heading em {
    font-style: italic;
    color: var(--gold-light);
  }

  .lux-cta-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: var(--gold);
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    white-space: nowrap;
  }

  .lux-cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold-light);
    transform: translateX(-101%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  .lux-cta-btn:hover::before { transform: translateX(0); }
  .lux-cta-btn span, .lux-cta-btn svg { position: relative; z-index: 1; }
  .lux-cta-btn svg { transition: transform 0.3s ease; }
  .lux-cta-btn:hover svg { transform: translateX(3px); }

  /* ── Main grid ── */
  .lux-footer-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: 64px;
    padding: 72px 0 64px;
    border-bottom: 1px solid var(--divider-dark);
  }

  /* Brand col */
  .lux-footer-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .lux-footer-logo-mark {
    width: 44px;
    height: 44px;
    border: 1.5px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-shrink: 0;
  }

  .lux-footer-logo-mark::before {
    content: '';
    position: absolute;
    inset: 4px;
    background: var(--gold);
    opacity: 0.08;
  }

  .lux-footer-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--cream);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    display: block;
    line-height: 1;
  }

  .lux-footer-brand-sub {
    font-size: 9px;
    font-weight: 400;
    color: var(--gold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    display: block;
    margin-top: 4px;
  }

  .lux-footer-brand-desc {
    font-size: 13px;
    font-weight: 300;
    color: rgba(250,248,243,0.5);
    line-height: 1.8;
    max-width: 280px;
  }

  /* Column headings */
  .lux-footer-col-head {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lux-footer-col-head::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--gold);
    opacity: 0.2;
  }

  /* Nav links */
  .lux-footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .lux-footer-links a {
    font-size: 13px;
    font-weight: 300;
    color: rgba(250,248,243,0.5);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0;
    transition: color 0.25s ease, gap 0.25s ease;
    letter-spacing: 0.02em;
  }

  .lux-footer-links a::before {
    content: '—';
    font-size: 10px;
    color: var(--gold);
    opacity: 0;
    width: 0;
    overflow: hidden;
    transition: opacity 0.25s ease, width 0.25s ease;
  }

  .lux-footer-links a:hover {
    color: var(--cream);
    gap: 8px;
  }

  .lux-footer-links a:hover::before {
    opacity: 1;
    width: 16px;
  }

  /* Contact */
  .lux-footer-contact {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .lux-footer-contact-item {
    font-size: 13px;
    font-weight: 300;
    color: rgba(250,248,243,0.5);
    line-height: 1.7;
    cursor: pointer;
    transition: color 0.25s ease;
    text-decoration: none;
    display: block;
  }

  .lux-footer-contact-item:hover {
    color: var(--gold-light);
  }

  /* Social icons */
  .lux-social-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .lux-social-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid rgba(250,248,243,0.08);
    background: transparent;
    color: rgba(250,248,243,0.45);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;
  }

  .lux-social-btn:hover {
    border-color: var(--gold);
    color: var(--gold-light);
    background: var(--gold-pale);
  }

  /* ── Bottom bar ── */
  .lux-footer-bottom {
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .lux-footer-copy {
    font-size: 11px;
    font-weight: 300;
    color: rgba(250,248,243,0.3);
    letter-spacing: 0.04em;
  }

  .lux-footer-legal {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .lux-footer-legal a {
    font-size: 11px;
    font-weight: 300;
    color: rgba(250,248,243,0.3);
    text-decoration: none;
    letter-spacing: 0.06em;
    padding: 0 16px;
    border-right: 1px solid rgba(250,248,243,0.1);
    transition: color 0.25s ease;
  }

  .lux-footer-legal a:first-child { padding-left: 0; }
  .lux-footer-legal a:last-child { padding-right: 0; border-right: none; }
  .lux-footer-legal a:hover { color: var(--gold-light); }

  /* Responsive */
  @media (max-width: 1024px) {
    .lux-footer-inner { padding: 0 32px; }
    .lux-footer-grid { grid-template-columns: 1fr 1fr; gap: 48px; }
  }

  @media (max-width: 768px) {
    .lux-footer-inner { padding: 0 24px; }
    .lux-footer-cta { flex-direction: column; align-items: flex-start; }
    .lux-footer-grid { grid-template-columns: 1fr; gap: 40px; padding: 56px 0 48px; }
    .lux-footer-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
    .lux-social-grid { grid-template-columns: repeat(4, auto); width: fit-content; }
  }
`;

const Footer = () => {
  return (
    <>
      <style>{styles}</style>

      <footer className="lux-footer">
        <div className="lux-footer-topline" />

        <div className="lux-footer-inner">

         

          {/* ── Main Grid ── */}
          <div className="lux-footer-grid">

            {/* Brand */}
            <div>
              <div className="lux-footer-logo">
                <div className="lux-footer-logo-mark">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: "relative", zIndex: 1 }}>
                    <path d="M9 2L16 8V16H12V12H6V16H2V8L9 2Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <div>
                  <span className="lux-footer-brand-name">MTTF</span>
                  <span className="lux-footer-brand-sub">MathTech Thinking Foundation</span>
                </div>
              </div>
              <p className="lux-footer-brand-desc">
                An international educational foundation empowering learners,
                innovators, and professionals through STEM education, research,
                and community-driven initiatives.
              </p>
            </div>

            {/* Foundation */}
            <div>
              <p className="lux-footer-col-head">Foundation</p>
              <ul className="lux-footer-links">
                {["About Us", "Leadership", "Vision & Mission", "Membership"].map((item) => (
                  <li key={item}>
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="lux-footer-col-head">Contact</p>
              <div className="lux-footer-contact">
                <a href="mailto:contactus@mttf.in" className="lux-footer-contact-item">
                  contactus@mttf.in
                </a>
                <a href="tel:+918968294003" className="lux-footer-contact-item">
                  +91 89682 94003
                </a>
                <p className="lux-footer-contact-item" style={{ cursor: "default" }}>
                  Fazilka–Abohar Road<br />
                  Fazilka – 152123<br />
                  Punjab, India
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="lux-footer-col-head">Connect</p>
              <div className="lux-social-grid">
                <a href="#" aria-label="Instagram" className="lux-social-btn">
                  <Instagram size={14} />
                  <span>Insta</span>
                </a>
                <a href="#" aria-label="LinkedIn" className="lux-social-btn">
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <a href="#" aria-label="Twitter" className="lux-social-btn">
                  <Twitter size={14} />
                  <span>Twitter</span>
                </a>
                <a href="#" aria-label="Facebook" className="lux-social-btn">
                  <Facebook size={14} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>

          {/* ── Bottom Bar ── */}
          <div className="lux-footer-bottom">
            <p className="lux-footer-copy">
              © 2024 MathTech Thinking Foundation. All rights reserved.
            </p>
            <div className="lux-footer-legal">
              {["Privacy Policy", "Terms of Use", "Cookies"].map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;