import React from 'react';
import { Clock, LogIn, LogOut, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

export default function AttendanceCard({ isPunchedIn, punchInTime, punchOutTime, onPunchIn, onPunchOut }) {
  const { isDark } = useTheme();
  const formatTime = (date) => new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={`rounded-2xl shadow-2xl p-6 border transition-all duration-300 ${isDark ? 'bg-white/10 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40' : 'bg-white/80 backdrop-blur-lg border-violet-200 hover:border-violet-300 shadow-violet-100/50'}`}>
      <div className="flex items-center gap-3 mb-6">
        <motion.div animate={isPunchedIn ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: isPunchedIn ? Infinity : 0 }} className={`p-2 rounded-xl ${isPunchedIn ? isDark ? 'bg-green-500/20' : 'bg-green-100' : isDark ? 'bg-gray-500/20' : 'bg-gray-100'}`}>
          {isPunchedIn ? <Clock className={isDark ? "text-green-400" : "text-green-600"} size={24} /> : <Clock className={isDark ? "text-gray-400" : "text-gray-600"} size={24} />}
        </motion.div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Attendance</h3>
      </div>
      {!isPunchedIn ? (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onPunchIn} className={`w-full py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600`}>
          <LogIn size={20} />Punch In
        </motion.button>
      ) : (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onPunchOut} className={`w-full py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600`}>
          <LogOut size={20} />Punch Out
        </motion.button>
      )}
      <div className={`mt-6 space-y-3 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Status:</span>
          <div className="flex items-center gap-2">
            <motion.div animate={isPunchedIn ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1.5, repeat: isPunchedIn ? Infinity : 0 }}>
              {isPunchedIn ? <CheckCircle2 className={isDark ? "text-green-400" : "text-green-600"} size={18} /> : <Circle className={isDark ? "text-gray-400" : "text-gray-500"} size={18} />}
            </motion.div>
            <span className={`font-bold ${isPunchedIn ? isDark ? 'text-green-400' : 'text-green-600' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {isPunchedIn ? 'Working' : 'Off Duty'}
            </span>
          </div>
        </div>
        {punchInTime && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`flex justify-between items-center rounded-lg p-2 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Punch In:</span>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{formatTime(punchInTime)}</span>
          </motion.div>
        )}
        {punchOutTime && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`flex justify-between items-center rounded-lg p-2 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Punch Out:</span>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{formatTime(punchOutTime)}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}