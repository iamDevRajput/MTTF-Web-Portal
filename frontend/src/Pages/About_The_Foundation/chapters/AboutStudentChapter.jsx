import React, { useState, useEffect, useRef } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

// Data Arrays for Benefits and Responsibilities
const memberBenefits = [
  { id: "01", title: "Explore Career Opportunities", accent: "#C8A96E" },
  { id: "02", title: "Make Contacts That Will Last a Lifetime", accent: "#7EB8C9" },
  { id: "03", title: "Develop Leadership Skills", accent: "#A89BC8" },
  { id: "04", title: "Networking with Professionals, Speakers & Mentors", accent: "#7EC9A8" },
  { id: "05", title: "Support Within the Student & Local Communities", accent: "#C97E7E" },
];

const responsibilities = [
  { id: "01", text: "The Institution must have at least 150 student regular members of MTTF.", accent: "#C8A96E" },
  { id: "02", text: "Student Regular membership free for the session 2022–23.", accent: "#7EB8C9" },
  { id: "03", text: "The Institution must have two or more MTTF-lifetime members.", accent: "#A89BC8" },
  { id: "04", text: "Membership is open to all departments of the academic Institution/University.", accent: "#7EC9A8" },
  { id: "05", text: "Institute will appoint at least one coordinator for the smooth functioning of the chapter.", accent: "#C97E7E" },
  { id: "06", text: "Student chapter consists of a President, Vice-President, Secretary, Treasurer and committee members.", accent: "#C8A96E" },
  { id: "07", text: "The chapter President must submit an annual report every year.", accent: "#7EB8C9" },
  { id: "08", text: "MTTF Student Chapters provide unique opportunities to learn and develop leadership skills, research development, networking, mentoring and bonding.", accent: "#A89BC8" },
  { id: "09", text: "Conference/Seminar hall or Auditorium must be available for chapter activities.", accent: "#7EC9A8" },
  { id: "10", text: "Guest / Keynote Speaker arrangements to be facilitated by the institution.", accent: "#C97E7E" },
  { id: "11", text: "Accommodation & Hospitality to be provided for visiting speakers and delegates.", accent: "#C8A96E" },
  { id: "12", text: "Internal committee members must be formed from the institution.", accent: "#7EB8C9" },
];

/**
 * Custom hook for triggering animations when elements enter the viewport.
 */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/**
 * Individual Benefit Row Component
 */
function BenefitRow({ item, index }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, background 0.3s ease, border 0.3s ease`,
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1.25rem 1.5rem",
        border: `1px solid ${hovered ? item.accent + "50" : "rgba(255,255,255,0.05)"}`,
        background: hovered ? `${item.accent}08` : "#171A27",
        borderRadius: "2px",
        cursor: "default",
      }}
    >
      <div 
        style={{ 
          width: 8, height: 8, borderRadius: "50%", background: item.accent, flexShrink: 0,
          boxShadow: hovered ? `0 0 10px ${item.accent}80` : "none",
          transition: "box-shadow 0.3s" 
        }} 
      />
      <span style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.58rem", color: item.accent, letterSpacing: "0.15em", flexShrink: 0, opacity: 0.6 }}>
        {item.id}
      </span>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: hovered ? "#F0EDE8" : "rgba(240,237,232,0.75)", transition: "color 0.3s" }}>
        {item.title}
      </span>
    </div>
  );
}

/**
 * Individual Responsibility Card Component
 */
function ResponsibilityCard({ item, index }) {
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
        transition: `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s, background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease`,
        background: hovered ? "#1C1F2E" : "#171A27",
        border: `1px solid ${hovered ? item.accent + "55" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "2px",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.35)` : "none",
        height: "100%",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hovered ? "3px" : "2px", background: item.accent, transition: "width 0.3s" }} />
      <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.56rem", color: item.accent, letterSpacing: "0.15em", flexShrink: 0, paddingTop: "0.15rem", opacity: 0.6 }}>
          {item.id}
        </span>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "rgba(240,237,232,0.5)", lineHeight: 1.8, margin: 0 }}>
          {item.text}
        </p>
      </div>
    </div>
  );
}

/**
 * Main Page Component
 */
export default function AboutStudentChapter() {
  const [heroRef, heroVisible] = useInView(0.05);

  useEffect(() => {
    // Inject Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F111C]">
      {/* Global CSS for Animations and Scrollbar */}
      <style>{`
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes rotateSlow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0F111C; }
        ::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 2px; }
      `}</style>

      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 2rem",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Background Visuals */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)`, backgroundSize: "72px 72px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "500px", background: "radial-gradient(ellipse, rgba(200,169,110,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "440px", height: "440px", border: "1px solid rgba(200,169,110,0.05)", borderRadius: "50%", animation: "rotateSlow 50s linear infinite", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 1, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s ease, transform 1s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: "1px solid rgba(200,169,110,0.25)", padding: "0.4rem 1.25rem", marginBottom: "2.5rem", background: "rgba(200,169,110,0.04)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C8A96E" }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8A96E" }}>MathTech Thinking Foundation</span>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C8A96E" }} />
            </div>

            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem", color: "#F0EDE8" }}>
              MTTF Student <br />
              <span style={{ fontStyle: "italic", background: "linear-gradient(120deg, #C8A96E 0%, #E8C98E 40%, #C8A96E 80%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>Chapter</span>
            </h1>

            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.05rem", color: "rgba(240,237,232,0.45)", maxWidth: "580px", margin: "1.5rem auto 3rem", lineHeight: 1.8 }}>
              A scientific association of students with a minimum of 150 members from a particular institute or university—providing unique opportunities for learning and leadership.
            </p>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", border: "1px solid rgba(200,169,110,0.15)", background: "rgba(200,169,110,0.03)", maxWidth: "580px", margin: "0 auto" }}>
              {[["150+", "Min. Members"], ["05", "Member Benefits"], ["12", "Responsibilities"]].map(([val, label], i) => (
                <div key={label} style={{ flex: "1 1 140px", padding: "1.25rem 1rem", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(200,169,110,0.15)" : "none" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2rem", fontWeight: 600, color: "#C8A96E" }}>{val}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.55rem", color: "rgba(240,237,232,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.2rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTRO QUOTE */}
        <div style={{ borderTop: "1px solid rgba(200,169,110,0.12)", borderBottom: "1px solid rgba(200,169,110,0.12)", background: "rgba(200,169,110,0.03)", padding: "3rem 2rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontStyle: "italic", color: "rgba(240,237,232,0.55)", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
            "To establish a student chapter, the hosting institute, university, or college must submit a petition to our head office — promoting education and research in STEM fields."
          </p>
        </div>

        {/* INFO GRID */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "6rem 2rem 3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            <div style={{ background: "linear-gradient(160deg, #1C2240 0%, #1A2038 100%)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "2px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #C8A96E, #E8C98E, #C8A96E)" }} />
              <div style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.58rem", color: "#C8A96E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", opacity: 0.7 }}>Context</div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "rgba(240,237,232,0.5)", lineHeight: 1.85, margin: 0 }}>
                The MTTF Student Chapter is a scientific association of students providing unique opportunities for developing leadership skills, management, research development, and mentoring.
              </p>
            </div>

            <div style={{ background: "#171A27", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "2px", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.58rem", color: "#7EB8C9", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", opacity: 0.7 }}>Focus Areas</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.8rem", fontWeight: 600, color: "#F0EDE8", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>Science, Technology, <br /> <span style={{ color: "#7EB8C9", fontStyle: "italic" }}>Engineering</span> & Math</h3>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["Science", "Tech", "Research", "Math"].map(s => <span key={s} style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.58rem", color: "#7EB8C9", border: `1px solid rgba(126,184,201,0.25)`, padding: "0.25rem 0.65rem", background: `rgba(126,184,201,0.05)` }}>{s}</span>)}
              </div>
            </div>

            <div style={{ background: "#171A27", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "2px", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.58rem", color: "#7EC9A8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", opacity: 0.7 }}>Support</div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "rgba(240,237,232,0.45)", lineHeight: 1.85, margin: 0 }}>Our team is ready to assist your institution in establishing an MTTF Student Chapter.</p>
              </div>
              <a href="mailto:contactus@mttf.in" style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.72rem", color: "#7EC9A8", textDecoration: "none", letterSpacing: "0.05em", borderBottom: "1px solid rgba(126,201,168,0.3)", paddingBottom: "2px", display: "inline-block" }}>contactus@mttf.in</a>
            </div>
          </div>
        </section>

        {/* MEMBER BENEFITS LIST */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600, color: "#F0EDE8", letterSpacing: "-0.02em", margin: 0 }}>Member Benefits</h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(200,169,110,0.15)", minWidth: "20px" }} />
            <div style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.6rem", color: "rgba(200,169,110,0.5)", letterSpacing: "0.15em" }}>05 REWARDS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {memberBenefits.map((item, i) => <BenefitRow key={item.id} item={item} index={i} />)}
          </div>
        </section>

        {/* INSTITUTION RESPONSIBILITIES GRID */}
        <section style={{ background: "#0B0D18", borderTop: "1px solid rgba(200,169,110,0.1)", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "0.75rem", opacity: 0.7 }}>Requirements</div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600, color: "#F0EDE8", letterSpacing: "-0.02em", margin: 0 }}>Institution Responsibilities</h2>
                <div style={{ flex: 1, height: "1px", background: "rgba(200,169,110,0.15)", minWidth: "20px" }} />
                <div style={{ fontFamily: "'Plus Jakarta Sans', monospace", fontSize: "0.6rem", color: "rgba(200,169,110,0.5)", letterSpacing: "0.15em" }}>12 TERMS</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.04)" }}>
              {responsibilities.map((item, i) => (
                <div key={item.id} style={{ background: "#0B0D18", padding: "1px" }}>
                  <ResponsibilityCard item={item} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section style={{ borderTop: "1px solid rgba(200,169,110,0.12)", borderBottom: "1px solid rgba(200,169,110,0.12)", background: "rgba(200,169,110,0.03)", padding: "4rem 2rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)", fontWeight: 600, color: "#F0EDE8", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>Ready to Establish Your Chapter?</h2>
          <a href="mailto:contactus@mttf.in" className="inline-block border border-[#C8A96E]/40 px-10 py-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all duration-300">
            Contact Us Today
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}