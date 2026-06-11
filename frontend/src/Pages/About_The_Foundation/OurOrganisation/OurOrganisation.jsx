import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Advisors from './Advisors';
import Leaders from './Leaders';
import Executives from './Executives';
import Mentors from './Mentors';
import TechnicalTeam from './TechnicalTeam';

const OurOrganisation = ({ onBack }) => {
  const [activePage, setActivePage] = useState(null);

  const pages = [
    {
      id: 'advisors',
      title: 'Advisors',
      description: 'Strategic guidance from industry experts',
      icon: '🎯',
      color: 'from-amber-500 to-orange-500',
      component: Advisors
    },
    {
      id: 'leaders',
      title: 'Leaders',
      description: 'Visionary leadership steering our mission',
      icon: '👑',
      color: 'from-blue-500 to-indigo-500',
      component: Leaders
    },
    {
      id: 'executives',
      title: 'Executives',
      description: 'Executive team driving operational excellence',
      icon: '💼',
      color: 'from-purple-500 to-pink-500',
      component: Executives
    },
    {
      id: 'mentors',
      title: 'Mentors',
      description: 'Dedicated mentors nurturing future talent',
      icon: '🌟',
      color: 'from-green-500 to-emerald-500',
      component: Mentors
    },
    {
      id: 'technical',
      title: 'Technical Team',
      description: 'Tech innovators building digital solutions',
      icon: '⚙️',
      color: 'from-cyan-500 to-teal-500',
      component: TechnicalTeam
    }
  ];

  if (activePage) {
    const PageComponent = pages.find(p => p.id === activePage)?.component;
    return PageComponent ? (
      <PageComponent onBack={() => setActivePage(null)} />
    ) : null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-6"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="mb-8 flex items-center space-x-2 text-blue-300 hover:text-blue-200 backdrop-blur-lg bg-white/10 px-6 py-3 rounded-full border border-white/20 transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-semibold">Back to Foundation</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Organisation</span>
        </h2>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Meet the exceptional individuals who make our mission possible
        </p>
      </motion.div>

      {/* Grid of Pages */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setActivePage(page.id)}
            className="cursor-pointer group relative"
          >
            {/* Card */}
            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 h-full overflow-hidden shadow-xl">
              {/* Animated Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                whileHover={{ scale: 1.1 }}
              />

              {/* Icon */}
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {page.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                {page.title}
              </h3>

              {/* Description */}
              <p className="text-blue-200 leading-relaxed mb-4">
                {page.description}
              </p>

              {/* View Button */}
              <motion.div
                className="flex items-center text-blue-300 font-semibold mt-auto"
                whileHover={{ x: 5 }}
              >
                View Team
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurOrganisation;
