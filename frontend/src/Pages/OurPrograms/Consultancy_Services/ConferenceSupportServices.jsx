import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import {
  Calendar,
  Users,
  Globe,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Mic,
  Video,
  Award,
  Network
} from "lucide-react";

export default function ConferenceSupportServices() {
  const services = [
    {
      icon: <Calendar size={24} />,
      num: "01",
      title: "Conference Planning & Coordination",
      description: "Comprehensive end-to-end conference planning with systematic execution",
      features: [
        "End-to-end conference planning",
        "Schedule management",
        "Speaker & delegate coordination",
        "Session timeline management"
      ]
    },
    {
      icon: <Mic size={24} />,
      num: "02",
      title: "Speaker & Keynote Management",
      description: "Professional handling of speakers and keynote presentations",
      features: [
        "Speaker invitation handling",
        "Travel & accommodation support",
        "Session moderation assistance",
        "Live Q&A coordination"
      ]
    },
    {
      icon: <BookOpen size={24} />,
      num: "03",
      title: "Paper Submission & Review Support",
      description: "Technical system for research paper management and peer review",
      features: [
        "Research paper submission portal",
        "Abstract review tracking",
        "Reviewer assignment system",
        "Acceptance notification management"
      ]
    },
    {
      icon: <Users size={24} />,
      num: "04",
      title: "Registration & Ticketing System",
      description: "Streamlined digital registration and participant management",
      features: [
        "Online participant registration",
        "Digital conference pass generation",
        "QR code-based entry system",
        "Payment tracking integration"
      ]
    },
    {
      icon: <Video size={24} />,
      num: "05",
      title: "Virtual & Hybrid Conference Support",
      description: "Modern solutions for online and hybrid conference formats",
      features: [
        "Live streaming management",
        "Zoom / Google Meet integration",
        "Real-time chat moderation",
        "Online polling & feedback collection"
      ]
    },
    {
      icon: <Network size={24} />,
      num: "06",
      title: "Logistics & Venue Support",
      description: "Complete venue coordination and technical infrastructure setup",
      features: [
        "Venue setup coordination",
        "Stage & AV support",
        "Seating arrangement planning",
        "Technical troubleshooting"
      ]
    },
    {
      icon: <Globe size={24} />,
      num: "07",
      title: "International Collaboration & Networking",
      description: "Facilitating global research partnerships and knowledge exchange",
      features: [
        "Connecting global researchers",
        "Cross-border academic partnerships",
        "International speaker collaborations",
        "Knowledge exchange platform"
      ]
    },
    {
      icon: <Award size={24} />,
      num: "08",
      title: "Post-Conference Analytics & Reports",
      description: "Comprehensive analysis and impact assessment of conference outcomes",
      features: [
        "Participant engagement analysis",
        "Feedback report generation",
        "Attendance statistics",
        "Conference impact summary"
      ]
    }
  ];

  const conferenceTypes = [
    {
      icon: <Globe size={22} />,
      title: "International Conferences",
      description: "Large-scale global events with participants from multiple countries",
      capacity: "500–2000+ attendees"
    },
    {
      icon: <Network size={22} />,
      title: "National Conferences",
      description: "Nationwide academic and research conferences",
      capacity: "200–1000 attendees"
    },
    {
      icon: <Mic size={22} />,
      title: "Symposiums & Seminars",
      description: "Focused discussions on specific topics and research areas",
      capacity: "50–300 attendees"
    },
    {
      icon: <Award size={22} />,
      title: "Workshops & Bootcamps",
      description: "Hands-on training sessions and skill development programs",
      capacity: "20–200 attendees"
    }
  ];

  const timeline = [
    { phase: "12–18 Months Before", title: "Initial Planning",      tasks: ["Select theme and dates", "Form organizing committee", "Secure venue", "Budget planning"] },
    { phase: "6–12 Months Before",  title: "Program Development",   tasks: ["Invite keynote speakers", "Call for papers", "Create conference website", "Open registration"] },
    { phase: "3–6 Months Before",   title: "Preparation Phase",     tasks: ["Review submissions", "Finalize schedule", "Arrange accommodation", "Marketing campaign"] },
    { phase: "1–3 Months Before",   title: "Final Arrangements",    tasks: ["Confirm all bookings", "Prepare conference materials", "Technical setup", "Participant communication"] },
    { phase: "During Conference",   title: "Execution",             tasks: ["Registration management", "Technical support", "Speaker coordination", "Live streaming"] },
    { phase: "After Conference",    title: "Follow-up",             tasks: ["Publish proceedings", "Distribute certificates", "Feedback collection", "Financial closure"] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;0,900;1,600&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGold {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }

        .conf-page { background: #F7F3EA; color: #1C1208; font-family: 'DM Sans', sans-serif; }

        /* Cards */
        .svc-card {
          background: #FAF8F2;
          border: 1px solid #E8E0CC;
          border-radius: 4px;
          padding: 2.25rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .svc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, #E8C96A, transparent);
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .svc-card:hover::before { width: 100%; }
        .svc-card:hover {
          border-color: #C9A84C;
          transform: translateY(-5px);
          box-shadow: 0 20px 44px rgba(139,109,56,0.12);
          background: #FEFCF7;
        }

        .type-card {
          background: #FAF8F2;
          border: 1px solid #E8E0CC;
          border-radius: 4px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .type-card:hover {
          border-color: #C9A84C;
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(139,109,56,0.1);
          background: #FEFCF7;
        }

        .stat-box {
          background: #FAF8F2;
          border: 1px solid #E8E0CC;
          border-radius: 4px;
          padding: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
        }
        .stat-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-box:hover::before { opacity: 1; }
        .stat-box:hover { border-color: #C9A84C; transform: translateY(-3px); box-shadow: 0 12px 28px rgba(139,109,56,0.1); }

        /* Luxury buttons */
        .btn-gold {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2.25rem;
          background: #C9A84C; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
          font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          border: 1px solid #C9A84C; border-radius: 2px;
          cursor: pointer; transition: all 0.35s ease; text-decoration: none;
        }
        .btn-gold:hover { background: #B8965A; border-color: #B8965A; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(201,168,76,0.28); }

        .btn-dark {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2.25rem;
          background: #1C1208; color: #F7F3EA;
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
          font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          border: 1px solid #1C1208; border-radius: 2px;
          cursor: pointer; transition: all 0.35s ease; text-decoration: none;
        }
        .btn-dark:hover { background: #C9A84C; border-color: #C9A84C; color: #fff; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(201,168,76,0.28); }

        .gold-rule { height: 1px; background: linear-gradient(90deg, transparent, #C9A84C70, transparent); }

        .eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: 0.65rem;
          letter-spacing: 0.22em; color: #C9A84C; text-transform: uppercase;
          font-weight: 500; display: flex; align-items: center;
          gap: 0.5rem; justify-content: center; margin-bottom: 1rem;
        }
        .eyebrow-line { display: inline-block; width: 28px; height: 1px; background: #C9A84C; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F7F3EA; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }
      `}</style>

      <div className="conf-page">
        <Header />

        {/* ── Breadcrumb ── */}
        <section style={{ paddingTop: '7rem', paddingBottom: '1.5rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link
              to="/programs/consultancy-services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem',
                color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.06em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#8B6D38'}
              onMouseLeave={e => e.currentTarget.style.color = '#C9A84C'}
            >
              <ArrowLeft size={15} />
              Back to Consultancy Services
            </Link>
          </div>
        </section>

        {/* ── Hero ── */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(158deg, #F7F3EA 0%, #EDE5CC 55%, #E4D5A8 100%)',
          padding: '4rem 2rem 5.5rem', textAlign: 'center',
          borderBottom: '1px solid #D8CBA8',
        }}>
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)`,
            backgroundSize: '72px 72px', pointerEvents: 'none',
          }} />
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '700px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Corner brackets */}
          {[
            { top:'1.8rem', left:'1.8rem', borderTop:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
            { top:'1.8rem', right:'1.8rem', borderTop:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
            { bottom:'1.8rem', left:'1.8rem', borderBottom:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
            { bottom:'1.8rem', right:'1.8rem', borderBottom:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
          ].map((s,i) => <div key={i} style={{ position:'absolute', width:52, height:52, opacity:0.45, ...s }} />)}

          <div style={{ position:'relative', zIndex:1, animation:'fadeUp 0.9s ease both' }}>
            {/* Badge */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'0.65rem',
              background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)',
              borderRadius:'2px', padding:'0.4rem 1.2rem', marginBottom:'1.75rem',
            }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#C9A84C', display:'inline-block', animation:'pulseGold 2s ease infinite' }} />
              <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem', color:'#8B6D38', letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:500 }}>
                Section 3 · Conference Services
              </span>
            </div>

            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em',
              color:'#1C1208', marginBottom:'0.6rem',
            }}>
              National & International
            </h1>
            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em',
              marginBottom:'1.25rem', fontStyle:'italic',
              background:'linear-gradient(135deg, #C9A84C 0%, #8B6D38 40%, #E8C96A 100%)',
              backgroundSize:'200% auto',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              animation:'shimmer 4s linear infinite',
            }}>
              Conference Support
            </h1>

            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.25rem', fontStyle:'italic', color:'#6B5C3E', maxWidth:'600px', margin:'0 auto 0.75rem', lineHeight:1.7, fontWeight:500 }}>
              Empowering Conferences Across Borders
            </p>

            <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.92rem', color:'#6B5C3E', maxWidth:'680px', margin:'0 auto 0.75rem', lineHeight:1.8, fontWeight:300 }}>
              Elevate your academic conferences with our comprehensive support services.
              From initial planning to post-conference publications, we provide everything
              you need to host successful national and international conferences.
            </p>
            <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.88rem', color:'#8B7048', maxWidth:'720px', margin:'0 auto 3rem', lineHeight:1.8, fontWeight:300 }}>
              Connect with leading experts in Science, Technology, Engineering, and Mathematics.
              Our distinguished team brings decades of combined experience to help you achieve
              your research, academic, and industry objectives.
            </p>

            {/* Stats row */}
            <div style={{
              display:'flex', justifyContent:'center', flexWrap:'wrap',
              border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.04)',
              borderRadius:'2px', maxWidth:'560px', margin:'0 auto',
            }}>
              {[['50+','Conferences'],['20+','Countries'],['15K+','Participants'],['95%','Success Rate']].map(([v,l],i) => (
                <div key={l} style={{
                  flex:'1 1 120px', padding:'1.1rem 0.75rem', textAlign:'center',
                  borderRight: i < 3 ? '1px solid rgba(201,168,76,0.15)' : 'none',
                }}>
                  <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.8rem', fontWeight:700, color:'#C9A84C', lineHeight:1 }}>{v}</div>
                  <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.58rem', color:'rgba(90,65,40,0.45)', letterSpacing:'0.14em', textTransform:'uppercase', marginTop:'0.25rem', fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Services Grid ── */}
        <section style={{ background:'#FEFCF5', padding:'5rem 2rem' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <div className="eyebrow"><span className="eyebrow-line" />Our Services<span className="eyebrow-line" /></div>
            <h2 style={{
              fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.8rem,3vw,2.8rem)',
              fontWeight:700, color:'#1C1208', textAlign:'center', marginBottom:'3rem',
              letterSpacing:'-0.02em',
            }}>
              Conference Support{' '}
              <span style={{ fontStyle:'italic', color:'#8B6D38' }}>Services</span>
            </h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'1.5rem' }}>
              {services.map((svc, i) => (
                <ServiceCard key={i} svc={svc} index={i} />
              ))}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Conference Types ── */}
        <section style={{ padding:'5rem 2rem' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <div className="eyebrow"><span className="eyebrow-line" />What We Support<span className="eyebrow-line" /></div>
            <h2 style={{
              fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.8rem,3vw,2.8rem)',
              fontWeight:700, color:'#1C1208', textAlign:'center', marginBottom:'3rem',
              letterSpacing:'-0.02em',
            }}>
              Types of Conferences{' '}
              <span style={{ fontStyle:'italic', color:'#8B6D38' }}>We Support</span>
            </h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:'1.25rem' }}>
              {conferenceTypes.map((type, i) => (
                <div className="type-card" key={i} style={{ animationDelay:`${i*0.08}s`, animation:'fadeUp 0.6s ease both' }}>
                  {/* Clipped corner */}
                  <div style={{ position:'absolute', top:0, right:0, width:16, height:16, background:'#E8DFC4', clipPath:'polygon(100% 0, 0 0, 100% 100)', transition:'background 0.3s' }} />
                  <div style={{
                    width:'44px', height:'44px', background:'#F5EFD8', border:'1px solid #E8D89A',
                    borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center',
                    marginBottom:'1.1rem', color:'#C9A84C',
                  }}>
                    {type.icon}
                  </div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.2rem', fontWeight:700, color:'#1C1208', margin:'0 0 0.5rem' }}>{type.title}</h3>
                  <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.82rem', color:'#6B5C3E', lineHeight:1.75, margin:'0 0 1rem', fontWeight:300 }}>{type.description}</p>
                  <span style={{
                    display:'inline-block', padding:'0.25rem 0.75rem',
                    border:'1px solid rgba(201,168,76,0.35)', borderRadius:'1px',
                    fontFamily:"'DM Sans', sans-serif", fontSize:'0.62rem',
                    color:'#C9A84C', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500,
                  }}>{type.capacity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Timeline ── */}
        <section style={{ background:'#1C1208', padding:'5.5rem 2rem', borderTop:'1px solid rgba(201,168,76,0.15)' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'1rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}>
                <span style={{ display:'inline-block', width:22, height:1, background:'#C9A84C' }} />
                Planning Guide
                <span style={{ display:'inline-block', width:22, height:1, background:'#C9A84C' }} />
              </div>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, color:'#E8D9C0', letterSpacing:'-0.02em', margin:0 }}>
                Conference Organizing{' '}
                <span style={{ fontStyle:'italic', color:'#C9A84C' }}>Timeline</span>
              </h2>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.1)', borderRadius:'4px', overflow:'hidden' }}>
              {timeline.map((stage, i) => (
                <TimelineRow key={i} stage={stage} index={i} total={timeline.length} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Track Record ── */}
        <section style={{ padding:'5rem 2rem', background:'#F7F3EA' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            <div className="eyebrow"><span className="eyebrow-line" />Track Record<span className="eyebrow-line" /></div>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, color:'#1C1208', textAlign:'center', marginBottom:'3rem', letterSpacing:'-0.02em' }}>
              Our{' '}<span style={{ fontStyle:'italic', color:'#8B6D38' }}>Proven Impact</span>
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'1.25rem' }}>
              {[['50+','Conferences Organized'],['20+','Countries Represented'],['15K+','Total Participants'],['95%','Success Rate']].map(([val, label], i) => (
                <div className="stat-box" key={label} style={{ animationDelay:`${i*0.08}s`, animation:'fadeUp 0.6s ease both' }}>
                  <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'2.8rem', fontWeight:700, color:'#C9A84C', letterSpacing:'-0.03em', lineHeight:1, marginBottom:'0.4rem' }}>{val}</div>
                  <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.72rem', color:'#6B5C3E', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── CTA ── */}
        <section style={{ padding:'5rem 2rem', background:'#FEFCF5' }}>
          <div style={{ maxWidth:'780px', margin:'0 auto' }}>
            <div style={{
              background:'linear-gradient(158deg, #1C1208 0%, #2E1F08 100%)',
              border:'1px solid #3D2A0A', borderRadius:'4px',
              padding:'4rem 3rem', textAlign:'center', position:'relative', overflow:'hidden',
            }}>
              {/* Gold top */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
              {/* Brackets */}
              {[
                { top:'1.2rem', left:'1.2rem', borderTop:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { top:'1.2rem', right:'1.2rem', borderTop:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
                { bottom:'1.2rem', left:'1.2rem', borderBottom:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { bottom:'1.2rem', right:'1.2rem', borderBottom:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
              ].map((s,i) => <div key={i} style={{ position:'absolute', width:36, height:36, ...s }} />)}

              <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'1.25rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}>
                <span style={{ display:'inline-block', width:22, height:1, background:'#C9A84C' }} />
                Get Started
                <span style={{ display:'inline-block', width:22, height:1, background:'#C9A84C' }} />
              </div>

              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:'#F7F3EA', letterSpacing:'-0.02em', margin:'0 0 1rem' }}>
                Ready to Organize Your{' '}
                <span style={{ fontStyle:'italic', background:'linear-gradient(135deg, #C9A84C, #E8C96A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Conference?
                </span>
              </h2>

              <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.92rem', color:'rgba(247,243,234,0.55)', maxWidth:'480px', margin:'0 auto 2.5rem', lineHeight:1.78, fontWeight:300 }}>
                Let our experienced team help you create a memorable and successful conference.
              </p>

              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                <Link to="/contacts" className="btn-gold">
                  Schedule Consultation
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link to="/programs/consultancy-services" className="btn-dark">
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// ── Service Card ──
function ServiceCard({ svc, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="svc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay:`${index*0.07}s`, animation:'fadeUp 0.6s ease both' }}
    >
      {/* Clipped corner */}
      <div style={{ position:'absolute', top:0, right:0, width:18, height:18, background: hovered ? '#C9A84C' : '#E8DFC4', clipPath:'polygon(100% 0, 0 0, 100% 100%)', transition:'background 0.3s' }} />

      {/* Number + icon row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
        <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'0.7rem', color:'#C9A84C', letterSpacing:'0.15em', fontWeight:600 }}>{svc.num}</span>
        <div style={{
          width:'44px', height:'44px', background: hovered ? '#FDF5E0' : '#F5EFD8',
          border:'1px solid #E8D89A', borderRadius:'4px',
          display:'flex', alignItems:'center', justifyContent:'center', color:'#C9A84C',
          transition:'all 0.3s', transform: hovered ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
        }}>
          {svc.icon}
        </div>
      </div>

      <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.3rem', fontWeight:700, color:'#1C1208', margin:'0 0 0.5rem', letterSpacing:'-0.01em', lineHeight:1.25 }}>
        {svc.title}
      </h3>
      <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.82rem', color:'#8B7048', lineHeight:1.7, margin:'0 0 1rem', fontWeight:300 }}>
        {svc.description}
      </p>

      {/* Divider */}
      <div style={{ height:'1px', background: hovered ? 'linear-gradient(90deg,#C9A84C40,transparent)' : '#EDE4CC', marginBottom:'1rem', transition:'background 0.3s' }} />

      <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
        {svc.features.map((feat, idx) => (
          <li key={idx} style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
            <CheckCircle2 size={14} color="#C9A84C" style={{ flexShrink:0 }} />
            <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem', color:'#6B5C3E', fontWeight:300 }}>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Timeline Row ──
function TimelineRow({ stage, index, total }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:'flex', gap:'1.5rem', alignItems:'flex-start',
        padding:'1.75rem 2rem',
        background: hovered ? 'rgba(201,168,76,0.04)' : '#1C1208',
        borderBottom: index < total-1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
        transition:'background 0.3s',
      }}
    >
      {/* Phase label */}
      <div style={{ flexShrink:0, width:'160px', paddingTop:'0.1rem' }}>
        <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'0.72rem', color: hovered ? '#E8C96A' : '#C9A84C', letterSpacing:'0.1em', fontWeight:600, textTransform:'uppercase', transition:'color 0.3s' }}>
          {stage.phase}
        </span>
      </div>

      <div style={{ flex:1 }}>
        <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.1rem', fontWeight:700, color:'#E8D9C0', margin:'0 0 0.85rem', letterSpacing:'-0.01em' }}>
          {stage.title}
        </h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'0.5rem' }}>
          {stage.tasks.map((task, idx) => (
            <div key={idx} style={{ display:'flex', alignItems:'center', gap:'0.55rem' }}>
              <CheckCircle2 size={13} color="#C9A84C" style={{ flexShrink:0 }} />
              <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem', color:'rgba(232,217,192,0.55)', fontWeight:300 }}>{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}