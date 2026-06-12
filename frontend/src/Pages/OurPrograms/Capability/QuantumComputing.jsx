import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Lock, Zap, Network, ArrowLeft, Atom, Binary, Shield, Sparkles } from 'lucide-react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

function QuantumComputing() {
  const [isVisible, setIsVisible] = useState({});
  const [quantumState, setQuantumState] = useState(0);
  const [particlePositions, setParticlePositions] = useState([]);
  const observerRefs = useRef([]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setIsVisible((prev) => ({ ...prev, [index]: true }));
          });
        },
        { threshold: 0.1 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setQuantumState((prev) => (prev + 1) % 2), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setParticlePositions(
      Array.from({ length: 25 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        scale: 0.5 + Math.random() * 1,
      }))
    );
  }, []);

  const researchAreas = [
    {
      icon: Zap,
      num: '01',
      title: 'Quantum Algorithms',
      description: "Development of quantum computational methods, Shor's algorithm, Grover's algorithm, and quantum optimization techniques.",
      notation: '|ψ⟩',
      metric: 'O(√n)',
    },
    {
      icon: Lock,
      num: '02',
      title: 'Quantum Cryptography',
      description: 'Secure communication using quantum key distribution, post-quantum cryptography, and quantum-safe security protocols.',
      notation: '|0⟩|1⟩',
      metric: '100%',
    },
    {
      icon: Network,
      num: '03',
      title: 'Quantum Simulation',
      description: 'Simulating quantum systems, molecular dynamics, and material science applications using quantum computers.',
      notation: '⟨ψ|H|ψ⟩',
      metric: '10⁹x',
    },
    {
      icon: Cpu,
      num: '04',
      title: 'Quantum Machine Learning',
      description: 'Integrating quantum computing with AI, quantum neural networks, and hybrid classical-quantum algorithms.',
      notation: '∑ᵢ αᵢ|i⟩',
      metric: 'Hybrid',
    },
  ];

  const impacts = [
    { title: 'Drug Discovery',  desc: 'Molecular simulation for new medicines',        icon: Atom    },
    { title: 'Optimization',   desc: 'Solving complex logistics and scheduling',       icon: Network },
    { title: 'Cryptography',   desc: 'Quantum-safe security protocols',               icon: Shield  },
  ];

  const quantumStats = [
    { value: '50+',  label: 'Qubits',    icon: Atom     },
    { value: '99.9%',label: 'Fidelity',  icon: Sparkles },
    { value: '10⁹x', label: 'Speedup',   icon: Zap      },
    { value: '∞',    label: 'Potential', icon: Binary   },
  ];

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseAccent {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%,-50%) rotate(0deg);   }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes floatDot {
          0%,100% { transform: translateY(0);   opacity: 0.3; }
          50%      { transform: translateY(-8px); opacity: 0.7; }
        }
        @keyframes quantumFloat {
          0%,100% { transform: translate(0,0);       opacity: 0.3; }
          50%      { transform: translate(12px,-18px); opacity: 0.55; }
        }
        @keyframes quantumVector {
          0%,100% { transform: translate(-50%,-100%) rotate(-14deg); }
          50%      { transform: translate(-50%,-100%) rotate(14deg);  }
        }
        @keyframes orbitSlow    { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes orbitReverse { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes drawLine {
          from { stroke-dashoffset: 800; }
          to   { stroke-dashoffset: 0;   }
        }

        .qc-page { background: #f8fafc; color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
        .gold-rule { height: 1px; background: linear-gradient(90deg,transparent,#2563eb70,transparent); }

        .eyebrow {
          font-family: 'Plus Jakarta Sans',sans-serif; font-size: 0.65rem; letter-spacing: 0.22em;
          color: #2563eb; text-transform: uppercase; font-weight: 500;
          display: flex; align-items: center; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;
        }
        .eyebrow-line { display: inline-block; width: 28px; height: 1px; background: #2563eb; }

        .research-card {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;
          padding: 2.25rem; position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .research-card::before {
          content:''; position: absolute; top:0; left:0;
          width:0; height:2px;
          background: linear-gradient(90deg,#2563eb,#60a5fa,transparent);
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .research-card:hover::before { width: 100%; }
        .research-card:hover {
          border-color: #2563eb; transform: translateY(-5px);
          box-shadow: 0 20px 44px rgba(37, 99, 235,0.12); background: #ffffff;
        }

        .impact-card {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;
          padding: 2rem; position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .impact-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg,#2563eb,transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .impact-card:hover::after { transform: scaleX(1); }
        .impact-card:hover { border-color:#2563eb; transform:translateY(-4px); box-shadow:0 16px 36px rgba(37, 99, 235,0.1); }

        .stat-pill {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;
          padding: 1.25rem 1.5rem; text-align: center; flex: 1 1 120px;
          transition: all 0.35s ease; cursor: default;
        }
        .stat-pill:hover { border-color:#2563eb; transform:translateY(-3px); box-shadow:0 12px 28px rgba(37, 99, 235,0.1); }

        .btn-gold {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.85rem 2.25rem; background:#2563eb; color:#fff;
          font-family:'Plus Jakarta Sans',sans-serif; font-size:0.75rem; font-weight:500;
          letter-spacing:0.14em; text-transform:uppercase;
          border:1px solid #2563eb; border-radius:2px;
          cursor:pointer; transition:all 0.35s ease; text-decoration:none;
        }
        .btn-gold:hover { background:#1d4ed8; border-color:#1d4ed8; transform:translateY(-2px); box-shadow:0 10px 24px rgba(37, 99, 235,0.28); }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#f8fafc; }
        ::-webkit-scrollbar-thumb { background:#2563eb; border-radius:2px; }
      `}</style>

      <div className="qc-page">
        <Header />

        {/* ── Breadcrumb ── */}
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'7rem 2rem 1.5rem' }}>
          <Link
            to="/programs/capability"
            style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.78rem', color:'#2563eb', textDecoration:'none', letterSpacing:'0.06em', transition:'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color='#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.color='#2563eb'}
          >
            <ArrowLeft size={14} />
            Back to Capabilities
          </Link>
        </div>

        {/* ── Hero ── */}
        <section
          ref={el => (observerRefs.current[0] = el)}
          style={{
            position:'relative', overflow:'hidden',
            background:'linear-gradient(158deg,#f8fafc 0%,#f1f5f9 55%,#e2e8f0 100%)',
            padding:'3.5rem 2rem 5.5rem', textAlign:'center',
            borderBottom:'1px solid #D8CBA8',
          }}
        >
          {/* Grid */}
          <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(37, 99, 235,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37, 99, 235,0.05) 1px,transparent 1px)`, backgroundSize:'72px 72px', pointerEvents:'none' }} />
          {/* Glow */}
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'420px', background:'radial-gradient(ellipse,rgba(37, 99, 235,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
          {/* Rotating rings */}
          <div style={{ position:'absolute', top:'50%', left:'50%', width:'460px', height:'460px', border:'1px solid rgba(37, 99, 235,0.08)', borderRadius:'50%', animation:'orbitSlow 40s linear infinite', pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:'50%', left:'50%', width:'640px', height:'640px', border:'1px dashed rgba(37, 99, 235,0.05)', borderRadius:'50%', animation:'orbitReverse 65s linear infinite', pointerEvents:'none' }} />
          {/* Quantum floating particles */}
          {particlePositions.slice(0,12).map((p,i) => (
            <div key={i} style={{ position:'absolute', width:3, height:3, borderRadius:'50%', background:'#2563eb', left:`${p.x}%`, top:`${p.y}%`, animation:`quantumFloat ${p.duration}s ease-in-out infinite`, animationDelay:`${p.delay}s`, pointerEvents:'none', opacity:0.35 }} />
          ))}
          {/* Corner brackets */}
          {[
            { top:'1.8rem', left:'1.8rem', borderTop:'1px solid #2563eb', borderLeft:'1px solid #2563eb' },
            { top:'1.8rem', right:'1.8rem', borderTop:'1px solid #2563eb', borderRight:'1px solid #2563eb' },
            { bottom:'1.8rem', left:'1.8rem', borderBottom:'1px solid #2563eb', borderLeft:'1px solid #2563eb' },
            { bottom:'1.8rem', right:'1.8rem', borderBottom:'1px solid #2563eb', borderRight:'1px solid #2563eb' },
          ].map((s,i) => <div key={i} style={{ position:'absolute', width:52, height:52, opacity:0.45, ...s }} />)}

          <div style={{ position:'relative', zIndex:1, opacity: isVisible[0]?1:0, transform: isVisible[0]?'translateY(0)':'translateY(24px)', transition:'opacity 0.9s ease, transform 0.9s ease' }}>
            {/* Superposition icon */}
            <div style={{ width:'64px', height:'64px', margin:'0 auto 1.75rem', background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', color:'#2563eb', position:'relative', overflow:'hidden' }}>
              <Cpu size={26} style={{ position:'absolute', transition:'opacity 0.5s,transform 0.5s', opacity: quantumState===0?1:0, transform: quantumState===0?'scale(1)':'scale(0.5)' }} />
              <Atom size={26} style={{ position:'absolute', transition:'opacity 0.5s,transform 0.5s', opacity: quantumState===1?1:0, transform: quantumState===1?'scale(1)':'scale(0.5)' }} />
            </div>

            {/* Badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'0.65rem', background:'rgba(37, 99, 235,0.1)', border:'1px solid rgba(37, 99, 235,0.3)', borderRadius:'2px', padding:'0.4rem 1.2rem', marginBottom:'1.75rem' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#2563eb', display:'inline-block', animation:'pulseGold 2s ease infinite' }} />
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', color:'#1d4ed8', letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:500 }}>
                Quantum Computing
              </span>
            </div>

            <h1 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(2.4rem,6vw,5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', color:'#0f172a', marginBottom:'0.4rem' }}>
              Frontier of
            </h1>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(2.4rem,6vw,5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.025em', marginBottom:'1.25rem', fontStyle:'italic', background:'linear-gradient(135deg,#2563eb 0%,#1d4ed8 40%,#60a5fa 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>
              Quantum Computing
            </h1>

            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.95rem', color:'#6B5C3E', maxWidth:'560px', margin:'0 auto 3rem', lineHeight:1.8, fontWeight:300 }}>
              Exploring the frontiers of quantum computing technology and its revolutionary
              applications in solving previously intractable computational problems.
            </p>

            {/* Stats */}
            <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'1rem', maxWidth:'680px', margin:'0 auto' }}>
              {quantumStats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div className="stat-pill" key={i}>
                    <Icon size={16} color="#2563eb" style={{ margin:'0 auto 0.4rem', display:'block' }} />
                    <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.6rem', fontWeight:700, color:'#2563eb', lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.6rem', color:'#9C8B6E', letterSpacing:'0.14em', textTransform:'uppercase', marginTop:'0.25rem', fontWeight:500 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Overview ── */}
        <section
          ref={el => (observerRefs.current[1] = el)}
          style={{ padding:'5rem 2rem', background:'#FEFCF5' }}
        >
          <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'3rem', alignItems:'center', opacity: isVisible[1]?1:0, transform: isVisible[1]?'translateY(0)':'translateY(24px)', transition:'opacity 0.8s ease, transform 0.8s ease' }}>
            <div>
              <div className="eyebrow" style={{ justifyContent:'flex-start' }}>
                <span className="eyebrow-line" />
                Overview
              </div>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:700, color:'#0f172a', letterSpacing:'-0.02em', margin:'0 0 1.5rem', lineHeight:1.15 }}>
                The Quantum{' '}
                <span style={{ fontStyle:'italic', color:'#1d4ed8' }}>Revolution</span>
              </h2>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.9rem', color:'#6B5C3E', lineHeight:1.8, marginBottom:'0.85rem', fontWeight:300 }}>
                Our Quantum Computing program is at the forefront of one of the most exciting technological
                revolutions of our time. We explore quantum mechanics, quantum information theory, and their
                applications to develop algorithms and systems that harness the power of quantum phenomena.
              </p>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.9rem', color:'#6B5C3E', lineHeight:1.8, fontWeight:300 }}>
                Students and researchers work with quantum programming languages, simulators, and real quantum
                hardware to develop solutions for cryptography, optimization, drug discovery, and artificial intelligence.
              </p>
            </div>

            {/* Bloch sphere visualization — recolored */}
            <div style={{ background:'#ffffff', border:'1px solid #e2e8f0', borderRadius:'4px', padding:'2rem', position:'relative', overflow:'hidden', minHeight:'260px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#2563eb,transparent)' }} />

              <div style={{ position:'relative', width:'180px', height:'180px' }}>
                {/* Sphere rings */}
                <div style={{ position:'absolute', inset:0, border:'1.5px solid rgba(37, 99, 235,0.3)', borderRadius:'50%' }} />
                <div style={{ position:'absolute', inset:'10px', border:'1px solid rgba(37, 99, 235,0.15)', borderRadius:'50%' }} />
                {/* Orbiting rings */}
                <div style={{ position:'absolute', inset:0, border:'1px dashed rgba(37, 99, 235,0.15)', borderRadius:'50%', animation:'orbitSlow 20s linear infinite' }} />
                <div style={{ position:'absolute', inset:'4px', border:'1px dashed rgba(37, 99, 235,0.1)', borderRadius:'50%', animation:'orbitReverse 15s linear infinite' }} />

                {/* State vector */}
                <div style={{ position:'absolute', top:'50%', left:'50%', width:'2px', height:'72px', background:'linear-gradient(180deg,#2563eb,rgba(37, 99, 235,0.2))', transformOrigin:'bottom center', animation:'quantumVector 4s ease-in-out infinite', transform:'translate(-50%,-100%) rotate(-14deg)' }} />
                {/* Center dot */}
                <div style={{ position:'absolute', top:'50%', left:'50%', width:'10px', height:'10px', borderRadius:'50%', background:'#2563eb', transform:'translate(-50%,-50%)', animation:'pulseGold 2s ease-in-out infinite', boxShadow:'0 0 14px rgba(37, 99, 235,0.5)' }} />

                {/* Axis labels */}
                <div style={{ position:'absolute', top:'-1.5rem', left:'50%', transform:'translateX(-50%)', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.85rem', color:'#2563eb', fontWeight:600 }}>|0⟩</div>
                <div style={{ position:'absolute', bottom:'-1.5rem', left:'50%', transform:'translateX(-50%)', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.85rem', color:'#1d4ed8', fontWeight:600 }}>|1⟩</div>

                {/* Orbiting dots */}
                <div style={{ position:'absolute', inset:0, animation:'orbitSlow 8s linear infinite' }}>
                  <div style={{ position:'absolute', top:0, left:'50%', width:'7px', height:'7px', borderRadius:'50%', background:'#2563eb', transform:'translateX(-50%)', boxShadow:'0 0 8px rgba(37, 99, 235,0.6)' }} />
                </div>
                <div style={{ position:'absolute', inset:0, animation:'orbitReverse 11s linear infinite' }}>
                  <div style={{ position:'absolute', top:'50%', right:0, width:'6px', height:'6px', borderRadius:'50%', background:'rgba(37, 99, 235,0.6)', transform:'translateY(-50%)' }} />
                </div>
              </div>

              {/* Quantum notation */}
              <div style={{ position:'absolute', top:'1rem', right:'1.25rem', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.82rem', color:'#2563eb', fontWeight:600, letterSpacing:'0.05em' }}>
                |ψ⟩ = α|0⟩ + β|1⟩
              </div>
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Research Areas ── */}
        <section
          ref={el => (observerRefs.current[2] = el)}
          style={{ padding:'5rem 2rem' }}
        >
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <div className="eyebrow"><span className="eyebrow-line" />Research<span className="eyebrow-line" /></div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, color:'#0f172a', textAlign:'center', marginBottom:'3rem', letterSpacing:'-0.02em' }}>
              Research{' '}
              <span style={{ fontStyle:'italic', color:'#1d4ed8' }}>Areas</span>
            </h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.5rem' }}>
              {researchAreas.map((area, i) => (
                <ResearchCard key={i} area={area} index={i} visible={isVisible[2]} />
              ))}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── Future Impact ── */}
        <section style={{ background:'#FEFCF5', padding:'5rem 2rem' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
            <div className="eyebrow"><span className="eyebrow-line" />Applications<span className="eyebrow-line" /></div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, color:'#0f172a', textAlign:'center', marginBottom:'1.5rem', letterSpacing:'-0.02em' }}>
              Future{' '}
              <span style={{ fontStyle:'italic', color:'#1d4ed8' }}>Impact</span>
            </h2>
            <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.15rem', fontStyle:'italic', color:'#6B5C3E', maxWidth:'700px', margin:'0 auto 3rem', textAlign:'center', lineHeight:1.75, fontWeight:500 }}>
              Quantum computing promises to revolutionize industries from pharmaceuticals to finance,
              offering exponential speedups for specific computational problems and enabling entirely new types of calculations.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1.5rem' }}>
              {impacts.map((impact, i) => {
                const Icon = impact.icon;
                return (
                  <div className="impact-card" key={i} style={{ animationDelay:`${i*0.08}s`, animation:'fadeUp 0.6s ease both' }}>
                    <div style={{ position:'absolute', top:0, right:0, width:18, height:18, background:'#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)' }} />

                    {/* Quantum dots top-right */}
                    <div style={{ position:'absolute', top:'1rem', right:'1.5rem', display:'flex', gap:'3px' }}>
                      {[0,1,2].map(j => (
                        <div key={j} style={{ width:4, height:4, borderRadius:'50%', background:'#2563eb', animation:'pulseGold 2s ease-in-out infinite', animationDelay:`${j*0.3}s` }} />
                      ))}
                    </div>

                    <div style={{ width:'44px', height:'44px', background:'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem', color:'#2563eb' }}>
                      <Icon size={20} />
                    </div>
                    <h4 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.25rem', fontWeight:700, color:'#0f172a', margin:'0 0 0.4rem' }}>{impact.title}</h4>
                    <div style={{ height:'1px', background:'#EDE4CC', marginBottom:'0.75rem' }} />
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.85rem', color:'#6B5C3E', lineHeight:1.75, margin:0, fontWeight:300 }}>{impact.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* ── CTA ── */}
        <section style={{ padding:'5rem 2rem', background:'#f8fafc' }}>
          <div style={{ maxWidth:'780px', margin:'0 auto' }}>
            <div style={{ background:'linear-gradient(158deg,#0f172a 0%,#2E1F08 100%)', border:'1px solid #3D2A0A', borderRadius:'4px', padding:'4rem 3rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#2563eb,transparent)' }} />
              {[
                { top:'1.2rem', left:'1.2rem', borderTop:'1px solid #2563eb40', borderLeft:'1px solid #2563eb40' },
                { top:'1.2rem', right:'1.2rem', borderTop:'1px solid #2563eb40', borderRight:'1px solid #2563eb40' },
                { bottom:'1.2rem', left:'1.2rem', borderBottom:'1px solid #2563eb40', borderLeft:'1px solid #2563eb40' },
                { bottom:'1.2rem', right:'1.2rem', borderBottom:'1px solid #2563eb40', borderRight:'1px solid #2563eb40' },
              ].map((s,i) => <div key={i} style={{ position:'absolute', width:36, height:36, ...s }} />)}

              {/* Floating quantum symbols */}
              {['|ψ⟩','⟨φ|','∑'].map((sym,i) => (
                <div key={i} style={{ position:'absolute', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'2.5rem', color:'rgba(37, 99, 235,0.08)', fontWeight:700, animation:`floatDot ${3+i}s ease-in-out infinite`, animationDelay:`${i*0.5}s`, top: i===2?'1.5rem':'auto', bottom: i<2?'1.5rem':'auto', left: i===0?'2rem':'auto', right: i===1?'2rem': i===2?'3rem':'auto', pointerEvents:'none' }}>
                  {sym}
                </div>
              ))}

              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', color:'#2563eb', textTransform:'uppercase', fontWeight:500, marginBottom:'1.25rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}>
                <span style={{ display:'inline-block', width:22, height:1, background:'#2563eb' }} />
                Pioneer the Future
                <span style={{ display:'inline-block', width:22, height:1, background:'#2563eb' }} />
              </div>

              <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:'#f8fafc', letterSpacing:'-0.02em', margin:'0 0 1rem' }}>
                Pioneer{' '}
                <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#2563eb,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Quantum Computing
                </span>
              </h2>

              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.92rem', color:'rgba(247,243,234,0.55)', maxWidth:'480px', margin:'0 auto 2.5rem', lineHeight:1.78, fontWeight:300 }}>
                Join the quantum revolution and shape the future of computation.
              </p>

              <Link to="/membership" className="btn-gold">
                Explore Program
                <Cpu size={14} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// ── Research Card ──
function ResearchCard({ area, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const Icon = area.icon;

  return (
    <div
      className="research-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(24px)', transition: `opacity 0.7s ease ${index*0.12}s, transform 0.7s ease ${index*0.12}s, border-color 0.4s, box-shadow 0.4s, background 0.4s` }}
    >
      {/* Clipped corner */}
      <div style={{ position:'absolute', top:0, right:0, width:18, height:18, background: hovered?'#2563eb':'#E8DFC4', clipPath:'polygon(100% 0,0 0,100% 100%)', transition:'background 0.3s' }} />

      {/* Ghost notation */}
      <div style={{ position:'absolute', top:'1rem', right:'1.5rem', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'3.5rem', fontWeight:700, color: hovered?'rgba(37, 99, 235,0.1)':'rgba(37, 99, 235,0.05)', pointerEvents:'none', lineHeight:1, transition:'color 0.3s', userSelect:'none' }}>
        {area.notation}
      </div>

      {/* Header row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.7rem', color:'#2563eb', letterSpacing:'0.15em', fontWeight:600 }}>{area.num}</span>
          <div style={{ width:'44px', height:'44px', background: hovered?'#FDF5E0':'#F5EFD8', border:'1px solid #E8D89A', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', color:'#2563eb', transition:'all 0.3s', transform: hovered?'scale(1.08) rotate(-4deg)':'scale(1)' }}>
            <Icon size={20} />
          </div>
        </div>
        {/* Metric badge */}
        <div style={{ padding:'0.3rem 0.75rem', border:'1px solid rgba(37, 99, 235,0.35)', borderRadius:'1px', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.85rem', fontWeight:700, color:'#2563eb', letterSpacing:'0.05em' }}>
          {area.metric}
        </div>
      </div>

      <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.3rem', fontWeight:700, color:'#0f172a', margin:'0 0 0.5rem', letterSpacing:'-0.01em', lineHeight:1.2 }}>
        {area.title}
      </h3>

      {/* Divider */}
      <div style={{ height:'1px', background: hovered?'linear-gradient(90deg,#2563eb40,transparent)':'#EDE4CC', marginBottom:'0.85rem', transition:'background 0.3s' }} />

      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.85rem', color:'#6B5C3E', lineHeight:1.8, margin:'0 0 1.25rem', fontWeight:300 }}>
        {area.description}
      </p>

      {/* Progress bar */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
        <div style={{ flex:1, height:'2px', background:'rgba(37, 99, 235,0.15)', borderRadius:'1px', overflow:'hidden' }}>
          <div style={{ height:'100%', width: hovered?'100%':'35%', background:'linear-gradient(90deg,#2563eb,#60a5fa)', transition:'width 0.5s ease', borderRadius:'1px' }} />
        </div>
        <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.72rem', color:'#2563eb', letterSpacing:'0.08em', fontWeight:600, flexShrink:0 }}>
          {area.notation}
        </span>
      </div>
    </div>
  );
}

export default QuantumComputing;