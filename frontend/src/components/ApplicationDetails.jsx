import React from 'react';
import { X, Building2, Briefcase, Calendar, Phone, FileText, Link as LinkIcon, DollarSign, Download, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import CVBadge from './CVBadge';

const ApplicationDetails = ({ isOpen, onClose, app, onEdit, onDownloadCV }) => {
  if (!app) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, transition: { delay: 0.1 } }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={onClose} 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-2xl glass-panel rounded-2xl overflow-hidden shadow-2xl my-auto"
          >
             {/* Header */}
             <div className="px-6 py-6 border-b border-white/10 flex justify-between items-start bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                <div className="flex gap-5 items-start relative z-10">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-xl backdrop-blur-md">
                      <Building2 className="w-8 h-8 text-indigo-400" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">{app.company}</h2>
                      <p className="text-indigo-300 font-medium mt-1 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> {app.position}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                         <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-md border backdrop-blur-md shadow-lg ${
                            app.status === 'Applied' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                            app.status === 'Interview' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                            app.status === 'Offer' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}>
                            {app.status}
                          </span>
                          <CVBadge type={app.cvType} />
                      </div>
                   </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative z-10">
                  <X className="h-5 w-5" />
                </button>
             </div>

             {/* Content */}
             <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="glass-card p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Applied Date</p>
                      <p className="text-white font-medium">{format(new Date(app.appliedAt), 'MMMM do, yyyy')}</p>
                   </div>
                   <div className="glass-card p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Expected Salary</p>
                      <p className="text-emerald-400 font-bold">{app.salary || 'Not specified'}</p>
                   </div>
                   <div className="glass-card p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Contact Details</p>
                      <p className="text-white font-medium">{app.contact || 'Not specified'}</p>
                   </div>
                   <div className="glass-card p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> Job Posting</p>
                      {app.jobUrl ? (
                        <a href={app.jobUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 font-medium truncate block transition-colors">
                          View Original Listing ↗
                        </a>
                      ) : (
                        <p className="text-gray-500 italic">No link saved</p>
                      )}
                   </div>
                </div>

                {/* Notes */}
                <div>
                   <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Application Notes</h4>
                   <div className="glass-card p-5 rounded-xl border border-white/5 bg-black/20 min-h-[100px]">
                      {app.notes ? (
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">{app.notes}</p>
                      ) : (
                        <p className="text-gray-600 italic text-sm text-center py-4">No notes recorded for this application.</p>
                      )}
                   </div>
                </div>

                {/* Attachments */}
                <div>
                   <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Attachments & Documents</h4>
                   <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center justify-between bg-indigo-500/5">
                      <div className="flex items-center gap-3">
                         <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                           <FileText className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="font-bold text-white text-sm">{app.cvFile ? app.cvFile.name : 'No CV Attached'}</p>
                            <p className="text-gray-400 text-xs">Used {app.cvType}</p>
                         </div>
                      </div>
                      {app.cvFile && (
                        <button 
                          onClick={(e) => onDownloadCV(app.cvFile, e)}
                          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/25 z-10 relative"
                        >
                          <Download className="w-4 h-4" /> Download
                        </button>
                      )}
                   </div>
                </div>
             </div>

             {/* Footer Actions */}
             <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-end gap-3">
               <button onClick={onClose} className="px-5 py-2 glass-button-secondary text-sm">
                 Close View
               </button>
               <button onClick={() => { onClose(); onEdit(app); }} className="px-5 py-2 glass-button flex items-center gap-2 text-sm z-10 relative">
                 <Edit2 className="w-4 h-4" /> Edit Application
               </button>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationDetails;
