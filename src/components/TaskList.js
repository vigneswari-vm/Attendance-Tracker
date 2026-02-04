import React, { useState } from 'react';
import { Plus, CheckCircle, XCircle, Trash2, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

export default function TaskList({ tasks, onAddTask, onToggleTask, onDeleteTask }) {
  const { isDark } = useTheme();
  const [newTask, setNewTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask({ title: newTask, description: taskDescription });
    setNewTask('');
    setTaskDescription('');
    setIsFormVisible(false);
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={`rounded-2xl shadow-2xl p-6 md:p-8 border transition-all duration-300 ${isDark ? 'bg-white/10 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40' : 'bg-white/80 backdrop-blur-lg border-violet-200 hover:border-violet-300 shadow-violet-100/50'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }} className={`p-2 rounded-xl ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
            <ListTodo className={isDark ? "text-amber-400" : "text-amber-600"} size={20} />
          </motion.div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Daily Tasks</h3>
        </div>
        {!isFormVisible && (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsFormVisible(true)} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-semibold shadow-lg ${isDark ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-amber-700' : 'bg-gradient-to-r from-violet-500 via-purple-500 to-amber-500 text-white hover:from-violet-600 hover:via-purple-600 hover:to-amber-600'}`}>
            <Plus size={18} />Add Task
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {isFormVisible && (
          <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit} className="space-y-4 mb-6 overflow-hidden">
            <input type="text" placeholder="Task title" value={newTask} onChange={(e) => setNewTask(e.target.value)} autoFocus className={`w-full px-4 py-3 rounded-xl focus:ring-2 transition-all duration-200 ${isDark ? 'bg-white/10 backdrop-blur-sm border border-amber-500/30 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-white/50' : 'bg-white border border-violet-200 focus:ring-violet-500 focus:border-violet-500 text-slate-900 placeholder-slate-400'}`} />
            <input type="text" placeholder="Task description (optional)" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className={`w-full px-4 py-3 rounded-xl focus:ring-2 transition-all duration-200 ${isDark ? 'bg-white/10 backdrop-blur-sm border border-amber-500/30 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-white/50' : 'bg-white border border-violet-200 focus:ring-violet-500 focus:border-violet-500 text-slate-900 placeholder-slate-400'}`} />
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg ${isDark ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-amber-700' : 'bg-gradient-to-r from-violet-500 via-purple-500 to-amber-500 text-white hover:from-violet-600 hover:via-purple-600 hover:to-amber-600'}`}>
                <Plus size={20} />Add Task
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => { setIsFormVisible(false); setNewTask(''); setTaskDescription(''); }} className={`px-5 py-3 rounded-xl transition-all duration-200 font-semibold ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'}`}>
                Cancel
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {tasks.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className={`inline-block p-4 rounded-full mb-4 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
              <CheckCircle className={isDark ? "text-white/30" : "text-slate-400"} size={40} />
            </motion.div>
            <p className={`font-medium ${isDark ? 'text-white/60' : 'text-slate-500'}`}>No tasks yet. Add your first task!</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.01 }} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${task.completed ? isDark ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' : isDark ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4 flex-1">
                  <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onToggleTask(task.id)} className="flex-shrink-0" type="button">
                    {task.completed ? <CheckCircle className={isDark ? "text-green-400" : "text-green-600"} size={28} /> : <XCircle className={isDark ? "text-white/40 hover:text-white/60" : "text-slate-400 hover:text-slate-600"} size={28} />}
                  </motion.button>
                  <div className="flex-1">
                    <p className={`font-semibold text-lg ${task.completed ? isDark ? 'line-through text-white/50' : 'line-through text-slate-500' : isDark ? 'text-white' : 'text-slate-800'}`}>{task.title}</p>
                    {task.description && <p className={`text-sm mt-1 ${task.completed ? isDark ? 'text-white/40' : 'text-slate-400' : isDark ? 'text-white/70' : 'text-slate-600'}`}>{task.description}</p>}
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.2, rotate: 15 }} whileTap={{ scale: 0.9 }} onClick={() => onDeleteTask(task.id)} className={`transition-all duration-200 ml-3 p-2 rounded-lg ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20' : 'text-red-500 hover:text-red-600 hover:bg-red-50'}`} type="button">
                  <Trash2 size={20} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
