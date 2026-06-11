import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, BookOpen, TrendingUp } from 'lucide-react';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import rkUppal from "../../../assets/r_k_uppal.webp";

const Advisors = () => {
  const advisors = [
     {
    name: 'Prof. R K Uppal',
    role: 'Professor Emeritus & Principal',
    expertise: 'Management Education & Research',
    image: rkUppal,
    bio: 'Professor Emeritus and Principal at GGS College of Management and Technology, Punjab, with extensive academic leadership and research expertise in management studies.',
    achievements: [
      'Professor Emeritus at GGS College',
      'Experienced academic leader',
      'Active researcher and contributor'
    ],
    linkedin: 'https://www.linkedin.com/in/r-k-uppal-ph-d-d-litt-professor-emeritus-and-research-professor-423005208/'
  },

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 12, stiffness: 100 } },
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
          0%,100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateSlow    { from { transform: translate(-50%,-50%) rotate(0deg);   } to { transform: translate(-50%,-50%) rotate(360deg);  } }
        @keyframes rotateReverse { from { transform: translate(-50%,-50%) rotate(0deg);   } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes scaleIn       { from { transform: scale(0); opacity:0; } to { transform: scale(1); opacity:1; } }
        @keyframes lineGrow      { from { width: 0; } to { width: 10rem; } }

        .advisors-main {
          flex: 1;
          background: linear-gradient(158deg, #F7F3EA 0%, #EDE5CC 55%, #E4D5A8 100%);
          padding: 6rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .gold-rule { height:1px; background:linear-gradient(90deg,transparent,#C9A84C70,transparent); }

        .eyebrow {
          font-family:'DM Sans',sans-serif; font-size:0.65rem; letter-spacing:0.22em;
          color:#C9A84C; text-transform:uppercase; font-weight:500;
          display:flex; align-items:center; gap:0.5rem; justify-content:center; margin-bottom:1rem;
        }
        .eyebrow-line { display:inline-block; width:28px; height:1px; background:#C9A84C; }

        .advisor-card {
          background: #FAF8F2;
          border: 1px solid #E8E0CC;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          height: 100%;
        }
        .advisor-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #C9A84C, #E8C96A, transparent);
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1);
          z-index: 2;
        }
        .advisor-card:hover::before { width: 100%; }
        .advisor-card:hover {
          border-color: #C9A84C;
          box-shadow: 0 24px 52px rgba(139,109,56,0.14);
          background: #FEFCF7;
        }

        .btn-gold {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.85rem 2.4rem; background:#C9A84C; color:#fff;
          font-family:'DM Sans',sans-serif; font-size:0.75rem; font-weight:500;
          letter-spacing:0.14em; text-transform:uppercase;
          border:1px solid #C9A84C; border-radius:2px;
          cursor:pointer; transition:all 0.35s ease;
        }
        .btn-gold:hover { background:#B8965A; border-color:#B8965A; transform:translateY(-2px); box-shadow:0 10px 24px rgba(201,168,76,0.28); }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#F7F3EA; }
        ::-webkit-scrollbar-thumb { background:#C9A84C; border-radius:2px; }
      `}</style>

      <Header />

      <main className="advisors-main">
        {/* Rotating rings */}
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'600px', height:'600px', border:'1px solid rgba(201,168,76,0.07)', borderRadius:'50%', animation:'rotateSlow 50s linear infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'900px', height:'900px', border:'1px dashed rgba(201,168,76,0.04)', borderRadius:'50%', animation:'rotateReverse 75s linear infinite', pointerEvents:'none' }} />
        {/* Warm glow */}
        <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)', width:'800px', height:'500px', background:'radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        {/* Gold grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)`, backgroundSize:'72px 72px', pointerEvents:'none' }} />

        {/* Corner brackets */}
        {[
          { top:'1.5rem', left:'1.5rem', borderTop:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
          { top:'1.5rem', right:'1.5rem', borderTop:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
          { bottom:'1.5rem', left:'1.5rem', borderBottom:'1px solid #C9A84C', borderLeft:'1px solid #C9A84C' },
          { bottom:'1.5rem', right:'1.5rem', borderBottom:'1px solid #C9A84C', borderRight:'1px solid #C9A84C' },
        ].map((s,i) => <div key={i} style={{ position:'absolute', width:48, height:48, opacity:0.4, ...s }} />)}

        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity:0, y:-24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7 }}
            style={{ textAlign:'center', marginBottom:'4.5rem' }}
          >
            {/* Icon badge */}
            <motion.div
              initial={{ scale:0, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              transition={{ delay:0.2, type:'spring', stiffness:200 }}
              style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'64px', height:'64px', background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', marginBottom:'1.75rem', color:'#C9A84C' }}
            >
              <Award size={28} />
            </motion.div>

            {/* Eyebrow */}
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Distinguished Experts
              <span className="eyebrow-line" />
            </div>

            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.6rem,6vw,5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', color:'#1C1208', marginBottom:'0.4rem' }}>
              Our
            </h1>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.6rem,6vw,5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', marginBottom:'1.25rem', fontStyle:'italic', background:'linear-gradient(135deg,#C9A84C 0%,#8B6D38 40%,#E8C96A 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>
              Advisors
            </h1>

            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'1rem', color:'#6B5C3E', maxWidth:'540px', margin:'0 auto 2rem', lineHeight:1.78, fontWeight:300 }}>
              Distinguished experts providing strategic guidance, wisdom, and vision to drive our mission forward
            </p>

            {/* Animated gold rule */}
            <motion.div
              initial={{ width:0 }}
              animate={{ width:'10rem' }}
              transition={{ delay:0.5, duration:0.8 }}
              style={{ height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin:'0 auto' }}
            />
          </motion.div>

          {/* ── Advisors Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display:'flex', justifyContent:'center', gap:'1.5rem' }}
          >
            {advisors.map((advisor, index) => (
              <motion.div
  key={index}
  variants={itemVariants}
  whileHover={{ y:-6 }}
  style={{ display:'flex', width:'360px' }}
>
                <AdvisorCard advisor={advisor} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.8 }}
            style={{ marginTop:'5rem' }}
          >
            <div style={{ maxWidth:'640px', margin:'0 auto', background:'linear-gradient(158deg,#1C1208 0%,#2E1F08 100%)', border:'1px solid #3D2A0A', borderRadius:'4px', padding:'3.5rem 3rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
              {[
                { top:'1rem', left:'1rem', borderTop:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { top:'1rem', right:'1rem', borderTop:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
                { bottom:'1rem', left:'1rem', borderBottom:'1px solid #C9A84C40', borderLeft:'1px solid #C9A84C40' },
                { bottom:'1rem', right:'1rem', borderBottom:'1px solid #C9A84C40', borderRight:'1px solid #C9A84C40' },
              ].map((s,i) => <div key={i} style={{ position:'absolute', width:32, height:32, ...s }} />)}

              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'1.25rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}>
                <span style={{ display:'inline-block', width:20, height:1, background:'#C9A84C' }} />
                Advisory Board
                <span style={{ display:'inline-block', width:20, height:1, background:'#C9A84C' }} />
              </div>

              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.5rem,2.5vw,2.2rem)', fontWeight:700, color:'#F7F3EA', letterSpacing:'-0.02em', margin:'0 0 1rem' }}>
                Join Our{' '}
                <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#C9A84C,#E8C96A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Advisory Board
                </span>
              </h3>

              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.9rem', color:'rgba(247,243,234,0.55)', maxWidth:'420px', margin:'0 auto 2rem', lineHeight:1.78, fontWeight:300 }}>
                We're always looking for passionate experts to guide our mission
              </p>

              <motion.button
                whileHover={{ scale:1.03 }}
                whileTap={{ scale:0.97 }}
                className="btn-gold"
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

// ── Advisor Card ──
function AdvisorCard({ advisor, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="advisor-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width:'100%' }}
    >
      {/* Clipped top-right corner */}
      <div style={{ position:'absolute', top:0, right:0, width:20, height:20, background:hovered?'#C9A84C':'#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)', transition:'background 0.3s', zIndex:2 }} />

      {/* Card number */}
      <div style={{ position:'absolute', top:'1.1rem', left:'1.4rem', fontFamily:"'Cormorant Garamond',serif", fontSize:'0.68rem', color:'#C9A84C', letterSpacing:'0.15em', fontWeight:600, zIndex:2 }}>
        {String(index+1).padStart(2,'0')}
      </div>

      <div style={{ padding:'2rem 2rem 2rem' }}>
        {/* Profile image */}
        <div style={{ position:'relative', width:'80px', height:'80px', margin:'1rem auto 1.5rem' }}>
          {/* Gold ring on hover */}
          <div style={{ position:'absolute', inset:'-3px', borderRadius:'50%', border:`2px solid ${hovered?'#C9A84C':'#E8D89A'}`, transition:'border-color 0.35s' }} />
          <img
            src={advisor.image}
            alt={advisor.name}
            style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover', display:'block', position:'relative', zIndex:1 }}
          />
          {/* Briefcase badge */}
          <div style={{ position:'absolute', bottom:'-4px', right:'-4px', width:'26px', height:'26px', background:'#C9A84C', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #FAF8F2', zIndex:2 }}>
            <Briefcase size={11} color="#fff" />
          </div>
        </div>

        {/* Name & role */}
        <div style={{ textAlign:'center', marginBottom:'1rem' }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', fontWeight:700, color:'#1C1208', margin:'0 0 0.3rem', letterSpacing:'-0.01em' }}>
            {advisor.name}
          </h3>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.88rem', fontWeight:600, color:'#C9A84C', margin:'0 0 0.4rem', letterSpacing:'0.03em' }}>
            {advisor.role}
          </p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem', fontFamily:"'DM Sans',sans-serif", fontSize:'0.75rem', color:'#9C8B6E', fontStyle:'italic', fontWeight:300 }}>
            <BookOpen size={12} color="#C9A84C" />
            {advisor.expertise}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:hovered?'linear-gradient(90deg,transparent,#C9A84C50,transparent)':'#EDE4CC', marginBottom:'1rem', transition:'background 0.3s' }} />

        {/* Bio */}
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.82rem', color:'#6B5C3E', lineHeight:1.8, marginBottom:'1.25rem', fontWeight:300 }}>
          {advisor.bio}
        </p>

        {/* Achievements */}
        <div style={{ marginBottom:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', marginBottom:'0.65rem', fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'#C9A84C', fontWeight:500 }}>
            <TrendingUp size={12} color="#C9A84C" />
            Key Achievements
          </div>
          {advisor.achievements.map((ach, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:-16 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay:0.3 + i*0.08 }}
              style={{ display:'flex', alignItems:'flex-start', gap:'0.6rem', marginBottom:'0.45rem' }}
            >
              <span style={{ marginTop:'0.45rem', width:5, height:5, borderRadius:'50%', background:'#C9A84C', flexShrink:0, display:'inline-block' }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.8rem', color:'#7A6040', fontWeight:300, lineHeight:1.6 }}>
                {ach}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gold rule on hover */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity:hovered?1:0, transition:'opacity 0.35s' }} />
    </div>
  );
}

export default Advisors;