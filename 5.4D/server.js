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

mongoose
    .connect("mongodb+srv://viswanadhsai26_db_user:auU5kZBVAs2rWbCG@cluster0.kshd1xc.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch(err => console.error("MongoDB connection error:", err));