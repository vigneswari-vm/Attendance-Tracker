import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Moon, Sun, Crown } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useTheme } from '../App';
import { motion } from 'framer-motion';

export default function Login({ onLogin }) {
  const { isDark, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone
            }
          }
        });
        if (error) throw error;
        setError('Success! Check your email for verification link!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) setError(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-purple-950 via-violet-900 to-indigo-950' 
        : 'bg-gradient-to-br from-violet-50 via-purple-50 to-amber-50'
    }`}>
      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-2xl backdrop-blur-xl shadow-lg transition-all duration-300 ${
          isDark 
            ? 'bg-white/10 text-amber-300 border border-amber-500/30 hover:bg-white/20' 
            : 'bg-white/80 text-violet-600 border border-violet-200 hover:bg-white'
        }`}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${
            isDark ? 'bg-violet-500' : 'bg-violet-300'
          }`}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${
            isDark ? 'bg-amber-500' : 'bg-amber-300'
          }`}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${
            isDark ? 'bg-purple-500' : 'bg-purple-300'
          }`}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md relative z-10 transition-all duration-300 ${
          isDark 
            ? 'bg-white/10 backdrop-blur-xl border border-amber-500/30' 
            : 'bg-white/90 backdrop-blur-xl border border-violet-200 shadow-violet-200/50'
        }`}
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className={`p-4 rounded-2xl shadow-lg ${
              isDark 
                ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-amber-600' 
                : 'bg-gradient-to-br from-violet-500 via-purple-500 to-amber-500'
            }`}>
              <Crown className="text-white" size={32} />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl font-extrabold mb-3 ${
              isDark 
                ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-amber-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 bg-clip-text text-transparent'
            }`}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-lg ${isDark ? 'text-white/80' : 'text-slate-600'}`}
          >
            {isLogin ? 'Sign in to track your attendance' : 'Sign up to get started'}
          </motion.p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl text-sm shadow-lg ${
              error.includes('Success') 
                ? isDark 
                  ? 'bg-green-500/20 border border-green-400/50 text-green-100' 
                  : 'bg-green-50 border border-green-300 text-green-800'
                : isDark 
                  ? 'bg-red-500/20 border border-red-400/50 text-red-100' 
                  : 'bg-red-50 border border-red-300 text-red-800'
            }`}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleEmailPasswordAuth} className="space-y-5 mb-6">
          {!isLogin && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className={`block text-sm font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-700'
                }`}>Full Name</label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-amber-400/60' : 'text-violet-400'
                  }`} size={20} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 transition-all duration-200 ${
                      isDark 
                        ? 'bg-white/10 border border-amber-500/30 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-white/50' 
                        : 'bg-white border border-violet-200 focus:ring-violet-500 focus:border-violet-500 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className={`block text-sm font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-700'
                }`}>Phone Number</label>
                <div className="relative">
                  <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-amber-400/60' : 'text-violet-400'
                  }`} size={20} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 transition-all duration-200 ${
                      isDark 
                        ? 'bg-white/10 border border-amber-500/30 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-white/50' 
                        : 'bg-white border border-violet-200 focus:ring-violet-500 focus:border-violet-500 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="+1234567890"
                  />
                </div>
              </motion.div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isLogin ? 0.1 : 0.3 }}
          >
            <label className={`block text-sm font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-slate-700'
            }`}>Email</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-amber-400/60' : 'text-violet-400'
              }`} size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 transition-all duration-200 ${
                  isDark 
                    ? 'bg-white/10 border border-amber-500/30 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-white/50' 
                    : 'bg-white border border-violet-200 focus:ring-violet-500 focus:border-violet-500 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="you@example.com"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isLogin ? 0.2 : 0.4 }}
          >
            <label className={`block text-sm font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-slate-700'
            }`}>Password</label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-amber-400/60' : 'text-violet-400'
              }`} size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 transition-all duration-200 ${
                  isDark 
                    ? 'bg-white/10 border border-amber-500/30 focus:ring-amber-400 focus:border-amber-400 text-white placeholder-white/50' 
                    : 'bg-white border border-violet-200 focus:ring-violet-500 focus:border-violet-500 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="••••••••"
                required
              />
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-xl hover:shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-amber-700' 
                : 'bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-amber-700'
            } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? 'border-white/20' : 'border-slate-200'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 font-medium ${
              isDark ? 'bg-transparent text-white/70' : 'bg-transparent text-slate-500'
            }`}>Or continue with</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          type="button"
          className={`w-full py-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
            isDark 
              ? 'bg-white/10 border-2 border-amber-500/30 text-white hover:bg-white/20' 
              : 'bg-white border-2 border-violet-200 text-slate-700 hover:bg-violet-50'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </motion.button>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-center text-sm mt-8 ${
            isDark ? 'text-white/80' : 'text-slate-600'
          }`}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className={`font-bold underline underline-offset-2 transition-colors ${
              isDark 
                ? 'text-amber-400 hover:text-amber-300' 
                : 'text-violet-600 hover:text-violet-700'
            }`}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}