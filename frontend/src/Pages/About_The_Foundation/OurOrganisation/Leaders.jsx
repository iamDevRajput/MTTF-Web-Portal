import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap, Globe } from 'lucide-react';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import meharchand from "../../../assets/meherchand.jpg";
import jasswinderpal from "../../../assets/jasswinderpal.jpeg";
import gurmeetsinghsandhu from "../../../assets/gurmeetsinghsandhu.jpg";
import sourabhkumar from "../../../assets/sourabhkumar.jpg";

const Leaders = () => {
  const leaders = [
    {
      name: 'Dr. Mehar Chand',
      role: 'Founder & President',
      expertise: 'STEM Education & AI Research',
      image: meharchand,
      bio: 'Founder and President of MathTech Thinking Foundation (MTTF), a Section 8 nonprofit organization promoting STEM education, research, and skill development. Also Founder and Director of Alinexora Tech Private Limited, a DPIIT-recognized startup focused on AI-driven innovation.',
      contributions: ['Founded MTTF Section 8 NGO', 'Director, Alinexora Tech (DPIIT startup)', 'Advancing AI & STEM education globally'],
      social: { linkedin: 'https://www.linkedin.com/in/mehar-chand/', email: 'mailto:contactus@mttf.in' },
      num: '01',
    },
    {
      name: 'Dr. Jaswinder Pal',
      role: 'Vice President',
      expertise: 'Mathematics & Academic Research',
      image: jasswinderpal,
      bio: 'Vice President of MathTech Thinking Foundation (MTTF, India), contributing to the academic and research vision of the foundation with deep expertise in mathematics and STEM disciplines.',
      contributions: ['Vice President, MTTF India', 'STEM research contributor', 'Academic leadership & collaboration'],
      social: { linkedin: '#', email: 'mailto:contactus@mttf.in' },
      num: '02',
    },
    {
      name: 'Dr. Gurmej Singh Sandhu',
      role: 'General Secretary',
      expertise: 'Organizational Management & STEM',
      image: gurmeetsinghsandhu,
      bio: 'General Secretary of MathTech Thinking Foundation (MTTF, India), overseeing organizational operations and driving strategic initiatives to promote STEM education and collaborative research.',
      contributions: ['General Secretary, MTTF India', 'Strategic operations leader', 'STEM collaboration & outreach'],
      social: { linkedin: '#', email: 'mailto:contactus@mttf.in' },
      num: '03',
    },
    {
      name: 'Sourabh Kumar',
      role: 'Chief Operating Officer',
      expertise: 'Operations & Business Development',
      image: sourabhkumar,
      bio: 'Chief Operating Officer at MathTech Thinking Foundation, responsible for day-to-day operations, platform growth, and ensuring the smooth execution of MTTF\'s mission across all programs and initiatives.',
      contributions: ['COO, MTTF Hub Platform', 'Operations & growth strategy', 'Driving internship & outreach programs'],
      social: { linkedin: '#', email: 'mailto:contactus@mttf.in' },
      num: '04',
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

  const stats = [
    { icon: Users,  label: 'Team Members', value: '50+'   },
    { icon: Globe,  label: 'Countries',    value: '30+'   },
    { icon: Target, label: 'Projects',     value: '100+'  },
    { icon: Zap,    label: 'Impact',       value: '200K+' },
  ];

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

        .leaders-main {
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

        .leader-card {
          background:#FAF8F2; border:1px solid #E8E0CC; border-radius:4px;
          overflow:hidden; position:relative;
          transition:all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .leader-card::before {
          content:''; position:absolute; top:0; left:0;
          width:0; height:2px;
          background:linear-gradient(90deg,#C9A84C,#E8C96A,transparent);
          transition:width 0.45s cubic-bezier(0.23,1,0.32,1); z-index:2;
        }
        .leader-card:hover::before { width:100%; }
        .leader-card:hover { border-color:#C9A84C; box-shadow:0 24px 52px rgba(139,109,56,0.14); background:#FEFCF7; }

        .social-btn {
          width:34px; height:34px; border-radius:50%;
          background:#F5EFD8; border:1px solid #E8D89A;
          display:flex; align-items:center; justify-content:center;
          font-size:0.9rem; cursor:pointer;
          transition:all 0.3s ease; text-decoration:none;
        }
        .social-btn:hover { background:#C9A84C; border-color:#C9A84C; transform:translateY(-2px) rotate(5deg); }

        .stat-card {
          background:#FAF8F2; border:1px solid #E8E0CC; border-radius:4px;
          padding:1.75rem; text-align:center; position:relative; overflow:hidden;
          transition:all 0.35s ease;
        }
        .stat-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,#C9A84C,transparent);
          opacity:0; transition:opacity 0.3s;
        }
        .stat-card:hover::before { opacity:1; }
        .stat-card:hover { border-color:#C9A84C; transform:translateY(-4px); box-shadow:0 16px 36px rgba(139,109,56,0.1); }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#F7F3EA; }
        ::-webkit-scrollbar-thumb { background:#C9A84C; border-radius:2px; }
      `}</style>

      <Header />

      <main className="leaders-main">
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
        ].map((s,i) => <div key={i} style={{ position:'absolute', width:48, height:48, opacity:0.4, ...s }} />)}

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
              <Users size={26} />
            </motion.div>

            <div className="eyebrow">
              <span className="eyebrow-line" />
              Visionary Leadership
              <span className="eyebrow-line" />
            </div>

            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.6rem,6vw,5.5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', color:'#1C1208', marginBottom:'0.4rem' }}>
              Our
            </h1>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.6rem,6vw,5.5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', marginBottom:'1.25rem', fontStyle:'italic', background:'linear-gradient(135deg,#C9A84C 0%,#8B6D38 40%,#E8C96A 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>
              Leaders
            </h1>

            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'1rem', color:'#6B5C3E', maxWidth:'520px', margin:'0 auto 2rem', lineHeight:1.78, fontWeight:300 }}>
              Driving innovation and excellence through visionary leadership and unwavering commitment
            </p>

            <motion.div
              initial={{ scaleX:0 }}
              animate={{ scaleX:1 }}
              transition={{ delay:0.6, duration:0.8 }}
              style={{ height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin:'0 auto', maxWidth:'10rem' }}
            />
          </motion.div>

          {/* ── Leaders Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(480px,1fr))', gap:'1.5rem', marginBottom:'4rem' }}
          >
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y:-6, scale:1.01 }}
              >
                <LeaderCard leader={leader} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.9 }}
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1.25rem' }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y:-5 }}
                  className="stat-card"
                >
                  <div style={{ width:'40px', height:'40px', background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0.85rem', color:'#C9A84C' }}>
                    <Icon size={18} />
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.4rem', fontWeight:700, color:'#C9A84C', letterSpacing:'-0.03em', lineHeight:1, marginBottom:'0.35rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.68rem', color:'#9C8B6E', letterSpacing:'0.14em', textTransform:'uppercase', fontWeight:500 }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

// ── Leader Card ──
function LeaderCard({ leader }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="leader-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Clipped corner */}
      <div style={{ position:'absolute', top:0, right:0, width:20, height:20, background:hovered?'#C9A84C':'#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)', transition:'background 0.3s', zIndex:2 }} />
      {/* Card number */}
      <div style={{ position:'absolute', top:'1.1rem', left:'1.4rem', fontFamily:"'Cormorant Garamond',serif", fontSize:'0.68rem', color:'#C9A84C', letterSpacing:'0.15em', fontWeight:600, zIndex:2 }}>
        {leader.num}
      </div>

      <div style={{ padding:'2.25rem', display:'flex', flexDirection:'column', gap:'1.75rem' }}>
        {/* Top row: image + name block */}
        <div style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start', flexWrap:'wrap' }}>
          {/* Image */}
          <motion.div
            whileHover={{ scale:1.05, rotate:3 }}
            style={{ position:'relative', flexShrink:0 }}
          >
            <div style={{ position:'absolute', inset:'-3px', borderRadius:'4px', border:`2px solid ${hovered?'#C9A84C':'#E8D89A'}`, transition:'border-color 0.35s' }} />
            <img
              src={leader.image}
              alt={leader.name}
              style={{ width:'110px', height:'110px', borderRadius:'4px', objectFit:'cover', display:'block', position:'relative', zIndex:1 }}
            />
            {/* Target badge */}
            <div style={{ position:'absolute', top:'-8px', right:'-8px', width:'28px', height:'28px', background:'#C9A84C', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #FAF8F2', zIndex:2 }}>
              <Target size={12} color="#fff" />
            </div>
          </motion.div>

          {/* Name block */}
          <div style={{ flex:1, minWidth:'160px', paddingTop:'0.5rem' }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.35rem', fontWeight:700, color:'#1C1208', margin:'0 0 0.25rem', letterSpacing:'-0.01em', lineHeight:1.2 }}>
              {leader.name}
            </h3>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', fontWeight:600, color:'#C9A84C', margin:'0 0 0.35rem', letterSpacing:'0.02em' }}>
              {leader.role}
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:"'DM Sans',sans-serif", fontSize:'0.75rem', color:'#9C8B6E', fontStyle:'italic', fontWeight:300 }}>
              <Zap size={11} color="#C9A84C" />
              {leader.expertise}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:hovered?'linear-gradient(90deg,transparent,#C9A84C50,transparent)':'#EDE4CC', transition:'background 0.3s' }} />

        {/* Bio */}
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.875rem', color:'#6B5C3E', lineHeight:1.8, margin:0, fontWeight:300 }}>
          {leader.bio}
        </p>

        {/* Contributions */}
        <div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.18em', color:'#C9A84C', textTransform:'uppercase', fontWeight:500, marginBottom:'0.65rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
            <span style={{ display:'inline-block', width:16, height:1, background:'#C9A84C' }} />
            Contributions
          </div>
          {leader.contributions.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:-16 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay:0.4 + i*0.1 }}
              style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.4rem' }}
            >
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#C9A84C', flexShrink:0, display:'inline-block' }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.8rem', color:'#7A6040', fontWeight:300, lineHeight:1.5 }}>{c}</span>
            </motion.div>
          ))}
        </div>

        {/* Social links */}
        <div style={{ display:'flex', gap:'0.6rem' }}>
          {Object.entries(leader.social).map(([platform, link]) => (
            <motion.a
              key={platform}
              href={link}
              target={link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale:1.18, rotate:5 }}
              whileTap={{ scale:0.9 }}
              className="social-btn"
            >
              {platform === 'linkedin' && '💼'}
              {platform === 'twitter'  && '🐦'}
              {platform === 'email'    && '📧'}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom hover rule */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity:hovered?1:0, transition:'opacity 0.35s' }} />
    </div>
  );
}

export default Leaders;