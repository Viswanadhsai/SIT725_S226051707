const { getAllBooks, getBookById } = require('../services/booksService');

function fetchBooks(req, res) {
    const data = getAllBooks();
    res.json(data);
}

function fetchBookById(req, res) {
    const id = req.params.id;
    const book = getBookById(id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
}

module.exports = { fetchBooks, fetchBookById };