const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    genre: {
        type: String
    },
    summary: {
        type: String,
        minlength: 10
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    collection: "books"
});

module.exports = mongoose.model("Book", BookSchema);