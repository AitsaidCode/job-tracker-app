import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, TrendingUp, XCircle } from 'lucide-react';

const Analytics = ({ applications }) => {
  const total = applications.length;
  const interviews = applications.filter(a => a.status === 'Interview').length;
  const offers = applications.filter(a => a.status === 'Offer').length;
  const rejections = applications.filter(a => a.status === 'Rejected').length;

  const stats = [
    { label: 'Total Scripts', value: total, icon: Target, color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-500/20' },
    { label: 'Interviews', value: interviews, icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border border-indigo-500/20' },
    { label: 'Offers', value: offers, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-500/20' },
    { label: 'Rejections', value: rejections, icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10 border border-rose-500/20' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-20">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition-colors"
          >
            <div className={`p-3.5 rounded-xl shadow-lg ${stat.bg} ${stat.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Analytics;
