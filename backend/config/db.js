const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // If looking for local mongo and it's likely not there, or if specifically requested
    if (!mongoUri || mongoUri.includes('localhost')) {
      console.log('Attempting to connect to local MongoDB...');
      try {
        const conn = await mongoose.connect(mongoUri || 'mongodb://localhost:27017/video-editor', {
          serverSelectionTimeoutMS: 2000 // low timeout to fail fast
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return;
      } catch (err) {
        console.log('Local MongoDB not found. Starting In-Memory MongoDB...');
      }
    }

    // Fallback to In-Memory
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log(`In-Memory MongoDB URI: ${mongoUri}`);

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
