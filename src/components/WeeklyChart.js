import React from 'react';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

export default function WeeklyChart({ weeklyData }) {
  const { isDark } = useTheme();
  const maxHours = Math.max(...weeklyData.map(d => d.hours), 10);

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={`rounded-2xl shadow-2xl p-6 md:p-8 border transition-all duration-300 ${isDark ? 'bg-white/10 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40' : 'bg-white/80 backdrop-blur-lg border-violet-200 hover:border-violet-300 shadow-violet-100/50'}`}>
      <div className="flex items-center gap-3 mb-8">
        <motion.div whileHover={{ scale: 1.1, rotate: 15 }} className={`p-2 rounded-xl ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}>
          <BarChart3 className={isDark ? "text-indigo-400" : "text-indigo-600"} size={24} />
        </motion.div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Weekly Hours</h3>
      </div>
      <div className="flex items-end justify-between gap-3 h-64">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-3 group">
            <div className={`w-full rounded-t-xl relative h-full flex items-end ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} style={{ minHeight: '200px' }}>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(day.hours / maxHours) * 100}%` }} transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }} whileHover={{ scale: 1.05 }} className={`w-full rounded-t-xl relative transition-all duration-300 shadow-lg ${isDark ? 'bg-gradient-to-t from-violet-600 via-purple-600 to-amber-600 hover:from-violet-500 hover:via-purple-500 hover:to-amber-500' : 'bg-gradient-to-t from-violet-500 via-purple-500 to-amber-500 hover:from-violet-600 hover:via-purple-600 hover:to-amber-600'}`} style={{ minHeight: day.hours > 0 ? '20px' : '0' }}>
                {day.hours > 0 && (
                  <>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg whitespace-nowrap ${isDark ? 'bg-white text-purple-700' : 'bg-slate-900 text-white'}`}>
                      {day.hours}h
                    </motion.div>
                    <div className="text-white text-sm font-bold text-center pt-2">{day.hours.toFixed(1)}</div>
                  </>
                )}
              </motion.div>
            </div>
            <span className={`text-sm font-semibold transition-colors ${isDark ? 'text-white/80 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>{day.day}</span>
          </div>
        ))}
      </div>
      <div className={`mt-6 pt-4 border-t flex justify-between ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div>
          <p className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-slate-500'}`}>Total Week</p>
          <p className={`text-2xl font-bold ${isDark ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-amber-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 bg-clip-text text-transparent'}`}>
            {weeklyData.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
          </p>
        </div>
        <div>
          <p className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-slate-500'}`}>Average/Day</p>
          <p className={`text-2xl font-bold ${isDark ? 'bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent'}`}>
            {(weeklyData.reduce((sum, day) => sum + day.hours, 0) / 7).toFixed(1)}h
          </p>
        </div>
      </div>
    </motion.div>
  );
}
