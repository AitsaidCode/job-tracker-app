import React from 'react';

const CVBadge = ({ type }) => {
  const badgeConfig = {
    'CV_DEV': { 
      bg: 'bg-indigo-500/10', text: 'text-indigo-300', border: 'border-indigo-500/30', shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.2)]', label: 'Developer (DEV)' 
    },
    'CV_AMOA': { 
      bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]', label: 'Business Analyst (AMOA)' 
    },
    'CV_RUN': { 
      bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30', shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]', label: 'IT Ops (RUN)' 
    },
    'CV_MEDTECH': { 
      bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30', shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]', label: 'Healthcare (MEDTECH)' 
    }
  };

  const config = badgeConfig[type] || { 
    bg: 'bg-gray-500/10', text: 'text-gray-300', border: 'border-gray-500/30', shadow: 'shadow-none', label: type 
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-default ${config.bg} ${config.text} ${config.border} ${config.shadow}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${config.text.replace('text-', 'bg-')}`}></span>
      {config.label}
    </span>
  );
};

export default CVBadge;
