import React from 'react';
import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

export default function WorkingHoursCard({ workingHours }) {
  const { isDark } = useTheme();
  const formatHours = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={`rounded-2xl shadow-2xl p-6 border transition-all duration-300 ${isDark ? 'bg-white/10 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40' : 'bg-white/80 backdrop-blur-lg border-violet-200 hover:border-violet-300 shadow-violet-100/50'}`}>
      <div className="flex items-center gap-3 mb-6">
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className={`p-2 rounded-xl ${isDark ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
          <Timer className={isDark ? "text-violet-400" : "text-violet-600"} size={24} />
        </motion.div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Working Hours</h3>
      </div>
      <div className="flex items-center justify-center py-4">
        <div className="text-center">
          <div className="relative inline-block">
            <motion.div key={formatHours(workingHours)} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-6xl md:text-7xl font-black drop-shadow-lg ${isDark ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-amber-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 bg-clip-text text-transparent'}`}>
              {formatHours(workingHours)}
            </motion.div>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className={`absolute -inset-4 rounded-full blur-2xl -z-10 ${isDark ? 'bg-violet-500/20' : 'bg-violet-400/30'}`} />
          </div>
          <p className={`mt-4 font-semibold text-lg ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Today</p>
        </div>
      </div>
    </motion.div>
  );
}