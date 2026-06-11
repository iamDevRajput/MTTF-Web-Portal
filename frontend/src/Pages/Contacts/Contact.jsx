import React, { useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --gold-pale: rgba(201,168,76,0.10);
    --cream: #FAF8F3;
    --beige: #F2EDE4;
    --charcoal: #1C1A17;
    --mid: #6B6560;
    --divider: rgba(201,168,76,0.2);
    --white: #ffffff;
  }

  /* ── Page shell ── */
  .lux-contact-page {
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    padding-top: 100px;
    min-height: 100vh;
  }

  /* ── Page header ── */
  .lux-contact-hero {
    background: var(--charcoal);
    padding: 80px 48px 88px;
    position: relative;
    overflow: hidden;
  }

  .lux-contact-hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent);
    opacity: 0.3;
  }

  /* Big decorative letter */
  .lux-contact-deco {
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: 280px;
    font-weight: 600;
    color: rgba(201,168,76,0.04);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.05em;
  }

  .lux-contact-hero-inner {
    max-width: 1320px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .lux-contact-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
  }

  .lux-eyebrow-line {
    display: block;
    width: 32px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
  }

  .lux-contact-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 6vw, 76px);
    font-weight: 400;
    color: var(--cream);
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin-bottom: 20px;
  }

  .lux-contact-headline em {
    font-style: italic;
    color: var(--gold-light);
    display: block;
  }

  .lux-contact-subhead {
    font-size: 15px;
    font-weight: 300;
    color: rgba(250,248,243,0.55);
    max-width: 560px;
    line-height: 1.8;
  }

  /* ── Body ── */
  .lux-contact-body {
    max-width: 1320px;
    margin: 0 auto;
    padding: 80px 48px 96px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  /* ── Info cards ── */
  .lux-info-stack {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--divider);
    border: 1px solid var(--divider);
  }

  .lux-info-card {
    background: #fff;
    padding: 32px 36px;
    display: flex;
    align-items: flex-start;
    gap: 24px;
    transition: background 0.25s ease;
    position: relative;
  }

  .lux-info-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: var(--gold);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  .lux-info-card:hover {
    background: var(--cream);
  }

  .lux-info-card:hover::before {
    transform: scaleY(1);
  }

  .lux-info-icon {
    width: 48px;
    height: 48px;
    border: 1px solid var(--divider);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--cream);
    transition: border-color 0.25s ease, background 0.25s ease;
  }

  .lux-info-card:hover .lux-info-icon {
    border-color: var(--gold);
    background: var(--gold-pale);
  }

  .lux-info-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
    display: block;
  }

  .lux-info-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 500;
    color: var(--charcoal);
    margin-bottom: 8px;
    display: block;
  }

  .lux-info-text {
    font-size: 13px;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.75;
    display: block;
  }

  .lux-info-link {
    font-size: 14px;
    font-weight: 400;
    color: var(--charcoal);
    text-decoration: none;
    letter-spacing: 0.01em;
    transition: color 0.2s ease;
  }

  .lux-info-link:hover {
    color: var(--gold);
  }

  /* Map card */
  .lux-map-card {
    background: #fff;
    border: 1px solid var(--divider);
    border-top: none;
    padding: 36px;
  }

  .lux-map-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
    display: block;
  }

  .lux-map-placeholder {
    height: 200px;
    background: var(--beige);
    border: 1px solid var(--divider);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .lux-map-pin-ring {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 1px solid rgba(201,168,76,0.3);
    border-radius: 50%;
    animation: pingRing 2.5s ease-out infinite;
  }

  .lux-map-pin-ring:nth-child(2) {
    width: 120px;
    height: 120px;
    animation-delay: 0.6s;
  }

  @keyframes pingRing {
    0%   { opacity: 0.6; transform: scale(0.5); }
    100% { opacity: 0;   transform: scale(1); }
  }

  .lux-map-pin {
    position: relative;
    z-index: 2;
    width: 36px;
    height: 36px;
    background: var(--charcoal);
    border: 2px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lux-map-tag {
    position: absolute;
    bottom: 16px;
    left: 16px;
    background: var(--charcoal);
    padding: 6px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lux-map-tag-city {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--cream);
    letter-spacing: 0.05em;
  }

  .lux-map-tag-sub {
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
  }

  /* ── Form panel ── */
  .lux-form-panel {
    background: #fff;
    border: 1px solid var(--divider);
    padding: 48px;
    position: relative;
  }

  .lux-form-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--gold);
    opacity: 0.6;
  }

  .lux-form-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 32px;
    line-height: 1.1;
  }

  .lux-form-heading em {
    font-style: italic;
    color: var(--gold);
  }

  /* Inquiry options */
  .lux-inquiry-label {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
    display: block;
  }

  .lux-inquiry-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 36px;
  }

  .lux-inquiry-btn {
    padding: 12px 14px;
    border: 1px solid rgba(28,26,23,0.12);
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    position: relative;
    overflow: hidden;
  }

  .lux-inquiry-btn::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%;
    height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .lux-inquiry-btn:hover,
  .lux-inquiry-btn.active {
    border-color: var(--gold);
    background: var(--gold-pale);
  }

  .lux-inquiry-btn:hover::after,
  .lux-inquiry-btn.active::after {
    transform: scaleX(1);
  }

  .lux-inquiry-icon {
    font-size: 16px;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .lux-inquiry-text {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--charcoal);
    line-height: 1.4;
  }

  /* Form inputs */
  .lux-form-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .lux-input,
  .lux-textarea {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid rgba(28,26,23,0.14);
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: var(--charcoal);
    outline: none;
    transition: border-color 0.25s ease, background 0.25s ease;
    box-sizing: border-box;
    letter-spacing: 0.02em;
  }

  .lux-input::placeholder,
  .lux-textarea::placeholder {
    color: rgba(107,101,96,0.5);
    font-weight: 300;
  }

  .lux-input:focus,
  .lux-textarea:focus {
    border-color: var(--gold);
    background: #fff;
  }

  .lux-textarea {
    resize: none;
    line-height: 1.7;
  }

  /* Submit button */
  .lux-submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 32px;
    background: var(--charcoal);
    color: var(--gold-light);
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
    margin-top: 4px;
  }

  .lux-submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-101%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  .lux-submit-btn:hover::before { transform: translateX(0); }
  .lux-submit-btn:hover { color: var(--charcoal); }
  .lux-submit-btn span, .lux-submit-btn svg { position: relative; z-index: 1; }
  .lux-submit-btn svg { transition: transform 0.3s ease; }
  .lux-submit-btn:hover svg { transform: translateX(3px); }

  /* Trust badges */
  .lux-trust-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--divider);
    border: 1px solid var(--divider);
    margin-top: 28px;
  }

  .lux-trust-item {
    background: var(--cream);
    padding: 18px 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .lux-trust-icon {
    font-size: 18px;
    line-height: 1;
  }

  .lux-trust-title {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--charcoal);
  }

  .lux-trust-sub {
    font-size: 11px;
    font-weight: 300;
    color: var(--mid);
  }

  /* ── Mascot ── */
  .lux-mascot-wrap {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 50;
    cursor: pointer;
  }

  .lux-mascot-bubble {
    position: absolute;
    bottom: 72px;
    right: 0;
    width: 240px;
    background: #fff;
    border: 1px solid var(--divider);
    padding: 16px 18px;
    box-shadow: 0 8px 32px rgba(28,26,23,0.12);
  }

  .lux-mascot-bubble::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: #fff;
    border-right: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
    transform: rotate(45deg);
  }

  .lux-mascot-bubble-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 500;
    color: var(--charcoal);
    margin-bottom: 6px;
  }

  .lux-mascot-bubble-text {
    font-size: 12px;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.6;
  }

  .lux-mascot-btn {
    width: 56px;
    height: 56px;
    background: var(--charcoal);
    border: 2px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    transition: transform 0.25s ease, background 0.25s ease;
  }

  .lux-mascot-btn:hover {
    background: var(--gold);
    transform: scale(1.08);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .lux-contact-hero { padding: 72px 32px 80px; }
    .lux-contact-body { padding: 64px 32px 80px; gap: 48px; }
  }

  @media (max-width: 768px) {
    .lux-contact-hero { padding: 64px 24px 72px; }
    .lux-contact-deco { display: none; }
    .lux-contact-body { grid-template-columns: 1fr; padding: 48px 24px 72px; }
    .lux-form-panel { padding: 32px 24px; }
    .lux-inquiry-grid { grid-template-columns: 1fr; }
  }
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [showMascot, setShowMascot] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!\n\nName: ' + formData.name + '\nEmail: ' + formData.email + '\nMessage: ' + formData.message);
    setFormData({ name: '', email: '', message: '' });
    setSelectedOption('');
  };

  const inquiryOptions = [
    { id: 'internship', icon: '💼', label: 'Internship Inquiry', placeholder: 'Hi MTTF team, I am interested in your internship program...' },
    { id: 'workshop', icon: '🎓', label: 'Workshop / Webinar', placeholder: 'Hi, I would like to know more about your workshops and webinars...' },
    { id: 'collaboration', icon: '🤝', label: 'Collaboration', placeholder: 'Hello, I am interested in collaborating with MTTF on...' },
    { id: 'support', icon: '🌐', label: 'Website / Tech Support', placeholder: 'Hi, I need help with technical support regarding...' },
    { id: 'general', icon: '❓', label: 'General Query', placeholder: 'Hi MTTF team, I have a question about...' }
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
    setFormData({
      ...formData,
      message: option.placeholder
    });
  };

  return (
    <>
      <style>{styles}</style>
      <Header />

      <div className="lux-contact-page">

        {/* ── Page Hero ── */}
        <section className="lux-contact-hero">
          <div className="lux-contact-deco">C</div>
          <div className="lux-contact-hero-inner">
            <div className="lux-contact-eyebrow">
              <span className="lux-eyebrow-line" />
              Let's Connect
              <span className="lux-eyebrow-line" />
            </div>
            <h1 className="lux-contact-headline">
              Get In Touch With Us
              <em>Let's Grow Together</em>
            </h1>
            <p className="lux-contact-subhead">
              Have a question, idea, or just want to say hello? Our team at MTTF is here to turn your vision into reality. Drop us a message and let's start the conversation!
            </p>
          </div>
        </section>

        {/* ── Body ── */}
        <div className="lux-contact-body">

          {/* Left — Info Cards */}
          <div>
            <div className="lux-info-stack">

              {/* Address */}
              <div className="lux-info-card">
                <div className="lux-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <span className="lux-info-label">Our Office</span>
                  <span className="lux-info-title">Visit Our Office</span>
                  <span className="lux-info-text">
                    SN #4, Fazilka-Abohar Road<br />
                    Near Bus Stand, Fazilka-152123<br />
                    Punjab, India
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="lux-info-card">
                <div className="lux-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <span className="lux-info-label">Phone</span>
                  <span className="lux-info-title">Give Us a Call</span>
                  <span className="lux-info-text" style={{ marginBottom: "6px" }}>Available Mon - Sat, 9 AM - 6 PM IST</span>
                  <a href="tel:+918968294003" className="lux-info-link">+91-896-829-4003</a>
                </div>
              </div>

              {/* Email */}
              <div className="lux-info-card">
                <div className="lux-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <span className="lux-info-label">Email</span>
                  <span className="lux-info-title">Send Us an Email</span>
                  <span className="lux-info-text" style={{ marginBottom: "6px" }}>We reply within 12–24 hours</span>
                  <a href="mailto:contactus@mttf.in" className="lux-info-link">contactus@mttf.in</a>
                </div>
              </div>

            </div>

            {/* Map card */}
            <div className="lux-map-card">
              <span className="lux-map-label">Locate Us</span>
              <div className="lux-map-placeholder">
                <div className="lux-map-pin-ring" />
                <div className="lux-map-pin-ring" />
                <div className="lux-map-pin">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="lux-map-tag">
                  <span className="lux-map-tag-city">Fazilka, Punjab</span>
                  <span className="lux-map-tag-sub">Click to view in maps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lux-form-panel">
            <h2 className="lux-form-heading">
              Ready to Get <em>Started?</em>
            </h2>

            {/* Inquiry options */}
            <span className="lux-inquiry-label">How Can We Help You?</span>
            <div className="lux-inquiry-grid">
              {inquiryOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className={`lux-inquiry-btn${selectedOption === option.id ? ' active' : ''}`}
                >
                  <span className="lux-inquiry-icon">{option.icon}</span>
                  <span className="lux-inquiry-text">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Fields */}
            <div className="lux-form-fields">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="lux-input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleChange}
                className="lux-input"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="lux-textarea"
                required
              />
              <button
                onClick={handleSubmit}
                type="button"
                className="lux-submit-btn"
              >
                <span>Send Message</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5H12M7.5 2L12 6.5L7.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div className="lux-trust-row">
              <div className="lux-trust-item">
                <span className="lux-trust-icon">⏳</span>
                <span className="lux-trust-title">Avg. Response</span>
                <span className="lux-trust-sub">12 Hours</span>
              </div>
              <div className="lux-trust-item">
                <span className="lux-trust-icon">🔐</span>
                <span className="lux-trust-title">Data is</span>
                <span className="lux-trust-sub">Secure</span>
              </div>
              <div className="lux-trust-item">
                <span className="lux-trust-icon">📧</span>
                <span className="lux-trust-title">We Reply to</span>
                <span className="lux-trust-sub">Every Message</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mascot ── */}
      <div className="lux-mascot-wrap">
        <div
          onMouseEnter={() => setShowMascot(true)}
          onMouseLeave={() => setShowMascot(false)}
          onClick={() => setShowMascot(!showMascot)}
        >
          {showMascot && (
            <div className="lux-mascot-bubble">
              <p className="lux-mascot-bubble-title">Need help?</p>
              <p className="lux-mascot-bubble-text">
                Drop us a message and we'll reply within 24 hours!
              </p>
            </div>
          )}
          <div className="lux-mascot-btn">
            🤖
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;