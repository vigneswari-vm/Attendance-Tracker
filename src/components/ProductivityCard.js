import React from 'react';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

export default function ProductivityCard({ completedTasks, totalTasks }) {
  const { isDark } = useTheme();
  const productivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (productivity / 100) * circumference;

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={`rounded-2xl shadow-2xl p-6 border transition-all duration-300 ${isDark ? 'bg-white/10 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40' : 'bg-white/80 backdrop-blur-lg border-violet-200 hover:border-violet-300 shadow-violet-100/50'}`}>
      <div className="flex items-center gap-3 mb-6">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className={`p-2 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
          <Target className={isDark ? "text-purple-400" : "text-purple-600"} size={24} />
        </motion.div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Productivity</h3>
      </div>
      <div className="flex items-center justify-center py-2">
        <div className="relative w-44 h-44">
          <svg className="transform -rotate-90 w-44 h-44">
            <circle cx="88" cy="88" r="70" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(100,100,100,0.1)"} strokeWidth="12" fill="none" />
            <motion.circle cx="88" cy="88" r="70" stroke="url(#gradient)" strokeWidth="12" fill="none" strokeDasharray={circumference} strokeDashoffset={circumference} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} />
                <stop offset="50%" stopColor={isDark ? "#a855f7" : "#9333ea"} />
                <stop offset="100%" stopColor={isDark ? "#f59e0b" : "#d97706"} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.span key={productivity} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className={`text-5xl font-black ${isDark ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-amber-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 bg-clip-text text-transparent'}`}>
                {productivity}%
              </motion.span>
            </div>
          </div>
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className={`absolute inset-0 rounded-full blur-2xl -z-10 ${isDark ? 'bg-purple-500/20' : 'bg-purple-400/30'}`} />
        </div>
      </div>
      <p className={`text-center text-sm font-semibold mt-4 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
        {completedTasks} of {totalTasks} tasks completed
      </p>
    </motion.div>
  );
}