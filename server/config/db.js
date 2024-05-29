// Load environment variables from .env file
const mongoose = require("mongoose");

// Get the MongoDB connection string from environment variables
const db = process.env.VITE_MONGO_CONNECTION_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
        });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
