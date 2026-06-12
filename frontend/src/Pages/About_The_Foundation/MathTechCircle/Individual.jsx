import React, { useState, useEffect, useRef } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { Link } from "react-router-dom";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const benefits = [
  { id: "01", title: "Networking", desc: "MTTF provides a platform to connect with a diverse community of Science, Technology, Engineering, and Mathematics (STEM) professionals from around the world. This fosters valuable connections and collaborations with like-minded individuals." },
  { id: "02", title: "Professional Development", desc: "Members have access to conferences, workshops, and faculty development programs organized by MTTF, which offer opportunities to expand knowledge, learn about cutting-edge research, and stay updated on the latest advancements in various STEM fields." },
  { id: "03", title: "Knowledge Sharing", desc: "MTTF encourages the exchange of ideas and information among members, promoting a culture of learning and innovation. You can gain insights from experts in your field and share your own expertise with others." },
  { id: "04", title: "Recognition & Awards", desc: "Outstanding contributions to STEM are acknowledged and celebrated within MTTF, providing recognition and honor for exceptional achievements." },
  { id: "05", title: "Engaging Activities", desc: "Members can participate in various activities and events organized by MTTF Societies, tailored to different STEM disciplines, further enhancing engagement and involvement." },
  { id: "06", title: "Research Support", desc: "MTTF may offer technical support or sponsor events related to research and development, aiding members in their pursuit of innovative projects." },
  { id: "07", title: "Collaboration Opportunities", desc: "Being part of MTTF opens doors to potential collaborations with industry leaders, researchers, and academics, leading to fruitful partnerships and joint ventures." },
  { id: "08", title: "Community of Support", desc: "MTTF strives to create a welcoming and supportive environment for all its members, fostering a sense of belonging and camaraderie within the STEM community." },
  { id: "09", title: "Access to Resources", desc: "MTTF may provide access to exclusive resources, publications, and databases, enabling members to access valuable research materials and information." },
  { id: "10", title: "Career Advancement", desc: "Membership in MTTF can bolster your professional profile and open up new career opportunities through exposure to a global network of STEM professionals and organizations." },
];

const faqs = [
  { q: "How to register for Lifetime Membership?", a: "First click on become a member icon, fill in the required and authentic details in the registration form and submit it. After submission, you will receive an email to activate your account. After successful activation of your account, you will get your Member ID on your email address. Further, registered members can join at most three MTTF-Societies of your interest. To join these societies, you need to log in your account, then go to MTTF-Societies and submit the details." },
  { q: "When will the lifetime membership certificate for new registered members be provided?", a: "The lifetime membership certificate for new registered members will be issued in the first week of each month." },
  { q: "What should I do if an old member did not receive their certificate?", a: "If any old member has not received their certificate, please provide your Member ID via WhatsApp or email us at lifetimemember@mttf.in." },
];

// ─── HOOK ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── BENEFIT CARD ─────────────────────────────────────────────────────────────
function BenefitCard({ benefit, index }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        background: hovered ? "rgba(37, 99, 235,0.04)" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(37, 99, 235,0.35)" : "rgba(100, 116, 139,0.12)"}`,
        borderRadius: "2px",
        padding: "2rem 2rem 2rem 2.25rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: `opacity 0.7s ease ${index * 0.06}s, transform 0.7s ease ${index * 0.06}s, background 0.35s ease, border-color 0.35s ease`,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hovered ? "3px" : "2px", background: "linear-gradient(180deg, #2563eb 0%, #60a5fa 100%)", transition: "width 0.3s ease" }} />
      <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "5rem", fontWeight: 700, color: "rgba(37, 99, 235,0.06)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{benefit.id}</div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", color: "#2563eb", letterSpacing: "0.2em", marginBottom: "0.6rem", fontWeight: 600 }}>{benefit.id} / {String(benefits.length).padStart(2, "0")}</div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em", margin: "0 0 0.75rem", lineHeight: 1.2 }}>{benefit.title}</h3>
      <div style={{ height: "1px", background: "rgba(37, 99, 235,0.2)", width: hovered ? "100%" : "36%", transition: "width 0.4s ease", marginBottom: "0.85rem" }} />
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#475569", lineHeight: 1.85, margin: 0, fontWeight: 300 }}>{benefit.desc}</p>
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ faq, index, number }) {
  const [ref, visible] = useInView();
  const [open, setOpen] = useState(false);
  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        border: `1px solid ${open ? "rgba(37, 99, 235,0.3)" : "rgba(100, 116, 139,0.12)"}`,
        background: open ? "rgba(37, 99, 235,0.03)" : "#f8fafc",
        padding: "1.75rem 2rem",
        cursor: "pointer",
        borderRadius: "2px",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.3s ease, background 0.3s ease`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.7rem", color: "#2563eb", letterSpacing: "0.15em", flexShrink: 0, paddingTop: "0.1rem", fontWeight: 600 }}>{String(number).padStart(2, "0")}</span>
          <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.05rem", fontWeight: open ? 700 : 600, color: open ? "#0f172a" : "#5C4A32", margin: 0, lineHeight: 1.4, transition: "color 0.25s ease" }}>{faq.q}</h4>
        </div>
        <div style={{ width: 22, height: 22, border: "1px solid rgba(37, 99, 235,0.35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#2563eb", fontSize: "0.9rem", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease", background: open ? "rgba(37, 99, 235,0.08)" : "transparent" }}>+</div>
      </div>
      {open && (
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#475569", lineHeight: 1.85, margin: "1.25rem 0 0 2.1rem", fontWeight: 300, animation: "faqOpen 0.3s ease" }}>{faq.a}</p>
      )}
    </div>
  );
}

// ─── PRICING CARD ─────────────────────────────────────────────────────────────
function PricingCard({ plan, index }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        position: "relative",
        background: plan.featured ? "#0f172a" : "#f8fafc",
        border: plan.featured ? "1px solid rgba(37, 99, 235,0.4)" : `1px solid ${hovered ? "rgba(37, 99, 235,0.3)" : "rgba(100, 116, 139,0.15)"}`,
        borderRadius: "2px",
        padding: "2.5rem 2rem",
        overflow: "hidden",
        cursor: "default",
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: plan.featured ? "0 20px 50px rgba(26,18,10,0.15)" : hovered ? "0 12px 32px rgba(100, 116, 139,0.1)" : "none",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: plan.featured ? "2px" : "1px", background: plan.featured ? "linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)" : "rgba(100, 116, 139,0.15)" }} />
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: plan.featured ? "#2563eb" : "#475569", marginBottom: "1.5rem", padding: "0.25rem 0.65rem", border: `1px solid ${plan.featured ? "rgba(37, 99, 235,0.35)" : "rgba(100, 116, 139,0.2)"}`, display: "inline-block", borderRadius: "1px", fontWeight: 500 }}>{plan.tag}</div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.45rem", fontWeight: 700, color: plan.featured ? "#E8D9C0" : "#0f172a", marginBottom: "0.3rem", letterSpacing: "-0.01em" }}>{plan.label}</div>
      <div style={{ height: "1px", background: plan.featured ? "rgba(37, 99, 235,0.2)" : "rgba(100, 116, 139,0.12)", margin: "1.25rem 0" }} />
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.6rem", color: plan.featured ? "rgba(232,217,192,0.4)" : "rgba(90,65,40,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 400 }}>Lifetime Fee</div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2.4rem", fontWeight: 700, color: "#2563eb", letterSpacing: "-0.02em", marginBottom: "1rem", lineHeight: 1 }}>{plan.amount}</div>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: plan.featured ? "rgba(232,217,192,0.4)" : "rgba(90,65,40,0.45)", lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{plan.note}</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Individual() {
  const [heroRef, heroVisible] = useInView(0.05);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc", color: "#0f172a" }}>
      <style>{`
        @keyframes faqOpen { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes accentShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes floatDot { 0%, 100% { transform: translateY(0); opacity: 0.3; } 50% { transform: translateY(-7px); opacity: 0.6; } }
        @keyframes rotateSlow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 1px; }
      `}</style>

      <Header />

      <main style={{ flex: 1 }}>

        {/* ── HERO ── */}
        <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 2rem", textAlign: "center", overflow: "hidden", background: "#f8fafc", borderBottom: "1px solid rgba(100, 116, 139,0.1)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(37, 99, 235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235,0.05) 1px, transparent 1px)`, backgroundSize: "72px 72px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "500px", background: "radial-gradient(ellipse, rgba(37, 99, 235,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "420px", height: "420px", border: "1px solid rgba(37, 99, 235,0.08)", borderRadius: "50%", animation: "rotateSlow 40s linear infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "600px", height: "600px", border: "1px dashed rgba(37, 99, 235,0.05)", borderRadius: "50%", animation: "rotateSlow 65s linear infinite reverse", pointerEvents: "none" }} />
          {[{ top: "18%", left: "12%", delay: "0s", dur: "3.2s" }, { top: "74%", left: "9%", delay: "0.8s", dur: "3.7s" }, { top: "20%", right: "10%", delay: "0.4s", dur: "4.1s" }, { top: "70%", right: "14%", delay: "1.2s", dur: "3.4s" }, { top: "46%", left: "4%", delay: "0.6s", dur: "5s" }].map((dot, i) => (
            <div key={i} style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: "#2563eb", animation: `floatDot ${dot.dur} ease-in-out infinite`, animationDelay: dot.delay, top: dot.top, left: dot.left, right: dot.right, pointerEvents: "none" }} />
          ))}

          <div style={{ position: "relative", zIndex: 1, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(28px)", transition: "opacity 1s ease, transform 1s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: "1px solid rgba(37, 99, 235,0.25)", padding: "0.45rem 1.3rem", marginBottom: "2.5rem", background: "rgba(37, 99, 235,0.05)", borderRadius: "1px" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2563eb", fontWeight: 500 }}>MathTech Thinking Foundation</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
            </div>

            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.025em", marginBottom: "0.5rem", color: "#0f172a" }}>
              Individual
              <br />
              <span style={{ fontStyle: "italic", background: "linear-gradient(120deg, #2563eb 0%, #60a5fa 40%, #1d4ed8 75%, #2563eb 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "goldShimmer 5s linear infinite" }}>Membership</span>
            </h1>

            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", color: "rgba(90,65,40,0.55)", maxWidth: "560px", margin: "1.5rem auto 3rem", lineHeight: 1.85, fontWeight: 300 }}>
              MTTF invites all professionals in Science, Technology, Engineering, and Mathematics to join our community — organizing conferences, workshops, training, internships, and faculty development programs.
            </p>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", border: "1px solid rgba(37, 99, 235,0.2)", background: "rgba(37, 99, 235,0.03)", maxWidth: "560px", margin: "0 auto", borderRadius: "2px" }}>
              {[["10", "Member Benefits"], ["₹2K", "India Fee"], ["$200", "Int'l Fee"]].map(([val, label], i) => (
                <div key={label} style={{ flex: "1 1 140px", padding: "1.25rem 1rem", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(37, 99, 235,0.15)" : "none" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#2563eb", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.58rem", color: "rgba(90,65,40,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.3rem", fontWeight: 400 }}>{label}</div>
                </div>
              ))}
            </div>

            <button style={{ marginTop: "2.5rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", background: "#2563eb", border: "none", padding: "0.9rem 2.4rem", cursor: "pointer", borderRadius: "1px", transition: "all 0.3s ease", fontWeight: 500 }}
              onMouseEnter={e => { e.target.style.background = "#1d4ed8"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "#2563eb"; e.target.style.transform = "translateY(0)"; }}
            >Contact Now</button>
          </div>
        </section>

        {/* ── INTRO STRIP ── */}
        <section style={{ borderTop: "1px solid rgba(100, 116, 139,0.1)", borderBottom: "1px solid rgba(100, 116, 139,0.1)", background: "rgba(37, 99, 235,0.03)", padding: "3.5rem 2rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontStyle: "italic", color: "rgba(90,65,40,0.6)", maxWidth: "820px", margin: "0 auto", lineHeight: 1.75, fontWeight: 400 }}>
            "MTTF Societies encompass fields like engineering, mathematics, science, and computer science — creating valuable opportunities for networking, knowledge-sharing, and collaborative problem-solving."
          </p>
        </section>

        {/* ── BENEFITS ── */}
        <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.025em", margin: 0, flexShrink: 0 }}>Benefits of Joining MTTF</h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(100, 116, 139,0.15)", minWidth: "30px" }} />
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.62rem", color: "rgba(37, 99, 235,0.6)", letterSpacing: "0.18em", textTransform: "uppercase", flexShrink: 0, fontWeight: 500 }}>10 Benefits</div>
          </div>

          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", color: "rgba(90,65,40,0.5)", maxWidth: "640px", lineHeight: 1.85, marginBottom: "3rem", fontWeight: 300 }}>
            As a member of MTTF, you gain access to a wide array of benefits designed to enhance your professional growth and networking opportunities. Some of the key member benefits include:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(100, 116, 139,0.1)", border: "1px solid rgba(100, 116, 139,0.1)", borderRadius: "2px", overflow: "hidden" }}>
            {benefits.map((benefit, i) => (
              <div key={benefit.id} style={{ background: "#f8fafc" }}>
                <BenefitCard benefit={benefit} index={i} />
              </div>
            ))}
          </div>

          {/* ── VIEW ALL MEMBERS — navigates to internal /members route ── */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              to="/members"
              style={{
                display: "inline-block",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#2563eb",
                background: "transparent",
                border: "1px solid rgba(37, 99, 235,0.4)",
                padding: "0.85rem 2.5rem",
                cursor: "pointer",
                borderRadius: "1px",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(37, 99, 235,0.08)"; e.currentTarget.style.borderColor = "rgba(37, 99, 235,0.7)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(37, 99, 235,0.4)"; }}
            >
              View All Members
            </Link>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section style={{ background: "#0f172a", borderTop: "1px solid rgba(37, 99, 235,0.15)", padding: "5rem 2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2563eb", marginBottom: "1rem", fontWeight: 500 }}>Lifetime Membership Fee</div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 700, color: "#E8D9C0", letterSpacing: "-0.025em", marginBottom: "1.25rem" }}>Simple, One-Time Investment</h2>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "rgba(232,217,192,0.4)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.85, fontWeight: 300 }}>
                New members registered on 1/1/2022 onwards are required to pay their membership fee within the current month after registration. A membership certificate will be sent after fee confirmation.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {[
                { label: "For India", amount: "₹2,000", tag: "Indian Members", note: "One-time lifetime fee", featured: false },
                { label: "International", amount: "$200", tag: "Global Members", note: "Invoice sent post registration", featured: true },
                { label: "Developing Nations", amount: "$100", tag: "Special Pricing", note: "Eritrea, Guinea, Madagascar, Nigeria, Ethiopia, Malawi, Sierra Leone, Liberia, Congo & Burundi", featured: false },
              ].map((plan, i) => (
                <PricingCard key={plan.label} plan={plan} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.025em", margin: 0, flexShrink: 0 }}>Frequently Asked</h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(100, 116, 139,0.15)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} number={i + 1} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}