const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoConnectionString");

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB Connected...");

    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;