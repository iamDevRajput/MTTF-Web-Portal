import React from "react";
import { Link } from "react-router-dom";
import { Users, Building2, Award, GraduationCap } from "lucide-react";

export default function AboutFoundationMegaMenu() {
  return (
    <div className="absolute left-1/2 top-full mt-6 w-[900px] -translate-x-1/2 z-50">
      <div
        className="relative rounded-3xl backdrop-blur-2xl 
        bg-gradient-to-br from-white/10 via-white/5 to-white/10 
        p-8 shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Top Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400" />

        <div className="grid grid-cols-4 gap-10 text-sm">

          {/* OUR ORGANISATION */}
          <div>
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <Users size={22} />
              <h3 className="font-semibold uppercase tracking-wider">
                Our Organisation
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about/organisation/advisors"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Advisors
                </Link>
              </li>
              <li>
                <Link
                  to="/about/organisation/leaders"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Leaders
                </Link>
              </li>
              <li>
                <Link
                  to="/about/organisation/executives"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Executives
                </Link>
              </li>
              <li>
                <Link
                  to="/about/organisation/mentors"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Mentors
                </Link>
              </li>
              <li>
                <Link
                  to="/about/organisation/technical-team"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Technical Team
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT MTTF */}
          <div>
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <Building2 size={22} />
              <h3 className="font-semibold uppercase tracking-wider">
                About MTTF
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* MATHTECH CIRCLE */}
          <div>
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <Award size={22} />
              <h3 className="font-semibold uppercase tracking-wider">
                MathTech Circle
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about/mathtech-circle/individual"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Individual Membership
                </Link>
              </li>
              <li>
                <Link
                  to="/about/mathtech-circle/institutional"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Institutional Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* CHAPTERS */}
          <div>
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <GraduationCap size={22} />
              <h3 className="font-semibold uppercase tracking-wider">
                Chapters
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about/chapters/student"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Student Chapter
                </Link>
              </li>
              <li>
                <Link
                  to="/about/chapters/about"
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  About Chapter
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}