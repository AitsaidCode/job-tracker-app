const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
const applicationsRouter = require('./routes/applications');
app.use('/api/applications', applicationsRouter);

const { MongoMemoryServer } = require('mongodb-memory-server');

const startServer = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;
    
    // Use in-memory DB when local MongoDB is not running natively
    if (!mongoUri || mongoUri.includes('localhost')) {
        console.log('Starting in-memory MongoDB server for local testing...');
        const mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

startServer();
