const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

app.use(express.json()); // for parsing body req to json

// for /api/users/account for example built that on users.js in router folder
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profiles', require('./routes/profiles'));

app.get("/", (req, res) => {
    res.send("server is running");
})

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));