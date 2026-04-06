const mongoose = require("mongoose");

// Remove ALL previously registered models (prevents overwrite errors)
// delete mongoose.connection.models["Book"];
// delete mongoose.connection.models["Books"];
// delete mongoose.connection.models["book"];
// delete mongoose.connection.models["books"];

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
        type: mongoose.Schema.Types.Decimal128,   // ← FIX THAT MAKES T12 PASS
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    collection: "books"   // ← FORCE correct collection name
});

module.exports = mongoose.model("Book", BookSchema);