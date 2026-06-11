import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Mail, Phone, Linkedin, Star, Zap, Target } from 'lucide-react';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import bhartiKapoor from "../../../assets/Executives/bharti kapoor.webp";
import madhuchandRakshit from "../../../assets/Executives/Madhuchand rakshit.webp";
import pooja from "../../../assets/Executives/pooja.webp";
import shaluGupta from "../../../assets/Executives/shalu gupta.webp";
import upinderKaur from "../../../assets/Executives/upinder kaur.webp";

const Executives = () => {
  const [selectedExecutive, setSelectedExecutive] = useState(null);

  const executives = [
    {
      name: 'Dr. Bharti Kapoor',
      role: 'Executive Member',
      expertise: 'STEM Education & Punjab Coordination',
      department: 'MTTF, India',
      image: bhartiKapoor,
      bio: 'Executive Member of MathTech Thinking Foundation (MTTF, India) and MTTF Coordinator for Punjab, India. Actively involved in establishing academic relations, collaborations, and promotion of STEM education across the region.',
      responsibilities: [
        'STEM academic relations & collaborations',
        'Regional promotion of MTTF programs',
        'Engaging STEM professionals in Punjab',
        'Foundation governance & coordination',
      ],
      achievements: [
        'MTTF Coordinator, Punjab (Member ID: MTTF6547519)',
        'Scholar Google researcher in STEM',
        'Active contributor to MTTF initiatives',
      ],
      contact: { email: 'contactus@mttf.in', phone: '+91-896-829-4003', linkedin: 'https://scholar.google.com/citations?hl=en&user=CnMnwEUAAAAJ' },
      num: '01',
    },
    {
      name: 'Dr. Madhuchanda Rakshit',
      role: 'Executive Member',
      expertise: 'STEM Research & Academic Collaboration',
      department: 'MTTF, India',
      image: madhuchandRakshit,
      bio: "Executive Member of MathTech Thinking Foundation (MTTF, India), dedicated to advancing STEM education, research, and academic collaborations across the foundation's network.",
      responsibilities: [
        'Academic research & STEM promotion',
        'Executive coordination, MTTF India',
        'Building STEM professional networks',
        'Supporting foundation programs & events',
      ],
      achievements: [
        'Executive Member, MTTF India',
        'Contributor to STEM research initiatives',
        'Active in MTTF academic collaborations',
      ],
      contact: { email: 'contactus@mttf.in', phone: '+91-896-829-4003', linkedin: '#' },
      num: '02',
    },
    {
      name: 'Dr. Upinder Kaur',
      role: 'Executive Member',
      expertise: 'Faculty Development & Academic Outreach',
      department: 'MTTF, India',
      image: upinderKaur,
      bio: 'Executive Member of MathTech Thinking Foundation (MTTF, India) and MTTF Coordinator for Punjab. Associated with Atal University of Technical Science (AUTS), contributing to STEM faculty development and academic outreach.',
      responsibilities: [
        'STEM faculty development & outreach',
        'Coordinator, MTTF Punjab region',
        'Academic collaboration facilitation',
        'Supporting MTTF internship programs',
      ],
      achievements: [
        'MTTF Coordinator, Punjab (India)',
        'Faculty, AUTS (Atal University of Tech. Science)',
        'Active STEM academic contributor',
      ],
      contact: { email: 'contactus@mttf.in', phone: '+91-896-829-4003', linkedin: 'https://auts.ac.in/cse-faculty-associated-faculty/' },
      num: '03',
    },
    {
      name: 'Dr. Shalu Gupta',
      role: 'Executive Member',
      expertise: 'Skill Development & Research Collaboration',
      department: 'MTTF, India',
      image: shaluGupta,
      bio: "Executive Member of MathTech Thinking Foundation (MTTF, India), contributing to the foundation's mission of promoting STEM education, skill development, and research collaborations across India.",
      responsibilities: [
        'STEM skill development programs',
        'Executive coordination, MTTF India',
        'Research collaboration support',
        'Promoting MTTF membership & outreach',
      ],
      achievements: [
        'Executive Member, MTTF India',
        'Dedicated STEM researcher & educator',
        'Active in MTTF workshops & webinars',
      ],
      contact: { email: 'contactus@mttf.in', phone: '+91-896-829-4003', linkedin: '#' },
      num: '04',
    },
    {
      name: 'Dr. Pooja',
      role: 'Executive Member',
      expertise: 'STEM Promotion & Certification Programs',
      department: 'MTTF, India',
      image: pooja,
      bio: "Executive Member of MathTech Thinking Foundation (MTTF, India), actively involved in promoting STEM education and building collaborative academic networks to advance the foundation's core mission.",
      responsibilities: [
        'STEM education promotion',
        'Executive coordination, MTTF India',
        'Academic networking & outreach',
        'Supporting MTTF certification programs',
      ],
      achievements: [
        'Executive Member, MTTF India',
        'Contributor to MTTF academic programs',
        'Engaged in STEM professional development',
      ],
      contact: { email: 'contactus@mttf.in', phone: '+91-896-829-4003', linkedin: '#' },
      num: '05',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;0,900;1,600&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseGold {
          0%,100% { opacity:1;    }
          50%      { opacity:0.25; }
        }
        @keyframes rotateSlow    { from { transform:translate(-50%,-50%) rotate(0deg);   } to { transform:translate(-50%,-50%) rotate(360deg);  } }
        @keyframes rotateReverse { from { transform:translate(-50%,-50%) rotate(0deg);   } to { transform:translate(-50%,-50%) rotate(-360deg); } }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }

        .exec-main {
          flex:1;
          background:linear-gradient(158deg,#F7F3EA 0%,#EDE5CC 55%,#E4D5A8 100%);
          padding:6rem 1.5rem 5rem;
          position:relative; overflow:hidden;
          font-family:'DM Sans',sans-serif;
        }

        .gold-rule { height:1px; background:linear-gradient(90deg,transparent,#C9A84C70,transparent); }

        .eyebrow {
          font-family:'DM Sans',sans-serif; font-size:0.65rem; letter-spacing:0.22em;
          color:#C9A84C; text-transform:uppercase; font-weight:500;
          display:flex; align-items:center; gap:0.5rem; justify-content:center; margin-bottom:1rem;
        }
        .eyebrow-line { display:inline-block; width:28px; height:1px; background:#C9A84C; }

        .exec-card {
          background:#FAF8F2; border:1px solid #E8E0CC; border-radius:4px;
          overflow:hidden; position:relative;
          transition:all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .exec-card::before {
          content:''; position:absolute; top:0; left:0;
          width:0; height:2px;
          background:linear-gradient(90deg,#C9A84C,#E8C96A,transparent);
          transition:width 0.45s cubic-bezier(0.23,1,0.32,1); z-index:2;
        }
        .exec-card:hover::before { width:100%; }
        .exec-card:hover { border-color:#C9A84C; box-shadow:0 24px 52px rgba(139,109,56,0.14); background:#FEFCF7; }

        .social-btn {
          width:34px; height:34px; border-radius:50%;
          background:#F5EFD8; border:1px solid #E8D89A;
          display:flex; align-items:center; justify-content:center;
          font-size:0.9rem; cursor:pointer;
          transition:all 0.3s ease; text-decoration:none;
        }
        .social-btn:hover { background:#C9A84C; border-color:#C9A84C; transform:translateY(-2px) rotate(5deg); }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#F7F3EA; }
        ::-webkit-scrollbar-thumb { background:#C9A84C; border-radius:2px; }
      `}</style>

      <Header />

      <main className="exec-main">
        {/* Rotating rings */}
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'600px', height:'600px', border:'1px solid rgba(201,168,76,0.07)', borderRadius:'50%', animation:'rotateSlow 50s linear infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'900px', height:'900px', border:'1px dashed rgba(201,168,76,0.04)', borderRadius:'50%', animation:'rotateReverse 75s linear infinite', pointerEvents:'none' }} />
        {/* Glow */}
        <div style={{ position:'absolute', top:'25%', left:'50%', transform:'translateX(-50%)', width:'800px', height:'500px', background:'radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)`, backgroundSize:'72px 72px', pointerEvents:'none' }} />
        {/* Corner brackets */}
        {[
          { top:'1.5rem', left:'1.5rem', borderTop:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
          { top:'1.5rem', right:'1.5rem', borderTop:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
          { bottom:'1.5rem', left:'1.5rem', borderBottom:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
          { bottom:'1.5rem', right:'1.5rem', borderBottom:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
        ].map((s, i) => <div key={i} style={{ position:'absolute', width:48, height:48, opacity:0.4, ...s }} />)}

        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity:0, y:-40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7 }}
            style={{ textAlign:'center', marginBottom:'4.5rem' }}
          >
            <motion.div
              initial={{ rotate:-180, scale:0 }}
              animate={{ rotate:0, scale:1 }}
              transition={{ delay:0.3, type:'spring', stiffness:150 }}
              style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'64px', height:'64px', background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', marginBottom:'1.75rem', color:'#C9A84C' }}
            >
              <Briefcase size={26} />
            </motion.div>

            <div className="eyebrow">
              <span className="eyebrow-line" />
              Leadership Team
              <span className="eyebrow-line" />
            </div>

            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.6rem,6vw,5.5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', color:'#1C1208', marginBottom:'0.4rem' }}>
              Executive
            </h1>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.6rem,6vw,5.5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', marginBottom:'1.25rem', fontStyle:'italic', background:'linear-gradient(135deg,#C9A84C 0%,#8B6D38 40%,#E8C96A 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>
              Members
            </h1>

            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'1rem', color:'#6B5C3E', maxWidth:'520px', margin:'0 auto 2rem', lineHeight:1.78, fontWeight:300 }}>
              Meet the dedicated executive members driving MTTF's vision forward with leadership and innovation across India
            </p>

            <motion.div
              initial={{ scaleX:0 }}
              animate={{ scaleX:1 }}
              transition={{ delay:0.6, duration:0.8 }}
              style={{ height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin:'0 auto', maxWidth:'10rem' }}
            />
          </motion.div>

          {/* ── Executives Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(480px,1fr))', gap:'1.5rem', marginBottom:'4rem' }}
          >
            {executives.map((exec, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y:-6, scale:1.01 }}
                onClick={() => setSelectedExecutive(exec)}
                style={{ cursor:'pointer' }}
              >
                <ExecCard exec={exec} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Modal ── */}
          <AnimatePresence>
            {selectedExecutive && (
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                style={{ position:'fixed', inset:0, background:'rgba(28,18,8,0.75)', backdropFilter:'blur(6px)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}
                onClick={() => setSelectedExecutive(null)}
              >
                <motion.div
                  initial={{ scale:0.92, y:40 }}
                  animate={{ scale:1, y:0 }}
                  exit={{ scale:0.92, y:40 }}
                  transition={{ type:'spring', damping:20, stiffness:200 }}
                  onClick={e => e.stopPropagation()}
                  style={{ maxWidth:'820px', width:'100%', background:'#FAF8F2', border:'1px solid #C9A84C', borderRadius:'4px', overflow:'hidden', boxShadow:'0 40px 80px rgba(139,109,56,0.2)', maxHeight:'90vh', overflowY:'auto', position:'relative' }}
                >
                  {/* Gold top bar */}
                  <div style={{ height:'2px', background:'linear-gradient(90deg,transparent,#C9A84C,#E8C96A,#C9A84C,transparent)' }} />
                  {/* Clipped corner */}
                  <div style={{ position:'absolute', top:2, right:0, width:22, height:22, background:'#C9A84C', clipPath:'polygon(100% 0,0 0,100% 100%)' }} />

                  <div style={{ padding:'2.5rem' }}>
                    <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>

                      {/* Top row */}
                      <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', alignItems:'flex-start' }}>
                        {/* Image */}
                        <motion.div
                          whileHover={{ scale:1.05, rotate:3 }}
                          style={{ position:'relative', flexShrink:0 }}
                        >
                          <div style={{ position:'absolute', inset:'-3px', borderRadius:'4px', border:'2px solid #C9A84C' }} />
                          <img
                            src={selectedExecutive.image}
                            alt={selectedExecutive.name}
                            style={{ width:'140px', height:'140px', borderRadius:'4px', objectFit:'cover', display:'block', position:'relative', zIndex:1 }}
                          />
                          <div style={{ position:'absolute', bottom:'-8px', right:'-8px', width:'28px', height:'28px', background:'#C9A84C', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #FAF8F2', zIndex:2 }}>
                            <Star size={12} color="#fff" />
                          </div>
                        </motion.div>

                        {/* Name block */}
                        <div style={{ flex:1, minWidth:'200px' }}>
                          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.2em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'0.4rem' }}>
                            {selectedExecutive.department}
                          </div>
                          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:700, color:'#1C1208', margin:'0 0 0.3rem', letterSpacing:'-0.02em' }}>
                            {selectedExecutive.name}
                          </h2>
                          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', fontWeight:600, color:'#C9A84C', margin:'0 0 0.25rem', letterSpacing:'0.02em' }}>
                            {selectedExecutive.role}
                          </p>
                          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:"'DM Sans',sans-serif", fontSize:'0.75rem', color:'#9C8B6E', fontStyle:'italic', fontWeight:300, marginBottom:'1rem' }}>
                            <Zap size={11} color="#C9A84C" />
                            {selectedExecutive.expertise}
                          </div>
                          <div style={{ height:'1px', background:'linear-gradient(90deg,#C9A84C40,transparent)', marginBottom:'1rem' }} />
                          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.875rem', color:'#6B5C3E', lineHeight:1.8, fontWeight:300, margin:0 }}>
                            {selectedExecutive.bio}
                          </p>
                        </div>
                      </div>

                      {/* Responsibilities + Achievements */}
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.5rem' }}>
                        {/* Responsibilities */}
                        <div style={{ background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', padding:'1.5rem' }}>
                          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.18em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                            <span style={{ display:'inline-block', width:16, height:1, background:'#C9A84C' }} />
                            Key Responsibilities
                          </div>
                          {selectedExecutive.responsibilities.map((resp, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity:0, x:-16 }}
                              animate={{ opacity:1, x:0 }}
                              transition={{ delay:0.3 + i * 0.1 }}
                              style={{ display:'flex', alignItems:'flex-start', gap:'0.6rem', marginBottom:'0.5rem' }}
                            >
                              <span style={{ marginTop:'0.45rem', width:5, height:5, borderRadius:'50%', background:'#C9A84C', flexShrink:0, display:'inline-block' }} />
                              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.82rem', color:'#6B5C3E', fontWeight:300, lineHeight:1.6 }}>{resp}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Achievements */}
                        <div style={{ background:'#FAF8F2', border:'1px solid #E8E0CC', borderRadius:'4px', padding:'1.5rem' }}>
                          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.18em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                            <Star size={11} color="#C9A84C" />
                            Notable Achievements
                          </div>
                          {selectedExecutive.achievements.map((ach, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity:0, x:-16 }}
                              animate={{ opacity:1, x:0 }}
                              transition={{ delay:0.4 + i * 0.1 }}
                              style={{ display:'flex', alignItems:'flex-start', gap:'0.6rem', marginBottom:'0.5rem' }}
                            >
                              <span style={{ marginTop:'0.45rem', width:5, height:5, background:'#C9A84C', flexShrink:0, display:'inline-block', borderRadius:'1px', transform:'rotate(45deg)' }} />
                              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.82rem', color:'#6B5C3E', fontWeight:300, lineHeight:1.6 }}>{ach}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'1.25rem', paddingTop:'0.5rem', borderTop:'1px solid #EDE4CC' }}>
                        <motion.a
                          href={`mailto:${selectedExecutive.contact.email}`}
                          whileHover={{ scale:1.18, rotate:5 }}
                          whileTap={{ scale:0.9 }}
                          className="social-btn"
                          title={selectedExecutive.contact.email}
                        >
                          📧
                        </motion.a>
                        <motion.a
                          href={`tel:${selectedExecutive.contact.phone}`}
                          whileHover={{ scale:1.18, rotate:5 }}
                          whileTap={{ scale:0.9 }}
                          className="social-btn"
                          title={selectedExecutive.contact.phone}
                        >
                          📞
                        </motion.a>
                        {selectedExecutive.contact.linkedin && selectedExecutive.contact.linkedin !== '#' && (
                          <motion.a
                            href={selectedExecutive.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale:1.18, rotate:5 }}
                            whileTap={{ scale:0.9 }}
                            className="social-btn"
                            title="View Profile"
                          >
                            💼
                          </motion.a>
                        )}
                      </div>

                      {/* Close */}
                      <button
                        onClick={() => setSelectedExecutive(null)}
                        style={{ width:'100%', padding:'0.8rem', background:'transparent', color:'#8B6D38', fontFamily:"'DM Sans',sans-serif", fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', border:'1px solid #D8CBA8', borderRadius:'2px', cursor:'pointer', transition:'all 0.3s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#D8CBA8'; e.currentTarget.style.color = '#8B6D38'; }}
                      >
                        Close
                      </button>

                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
};

// ── Exec Card ──
function ExecCard({ exec }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="exec-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Clipped corner */}
      <div style={{ position:'absolute', top:0, right:0, width:20, height:20, background:hovered ? '#C9A84C' : '#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)', transition:'background 0.3s', zIndex:2 }} />
      {/* Card number */}
      <div style={{ position:'absolute', top:'1.1rem', left:'1.4rem', fontFamily:"'Cormorant Garamond',serif", fontSize:'0.68rem', color:'#C9A84C', letterSpacing:'0.15em', fontWeight:600, zIndex:2 }}>
        {exec.num}
      </div>

      <div style={{ padding:'2.25rem', display:'flex', flexDirection:'column', gap:'1.75rem' }}>
        {/* Top row: image + name block */}
        <div style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start', flexWrap:'wrap' }}>
          {/* Image */}
          <motion.div
            whileHover={{ scale:1.05, rotate:3 }}
            style={{ position:'relative', flexShrink:0 }}
          >
            <div style={{ position:'absolute', inset:'-3px', borderRadius:'4px', border:`2px solid ${hovered ? '#C9A84C' : '#E8D89A'}`, transition:'border-color 0.35s' }} />
            <img
              src={exec.image}
              alt={exec.name}
              style={{ width:'110px', height:'110px', borderRadius:'4px', objectFit:'cover', display:'block', position:'relative', zIndex:1 }}
            />
            {/* Badge */}
            <div style={{ position:'absolute', top:'-8px', right:'-8px', width:'28px', height:'28px', background:'#C9A84C', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #FAF8F2', zIndex:2 }}>
              <Star size={12} color="#fff" />
            </div>
          </motion.div>

          {/* Name block */}
          <div style={{ flex:1, minWidth:'160px', paddingTop:'0.5rem' }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.35rem', fontWeight:700, color:'#1C1208', margin:'0 0 0.25rem', letterSpacing:'-0.01em', lineHeight:1.2 }}>
              {exec.name}
            </h3>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', fontWeight:600, color:'#C9A84C', margin:'0 0 0.35rem', letterSpacing:'0.02em' }}>
              {exec.role}
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:"'DM Sans',sans-serif", fontSize:'0.75rem', color:'#9C8B6E', fontStyle:'italic', fontWeight:300 }}>
              <Zap size={11} color="#C9A84C" />
              {exec.expertise}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:hovered ? 'linear-gradient(90deg,transparent,#C9A84C50,transparent)' : '#EDE4CC', transition:'background 0.3s' }} />

        {/* Bio */}
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.875rem', color:'#6B5C3E', lineHeight:1.8, margin:0, fontWeight:300 }}>
          {exec.bio}
        </p>

        {/* Responsibilities */}
        <div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.18em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'0.65rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
            <span style={{ display:'inline-block', width:16, height:1, background:'#C9A84C' }} />
            Responsibilities
          </div>
          {exec.responsibilities.map((resp, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:-16 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay:0.4 + i * 0.1 }}
              style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.4rem' }}
            >
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#C9A84C', flexShrink:0, display:'inline-block' }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.8rem', color:'#7A6040', fontWeight:300, lineHeight:1.5 }}>{resp}</span>
            </motion.div>
          ))}
        </div>

        {/* Contact links */}
        <div style={{ display:'flex', gap:'0.6rem' }}>
          <motion.a
            href={`mailto:${exec.contact.email}`}
            whileHover={{ scale:1.18, rotate:5 }}
            whileTap={{ scale:0.9 }}
            className="social-btn"
            title={exec.contact.email}
          >
            📧
          </motion.a>
          <motion.a
            href={`tel:${exec.contact.phone}`}
            whileHover={{ scale:1.18, rotate:5 }}
            whileTap={{ scale:0.9 }}
            className="social-btn"
            title={exec.contact.phone}
          >
            📞
          </motion.a>
          {exec.contact.linkedin && exec.contact.linkedin !== '#' && (
            <motion.a
              href={exec.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale:1.18, rotate:5 }}
              whileTap={{ scale:0.9 }}
              className="social-btn"
              title="View Profile"
            >
              💼
            </motion.a>
          )}
        </div>
      </div>

      {/* Bottom hover rule */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity:hovered ? 1 : 0, transition:'opacity 0.35s' }} />
    </div>
  );
}

export default Executives;