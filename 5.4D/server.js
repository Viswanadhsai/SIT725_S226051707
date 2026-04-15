const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', bookRoutes);

// LOCAL MONGODB CONNECTION (Mongoose v7+)
mongoose
    .connect("mongodb://127.0.0.1:27017/sit725")
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch(err => console.error("MongoDB connection error:", err));