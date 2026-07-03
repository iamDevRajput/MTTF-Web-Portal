import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000, 50000];

const IMPACT_AREAS = [
  { id: "student_scholarship", icon: "🎓", title: "Student Scholarships", desc: "Support deserving students with financial aid." },
  { id: "ai_education", icon: "🤖", title: "AI & Data Science", desc: "Fund AI and data science education programmes." },
  { id: "research", icon: "🔬", title: "Research & Innovation", desc: "Enable cutting-edge research initiatives." },
  { id: "digital_learning", icon: "💻", title: "Digital Learning", desc: "Build digital classrooms and learning infrastructure." },
  { id: "faculty_development", icon: "🏫", title: "Faculty Development", desc: "Support FDPs, workshops, and conferences." },
  { id: "rural_stem", icon: "🌱", title: "Rural STEM Education", desc: "Promote STEM awareness in rural communities." },
  { id: "women_stem", icon: "👩‍🔬", title: "Women in STEM", desc: "Empower women pursuing STEM careers." },
  { id: "innovation", icon: "💡", title: "Innovation & Entrepreneurship", desc: "Foster innovation and startup culture." },
  { id: "library", icon: "📚", title: "Library & Knowledge", desc: "Expand educational resources and libraries." },
  { id: "general", icon: "🌍", title: "General Fund", desc: "Direct support where it's needed most." },
];

const WHY_DONATE = [
  { icon: "🎓", title: "Student Scholarships", desc: "Provide scholarships to deserving students who lack access to quality education." },
  { icon: "🤖", title: "AI & Data Science", desc: "Deliver affordable AI, Data Science, and Scientific Computing training." },
  { icon: "🔬", title: "Research", desc: "Support research, innovation, and academic excellence across disciplines." },
  { icon: "🏫", title: "Faculty Development", desc: "Organize FDPs, workshops, and conferences for educators." },
  { icon: "🌱", title: "Rural STEM", desc: "Promote STEM awareness in rural and underserved communities." },
  { icon: "💡", title: "Innovation", desc: "Build partnerships that advance education and sustainable development." },
];

const FAQ_ITEMS = [
  { q: "Will I receive a donation certificate?", a: "Yes. A certificate of donation is automatically generated and emailed to you after successful payment verification." },
  { q: "How long does it take to receive the certificate?", a: "Your certificate is generated automatically after payment and emailed within minutes of verification." },
  { q: "Is my donation payment secure?", a: "Absolutely. All payments are processed through Razorpay, a PCI-DSS compliant payment gateway with 256-bit encryption." },
  { q: "Can I claim tax benefits on my donation?", a: "MTTF is registered under Section 12AB and approved under Section 80G. Eligible donations may qualify for tax benefits. Please consult your tax advisor." },
  { q: "Can I donate monthly?", a: "We currently accept one-time donations. For recurring giving or corporate partnerships, please contact us at info@mttf.org." },
  { q: "Can companies donate through CSR?", a: "Yes. Organizations can partner with MTTF through CSR, institutional collaborations, sponsorships, and philanthropic giving." },
];

const CORPORATE_ITEMS = [
  { icon: "🎓", title: "Scholarships", desc: "Named scholarship programmes" },
  { icon: "🔬", title: "AI & Data Science Labs", desc: "AI & Data Science lab sponsorship" },
  { icon: "🏗️", title: "STEM Innovation Centres", desc: "STEM innovation centre funding" },
  { icon: "🏫", title: "Faculty Development Programmes", desc: "FDPs and workshop support" },
  { icon: "📊", title: "Research Projects", desc: "Funding cutting-edge research" },
  { icon: "🌱", title: "Community Education Initiatives", desc: "Rural and community education" },
  { icon: "💻", title: "Digital Classrooms", desc: "Digital learning infrastructure" },
  { icon: "⚡", title: "Skill Development Centres", desc: "Skill development centre support" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;

const validateForm = (form, finalAmount) => {
  if (!form.name.trim() || form.name.trim().length < 2) return "Please enter your full name (minimum 2 characters).";
  if (!form.email.trim() || !EMAIL_RE.test(form.email.trim())) return "Please enter a valid email address.";
  const phone = form.phone.replace(/\D/g, "");
  if (!PHONE_RE.test(phone)) return "Please enter a valid 10-digit Indian mobile number.";
  if (!finalAmount || finalAmount < 100) return "Minimum donation amount is ₹100.";
  if (finalAmount > 10000000) return "Maximum donation amount is ₹1,00,00,000.";
  if (form.pan.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(form.pan.trim())) return "Please enter a valid PAN (e.g. ABCDE1234F).";
  return "";
};

let razorpaySdkPromise;
const loadRazorpaySdk = () => {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (!razorpaySdkPromise) {
    razorpaySdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => window.Razorpay ? resolve(window.Razorpay) : reject(new Error("Razorpay SDK unavailable."));
      script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
      document.body.appendChild(script);
    });
  }
  return razorpaySdkPromise;
};

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(target);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  .donate-page { font-family: 'Plus Jakarta Sans', sans-serif; color: #0b1329; background: #fff; }
  .donate-section { padding: 80px 0; }
  .donate-section-alt { background: rgba(37,99,235,.04); }
  .donate-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  .donate-fade { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }

  .donate-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    color: #2563eb; background: rgba(37,99,235,.08); border: 1px solid rgba(37,99,235,.15);
    padding: 6px 16px; border-radius: 9999px; margin-bottom: 20px;
  }

  .donate-headline {
    font-size: clamp(32px, 5vw, 56px); font-weight: 800; line-height: 1.12;
    letter-spacing: -0.02em; margin-bottom: 20px;
  }
  .donate-headline-accent {
    background: linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .donate-sub { font-size: 17px; color: #475569; line-height: 1.7; max-width: 680px; }

  .donate-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; background: linear-gradient(135deg, #2563eb, #3b82f6);
    color: #fff; font-size: 14px; font-weight: 600; border: none; border-radius: 9999px;
    cursor: pointer; box-shadow: 0 4px 20px rgba(37,99,235,.25);
    transition: all 0.3s ease; text-decoration: none;
  }
  .donate-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,99,235,.35); }
  .donate-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .donate-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 30px; background: #fff; color: #2563eb;
    font-size: 14px; font-weight: 600; border: 1px solid rgba(37,99,235,.2);
    border-radius: 9999px; cursor: pointer; transition: all 0.3s ease; text-decoration: none;
  }
  .donate-btn-secondary:hover { background: rgba(37,99,235,.04); border-color: #2563eb; transform: translateY(-2px); }

  .donate-card {
    background: #fff; border: 1px solid rgba(37,99,235,.12); border-radius: 16px;
    padding: 28px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .donate-card:hover { border-color: #2563eb; box-shadow: 0 12px 40px rgba(37,99,235,.12); transform: translateY(-4px); }

  .donate-card-icon { font-size: 32px; margin-bottom: 16px; }
  .donate-card-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; color: #0b1329; }
  .donate-card-desc { font-size: 14px; color: #475569; line-height: 1.6; }

  .donate-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .donate-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .donate-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }

  .donate-stat { text-align: center; padding: 32px 16px; }
  .donate-stat-num { font-size: clamp(36px, 4vw, 48px); font-weight: 800; color: #2563eb; margin-bottom: 8px; }
  .donate-stat-label { font-size: 14px; color: #475569; font-weight: 500; }

  .donate-amount-pill {
    padding: 12px 20px; border: 1px solid rgba(37,99,235,.15); border-radius: 9999px;
    background: #fff; font-size: 14px; font-weight: 600; color: #0b1329; cursor: pointer;
    transition: all 0.2s ease; white-space: nowrap;
  }
  .donate-amount-pill:hover { border-color: #2563eb; background: rgba(37,99,235,.04); }
  .donate-amount-pill.active { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 4px 16px rgba(37,99,235,.3); }

  .donate-impact-card {
    padding: 20px; border: 1px solid rgba(37,99,235,.12); border-radius: 12px;
    cursor: pointer; transition: all 0.25s ease; text-align: center; background: #fff;
  }
  .donate-impact-card:hover { border-color: #2563eb; transform: scale(1.02); }
  .donate-impact-card.active { background: #2563eb; border-color: #2563eb; color: #fff; }
  .donate-impact-card.active .donate-card-desc { color: rgba(255,255,255,.85); }

  .donate-input {
    width: 100%; padding: 12px 16px; border: 1px solid rgba(37,99,235,.15);
    border-radius: 10px; font-size: 14px; font-family: inherit; color: #0b1329;
    background: #fff; transition: border-color 0.2s, box-shadow 0.2s; outline: none;
  }
  .donate-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
  .donate-label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
  .donate-field { margin-bottom: 16px; }

  .donate-summary {
    background: #fff; border: 1px solid rgba(37,99,235,.12); border-radius: 16px;
    padding: 28px; box-shadow: 0 8px 32px rgba(37,99,235,.08);
  }
  .donate-summary-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; color: #475569; }
  .donate-summary-total { border-top: 1px solid rgba(37,99,235,.12); margin-top: 8px; padding-top: 16px; }
  .donate-summary-total span:last-child { font-size: 24px; font-weight: 800; color: #2563eb; }

  .donate-trust-strip {
    display: flex; flex-wrap: wrap; gap: 24px; justify-content: center;
    padding: 20px; background: rgba(37,99,235,.04); border-radius: 12px;
    font-size: 13px; font-weight: 600; color: #475569;
  }
  .donate-trust-item { display: flex; align-items: center; gap: 6px; }
  .donate-trust-check { color: #2563eb; }

  .donate-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; background: rgba(37,99,235,.06); border: 1px solid rgba(37,99,235,.12);
    border-radius: 9999px; font-size: 12px; font-weight: 600; color: #2563eb;
  }

  .donate-timeline { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; }
  .donate-timeline-step {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    padding: 16px; min-width: 120px;
  }
  .donate-timeline-dot {
    width: 40px; height: 40px; border-radius: 50%; background: #2563eb; color: #fff;
    display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700;
  }
  .donate-timeline-arrow { color: #60a5fa; font-size: 20px; }

  .donate-cert-preview {
    max-width: 480px; margin: 0 auto; background: rgba(255,255,255,.7);
    backdrop-filter: blur(12px); border: 2px solid rgba(37,99,235,.2); border-radius: 12px;
    padding: 32px; box-shadow: 0 20px 60px rgba(37,99,235,.15); text-align: center;
  }
  .donate-cert-preview h4 { font-size: 18px; font-weight: 800; color: #0b1329; margin-bottom: 4px; }
  .donate-cert-preview .cert-sub { font-size: 13px; color: #2563eb; font-weight: 600; margin-bottom: 24px; }
  .donate-cert-preview .cert-name { font-size: 28px; font-weight: 800; color: #0b1329; margin: 16px 0; }
  .donate-cert-detail { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; border-bottom: 1px solid rgba(37,99,235,.08); }
  .donate-cert-detail span:first-child { color: #475569; }
  .donate-cert-detail span:last-child { font-weight: 600; color: #0b1329; }

  .donate-faq-item { border: 1px solid rgba(37,99,235,.12); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
  .donate-faq-q {
    width: 100%; padding: 18px 20px; background: #fff; border: none; text-align: left;
    font-size: 15px; font-weight: 600; color: #0b1329; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center; font-family: inherit;
  }
  .donate-faq-q:hover { background: rgba(37,99,235,.03); }
  .donate-faq-a { padding: 0 20px 18px; font-size: 14px; color: #475569; line-height: 1.7; }

  .donate-form-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
  .donate-form-sticky { position: sticky; top: 100px; }

  .donate-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; padding: 12px 16px; border-radius: 10px; font-size: 14px; margin-bottom: 16px; }

  .donate-hero {
    position: relative; min-height: 85vh; display: flex; align-items: center;
    overflow: hidden; padding: 120px 0 80px;
  }
  .donate-hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,.08) 0%, transparent 60%),
      radial-gradient(circle at 20% 80%, rgba(96,165,250,.06) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(59,130,246,.05) 0%, transparent 35%);
  }
  .donate-hero-grid {
    position: absolute; inset: 0; opacity: 0.03;
    background-image: linear-gradient(rgba(37,99,235,1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .donate-hero-circle {
    position: absolute; border-radius: 50%; border: 1px solid rgba(37,99,235,.08);
    pointer-events: none;
  }

  .donate-expandable { border: 1px solid rgba(37,99,235,.12); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
  .donate-expandable summary {
    padding: 16px 20px; font-weight: 600; cursor: pointer; list-style: none;
    display: flex; justify-content: space-between; align-items: center;
  }
  .donate-expandable summary::-webkit-details-marker { display: none; }
  .donate-expandable-content { padding: 0 20px 20px; font-size: 14px; color: #475569; line-height: 1.7; }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 1024px) {
    .donate-form-grid { grid-template-columns: 1fr; }
    .donate-form-sticky { position: static; }
    .donate-grid-4 { grid-template-columns: repeat(2, 1fr); }
  }
  .donate-donor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 768px) {
    .donate-section { padding: 56px 0; }
    .donate-donor-grid { grid-template-columns: 1fr; }
    .donate-grid-3, .donate-grid-2 { grid-template-columns: 1fr; }
    .donate-grid-4 { grid-template-columns: 1fr; }
    .donate-timeline { flex-direction: column; }
    .donate-timeline-arrow { transform: rotate(90deg); }
  }
`;

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [purpose, setPurpose] = useState("general");
  const [form, setForm] = useState({ name: "", email: "", phone: "", pan: "", address: "", message: "" });
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);
  const submittingRef = useRef(false);

  const finalAmount = isCustom ? (Number(customAmount) || 0) : selectedAmount;

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleDonate = useCallback(async () => {
    if (submittingRef.current || paying) return;

    setError("");
    const validationError = validateForm(form, finalAmount);
    if (validationError) return setError(validationError);

    submittingRef.current = true;
    setPaying(true);
    try {
      const res = await fetch(`${API}/donations/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: form.name.trim(),
          donorEmail: form.email.trim(),
          donorPhone: form.phone.replace(/\D/g, ""),
          pan: form.pan.trim() || undefined,
          address: form.address.trim() || undefined,
          message: form.message.trim() || undefined,
          purpose,
          amount: finalAmount,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Unable to create donation order.");

      // Skip actual Razorpay flow in local mock mode
      if (data.order.razorpayOrderId && data.order.razorpayOrderId.startsWith("order_mock_")) {
        window.location.href = `/donate/success?order_id=${data.order.orderId}`;
        return;
      }

      await loadRazorpaySdk();
      const options = {
        key: data.order.razorpayKeyId,
        amount: data.order.amount * 100,
        currency: data.order.currency,
        name: "MTTF Donation",
        description: `Donation for ${purpose.replace("_", " ")}`,
        order_id: data.order.razorpayOrderId,
        handler: function (response) {
          window.location.href = `/donate/success?order_id=${data.order.orderId}`;
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: "#2563eb"
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        window.location.href = `/donate/failure?order_id=${data.order.orderId}`;
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "Payment could not be initiated. Please try again.");
      submittingRef.current = false;
      setPaying(false);
    }
  }, [form, finalAmount, purpose, paying]);

  return (
    <>
      <style>{styles}</style>
      <Header />
      <div className="donate-page" style={{ paddingTop: "72px" }}>

        {/* HERO */}
        <section className="donate-hero">
          <div className="donate-hero-bg" />
          <div className="donate-hero-grid" />
          <div className="donate-hero-circle" style={{ width: 300, height: 300, top: "10%", right: "5%" }} />
          <div className="donate-hero-circle" style={{ width: 200, height: 200, bottom: "15%", left: "8%" }} />
          <div className="donate-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div className="donate-eyebrow donate-fade">Make a Difference</div>
            <h1 className="donate-headline donate-fade" style={{ animationDelay: "0.1s" }}>
              Empower Education.<br />
              <span className="donate-headline-accent">Inspire Innovation. Transform Lives.</span>
            </h1>
            <p className="donate-sub donate-fade" style={{ margin: "0 auto 32px", animationDelay: "0.2s" }}>
              Your contribution helps expand access to STEM education, research, innovation, scholarships, and professional development. Every donation creates opportunities that shape a brighter future.
            </p>
            <div className="donate-fade" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animationDelay: "0.3s" }}>
              <button type="button" className="donate-btn-primary" onClick={scrollToForm}>Donate Now</button>
              <button type="button" className="donate-btn-secondary" onClick={() => document.getElementById("about-mttf")?.scrollIntoView({ behavior: "smooth" })}>Learn More</button>
            </div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section className="donate-section donate-section-alt">
          <div className="donate-container">
            <div className="donate-grid-4">
              {[
                { target: 10000, suffix: "+", label: "Students Impacted" },
                { target: 100, suffix: "+", label: "Programs Conducted" },
                { target: 50, suffix: "+", label: "Research Initiatives" },
                { target: 100, suffix: "%", label: "Transparent Utilization" },
              ].map((s) => (
                <div key={s.label} className="donate-stat donate-card">
                  <div className="donate-stat-num"><AnimatedCounter target={s.target} suffix={s.suffix} /></div>
                  <div className="donate-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT MTTF */}
        <section className="donate-section" id="about-mttf">
          <div className="donate-container">
            <div className="donate-grid-2">
              <div style={{ background: "rgba(37,99,235,.04)", borderRadius: 20, padding: 48, textAlign: "center", border: "1px solid rgba(37,99,235,.12)" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🏛️</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#2563eb" }}>MathTech Thinking Foundation</div>
                <div style={{ fontSize: 14, color: "#475569", marginTop: 8 }}>Section 8 Not-for-Profit Company</div>
              </div>
              <div>
                <div className="donate-eyebrow">About MTTF</div>
                <h2 className="donate-headline" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>Building a Better Future Through STEM</h2>
                <p className="donate-sub" style={{ marginBottom: 24 }}>
                  MathTech Thinking Foundation (MTTF) is a Section 8 (Not-for-Profit) Company dedicated to promoting excellence in Science, Technology, Engineering, and Mathematics (STEM). We collaborate with educational institutions, researchers, industry leaders, government agencies, and communities to deliver impactful programmes in education, research, innovation, and professional development.
                </p>
                <p className="donate-sub" style={{ marginBottom: 24 }}>
                  Our mission is to make quality education, scientific research, and emerging technologies accessible to everyone, regardless of their background.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["Section 8 Company", "Udyam Registered MSME", "Section 12AB", "80G Approved"].map((b) => (
                    <span key={b} className="donate-badge">✓ {b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY DONATE */}
        <section className="donate-section donate-section-alt">
          <div className="donate-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="donate-eyebrow">Why Donate?</div>
              <h2 className="donate-headline" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>Your Support Creates Lasting Impact</h2>
              <p className="donate-sub" style={{ margin: "0 auto" }}>
                Every contribution enables us to transform lives and strengthen communities through education, research, and innovation.
              </p>
            </div>
            <div className="donate-grid-3">
              {WHY_DONATE.map((item) => (
                <div key={item.title} className="donate-card">
                  <div className="donate-card-icon">{item.icon}</div>
                  <div className="donate-card-title">{item.title}</div>
                  <div className="donate-card-desc">{item.desc}</div>
                </div>
              ))}
            </div>
            <details className="donate-expandable" style={{ marginTop: 32 }}>
              <summary>View all impact areas ▾</summary>
              <div className="donate-expandable-content">
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  <li>Provide scholarships to deserving students</li>
                  <li>Deliver affordable and accessible STEM education</li>
                  <li>Conduct AI, Data Science, and Scientific Computing training</li>
                  <li>Support research, innovation, and academic excellence</li>
                  <li>Organize Faculty Development Programmes (FDPs), workshops, and conferences</li>
                  <li>Expand digital learning infrastructure and educational resources</li>
                  <li>Promote STEM awareness in rural and underserved communities</li>
                  <li>Build partnerships that advance education and sustainable development</li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        {/* CHOOSE IMPACT + FORM */}
        <section className="donate-section" ref={formRef} id="donate-form">
          <div className="donate-container">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="donate-eyebrow">Make Your Donation</div>
              <h2 className="donate-headline" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>Choose Where Your Donation Makes an Impact</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 40 }}>
              {IMPACT_AREAS.map((area) => (
                <div
                  key={area.id}
                  className={`donate-impact-card ${purpose === area.id ? "active" : ""}`}
                  onClick={() => setPurpose(area.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setPurpose(area.id)}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{area.icon}</div>
                  <div className="donate-card-title" style={{ fontSize: 13 }}>{area.title}</div>
                </div>
              ))}
            </div>

            {/* Amount selector */}
            <div style={{ marginBottom: 32 }}>
              <div className="donate-label" style={{ fontSize: 15, marginBottom: 12 }}>Select Amount</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`donate-amount-pill ${!isCustom && selectedAmount === amt ? "active" : ""}`}
                    onClick={() => { setSelectedAmount(amt); setIsCustom(false); }}
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
                <button
                  type="button"
                  className={`donate-amount-pill ${isCustom ? "active" : ""}`}
                  onClick={() => setIsCustom(true)}
                >
                  Custom Amount
                </button>
              </div>
              {isCustom && (
                <input
                  className="donate-input"
                  type="number"
                  min="100"
                  placeholder="Enter custom amount (min ₹100)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{ marginTop: 12, maxWidth: 280 }}
                />
              )}
            </div>

            <div className="donate-form-grid">
              {/* Donor form */}
              <div className="donate-card">
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Donor Information</h3>
                <div className="donate-donor-grid">
                  <div className="donate-field" style={{ gridColumn: "1 / -1" }}>
                    <label className="donate-label">Full Name *</label>
                    <input className="donate-input" name="name" value={form.name} onChange={handleFormChange} placeholder="John Doe" />
                  </div>
                  <div className="donate-field">
                    <label className="donate-label">Email *</label>
                    <input className="donate-input" type="email" name="email" value={form.email} onChange={handleFormChange} placeholder="john@example.com" />
                  </div>
                  <div className="donate-field">
                    <label className="donate-label">Phone *</label>
                    <input className="donate-input" type="tel" name="phone" value={form.phone} onChange={handleFormChange} placeholder="9876543210" />
                  </div>
                  <div className="donate-field">
                    <label className="donate-label">PAN (Optional)</label>
                    <input className="donate-input" name="pan" value={form.pan} onChange={handleFormChange} placeholder="ABCDE1234F" />
                  </div>
                  <div className="donate-field">
                    <label className="donate-label">Address (Optional)</label>
                    <input className="donate-input" name="address" value={form.address} onChange={handleFormChange} placeholder="City, State" />
                  </div>
                  <div className="donate-field" style={{ gridColumn: "1 / -1" }}>
                    <label className="donate-label">Message (Optional)</label>
                    <textarea className="donate-input" name="message" value={form.message} onChange={handleFormChange} rows={3} placeholder="A note with your donation..." style={{ resize: "vertical" }} />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="donate-form-sticky">
                <div className="donate-summary">
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Donation Summary</h3>
                  <div className="donate-summary-row"><span>Donation</span><span>₹{finalAmount.toLocaleString("en-IN")}</span></div>
                  <div className="donate-summary-row"><span>Processing Fee</span><span>₹0</span></div>
                  <div className="donate-summary-row donate-summary-total"><span style={{ fontWeight: 700, color: "#0b1329" }}>TOTAL</span><span>₹{finalAmount.toLocaleString("en-IN")}</span></div>

                  {error && <div className="donate-error">{error}</div>}

                  <button type="button" className="donate-btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={handleDonate} disabled={paying} aria-busy={paying}>
                    {paying ? (
                      <>
                        <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        Processing...
                      </>
                    ) : "🔒 Proceed to Secure Payment"}
                  </button>

                  <div className="donate-trust-strip" style={{ marginTop: 16, flexDirection: "column", gap: 8 }}>
                    {["256-bit Secure", "Razorpay", "Instant Receipt", "Auto Certificate"].map((t) => (
                      <div key={t} className="donate-trust-item"><span className="donate-trust-check">✓</span> {t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVERY CONTRIBUTION MATTERS */}
        <section className="donate-section donate-section-alt">
          <div className="donate-container">
            <div className="donate-grid-2">
              <div>
                <div className="donate-eyebrow">Giving Options</div>
                <h2 className="donate-headline" style={{ fontSize: 28 }}>Every Contribution Matters</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                  {["One-time Donation", "Monthly Donation", "Corporate Donation"].map((opt) => (
                    <div key={opt} className="donate-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#2563eb", fontWeight: 700 }}>→</span>
                      <span style={{ fontWeight: 600 }}>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="donate-sub">
                  Whether you give once or become a recurring donor, your generosity helps create opportunities for learning, research, and innovation. Every learner empowered, every researcher supported, every educator inspired, and every innovation nurtured begins with the generosity of people like you.
                </p>
                <details className="donate-expandable" style={{ marginTop: 20 }}>
                  <summary>Suggested Giving Levels ▾</summary>
                  <div className="donate-expandable-content">
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      <li>₹500 – Learning Support</li>
                      <li>₹1,000 – Student Development</li>
                      <li>₹2,500 – Skill Development</li>
                      <li>₹5,000 – Innovation Support</li>
                      <li>₹10,000 – STEM Education Champion</li>
                      <li>₹25,000 – Research Patron</li>
                      <li>₹50,000 – Education Sponsor</li>
                      <li>₹1,00,000+ – Visionary Partner</li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* CORPORATE PARTNERSHIPS */}
        <section className="donate-section">
          <div className="donate-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="donate-eyebrow">Partnerships</div>
              <h2 className="donate-headline" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>Corporate & Institutional Partnerships</h2>
              <p className="donate-sub" style={{ margin: "0 auto" }}>
                Organizations can partner with MTTF to support high-impact initiatives through CSR, institutional collaborations, sponsorships, and philanthropic giving.
              </p>
            </div>
            <div className="donate-grid-3">
              {CORPORATE_ITEMS.map((item) => (
                <div key={item.title} className="donate-card">
                  <div className="donate-card-icon">{item.icon}</div>
                  <div className="donate-card-title">{item.title}</div>
                  <div className="donate-card-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSPARENCY + TAX */}
        <section className="donate-section donate-section-alt">
          <div className="donate-container">
            <div className="donate-grid-2">
              <div className="donate-card">
                <div className="donate-eyebrow">Transparency</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Transparency You Can Trust</h3>
                <p className="donate-sub" style={{ marginBottom: 20 }}>
                  Every donation is managed with integrity and directed toward programmes that create measurable outcomes. We maintain transparent financial practices and strive to ensure that every contribution delivers meaningful educational and societal impact.
                </p>
                {["Transparent Financial Practices", "Responsible Governance", "Measurable Impact", "Programme-focused Utilization"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ color: "#2563eb" }}>✓</span> {t}
                  </div>
                ))}
              </div>
              <div className="donate-card" style={{ background: "linear-gradient(135deg, rgba(37,99,235,.06), rgba(96,165,250,.08))", borderColor: "rgba(37,99,235,.2)" }}>
                <div className="donate-eyebrow">Tax Benefits</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Eligible for Tax Deduction</h3>
                <p className="donate-sub" style={{ marginBottom: 20 }}>
                  MathTech Thinking Foundation is registered under Section 12AB and approved under Section 80G of the Income Tax Act, 1961. Eligible donations may qualify for tax benefits under applicable provisions of Indian law.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <span className="donate-badge">80G Approved</span>
                  <span className="donate-badge">12AB Registered</span>
                </div>
                <p style={{ fontSize: 12, color: "#475569", marginTop: 16 }}>Please consult your tax advisor for eligibility details.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATE PROCESS */}
        <section className="donate-section">
          <div className="donate-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="donate-eyebrow">Certificate</div>
              <h2 className="donate-headline" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>Your Certificate, Automatically</h2>
            </div>
            <div className="donate-timeline">
              {[
                { icon: "💳", label: "Donate" },
                { icon: "✓", label: "Payment Verified" },
                { icon: "📄", label: "Certificate Generated" },
                { icon: "📧", label: "Email Sent" },
                { icon: "⬇", label: "Download Anytime" },
              ].map((step, i, arr) => (
                <React.Fragment key={step.label}>
                  <div className="donate-timeline-step">
                    <div className="donate-timeline-dot">{step.icon}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <span className="donate-timeline-arrow">→</span>}
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: 56 }}>
              <div className="donate-cert-preview">
                <h4>MathTech Thinking Foundation</h4>
                <div className="cert-sub">Certificate of Donation</div>
                <div style={{ fontSize: 12, color: "#475569" }}>Presented To</div>
                <div className="cert-name">John Doe</div>
                <div style={{ fontSize: 13, color: "#475569", marginBottom: 20 }}>For supporting STEM Education</div>
                <div className="donate-cert-detail"><span>Donation Amount</span><span>₹10,000</span></div>
                <div className="donate-cert-detail"><span>Date</span><span>2 July 2026</span></div>
                <div className="donate-cert-detail"><span>Certificate ID</span><span>MTTF-CERT-XXXX</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="donate-section donate-section-alt" style={{ padding: "40px 0" }}>
          <div className="donate-container">
            <div className="donate-trust-strip">
              {["12AB Registered", "Section 8 Company", "Udyam Registered", "Secure Payment via Razorpay"].map((t) => (
                <div key={t} className="donate-trust-item"><span className="donate-trust-check">✔</span> {t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="donate-section">
          <div className="donate-container" style={{ maxWidth: 760 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="donate-eyebrow">FAQ</div>
              <h2 className="donate-headline" style={{ fontSize: 32 }}>Frequently Asked Questions</h2>
            </div>
            {FAQ_ITEMS.map((item, i) => (
              <div key={item.q} className="donate-faq-item">
                <button type="button" className="donate-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <span style={{ color: "#2563eb", fontSize: 20 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="donate-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="donate-section" style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", padding: "80px 0", textAlign: "center" }}>
          <div className="donate-container">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
              Together,<br />Let's Educate. Innovate. Transform Lives.
            </h2>
            <p style={{ color: "rgba(255,255,255,.85)", fontSize: 17, marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
              Your donation is more than a financial contribution—it is an investment in knowledge, opportunity, and a brighter future for society.
            </p>
            <button type="button" className="donate-btn-secondary" style={{ background: "#fff", border: "none" }} onClick={scrollToForm}>
              Donate Now
            </button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
