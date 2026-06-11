import React, { useState, useEffect, useRef } from "react";
import OurProgramsMegaMenu from "./OurProgramsMegaMenu";
import ResearchIdeasMegaMenu from "./ResearchIdeasMegaMenu";
import AboutFoundationMegaMenu from "./AboutFoundationMegaMenu";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Our Programs", href: "/programs" },
  { name: "Research & Ideas", href: "/research" },
  { name: "About the Foundation", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (menuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menuKey);
  };

  const handleMenuClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 250);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <header style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* Fixed header bar */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ${
            scrolled
              ? "bg-[rgba(254,249,239,0.97)] backdrop-blur-xl shadow-[0_2px_32px_rgba(180,145,60,0.08)]"
              : "bg-[rgba(254,249,239,0.92)] backdrop-blur-[8px]"
          }`}
        >
          {/* Inner container */}
          <div className="max-w-[1320px] mx-auto px-10 flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 no-underline">

              {/* Logo mark box */}
              <div className="w-[38px] h-[38px] border border-[#b9943c] flex items-center justify-center relative">
                <span className="absolute inset-[3px] border border-[rgba(185,148,60,0.4)]" />
                <span
                  className="text-[18px] font-medium text-[#b9943c] tracking-[0.5px] relative z-10"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  M
                </span>
              </div>

              {/* Logo text */}
              <div className="flex flex-col">
                <span
                  className="text-[16px] font-semibold text-[#1a1610] tracking-[2.5px] uppercase leading-[1.1]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  MTTF
                </span>
                <span className="text-[9.5px] font-light text-[#8a7a5a] tracking-[1.8px] uppercase">
                  MathTech Thinking Foundation
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav>
              <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                {navItems.map((item) => {
                  const menuKey =
                    item.name === "Our Programs"
                      ? "programs"
                      : item.name === "Research & Ideas"
                      ? "research"
                      : item.name === "About the Foundation"
                      ? "about"
                      : null;

                  return (
                    <li
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => menuKey && handleMenuOpen(menuKey)}
                      onMouseLeave={() => menuKey && handleMenuClose()}
                    >
                      <Link
                        to={item.href}
                        className={`block px-4 py-2 text-[12.5px] font-normal tracking-[1.4px] uppercase no-underline transition-colors duration-[250ms] relative group ${
                          isActive(item.href)
                            ? "text-[#b9943c]"
                            : "text-[#4a3f2a] hover:text-[#b9943c]"
                        }`}
                      >
                        {item.name}
                        {/* Animated underline */}
                        <span
                          className={`absolute bottom-1 left-4 right-4 h-px bg-[#b9943c] transition-transform duration-300 origin-left ${
                            isActive(item.href)
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </Link>

                      {/* Mega Menus */}
                      {menuKey === "programs" && openMenu === "programs" && (
                        <div
                          className="absolute top-[calc(100%+16px)] left-0"
                          onMouseEnter={() => handleMenuOpen("programs")}
                          onMouseLeave={() => handleMenuClose()}
                        >
                          <OurProgramsMegaMenu />
                        </div>
                      )}

                      {menuKey === "research" && openMenu === "research" && (
                        <div
                          className="absolute top-[calc(100%+16px)] left-0"
                          onMouseEnter={() => handleMenuOpen("research")}
                          onMouseLeave={() => handleMenuClose()}
                        >
                          <ResearchIdeasMegaMenu />
                        </div>
                      )}

                      {menuKey === "about" && openMenu === "about" && (
                        <div
                          className="absolute top-[calc(100%+16px)] left-0"
                          onMouseEnter={() => handleMenuOpen("about")}
                          onMouseLeave={() => handleMenuClose()}
                        >
                          <AboutFoundationMegaMenu />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA Button */}
            <Link
              to="/auth"
              className="hidden md:flex items-center gap-[10px] px-6 py-[11px] bg-[#1a1610] text-[#f0e4c4] text-[11px] font-medium tracking-[1.8px] uppercase no-underline border border-transparent transition-colors duration-300 relative overflow-hidden group hover:border-[#b9943c] hover:text-white"
            >
              {/* Slide-in gold background */}
              <span className="absolute inset-0 bg-[#b9943c] -translate-x-full group-hover:translate-x-0 transition-transform duration-[350ms] z-0" />
              <span className="relative z-10">Join Membership</span>
              <svg className="relative z-10 w-[11px] h-[11px]" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 6H11M7 2L11 6L7 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

          </div>

          {/* Thin gold divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(185,148,60,0.35)] to-transparent" />
        </div>
      </header>
    </>
  );
}