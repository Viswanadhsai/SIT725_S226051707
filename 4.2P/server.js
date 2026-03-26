var express = require("express");
var app = express();
var mongoose = require("mongoose");

var port = process.env.port || 3000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/stadiumDB');
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Stadium schema
const StadiumSchema = new mongoose.Schema({
    stadiumName: String,
    city: String,
    capacity: Number,
    openedYear: Number,
    homeTeams: [String],
    image: String
});

const Stadium = mongoose.model('Stadium', StadiumSchema);

// GET stadiums
app.get('/api/stadiums', async (req, res) => {
    const stadiums = await Stadium.find({});
    res.json({ statusCode: 200, data: stadiums, message: "Success" });
});

// POST stadium
app.post('/api/stadiums', async (req, res) => {
    const stadium = new Stadium(req.body);
    await stadium.save();
    res.json({ statusCode: 201, message: "Stadium added", data: stadium });
});

// Start server
app.listen(port, () => {
    console.log("App listening on port " + port);
});

// Export model for seed.js
module.exports = { Stadium };