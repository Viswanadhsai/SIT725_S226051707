const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/stadiumDB");

const StadiumSchema = new mongoose.Schema({
    stadiumName: String,
    city: String,
    capacity: Number,
    openedYear: Number,
    homeTeams: [String],
    image: String
});

const Stadium = mongoose.model("Stadium", StadiumSchema);

const sampleData = [
    {
        stadiumName: "Melbourne Cricket Ground",
        city: "Melbourne",
        capacity: 100024,
        openedYear: 1853,
        homeTeams: ["Melbourne Cricket Club", "Richmond FC"],
        image: "mcg.jpg"
    },
    {
        stadiumName: "Accor Stadium",
        city: "Sydney",
        capacity: 83500,
        openedYear: 1999,
        openedYear: 1999,
        homeTeams: ["NSW Blues", "South Sydney Rabbitohs"],
        image: "accor.jpg"
    },
    {
        stadiumName: "Optus Stadium",
        city: "Perth",
        capacity: 60000,
        openedYear: 2018,
        homeTeams: ["West Coast Eagles", "Perth Scorchers"],
        image: "optus.jpg"
    }
];

Stadium.insertMany(sampleData)
    .then(() => {
        console.log("Sample stadiums inserted!");
        mongoose.connection.close();
    })
    .catch(err => console.log(err));