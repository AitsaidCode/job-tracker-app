const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  cvType: { 
    type: String, 
    required: true, 
    enum: ['CV_DEV', 'CV_AMOA', 'CV_RUN', 'CV_MEDTECH'] 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['Applied', 'Interview', 'Rejected', 'Offer'] 
  },
  appliedAt: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  contact: { type: String, default: '' },
  jobUrl: { type: String, default: '' },
  salary: { type: String, default: '' },
  cvFile: {
    name: String,
    data: String,
    contentType: String
  }
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
