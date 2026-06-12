import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Users, Sparkles, MessageCircle, Award, Zap, Star, Mail, Phone, Linkedin } from 'lucide-react';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

// ── Local mentor images (matched exactly to your Mentors folder) ──
import meherchandImg    from '../../../assets/Mentors/meherchand.webp';
import harmeetsinghImg  from '../../../assets/Mentors/harmeetsingh.webp';
import prayassharmaImg  from '../../../assets/Mentors/prayassharma.webp';
import ramsagaryadavImg from '../../../assets/Mentors/RamsagarYadav.webp';
import shaluGuptaImg    from '../../../assets/Mentors/shaluGupta.webp';
import nikitathakurImg  from '../../../assets/Mentors/nikitathakur.webp';
import soniamalikImg    from '../../../assets/Mentors/soniamalik.webp';
import arpanakumariImg  from '../../../assets/Mentors/arpanakumari.webp';
import zavedahmedImg    from '../../../assets/Mentors/zavedahmedkhan.webp';
import amitkumarImg     from '../../../assets/Mentors/amitkumaryadav.webp';
import avinitagautamImg from '../../../assets/Mentors/Avinitagautam.webp';
import uttamguptaImg    from '../../../assets/Mentors/Uttamgupta.webp';
import poojasharmaImg   from '../../../assets/Mentors/poojasharma.webp';

const Mentors = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    {
      name: 'Dr. Mehar Chand',
      specialization: 'Mathematical Modeling & AI',
      expertise: ['Mathematical Modeling', 'Fractional Calculus', 'Numerical Methods', 'ANN', 'AI/ML', 'Data Analytics'],
      image: meherchandImg,
      bio: 'Founder & President of MTTF and Director of Alinexora Tech Pvt. Ltd. (DPIIT-recognized startup). A passionate educator and researcher driving AI and STEM education globally through the foundation.',
      quote: 'Mathematics is the language of the universe; AI is the tool to decode it.',
      linkedin: 'https://www.linkedin.com/in/mehar-chand/',
      num: '01',
    },
    {
      name: 'Dr. Harmanpreet Singh Kapoor',
      specialization: 'Statistics & Actuarial Science',
      expertise: ['Statistics', 'Actuarial Science', 'Machine Learning', 'R', 'Python'],
      image: harmeetsinghImg,
      bio: 'Distinguished statistician and Assistant Professor specializing in Actuarial Science at the Central University of Punjab. Ranked among the top-2% researchers worldwide by Ioannidis et al.',
      quote: 'Statistics turns data into stories, and stories into decisions.',
      linkedin: 'https://www.linkedin.com/in/harmanpreet-singh-kapoor-20626818/',
      num: '02',
    },
    {
      name: 'Dr. Prayas Sharma',
      specialization: 'Business Analytics & Econometrics',
      expertise: ['Statistics', 'Business Analytics', 'AI & ML', 'Econometrics', 'Research Methodology'],
      image: prayassharmaImg,
      bio: 'Expert in business analytics and econometrics with a strong research background. Mentors students in applying statistical methods to real-world economic and business challenges.',
      quote: 'Data-driven thinking transforms how we understand the world.',
      linkedin: '#',
      num: '03',
    },
    {
      name: 'Dr. Ramsagar Yadav',
      specialization: 'AI, IoT & Quantum Computing',
      expertise: ['AI', 'Data Science', 'IoT', 'Quantum Computing', 'Cryptocurrency', 'Mathematics', 'FinTech'],
      image: ramsagaryadavImg,
      bio: 'Versatile researcher with expertise spanning artificial intelligence, IoT, quantum computing, drug discovery, and FinTech. Committed to interdisciplinary STEM innovation.',
      quote: 'The convergence of AI and quantum computing will redefine what is possible.',
      linkedin: '#',
      num: '04',
    },
    {
      name: 'Dr. Shalu Gupta',
      specialization: 'Image Processing & NLP',
      expertise: ['Image Processing', 'Natural Language Processing', 'Pattern Recognition'],
      image: shaluGuptaImg,
      bio: 'Executive Member of MTTF and expert in image processing, NLP, and pattern recognition. Actively contributes to MTTF research initiatives, workshops, and academic collaborations.',
      quote: 'Patterns in data hold the secrets to understanding intelligence.',
      linkedin: '#',
      num: '05',
    },
    {
      name: 'Dr. Nitika Thakur',
      specialization: 'Agricultural Microbiology',
      expertise: ['Agricultural Microbiology'],
      image: nikitathakurImg,
      bio: 'Researcher specializing in agricultural microbiology, contributing to sustainable agricultural practices and microbial innovations for crop improvement and soil health.',
      quote: 'Microbes are the unsung heroes of our food systems.',
      linkedin: '#',
      num: '06',
    },
    {
      name: 'Dr. Sonia Malik',
      specialization: 'Plant Biotechnology',
      expertise: ['Plant Tissue Culture', 'Genetic Transformation', 'Hairy Root Culture', 'Bioactive Compounds'],
      image: soniamalikImg,
      bio: 'Specialist in plant tissue culture, genetic transformation, and sustainable production of plant-derived bioactive compounds in controlled environments.',
      quote: 'Plants are living laboratories of nature\'s chemistry.',
      linkedin: '#',
      num: '07',
    },
    {
      name: 'Dr. Aparna Kumari',
      specialization: 'AI/ML, Blockchain & Federated Learning',
      expertise: ['AI', 'ML/DL', 'Blockchain', 'Federated Learning', 'Reinforcement Learning'],
      image: arpanakumariImg,
      bio: 'Expert in cutting-edge AI and distributed systems, focusing on machine learning, deep learning, blockchain, and federated learning for secure and intelligent applications.',
      quote: 'Federated intelligence is the future of privacy-preserving AI.',
      linkedin: '#',
      num: '08',
    },
    {
      name: 'Dr. Zaved Ahmed Khan',
      specialization: 'Neurosciences, Psychology & AI',
      expertise: ['Neurosciences', 'Psychology', 'Artificial Intelligence', 'Oncology', 'Genetics'],
      image: zavedahmedImg,
      bio: 'Professor & Dean at Baba Farid Group of Institutions and Malla Reddy Vishwavidyapeeth. Integrates neuroscience, psychology, and AI to advance learning methodologies and healthcare research.',
      quote: 'Understanding the brain is the greatest frontier of science.',
      linkedin: 'https://www.linkedin.com/in/dr-zaved-ahmed-khan-182904b/',
      num: '09',
    },
    {
      name: 'Dr. Amit Kumar Yadav',
      specialization: 'AI, Machine Learning & Energy Systems',
      expertise: ['Artificial Intelligence', 'Machine Learning', 'Energy Systems', 'Air Pollutants'],
      image: amitkumarImg,
      bio: 'Assistant Professor in AI with 3,400+ citations on Google Scholar. Researches ANN applications in renewable energy systems and air pollutant forecasting.',
      quote: 'AI-driven energy solutions are key to a sustainable tomorrow.',
      linkedin: '#',
      num: '10',
    },
    {
      name: 'Dr. Avinita Gautam',
      specialization: 'Mathematical & Computational Biology',
      expertise: ['Mathematical Modeling', 'Dynamical Systems', 'Computational Modeling', 'Mathematical Biology'],
      image: avinitagautamImg,
      bio: 'Researcher at Banaras Hindu University specializing in computational neuroscience and mathematical biology. Known for her work on bifurcation analysis and neural dynamical systems.',
      quote: 'Mathematics gives us the tools to decode the dynamics of life.',
      linkedin: '#',
      num: '11',
    },
    {
      name: 'Dr. Uttam Gupta',
      specialization: 'Cancer Immunotherapy & Nanomedicine',
      expertise: ['Cancer Immunotherapy', 'Nano Drug Delivery', 'Combination Therapy', 'DC-NK Therapy'],
      image: uttamguptaImg,
      bio: 'Biomedical researcher focused on cancer immunotherapy, nano drug delivery systems, and combination therapies. Advances innovative treatment strategies in oncology.',
      quote: 'Every discovery in oncology is a step closer to saving a life.',
      linkedin: '#',
      num: '12',
    },
    {
      name: 'Dr. Pooja Sharma',
      specialization: 'Agricultural Microbiology & Bionanotechnology',
      expertise: ['Agricultural Microbiology', 'Bio-nanotechnology', 'Bioethanol', 'Nanoparticle Synthesis', 'Biomass Waste'],
      image: poojasharmaImg,
      bio: 'Expert in agricultural microbiology and bionanotechnology. Research spans biomass waste utilization, bioethanol production, and green nanoparticle synthesis for sustainable applications.',
      quote: 'Sustainable science begins with understanding nature\'s own toolkit.',
      linkedin: '#',
      num: '13',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes rotateSlow    { from { transform:translate(-50%,-50%) rotate(0deg);   } to { transform:translate(-50%,-50%) rotate(360deg);  } }
        @keyframes rotateReverse { from { transform:translate(-50%,-50%) rotate(0deg);   } to { transform:translate(-50%,-50%) rotate(-360deg); } }

        .mentors-main {
          flex: 1;
          background: linear-gradient(158deg, #f8fafc 0%, #f1f5f9 55%, #e2e8f0 100%);
          padding: 6rem 1.5rem 5rem;
          position: relative; overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .eyebrow {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.65rem; letter-spacing: 0.22em;
          color: #2563eb; text-transform: uppercase; font-weight: 500;
          display: flex; align-items: center; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;
        }
        .eyebrow-line { display: inline-block; width: 28px; height: 1px; background: #2563eb; }

        .mentor-card {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;
          overflow: hidden; position: relative;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .mentor-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #2563eb, #60a5fa, transparent);
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1); z-index: 2;
        }
        .mentor-card:hover::before { width: 100%; }
        .mentor-card:hover { border-color: #2563eb; box-shadow: 0 24px 52px rgba(37, 99, 235,0.14); background: #ffffff; }

        .tag {
          display: inline-block; padding: 0.25rem 0.7rem;
          border: 1px solid rgba(37, 99, 235,0.35); border-radius: 1px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.62rem;
          color: #1d4ed8; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500;
          background: transparent; transition: all 0.3s ease;
        }
        .mentor-card:hover .tag { background: rgba(37, 99, 235,0.08); border-color: rgba(37, 99, 235,0.6); }

        .social-btn {
          width: 34px; height: 34px; border-radius: 50%;
          background: #F5EFD8; border: 1px solid #E8D89A;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none;
        }
        .social-btn:hover { background: #2563eb; border-color: #2563eb; transform: translateY(-2px) rotate(5deg); }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 2px; }
      `}</style>

      <Header />

      <main className="mentors-main">
        {/* Rotating rings */}
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'600px', height:'600px', border:'1px solid rgba(37, 99, 235,0.07)', borderRadius:'50%', animation:'rotateSlow 50s linear infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'900px', height:'900px', border:'1px dashed rgba(37, 99, 235,0.04)', borderRadius:'50%', animation:'rotateReverse 75s linear infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'25%', left:'50%', transform:'translateX(-50%)', width:'800px', height:'500px', background:'radial-gradient(ellipse,rgba(37, 99, 235,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(37, 99, 235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37, 99, 235,0.04) 1px,transparent 1px)`, backgroundSize:'72px 72px', pointerEvents:'none' }} />
        {[
          { top:'1.5rem', left:'1.5rem', borderTop:'1px solid #2563eb', borderLeft:'1px solid #2563eb' },
          { top:'1.5rem', right:'1.5rem', borderTop:'1px solid #2563eb', borderRight:'1px solid #2563eb' },
          { bottom:'1.5rem', left:'1.5rem', borderBottom:'1px solid #2563eb', borderLeft:'1px solid #2563eb' },
          { bottom:'1.5rem', right:'1.5rem', borderBottom:'1px solid #2563eb', borderRight:'1px solid #2563eb' },
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
              style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'64px', height:'64px', background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', marginBottom:'1.75rem', color:'#2563eb' }}
            >
              <Heart size={26} />
            </motion.div>

            <div className="eyebrow">
              <span className="eyebrow-line" />
              Passionate Educators
              <span className="eyebrow-line" />
            </div>

            <h1 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(2.6rem,6vw,5.5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', color:'#0f172a', marginBottom:'0.4rem' }}>
              Our
            </h1>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(2.6rem,6vw,5.5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', marginBottom:'1.25rem', fontStyle:'italic', background:'linear-gradient(135deg,#2563eb 0%,#1d4ed8 40%,#60a5fa 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>
              Mentors
            </h1>

            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'1rem', color:'#6B5C3E', maxWidth:'520px', margin:'0 auto 2rem', lineHeight:1.78, fontWeight:300 }}>
              Passionate educators dedicated to nurturing talent and inspiring the next generation of innovators
            </p>

            <motion.div
              initial={{ scaleX:0 }}
              animate={{ scaleX:1 }}
              transition={{ delay:0.6, duration:0.8 }}
              style={{ height:'1px', background:'linear-gradient(90deg,transparent,#2563eb,transparent)', margin:'0 auto', maxWidth:'10rem' }}
            />
          </motion.div>

          {/* ── Mentors Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(480px,1fr))', gap:'1.5rem', marginBottom:'4rem' }}
          >
            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y:-6, scale:1.01 }}
                onClick={() => setSelectedMentor(mentor)}
                style={{ cursor:'pointer' }}
              >
                <MentorCard mentor={mentor} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Modal ── */}
          <AnimatePresence>
            {selectedMentor && (
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                style={{ position:'fixed', inset:0, background:'rgba(28,18,8,0.75)', backdropFilter:'blur(6px)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}
                onClick={() => setSelectedMentor(null)}
              >
                <motion.div
                  initial={{ scale:0.92, y:40 }}
                  animate={{ scale:1, y:0 }}
                  exit={{ scale:0.92, y:40 }}
                  transition={{ type:'spring', damping:20, stiffness:200 }}
                  onClick={e => e.stopPropagation()}
                  style={{ maxWidth:'820px', width:'100%', background:'#ffffff', border:'1px solid #2563eb', borderRadius:'4px', overflow:'hidden', boxShadow:'0 40px 80px rgba(37, 99, 235,0.2)', maxHeight:'90vh', overflowY:'auto', position:'relative' }}
                >
                  <div style={{ height:'2px', background:'linear-gradient(90deg,transparent,#2563eb,#60a5fa,#2563eb,transparent)' }} />
                  <div style={{ position:'absolute', top:2, right:0, width:22, height:22, background:'#2563eb', clipPath:'polygon(100% 0,0 0,100% 100%)' }} />

                  <div style={{ padding:'2.5rem' }}>
                    <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>

                      {/* Top row */}
                      <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', alignItems:'flex-start' }}>
                        <motion.div whileHover={{ scale:1.05, rotate:3 }} style={{ position:'relative', flexShrink:0 }}>
                          <div style={{ position:'absolute', inset:'-3px', borderRadius:'4px', border:'2px solid #2563eb' }} />
                          <img
                            src={selectedMentor.image}
                            alt={selectedMentor.name}
                            style={{ width:'140px', height:'140px', borderRadius:'4px', objectFit:'cover', display:'block', position:'relative', zIndex:1 }}
                            onError={e => { e.target.style.background = '#F5EFD8'; }}
                          />
                          <div style={{ position:'absolute', bottom:'-8px', right:'-8px', width:'28px', height:'28px', background:'#2563eb', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #ffffff', zIndex:2 }}>
                            <Star size={12} color="#fff" />
                          </div>
                        </motion.div>

                        <div style={{ flex:1, minWidth:'200px' }}>
                          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.2em', color:'#2563eb', textTransform:'uppercase', fontWeight:500, marginBottom:'0.4rem' }}>MTTF Mentor</div>
                          <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:700, color:'#0f172a', margin:'0 0 0.3rem', letterSpacing:'-0.02em' }}>
                            {selectedMentor.name}
                          </h2>
                          <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1rem', fontWeight:600, color:'#2563eb', margin:'0 0 0.25rem', letterSpacing:'0.02em' }}>
                            {selectedMentor.specialization}
                          </p>
                          <div style={{ height:'1px', background:'linear-gradient(90deg,#2563eb40,transparent)', margin:'0.75rem 0' }} />
                          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.875rem', color:'#6B5C3E', lineHeight:1.8, fontWeight:300, margin:0 }}>
                            {selectedMentor.bio}
                          </p>
                        </div>
                      </div>

                      {/* Quote */}
                      <div style={{ background:'rgba(37, 99, 235,0.06)', border:'1px solid rgba(37, 99, 235,0.2)', borderRadius:'2px', padding:'1.25rem 1.5rem' }}>
                        <MessageCircle size={14} color="#2563eb" style={{ marginBottom:'0.5rem' }} />
                        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.05rem', fontStyle:'italic', color:'#5C4A32', lineHeight:1.7, margin:0, fontWeight:500 }}>
                          "{selectedMentor.quote}"
                        </p>
                      </div>

                      {/* Expertise tags */}
                      <div>
                        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.18em', color:'#2563eb', textTransform:'uppercase', fontWeight:500, marginBottom:'0.75rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                          <span style={{ display:'inline-block', width:16, height:1, background:'#2563eb' }} />
                          Areas of Expertise
                        </div>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                          {selectedMentor.expertise.map((skill, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity:0, scale:0 }}
                              animate={{ opacity:1, scale:1 }}
                              transition={{ delay:0.3 + i * 0.06 }}
                              className="tag"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Social links */}
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', paddingTop:'0.5rem', borderTop:'1px solid #EDE4CC', alignItems:'center' }}>
                        <motion.a
                          href="mailto:contactus@mttf.in"
                          whileHover={{ scale:1.18, rotate:5 }}
                          whileTap={{ scale:0.9 }}
                          className="social-btn"
                          title="contactus@mttf.in"
                        >📧</motion.a>
                        <motion.a
                          href="tel:+918968294003"
                          whileHover={{ scale:1.18, rotate:5 }}
                          whileTap={{ scale:0.9 }}
                          className="social-btn"
                          title="+91-896-829-4003"
                        >📞</motion.a>
                        {selectedMentor.linkedin && selectedMentor.linkedin !== '#' && (
                          <motion.a
                            href={selectedMentor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale:1.18, rotate:5 }}
                            whileTap={{ scale:0.9 }}
                            className="social-btn"
                            title="View LinkedIn Profile"
                          >💼</motion.a>
                        )}
                      </div>

                      {/* Close */}
                      <button
                        onClick={() => setSelectedMentor(null)}
                        style={{ width:'100%', padding:'0.8rem', background:'transparent', color:'#1d4ed8', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', border:'1px solid #D8CBA8', borderRadius:'2px', cursor:'pointer', transition:'all 0.3s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='#2563eb'; e.currentTarget.style.color='#2563eb'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='#D8CBA8'; e.currentTarget.style.color='#1d4ed8'; }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.9 }}
          >
            <div style={{ maxWidth:'680px', margin:'0 auto', background:'linear-gradient(158deg,#0f172a 0%,#2E1F08 100%)', border:'1px solid #3D2A0A', borderRadius:'4px', padding:'4rem 3rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#2563eb,transparent)' }} />
              {[
                { top:'1.2rem', left:'1.2rem', borderTop:'1px solid #2563eb40', borderLeft:'1px solid #2563eb40' },
                { top:'1.2rem', right:'1.2rem', borderTop:'1px solid #2563eb40', borderRight:'1px solid #2563eb40' },
                { bottom:'1.2rem', left:'1.2rem', borderBottom:'1px solid #2563eb40', borderLeft:'1px solid #2563eb40' },
                { bottom:'1.2rem', right:'1.2rem', borderBottom:'1px solid #2563eb40', borderRight:'1px solid #2563eb40' },
              ].map((s,i) => <div key={i} style={{ position:'absolute', width:32, height:32, ...s }} />)}

              <div style={{ width:'52px', height:'52px', background:'#2563eb', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem' }}>
                <Heart size={22} color="#fff" />
              </div>

              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', color:'#2563eb', textTransform:'uppercase', fontWeight:500, marginBottom:'1.25rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}>
                <span style={{ display:'inline-block', width:20, height:1, background:'#2563eb' }} />
                Join the Team
                <span style={{ display:'inline-block', width:20, height:1, background:'#2563eb' }} />
              </div>

              <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:700, color:'#f8fafc', letterSpacing:'-0.02em', margin:'0 0 1rem' }}>
                Become a{' '}
                <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#2563eb,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Mentor
                </span>
              </h3>

              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.9rem', color:'rgba(247,243,234,0.55)', maxWidth:'460px', margin:'0 auto 2.5rem', lineHeight:1.78, fontWeight:300 }}>
                Share your expertise and inspire the next generation. Join our community of passionate educators making a real difference.
              </p>

              <motion.button
                whileHover={{ scale:1.03 }}
                whileTap={{ scale:0.97 }}
                style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.85rem 2.4rem', background:'#2563eb', color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.75rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', border:'1px solid #2563eb', borderRadius:'2px', cursor:'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background='#1d4ed8'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#2563eb'; }}
              >
                Apply to Mentor
              </motion.button>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

// ── Mentor Card ──
function MentorCard({ mentor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="mentor-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Clipped corner */}
      <div style={{ position:'absolute', top:0, right:0, width:20, height:20, background:hovered?'#2563eb':'#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)', transition:'background 0.3s', zIndex:2 }} />
      {/* Number */}
      <div style={{ position:'absolute', top:'1.1rem', left:'1.4rem', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.68rem', color:'#2563eb', letterSpacing:'0.15em', fontWeight:600, zIndex:2 }}>
        {mentor.num}
      </div>

      <div style={{ padding:'2.25rem', display:'flex', flexDirection:'column', gap:'1.75rem' }}>
        {/* Top row: image + name block */}
        <div style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start', flexWrap:'wrap' }}>
          {/* Image */}
          <motion.div whileHover={{ scale:1.05, rotate:3 }} style={{ position:'relative', flexShrink:0 }}>
            <div style={{ position:'absolute', inset:'-3px', borderRadius:'4px', border:`2px solid ${hovered?'#2563eb':'#E8D89A'}`, transition:'border-color 0.35s' }} />
            <img
              src={mentor.image}
              alt={mentor.name}
              style={{ width:'110px', height:'110px', borderRadius:'4px', objectFit:'cover', display:'block', position:'relative', zIndex:1 }}
              onError={e => { e.target.style.background='#F5EFD8'; e.target.style.display='block'; }}
            />
            <div style={{ position:'absolute', top:'-8px', right:'-8px', width:'28px', height:'28px', background:'#2563eb', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #ffffff', zIndex:2 }}>
              <Sparkles size={12} color="#fff" />
            </div>
          </motion.div>

          {/* Name block */}
          <div style={{ flex:1, minWidth:'160px', paddingTop:'0.5rem' }}>
            <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.35rem', fontWeight:700, color:'#0f172a', margin:'0 0 0.25rem', letterSpacing:'-0.01em', lineHeight:1.2 }}>
              {mentor.name}
            </h3>
            <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.95rem', fontWeight:600, color:'#2563eb', margin:'0 0 0.35rem', letterSpacing:'0.02em' }}>
              {mentor.specialization}
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.75rem', color:'#9C8B6E', fontStyle:'italic', fontWeight:300 }}>
              <Zap size={11} color="#2563eb" />
              MTTF Mentor
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:hovered?'linear-gradient(90deg,transparent,#2563eb50,transparent)':'#EDE4CC', transition:'background 0.3s' }} />

        {/* Bio */}
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.875rem', color:'#6B5C3E', lineHeight:1.8, margin:0, fontWeight:300 }}>
          {mentor.bio}
        </p>

        {/* Expertise tags */}
        <div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.62rem', letterSpacing:'0.18em', color:'#2563eb', textTransform:'uppercase', fontWeight:500, marginBottom:'0.65rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
            <span style={{ display:'inline-block', width:16, height:1, background:'#2563eb' }} />
            Expertise
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
            {mentor.expertise.slice(0, 4).map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity:0, scale:0 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.4 + i * 0.08 }}
                className="tag"
              >
                {skill}
              </motion.span>
            ))}
            {mentor.expertise.length > 4 && (
              <span className="tag">+{mentor.expertise.length - 4} more</span>
            )}
          </div>
        </div>

        {/* Social links */}
        <div style={{ display:'flex', gap:'0.6rem' }}>
          <motion.a
            href="mailto:contactus@mttf.in"
            whileHover={{ scale:1.18, rotate:5 }}
            whileTap={{ scale:0.9 }}
            className="social-btn"
            title="contactus@mttf.in"
          >📧</motion.a>
          {mentor.linkedin && mentor.linkedin !== '#' && (
            <motion.a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale:1.18, rotate:5 }}
              whileTap={{ scale:0.9 }}
              className="social-btn"
              title="View LinkedIn Profile"
            >💼</motion.a>
          )}
        </div>
      </div>

      {/* Bottom hover rule */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#2563eb,transparent)', opacity:hovered?1:0, transition:'opacity 0.35s' }} />
    </div>
  );
}

export default Mentors;