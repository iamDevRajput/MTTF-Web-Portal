// frontend/src/Pages/OurPrograms/Awards/AwardCard.jsx
import React, { useState } from "react";
import {
  SparklesIcon,
  AcademicCapIcon,
  BeakerIcon,
  GlobeAltIcon,
  UsersIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  innovation: SparklesIcon,
  academic:   AcademicCapIcon,
  research:   BeakerIcon,
  global:     GlobeAltIcon,
  community:  UsersIcon,
  technology: CodeBracketIcon,
};

function AwardCard({ award }) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[award.icon] || SparklesIcon;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "2px",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(139,112,72,0.15)"}`,
        background: hovered ? "rgba(201,168,76,0.03)" : "#FBF6EC",
        padding: "0",                          // ← removed top padding; image handles it
        cursor: "default",
        transition: "border-color 0.35s ease, background 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(139,112,72,0.1)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: hovered ? "3px" : "2px",
        background: "linear-gradient(180deg, #C9A84C 0%, #E8C97A 100%)",
        transition: "width 0.3s ease",
        zIndex: 2,
      }} />

      {/* ── IMAGE ── */}
      {award.image && (
        <div style={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <img
            src={award.image}
            alt={award.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        </div>
      )}

      {/* Everything below the image gets the original padding */}
      <div style={{ padding: "2rem 2rem 2rem 2.25rem", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Ghost icon bg */}
        <div style={{
          position: "absolute",
          right: "1.25rem", bottom: "1.25rem",
          opacity: hovered ? 0.06 : 0.04,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}>
          <Icon style={{ width: "5rem", height: "5rem", color: "#C9A84C" }} />
        </div>

        {/* Header row */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}>
          {/* Icon box */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px", height: "44px",
            flexShrink: 0,
            background: hovered ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)",
            border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.18)"}`,
            borderRadius: "2px",
            transition: "background 0.3s ease, border-color 0.3s ease",
            color: "#C9A84C",
          }}>
            <Icon style={{ width: "1.1rem", height: "1.1rem" }} />
          </div>

          {/* Year + Status badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {award.year && (
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8B7048",
                padding: "0.2rem 0.6rem",
                border: "1px solid rgba(139,112,72,0.2)",
                borderRadius: "1px",
                fontWeight: 400,
                background: "rgba(139,112,72,0.04)",
              }}>
                {award.year}
              </span>
            )}
            {award.status && (
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.2rem 0.6rem",
                borderRadius: "1px",
                fontWeight: 500,
                border: award.status === "Open"
                  ? "1px solid rgba(134,183,120,0.5)"
                  : "1px solid rgba(139,112,72,0.2)",
                background: award.status === "Open"
                  ? "rgba(134,183,120,0.08)"
                  : "rgba(139,112,72,0.04)",
                color: award.status === "Open" ? "#6B9E5E" : "#8B7048",
              }}>
                {award.status}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.08rem",
          fontWeight: 700,
          color: "#1A120A",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          margin: "0 0 0.6rem",
        }}>
          {award.title}
        </h3>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "rgba(201,168,76,0.18)",
          width: hovered ? "100%" : "40%",
          transition: "width 0.45s ease",
          marginBottom: "0.85rem",
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.82rem",
          color: "#7A6040",
          lineHeight: 1.8,
          margin: "0 0 1rem",
          fontWeight: 300,
          flex: 1,
        }}>
          {award.description}
        </p>

        {/* Focus areas */}
        {award.focus && award.focus.length > 0 && (
          <ul style={{
            margin: "0 0 1.25rem",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
          }}>
            {award.focus.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span style={{
                  width: 3, height: 3,
                  borderRadius: "50%",
                  background: "#C9A84C",
                  flexShrink: 0,
                  marginTop: "0.45rem",
                }} />
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.78rem",
                  color: "#8B7048",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer — audience */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          paddingTop: "0.9rem",
          borderTop: "1px solid rgba(139,112,72,0.1)",
          marginTop: "auto",
        }}>
          <span style={{
            display: "inline-block",
            width: 5, height: 5,
            borderRadius: "50%",
            background: "#C9A84C",
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.72rem",
            color: "#8B7048",
            letterSpacing: "0.04em",
            fontWeight: 400,
          }}>
            {award.audience}
          </span>
        </div>

      </div>{/* end padded wrapper */}
    </article>
  );
}

export default AwardCard;