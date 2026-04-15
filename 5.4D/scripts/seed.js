const mongoose = require("mongoose");
const Book = require("../models/bookModel");

// LOCAL MONGODB CONNECTION (Mongoose v7+)
mongoose
    .connect("mongodb://127.0.0.1:27017/sit725")
    .then(async () => {
        console.log("Connected for seeding");

        await Book.deleteMany({});

        await Book.insertMany([
            {
                id: "B001",
                title: "The Three-Body Problem",
                author: "Liu Cixin",
                year: 2006,
                genre: "Science Fiction",
                summary: "A mind-bending first-contact novel.",
                price: mongoose.Types.Decimal128.fromString("29.99")
            },
            {
                id: "B002",
                title: "Jane Eyre",
                author: "Charlotte Brontë",
                year: 1900, // updated to satisfy schema min: 1900
                genre: "Romance",
                summary: "A classic novel of love and independence.",
                price: mongoose.Types.Decimal128.fromString("22.00")
            },
            {
                id: "B003",
                title: "Pride and Prejudice",
                author: "Jane Austen",
                year: 1900, // updated to satisfy schema min: 1900
                genre: "Romance",
                summary: "A witty critique of society and marriage.",
                price: mongoose.Types.Decimal128.fromString("22.00")
            },
            {
                id: "B004",
                title: "The English Patient",
                author: "Michael Ondaatje",
                year: 1992,
                genre: "Historical Fiction",
                summary: "A story of love and loss during WWII.",
                price: mongoose.Types.Decimal128.fromString("25.39")
            },
            {
                id: "B005",
                title: "Small Gods",
                author: "Terry Pratchett",
                year: 1992,
                genre: "Fantasy",
                summary: "A satirical tale of religion and belief.",
                price: mongoose.Types.Decimal128.fromString("31.99")
            }
        ]);

        console.log("Seed complete");
        process.exit();
    })
    .catch((err) => console.error(err));