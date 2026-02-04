import React, { useState, useEffect } from "react";
import { Clock, LogOut, Moon, Sun, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../App";

import AttendanceCard from "./AttendanceCard";
import WorkingHoursCard from "./WorkingHoursCard";
import ProductivityCard from "./ProductivityCard";
import WeeklyChart from "./WeeklyChart";
import TaskList from "./TaskList";

export default function Dashboard({ user, onLogout }) {
  const { isDark, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState(0);
  const [tasks, setTasks] = useState([]);

  const weeklyData = [
    { day: "Mon", hours: 8.5 },
    { day: "Tue", hours: 7.2 },
    { day: "Wed", hours: 8.0 },
    { day: "Thu", hours: 6.5 },
    { day: "Fri", hours: 8.2 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 }
  ];

  useEffect(() => {
    loadTodayData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isPunchedIn && punchInTime) {
        const elapsed = (new Date() - new Date(punchInTime)) / (1000 * 60 * 60);
        setWorkingHours(elapsed);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPunchedIn, punchInTime]);

  const loadTodayData = () => {
    const today = new Date().toISOString().split("T")[0];
    const userId = user?.id || "demo";
    const storedAttendance = localStorage.getItem(`attendance_${today}_${userId}`);
    if (storedAttendance) {
      const data = JSON.parse(storedAttendance);
      setPunchInTime(data.punchIn);
      setPunchOutTime(data.punchOut);
      setIsPunchedIn(data.isPunchedIn);
      if (data.punchIn && data.punchOut) {
        const hours = (new Date(data.punchOut) - new Date(data.punchIn)) / (1000 * 60 * 60);
        setWorkingHours(hours);
      }
    }
    const storedTasks = localStorage.getItem(`tasks_${today}_${userId}`);
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const saveAttendance = (data) => {
    const today = new Date().toISOString().split("T")[0];
    const userId = user?.id || "demo";
    localStorage.setItem(`attendance_${today}_${userId}`, JSON.stringify(data));
  };

  const saveTasks = (updatedTasks) => {
    const today = new Date().toISOString().split("T")[0];
    const userId = user?.id || "demo";
    localStorage.setItem(`tasks_${today}_${userId}`, JSON.stringify(updatedTasks));
  };

  const handlePunchIn = () => {
    const now = new Date();
    setPunchInTime(now.toISOString());
    setIsPunchedIn(true);
    saveAttendance({ punchIn: now.toISOString(), punchOut: null, isPunchedIn: true });
  };

  const handlePunchOut = () => {
    const now = new Date();
    setPunchOutTime(now.toISOString());
    setIsPunchedIn(false);
    const hours = (now - new Date(punchInTime)) / (1000 * 60 * 60);
    setWorkingHours(hours);
    saveAttendance({ punchIn: punchInTime, punchOut: now.toISOString(), isPunchedIn: false });
  };

  const handleAddTask = ({ title, description }) => {
    const task = { id: Date.now(), title, description, completed: false, createdAt: new Date().toISOString() };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalWeeklyHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-purple-950 via-violet-900 to-indigo-950' : 'bg-gradient-to-br from-violet-50 via-purple-50 to-amber-50'}`}>
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={`backdrop-blur-xl border-b shadow-2xl sticky top-0 z-40 transition-colors duration-300 ${isDark ? 'bg-white/5 border-amber-500/20' : 'bg-white/60 border-violet-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className={`p-3 rounded-2xl shadow-lg ${isDark ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-amber-600' : 'bg-gradient-to-br from-violet-500 via-purple-500 to-amber-500'}`}>
              <Crown className="text-white" size={28} />
            </motion.div>
            <div>
              <h1 className={`text-3xl font-extrabold ${isDark ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-amber-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 bg-clip-text text-transparent'}`}>
                Attendance Tracker
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme} className={`p-3 rounded-xl backdrop-blur-xl shadow-lg transition-all duration-300 ${isDark ? 'bg-white/10 text-amber-300 border border-amber-500/30 hover:bg-white/20' : 'bg-white text-violet-600 border border-violet-200 hover:bg-violet-50'}`}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onLogout} className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700">
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl p-8 shadow-2xl relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-amber-600' : 'bg-gradient-to-br from-violet-500 via-purple-500 to-amber-500'}`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <motion.div animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="relative flex justify-between items-center">
            <div className="flex-1">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm opacity-90 font-medium mb-2 text-white">Current Time</motion.p>
              <motion.h2 key={currentTime.toLocaleTimeString()} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-black mb-3 drop-shadow-lg text-white">
                {currentTime.toLocaleTimeString()}
              </motion.h2>
              <p className="text-lg opacity-90 font-medium text-white">
                {currentTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
              <Clock size={100} className="opacity-20 text-white" />
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/70 text-xs font-medium mb-1">Status</p>
              <p className="text-white font-bold text-lg">{isPunchedIn ? '🟢 Active' : '⚫ Off Duty'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/70 text-xs font-medium mb-1">Weekly Hours</p>
              <p className="text-white font-bold text-lg">{totalWeeklyHours.toFixed(1)}h</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 col-span-2 md:col-span-1">
              <p className="text-white/70 text-xs font-medium mb-1">Tasks</p>
              <p className="text-white font-bold text-lg">{completedTasks}/{tasks.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AttendanceCard isPunchedIn={isPunchedIn} punchInTime={punchInTime} punchOutTime={punchOutTime} onPunchIn={handlePunchIn} onPunchOut={handlePunchOut} />
          <WorkingHoursCard workingHours={workingHours} />
          <ProductivityCard completedTasks={completedTasks} totalTasks={tasks.length} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <WeeklyChart weeklyData={weeklyData} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <TaskList tasks={tasks} onAddTask={handleAddTask} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
        </motion.div>
      </div>
    </div>
  );
}