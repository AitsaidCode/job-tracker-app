import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, Trash2, Edit2, Phone, Calendar, Briefcase, Building2, Flame, Download } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import api from './services/api';
import CVBadge from './components/CVBadge';
import ApplicationForm from './components/ApplicationForm';

function App() {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cvFilter, setCvFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get('/applications');
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingApp) {
        await api.put(`/applications/${editingApp._id}`, formData);
      } else {
        await api.post('/applications', formData);
      }
      setIsModalOpen(false);
      setEditingApp(null);
      fetchApplications();
    } catch (error) {
      console.error('Failed to save application', error);
      alert('Error saving application. If the file is too large, it might have been rejected.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await api.delete(`/applications/${id}`);
        setApplications(apps => apps.filter(app => app._id !== id));
      } catch (error) {
        console.error('Failed to delete application', error);
      }
    }
  };

  const handleDownloadCV = (cvFile, e) => {
    e.stopPropagation();
    if (!cvFile || !cvFile.data) return;
    
    const link = document.createElement('a');
    link.href = cvFile.data;
    link.download = cvFile.name || 'cv-document';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) || app.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCv = cvFilter ? app.cvType === cvFilter : true;
      const matchesStatus = statusFilter ? app.status === statusFilter : true;
      return matchesSearch && matchesCv && matchesStatus;
    });
  }, [applications, searchTerm, cvFilter, statusFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto selection:bg-indigo-500/30">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 relative z-10">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-100 to-gray-400 tracking-tight leading-tight">
                Job Tracker
              </h1>
              <p className="text-indigo-200/60 mt-1 text-sm sm:text-base font-medium">Manage your applications with precision.</p>
            </div>
          </div>
        </div>
        <button onClick={() => { setEditingApp(null); setIsModalOpen(true); }} className="glass-button px-6 py-3.5 flex items-center gap-2 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="tracking-wide">New Application</span>
        </button>
      </motion.div>

      {/* Constraints & Search */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-panel rounded-2xl p-4 mb-10 flex flex-col lg:flex-row gap-4 relative z-20">
        
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search company or role..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-transparent border-none text-white placeholder-gray-500 pl-12 pr-4 py-2.5 focus:ring-0 focus:outline-none text-base sm:text-lg"
          />
        </div>

        <div className="w-full lg:w-px h-px lg:h-10 bg-white/10 my-auto hidden lg:block"></div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <select value={cvFilter} onChange={(e) => setCvFilter(e.target.value)} className="glass-input w-full sm:w-56 appearance-none py-3 pl-10 pr-8 cursor-pointer">
              <option value="" className="bg-gray-900">All Resumes</option>
              <option value="CV_DEV" className="bg-gray-900">Developer</option>
              <option value="CV_AMOA" className="bg-gray-900">Business Analyst</option>
              <option value="CV_RUN" className="bg-gray-900">IT Ops</option>
              <option value="CV_MEDTECH" className="bg-gray-900">Healthcare</option>
            </select>
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="glass-input w-full sm:w-48 appearance-none py-3 cursor-pointer">
            <option value="" className="bg-gray-900">All Statuses</option>
            <option value="Applied" className="bg-gray-900">Applied</option>
            <option value="Interview" className="bg-gray-900">Interview</option>
            <option value="Offer" className="bg-gray-900">Offer</option>
            <option value="Rejected" className="bg-gray-900">Rejected</option>
          </select>
        </div>
      </motion.div>

      {/* Content Grid */}
      {!isLoading && filteredApplications.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-gray-500">
          <div className="w-24 h-24 mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
            <Briefcase className="w-10 h-10 text-gray-600" />
          </div>
          <p className="text-xl font-medium text-gray-400">No applications found.</p>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
          <AnimatePresence>
            {filteredApplications.map(app => (
              <motion.div key={app._id} variants={itemVariants} layoutId={app._id} exit={{ opacity: 0, scale: 0.9 }} className="glass-card p-6 flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125 group-hover:from-white/10"></div>
                
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:bg-white/10 transition-colors group-hover:border-indigo-500/30">
                      <Building2 className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors" title={app.company}>{app.company}</h2>
                      <p className="text-indigo-200/70 font-medium text-sm mt-0.5 line-clamp-1" title={app.position}>{app.position}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border backdrop-blur-md shadow-lg ${
                      app.status === 'Applied' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      app.status === 'Interview' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                      app.status === 'Offer' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                <div className="mt-1 mb-6 flex items-center justify-between">
                  <CVBadge type={app.cvType} />
                  {app.cvFile && (
                    <button 
                      onClick={(e) => handleDownloadCV(app.cvFile, e)}
                      title={`Download Attached CV (${app.cvFile.name})`}
                      className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all shadow-md backdrop-blur-md border border-indigo-500/30"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="mt-auto space-y-3 pt-5 border-t border-white/10 relative z-10">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-3 text-indigo-400/70" />
                      {format(new Date(app.appliedAt), 'MMMM do, yyyy')}
                    </div>
                    {app.contact ? (
                       <div className="flex items-center text-sm text-gray-400">
                         <Phone className="w-4 h-4 mr-3 text-indigo-400/70" />
                         <span className="truncate">{app.contact}</span>
                       </div>
                    ) : (
                      <div className="flex items-center text-sm text-gray-600 italic">
                        <Phone className="w-4 h-4 mr-3 opacity-30" />
                        No contact specificed
                      </div>
                    )}
                  </div>
                  {app.notes && (
                    <p className="text-sm text-gray-400 line-clamp-2 mt-4 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5 cursor-help" title={app.notes}>
                      {app.notes}
                    </p>
                  )}
                </div>

                {/* Actions overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-20">
                  <button onClick={() => { setEditingApp(app); setIsModalOpen(true); }} className="p-2 rounded-xl bg-black/40 text-gray-300 hover:bg-indigo-500 hover:text-white backdrop-blur-md border border-white/10 hover:border-indigo-500/50 shadow-xl transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(app._id)} className="p-2 rounded-xl bg-black/40 text-gray-300 hover:bg-rose-500 hover:text-white backdrop-blur-md border border-white/10 hover:border-rose-500/50 shadow-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <ApplicationForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateOrUpdate} initialData={editingApp} />
    </div>
  );
}

export default App;
