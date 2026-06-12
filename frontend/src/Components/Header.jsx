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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      <header style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* Fixed header bar */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100/80"
              : "bg-white/90 backdrop-blur-[8px]"
          }`}
        >
          {/* Inner container */}
          <div className="max-w-[1320px] mx-auto px-10 flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 no-underline">

              {/* Logo mark box */}
              <div className="w-[38px] h-[38px] border border-blue-600 flex items-center justify-center relative rounded-md transition-all duration-300 hover:scale-105">
                <span className="absolute inset-[3px] border border-blue-600/20 rounded-sm" />
                <span
                  className="text-[18px] font-bold text-blue-600 tracking-[0.5px] relative z-10"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  M
                </span>
              </div>

              {/* Logo text */}
              <div className="flex flex-col">
                <span
                  className="text-[16px] font-extrabold text-slate-900 tracking-[2.5px] uppercase leading-[1.1]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  MTTF
                </span>
                <span className="text-[9.5px] font-medium text-slate-500 tracking-[1.8px] uppercase">
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
                        className={`block px-4 py-2 text-[12.5px] font-semibold tracking-[1.4px] uppercase no-underline transition-colors duration-[250ms] relative group ${
                          isActive(item.href)
                            ? "text-blue-600"
                            : "text-slate-600 hover:text-blue-600"
                        }`}
                      >
                        {item.name}
                        {/* Animated underline */}
                        <span
                          className={`absolute bottom-1 left-4 right-4 h-[2px] bg-blue-600 transition-transform duration-300 origin-left rounded-full ${
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
              className="hidden md:flex items-center gap-[10px] px-6 py-[11px] bg-blue-600 text-white text-[11px] font-semibold tracking-[1.8px] uppercase no-underline border border-transparent rounded-full shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group hover:bg-blue-700"
            >
              {/* Slide-in blue background */}
              <span className="absolute inset-0 bg-blue-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-[350ms] z-0" />
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

          {/* Thin blue/slate divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
        </div>
      </header>
    </>
  );
}