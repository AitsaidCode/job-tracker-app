import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // A simple lock for personal privacy. 
    if (password === 'tracker2026' || password === 'hicham2026') {
      localStorage.setItem('job_tracker_auth', 'true');
      onLogin();
    } else {
      setError('Incorrect master password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, type: "spring" }}
        className="glass-panel max-w-sm w-full p-8 rounded-3xl relative overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full"></div>
        
        <div className="flex justify-center mb-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-md group hover:border-indigo-400/50 transition-colors">
            <Lock className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>
        
        <h2 className="text-2xl font-extrabold text-center text-white mb-2 relative z-10 tracking-tight">Private Pipeline</h2>
        <p className="text-center text-gray-400 text-sm mb-8 relative z-10">Enter your master password to unlock your job applications.</p>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              className="glass-input w-full text-center tracking-widest text-xl py-3.5 focus:border-indigo-500/50"
              autoFocus
            />
          </div>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-400 text-sm text-center font-medium bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
              {error}
            </motion.p>
          )}
          <button type="submit" className="glass-button w-full py-4 flex items-center justify-center gap-2 text-base shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-5 h-5" /> Unlock Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
