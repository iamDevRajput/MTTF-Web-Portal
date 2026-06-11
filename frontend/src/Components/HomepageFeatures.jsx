import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ── Asset imports — filenames matched exactly to your file tree ──
import brainLogo from '../assets/home/brain-logo.png';
import mttfLogo from '../assets/home/mttf-logo.webp';
import communityImg from '../assets/home/community.jpg';
import g1Img from '../assets/home/g1.webp';
import g2Img from '../assets/home/g2.webp';
import g3Img from '../assets/home/g3.webp';

import adityaCollege from '../assets/home/aditya-college.webp';
import appwars from '../assets/home/appwars.webp';
import cpuLogo from '../assets/home/CPU.webp';
import ctUniversity from '../assets/home/ct-university.webp';
import dasmeshCollege from '../assets/home/dasmesh-girls-college.webp';
import pinaki from '../assets/home/pinaki.webp';
import poornima from '../assets/home/poornima.png';
import puLogo from '../assets/home/PU.webp';
import shardhaUniversity from '../assets/home/shardhaUniversityUzbekistan.webp';
import synaptic from '../assets/home/synaptic.webp';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --gold-pale: rgba(201,168,76,0.10);
    --cream: #FAF8F3;
    --beige: #F2EDE4;
    --charcoal: #1C1A17;
    --mid: #6B6560;
    --divider: rgba(201,168,76,0.2);
  }

  .lux-section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .lux-section-eyebrow-line {
    display: block;
    width: 32px;
    height: 1px;
    background: var(--gold);
    opacity: 0.6;
  }

  .lux-serif-heading {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    line-height: 1.1;
    color: var(--charcoal);
    letter-spacing: -0.01em;
  }

  .lux-serif-heading em {
    font-style: italic;
    color: var(--gold);
  }

  .lux-body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.75;
  }

  .lux-gold-rule {
    width: 48px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
    margin: 20px 0;
  }

  /* ── Welcome ── */
  .lux-welcome {
    background: var(--cream);
    padding: 112px 24px;
    position: relative;
    overflow: hidden;
  }

  .lux-welcome::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold) 40%, var(--gold) 60%, transparent);
    opacity: 0.5;
  }

  .lux-welcome-deco {
    position: absolute;
    top: 40px;
    right: -20px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 320px;
    font-weight: 600;
    color: rgba(201,168,76,0.045);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.05em;
  }

  .lux-welcome-inner {
    max-width: 1320px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .lux-welcome-heading { font-size: clamp(52px, 6vw, 80px); }

  .lux-welcome-card {
    border: 1px solid var(--divider);
    background: #fff;
    padding: 32px 36px;
    margin: 28px 0;
    position: relative;
  }

  .lux-welcome-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: var(--gold);
  }

  .lux-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: var(--charcoal);
    color: var(--gold-light);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    text-decoration: none;
  }

  .lux-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-101%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  .lux-btn-primary:hover::before { transform: translateX(0); }
  .lux-btn-primary:hover { color: var(--charcoal); }
  .lux-btn-primary span, .lux-btn-primary svg { position: relative; z-index: 1; }
  .lux-btn-primary svg { transition: transform 0.3s ease; }
  .lux-btn-primary:hover svg { transform: translateX(3px); }

  .lux-welcome-panel {
    border: 1px solid var(--divider);
    background: #fff;
    padding: 56px 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    position: relative;
    min-height: 420px;
    overflow: hidden;
  }

  .lux-welcome-panel::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 80px; height: 80px;
    border-right: 2px solid var(--gold);
    border-bottom: 2px solid var(--gold);
    opacity: 0.25;
  }

  .lux-welcome-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 80px; height: 80px;
    border-left: 2px solid var(--gold);
    border-top: 2px solid var(--gold);
    opacity: 0.25;
  }

  .lux-welcome-community-img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    display: block;
    border: 1px solid var(--divider);
  }

  .lux-icon-ring {
    width: 120px; height: 120px;
    border: 1px solid var(--divider);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: var(--cream);
    overflow: hidden;
  }

  .lux-icon-ring::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid var(--gold);
    opacity: 0.3;
  }

  .lux-icon-ring img {
    width: 72px; height: 72px;
    object-fit: contain;
    position: relative;
    z-index: 1;
  }

  .lux-badge-pill {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid var(--divider);
    padding: 6px 16px;
    background: var(--cream);
  }

  /* ── Services ── */
  .lux-services {
    background: #fff;
    padding: 112px 24px;
  }

  .lux-services-inner { max-width: 1320px; margin: 0 auto; }

  .lux-services-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 72px;
    gap: 40px;
  }

  .lux-services-heading { font-size: clamp(42px, 5vw, 64px); }

  .lux-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--divider);
    border: 1px solid var(--divider);
  }

  .lux-service-card {
    background: #fff;
    padding: 40px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    transition: background 0.3s ease;
    cursor: default;
    overflow: hidden;
  }

  .lux-service-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  }

  .lux-service-card:hover { background: var(--cream); }
  .lux-service-card:hover::after { transform: scaleX(1); }

  .lux-service-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 400;
    color: var(--gold);
    letter-spacing: 0.1em;
    opacity: 0.8;
  }

  .lux-service-icon {
    width: 64px; height: 64px;
    border: 1px solid var(--divider);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    transition: border-color 0.3s ease, background 0.3s ease;
    overflow: hidden;
  }

  .lux-service-card:hover .lux-service-icon {
    border-color: var(--gold);
    background: var(--gold-pale);
  }

  .lux-service-icon svg { width: 32px; height: 32px; }

  .lux-service-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 500;
    color: var(--charcoal);
    letter-spacing: 0.04em;
  }

  .lux-service-subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .lux-service-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: var(--mid);
    line-height: 1.7;
  }

  .lux-service-more {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-top: auto;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .lux-service-card:hover .lux-service-more { opacity: 1; transform: translateY(0); }

  /* ── Partners ── */
  .lux-partners {
    background: var(--charcoal);
    padding: 112px 24px;
    position: relative;
    overflow: hidden;
  }

  .lux-partners::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold) 40%, var(--gold) 60%, transparent);
    opacity: 0.3;
  }

  .lux-partners-inner { max-width: 1320px; margin: 0 auto; }

  .lux-partners-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
    margin-bottom: 80px;
  }

  .lux-partners-heading {
    font-size: clamp(40px, 4.5vw, 60px);
    color: var(--cream);
  }

  .lux-partners-heading em { color: var(--gold-light); }

  .lux-partners-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: rgba(250,248,243,0.65);
    line-height: 1.8;
    margin-bottom: 32px;
  }

  .lux-btn-outline-gold {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border: 1px solid rgba(201,168,76,0.4);
    color: var(--gold-light);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .lux-btn-outline-gold:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--charcoal);
  }

  .lux-partners-right-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(250,248,243,0.35);
    margin-bottom: 28px;
  }

  .lux-partner-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.1);
  }

  .lux-partner-item {
    background: rgba(250,248,243,0.03);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 12px;
    transition: background 0.25s ease;
    cursor: pointer;
    gap: 10px;
  }

  .lux-partner-item:hover { background: rgba(201,168,76,0.08); }

  .lux-partner-photo {
    width: 64px; height: 64px;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.3);
    object-fit: contain;
    background: rgba(255,255,255,0.9);
    display: block;
    padding: 4px;
    transition: border-color 0.25s ease;
  }

  .lux-partner-item:hover .lux-partner-photo { border-color: var(--gold); }

  .lux-partner-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(250,248,243,0.5);
    text-align: center;
    transition: color 0.25s ease;
  }

  .lux-partner-item:hover .lux-partner-name { color: var(--gold-light); }

  .lux-brand-strip {
    border-top: 1px solid rgba(201,168,76,0.12);
    padding-top: 64px;
  }

  .lux-brand-strip-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(250,248,243,0.3);
    margin-bottom: 32px;
    text-align: center;
  }

  .lux-brand-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1px;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.08);
  }

  .lux-brand-item {
    background: transparent;
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    color: rgba(250,248,243,0.3);
    letter-spacing: 0.06em;
    transition: color 0.25s ease, background 0.25s ease;
    cursor: pointer;
    text-align: center;
  }

  .lux-brand-item:hover {
    color: var(--gold-light);
    background: rgba(201,168,76,0.05);
  }

  .lux-brand-item img {
    width: 52px; height: 52px;
    object-fit: contain;
    opacity: 0.5;
    transition: opacity 0.25s ease;
    background: rgba(255,255,255,0.9);
    border-radius: 4px;
    padding: 4px;
    display: block;
  }

  .lux-brand-item:hover img { opacity: 1; }

  /* ── Glimpses ── */
  .lux-glimpses {
    background: var(--cream);
    padding: 112px 24px;
  }

  .lux-glimpses-inner { max-width: 1320px; margin: 0 auto; }

  .lux-glimpses-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 56px;
    gap: 32px;
  }

  .lux-glimpses-heading { font-size: clamp(40px, 5vw, 60px); }

  .lux-glimpse-slide {
    border: 1px solid var(--divider);
    overflow: hidden;
    position: relative;
  }

  .lux-glimpse-track {
    display: flex;
    transition: transform 0.5s ease;
  }

  .lux-glimpse-frame {
    min-width: 100%;
    height: 480px;
    position: relative;
    overflow: hidden;
  }

  .lux-glimpse-frame img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .lux-glimpse-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(28,26,23,0.70) 0%, transparent 60%);
    z-index: 1;
  }

  .lux-glimpse-label {
    position: absolute;
    bottom: 40px;
    left: 48px;
    z-index: 2;
  }

  .lux-glimpse-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 400;
    color: #fff;
    letter-spacing: 0.02em;
    display: block;
    margin-bottom: 8px;
  }

  .lux-glimpse-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold-light);
  }

  .lux-slider-nav { display: flex; align-items: center; gap: 8px; }

  .lux-arrow-btn {
    width: 48px; height: 48px;
    border: 1px solid var(--divider);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--charcoal);
    transition: all 0.25s ease;
  }

  .lux-arrow-btn:hover {
    background: var(--charcoal);
    border-color: var(--charcoal);
    color: var(--gold-light);
  }

  .lux-glimpse-indicators {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
  }

  .lux-glimpse-dot {
    height: 1px;
    background: rgba(28,26,23,0.2);
    transition: all 0.4s ease;
    cursor: pointer;
    width: 20px;
    border: none;
    padding: 0;
  }

  .lux-glimpse-dot.active { background: var(--gold); width: 40px; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .lux-services-grid { grid-template-columns: repeat(2, 1fr); }
    .lux-brand-grid { grid-template-columns: repeat(4, 1fr); }
  }

  @media (max-width: 768px) {
    .lux-welcome-inner { grid-template-columns: 1fr; gap: 48px; }
    .lux-services-header { flex-direction: column; align-items: flex-start; }
    .lux-services-grid { grid-template-columns: 1fr 1fr; }
    .lux-partners-top { grid-template-columns: 1fr; gap: 48px; }
    .lux-partner-grid { grid-template-columns: repeat(3, 1fr); }
    .lux-brand-grid { grid-template-columns: repeat(3, 1fr); }
    .lux-glimpses-header { flex-direction: column; align-items: flex-start; }
  }

  @media (max-width: 480px) {
    .lux-services-grid { grid-template-columns: 1fr; }
    .lux-brand-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

/* ── Inline SVG icons ── */
const AiIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" stroke="#5067AA" strokeWidth="1.5"/>
    <path d="M14 20c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6" stroke="#5067AA" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 17l-3-3M17 23l-3 3M23 17l3-3M23 23l3 3" stroke="#5067AA" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="2.5" fill="#5067AA"/>
  </svg>
);

const DataAnalyticsIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="27" width="6" height="6" rx="1" fill="#27AE60"/>
    <rect x="17" y="20" width="6" height="13" rx="1" fill="#27AE60"/>
    <rect x="27" y="13" width="6" height="20" rx="1" fill="#27AE60"/>
    <path d="M8 24l9-8 10 4 8-10" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="24" r="2" fill="#27AE60"/>
    <circle cx="17" cy="16" r="2" fill="#27AE60"/>
    <circle cx="27" cy="20" r="2" fill="#27AE60"/>
    <circle cx="35" cy="10" r="2" fill="#27AE60"/>
  </svg>
);

const BioinformaticsIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8c0 6 12 6 12 12S14 26 14 32" stroke="#8E44AD" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26 8c0 6-12 6-12 12s12 6 12 12" stroke="#8E44AD" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="14" x2="28" y2="14" stroke="#8E44AD" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="20" x2="30" y2="20" stroke="#8E44AD" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="26" x2="28" y2="26" stroke="#8E44AD" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BusinessIntelligenceIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="14" height="18" rx="2" stroke="#F39C12" strokeWidth="1.5"/>
    <path d="M14 12V9a2 2 0 012-2h8a2 2 0 012 2v3" stroke="#F39C12" strokeWidth="1.5"/>
    <path d="M22 22h8M22 26h6" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="27" cy="28" r="5" stroke="#F39C12" strokeWidth="1.5"/>
    <path d="M30.5 31.5l3 3" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="18" x2="18" y2="18" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="22" x2="18" y2="22" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const QuantumIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="3" fill="#8E44AD"/>
    <ellipse cx="20" cy="20" rx="13" ry="5" stroke="#8E44AD" strokeWidth="1.5"/>
    <ellipse cx="20" cy="20" rx="13" ry="5" stroke="#8E44AD" strokeWidth="1.5" transform="rotate(60 20 20)"/>
    <ellipse cx="20" cy="20" rx="13" ry="5" stroke="#8E44AD" strokeWidth="1.5" transform="rotate(120 20 20)"/>
    <circle cx="33" cy="20" r="2" fill="#8E44AD"/>
    <circle cx="26.5" cy="8.9" r="2" fill="#8E44AD"/>
    <circle cx="13.5" cy="8.9" r="2" fill="#8E44AD"/>
  </svg>
);

const ComputingIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="9" width="26" height="18" rx="2" stroke="#27AE60" strokeWidth="1.5"/>
    <line x1="7" y1="31" x2="33" y2="31" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="20" y1="27" x2="20" y2="31" stroke="#27AE60" strokeWidth="1.5"/>
    <path d="M12 16l3 3-3 3M18 22h5" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MTTFHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    { id: 1, icon: <AiIcon />, title: "Artificial Intelligence", subtitle: "AI & ML Solutions", description: "Explore AI and ML solutions, leveraging advanced algorithms to drive innovation and intelligent decision-making.", number: "01" },
    { id: 2, icon: <DataAnalyticsIcon />, title: "Data Analytics", subtitle: "Data-Driven Insights", description: "Utilize data-driven insights to make informed decisions, optimize processes, and improve business strategies.", number: "02" },
    { id: 3, icon: <BioinformaticsIcon />, title: "Bioinformatics", subtitle: "Biological Data Science", description: "Integrate biological data with computational techniques to uncover insights in healthcare, genomics, and life sciences.", number: "03" },
    { id: 4, icon: <BusinessIntelligenceIcon />, title: "Business Intelligence", subtitle: "BI Tools & Insights", description: "Enhance decision-making with BI tools, transforming raw data into actionable insights for better business strategies.", number: "04" },
    { id: 5, icon: <QuantumIcon />, title: "Quantum Computing", subtitle: "Quantum Technologies", description: "Unlock the power of quantum mechanics to solve complex problems faster and more efficiently with emerging quantum technologies.", number: "05" },
    { id: 6, icon: <ComputingIcon />, title: "Computing", subtitle: "Core Tech Skills", description: "Dive into core computing principles, from algorithms to system architecture, empowering future-ready tech skills.", number: "06" },
  ];

  const partners = [
    { name: "Aditya College",        img: adityaCollege },
    { name: "AppWars",               img: appwars },
    { name: "CPU",                   img: cpuLogo },
    { name: "CT University",         img: ctUniversity },
    { name: "Dasmesh Girls College", img: dasmeshCollege },
    { name: "Pinaki",                img: pinaki },
    { name: "Poornima",              img: poornima },
    { name: "Punjab University",     img: puLogo },
    { name: "Shardha University",    img: shardhaUniversity },
    { name: "Synaptic",              img: synaptic },
  ];

  const glimpses = [
    { id: 1, title: "Community Gathering", sub: "Annual Meetup 2024", img: g1Img },
    { id: 2, title: "Workshop 2024",       sub: "Skill Development",  img: g2Img },
    { id: 3, title: "Tech Meetup",         sub: "Innovation Hub",     img: g3Img },
  ];

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % glimpses.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + glimpses.length) % glimpses.length);

  return (
    <>
      <style>{styles}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Welcome ── */}
        <section className="lux-welcome">
          <div className="lux-welcome-deco">M</div>
          <div className="lux-welcome-inner">

            <div>
              <div className="lux-section-eyebrow">
                <span className="lux-section-eyebrow-line" />
                Welcome
                <span className="lux-section-eyebrow-line" />
              </div>
              <h1 className="lux-serif-heading lux-welcome-heading">
                Welcome to <br /><em>MTTF</em>
              </h1>
              <div className="lux-gold-rule" />
              <div className="lux-welcome-card">
                <p className="lux-body" style={{ fontSize: "15px" }}>
                  Join our vibrant community dedicated to fostering growth, innovation, and collaboration.
                  We bring together passionate individuals to create meaningful impact through technology and shared learning experiences.
                </p>
              </div>
              <button className="lux-btn-primary">
                <span>Explore More</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5H12M7.5 2L12 6.5L7.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Right panel */}
            <div className="lux-welcome-panel">
              <div className="lux-icon-ring">
                <img src={mttfLogo} alt="MTTF Logo" />
              </div>
              <img
                src={communityImg}
                alt="MTTF Community"
                className="lux-welcome-community-img"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div style={{ textAlign: "center" }}>
                <p className="lux-serif-heading" style={{ fontSize: "26px", marginBottom: "12px" }}>
                  MathTech Thinking Foundation
                </p>
                <div className="lux-gold-rule" style={{ margin: "0 auto 16px" }} />
              </div>
              <span className="lux-badge-pill">1000+ Active Members</span>
            </div>

          </div>
        </section>

        {/* ── Services ── */}
        <section className="lux-services">
          <div className="lux-services-inner">
            <div className="lux-services-header">
              <div>
                <div className="lux-section-eyebrow">
                  <span className="lux-section-eyebrow-line" />
                  What We Offer
                </div>
                <h2 className="lux-serif-heading lux-services-heading">
                  Our <em>Services</em>
                </h2>
              </div>
              <p className="lux-body" style={{ maxWidth: "360px", fontSize: "14px", textAlign: "right" }}>
                Discover our innovative services designed to boost technology and career growth
              </p>
            </div>
            <div className="lux-services-grid">
              {services.map(service => (
                <div key={service.id} className="lux-service-card">
                  <span className="lux-service-num">{service.number}</span>
                  <div className="lux-service-icon">{service.icon}</div>
                  <div>
                    <p className="lux-service-title">{service.title}</p>
                    <p className="lux-service-subtitle" style={{ marginTop: "6px" }}>{service.subtitle}</p>
                  </div>
                  <p className="lux-service-desc">{service.description}</p>
                  <button className="lux-service-more">
                    More Info
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M1 5.5H10M6.5 2L10 5.5L6.5 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partners ── */}
        <section className="lux-partners">
          <div className="lux-partners-inner">
            <div className="lux-partners-top">

              <div>
                <div className="lux-section-eyebrow" style={{ color: "rgba(232,201,106,0.7)" }}>
                  <span className="lux-section-eyebrow-line" />
                  Team · Customer · Community
                </div>
                <h2 className="lux-serif-heading lux-partners-heading">
                  We Work With the <br /><em>Best Partners</em>
                </h2>
                <div className="lux-gold-rule" style={{ opacity: 0.3 }} />
                <p className="lux-partners-text">
                  While we are at the forefront and specialize in design-build, we constantly collaborate with a number of delivery methods and are confident we can find the process that will best help you meet your goals.
                </p>
                <button className="lux-btn-outline-gold">
                  Read More
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 5.5H10M6.5 2L10 5.5L6.5 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div>
                <p className="lux-partners-right-label">Our Business Partners</p>
                <div className="lux-partner-grid">
                  {partners.map((p, i) => (
                    <div key={i} className="lux-partner-item">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="lux-partner-photo"
                        onError={e => { e.target.style.opacity = '0.2'; }}
                      />
                      <span className="lux-partner-name">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Brand strip */}
            <div className="lux-brand-strip">
              <p className="lux-brand-strip-label">Brands We've Collaborated With</p>
              <div className="lux-brand-grid">
                {partners.map((p, i) => (
                  <div key={i} className="lux-brand-item">
                    <img
                      src={p.img}
                      alt={p.name}
                      onError={e => { e.target.style.opacity = '0.1'; }}
                    />
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Glimpses ── */}
        <section className="lux-glimpses">
          <div className="lux-glimpses-inner">
            <div className="lux-glimpses-header">
              <div>
                <div className="lux-section-eyebrow">
                  <span className="lux-section-eyebrow-line" />
                  Gallery
                </div>
                <h2 className="lux-serif-heading lux-glimpses-heading">
                  <em>Glimpses</em>
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                <p className="lux-body" style={{ fontSize: "13px" }}>
                  Moments from our events and activities
                </p>
                <div className="lux-slider-nav">
                  <button className="lux-arrow-btn" onClick={prevSlide}>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="lux-arrow-btn" onClick={nextSlide}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="lux-glimpse-slide">
              <div
                className="lux-glimpse-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {glimpses.map(glimpse => (
                  <div key={glimpse.id} className="lux-glimpse-frame">
                    <img
                      src={glimpse.img}
                      alt={glimpse.title}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="lux-glimpse-overlay" />
                    <div className="lux-glimpse-label">
                      <span className="lux-glimpse-title">{glimpse.title}</span>
                      <span className="lux-glimpse-sub">{glimpse.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lux-glimpse-indicators">
              {glimpses.map((_, i) => (
                <button
                  key={i}
                  className={`lux-glimpse-dot${currentSlide === i ? " active" : ""}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default MTTFHomepage;