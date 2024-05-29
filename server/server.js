// server.js
require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json()); // for parsing body req to json

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profiles', require('./routes/profiles'));

app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
