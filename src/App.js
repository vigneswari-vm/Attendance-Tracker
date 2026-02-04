import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

// Theme Context
export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        <div className="text-center">
          <div className="relative">
            <div className={`w-20 h-20 border-4 rounded-full animate-spin mx-auto mb-4 ${
              isDark 
                ? 'border-purple-500/30 border-t-purple-500' 
                : 'border-purple-300 border-t-purple-600'
            }`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-12 h-12 border-4 rounded-full animate-spin ${
                isDark 
                  ? 'border-pink-500/30 border-t-pink-500' 
                  : 'border-pink-300 border-t-pink-600'
              }`} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
          </div>
          <p className={`text-xl font-semibold mt-6 ${
            isDark ? 'text-white/80' : 'text-slate-700'
          }`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </ThemeContext.Provider>
  );
}

export default App;
