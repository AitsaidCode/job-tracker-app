const router = require('express').Router();
let Application = require('../models/Application');

// GET all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// POST a new application
router.post('/', async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    const savedApplication = await newApplication.save();
    res.json(savedApplication);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// PUT update an application
router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!application) {
      return res.status(404).json('Application not found');
    }
    res.json(application);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// DELETE an application
router.delete('/:id', async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json('Application not found');
    }
    res.json('Application deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
