import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Mail, Key, Loader2, UserPlus, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/api';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password 
        });
        if (error) throw error;
        
        if (data?.user?.identities?.length === 0) {
           setError('This email is already registered. Please sign in or use a different email.');
        } else {
           setMessage('Successfully registered! If you did not log in automatically, please check your inbox to verify your email.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, type: "spring" }}
        className="glass-panel max-w-md w-full p-8 sm:p-10 rounded-[2rem] relative z-10 shadow-2xl border border-white/10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md group hover:border-indigo-400/50 transition-colors">
            {isSignUp ? <UserPlus className="w-10 h-10 text-indigo-400" /> : <Lock className="w-10 h-10 text-indigo-400" />}
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-center text-indigo-200/60 text-sm mb-8 font-medium">
          {isSignUp ? 'Sign up to build your secure job pipeline.' : 'Sign in to access your secure job pipeline.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); setMessage(''); }}
              placeholder="Email address"
              className="glass-input w-full pl-12 pr-4 py-3.5 focus:border-indigo-500/50 text-white"
              required
            />
          </div>

          <div className="relative group">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); setMessage(''); }}
              placeholder="Password (minimum 6 characters)"
              className="glass-input w-full pl-12 pr-4 py-3.5 focus:border-indigo-500/50 text-white"
              required
              minLength={6}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-rose-400 text-sm text-center font-medium bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
                {error}
              </motion.p>
            )}
            {message && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-emerald-400 text-sm text-center font-medium bg-emerald-500/10 py-2 rounded-lg border border-emerald-500/20">
                {message}
              </motion.p>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={loading}
            className="glass-button w-full py-4 mt-2 flex items-center justify-center gap-2 text-base shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />)}
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
            className="text-indigo-300/80 hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
