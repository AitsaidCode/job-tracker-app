import React, { useState, useEffect } from 'react';
import { X, Building2, Briefcase, Calendar, Phone, FileText, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ApplicationForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    company: '', position: '', cvType: 'CV_DEV', status: 'Applied', appliedAt: new Date().toISOString().split('T')[0], notes: '', contact: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        appliedAt: initialData.appliedAt ? new Date(initialData.appliedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        company: '', position: '', cvType: 'CV_DEV', status: 'Applied', appliedAt: new Date().toISOString().split('T')[0], notes: '', contact: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          cvFile: {
            name: file.name,
            data: reader.result,
            contentType: file.type
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => {
        const newData = { ...prev };
        delete newData.cvFile;
        return newData;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 sm:py-12 overflow-y-auto">
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
            className="relative w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl my-auto"
          >
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                {initialData ? 'Edit Application' : 'New Application'}
              </h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2 relative group">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Company</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} className="glass-input w-full pl-11" placeholder="Tech Corp" />
                  </div>
                </div>
                <div className="sm:col-span-2 relative group">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Position</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input type="text" name="position" required value={formData.position} onChange={handleChange} className="glass-input w-full pl-11" placeholder="Lead Developer" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">CV Used</label>
                  <select name="cvType" value={formData.cvType} onChange={handleChange} className="glass-input w-full appearance-none cursor-pointer">
                    <option value="CV_DEV" className="bg-gray-900 text-white">Developer</option>
                    <option value="CV_AMOA" className="bg-gray-900 text-white">Business Analyst</option>
                    <option value="CV_RUN" className="bg-gray-900 text-white">IT Ops</option>
                    <option value="CV_MEDTECH" className="bg-gray-900 text-white">Healthcare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="glass-input w-full appearance-none cursor-pointer">
                    <option value="Applied" className="bg-gray-900 text-white">Applied</option>
                    <option value="Interview" className="bg-gray-900 text-white">Interview</option>
                    <option value="Offer" className="bg-gray-900 text-white">Offer</option>
                    <option value="Rejected" className="bg-gray-900 text-white">Rejected</option>
                  </select>
                </div>
                <div className="relative group">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Applied Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                    <input style={{ colorScheme: 'dark' }} type="date" name="appliedAt" value={formData.appliedAt} onChange={handleChange} className="glass-input w-full pl-11" />
                  </div>
                </div>
                <div className="relative group">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Contact</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="glass-input w-full pl-11" placeholder="Recruiter Name / Email" />
                  </div>
                </div>
                
                <div className="sm:col-span-2 relative group mt-1">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Upload Actual CV (Optional)</label>
                  <div className="relative flex items-center">
                    <input type="file" id="cvUpload" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                    <label htmlFor="cvUpload" className="glass-input cursor-pointer flex items-center justify-center text-sm w-full border-dashed border-2 hover:border-indigo-500/50 hover:bg-white/10 transition-colors text-gray-300 gap-2">
                       <UploadCloud className="w-5 h-5 text-indigo-400" />
                      {formData.cvFile ? `Selected: ${formData.cvFile.name}` : 'Click to Upload Resume Document'}
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Notes</label>
                  <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="glass-input w-full resize-none" placeholder="Any specific details?"></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/5">
                <button type="button" onClick={onClose} className="px-6 py-2.5 glass-button-secondary">
                  Cancel
                </button>
                <button type="submit" className="px-8 py-2.5 glass-button">
                  Save Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default ApplicationForm;
