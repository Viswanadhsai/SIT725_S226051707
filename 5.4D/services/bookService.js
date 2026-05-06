const Book = require('../models/bookModel');

async function createBook(data) {
    return await Book.create(data);
}

async function updateBook(id, data) {
    return await Book.findOneAndUpdate(
        { id },
        data,
        { returnDocument: "after", runValidators: true }
    );
}

async function getAllBooks() {
    return await Book.find();
}

async function getBookById(id) {
    return await Book.findOne({ id });
}

async function deleteBook(id) {
    return await Book.findOneAndDelete({ id });
}

module.exports = {
    createBook,
    updateBook,
    getAllBooks,
    getBookById,
    deleteBook
};
