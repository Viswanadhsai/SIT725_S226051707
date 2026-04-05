const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: Decimal128, required: true } // AUD price stored as Decimal128
});

module.exports = mongoose.model("Book", bookSchema);