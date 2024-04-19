const Book = require("../models/Book");

// -- POST
// Create a book
exports.createBook = (req, res) => {
};
// Rate a book
exports.rateBook = (req, res) => {
};

// -- GET
// Get all books
exports.getAllBooks = (req, res) => {
    Book.find()
    .then(books => {
        res.status(200).json(books)
    })
    .catch(error => res.status().json({ error }));
};
// Get one book
exports.getOneBook = (req, res) => {
    const book_id = req.params.id;
    Book.findOne({ _id: book_id})
    .then((book) => {
        res.status(200).json(book)
    })
    .catch(error => res.status(404).json({ error }));
};
// Get the 3 books with the best rating
exports.getBestBooksRating = (req, res) => {
};

// -- PUT
// Modify a book
exports.modifyBook = (req, res) => {
}

// -- DELETE
// Delete a book
exports.deleteBook = (req, res) => {
}
