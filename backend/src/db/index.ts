import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

// Test the database connection
const testConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Export the mongoose instance and the test function
export { mongoose, testConnection };
