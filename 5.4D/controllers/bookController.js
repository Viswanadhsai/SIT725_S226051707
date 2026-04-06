const Book = require("../models/bookModel");

// -----------------------------
// CREATE BOOK
// -----------------------------
exports.createBook = async (req, res) => {

    const allowed = ["id", "title", "author", "year", "genre", "summary", "price"];
    const unknown = Object.keys(req.body).filter(f => !allowed.includes(f));
    if (unknown.length > 0) {
        return res.status(400).json({ error: `Unknown fields: ${unknown.join(", ")}` });
    }

    try {
        // IMPORTANT FIX: Use Book.create() instead of manual validate()
        const book = await Book.create(req.body);
        return res.status(201).json(book);

    } catch (err) {

        if (err.code === 11000) {
            return res.status(409).json({ error: "Duplicate ID" });
        }

        return res.status(400).json({ error: err.message || "Bad request" });
    }
};

// -----------------------------
// UPDATE BOOK
// -----------------------------
exports.updateBook = async (req, res) => {
    const id = req.params.id;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Empty update not allowed" });
    }

    const immutableFields = ["id", "_id", "createdAt"];
    for (const field of immutableFields) {
        if (req.body[field] !== undefined) {
            return res.status(400).json({ error: `${field} is immutable` });
        }
    }

    const allowedFields = ["title", "author", "year", "genre", "summary", "price"];
    const unknown = Object.keys(req.body).filter(f => !allowedFields.includes(f));
    if (unknown.length > 0) {
        return res.status(400).json({ error: `Unknown fields: ${unknown.join(", ")}` });
    }

    try {
        const updated = await Book.findOneAndUpdate(
            { id },
            req.body,
            { returnDocument: "after", runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(updated);

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        if (err.name === "CastError") {
            return res.status(400).json({ error: "Invalid type" });
        }

        return res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// GET ALL BOOKS
// -----------------------------
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// GET SINGLE BOOK
// -----------------------------
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findOne({ id: req.params.id });
        if (!book) return res.status(404).json({ error: "Book not found" });
        return res.status(200).json(book);
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// DELETE BOOK
// -----------------------------
exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.findOneAndDelete({ id: req.params.id });
        if (!deleted) return res.status(404).json({ error: "Book not found" });
        return res.status(200).json({ message: "Book deleted" });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
};