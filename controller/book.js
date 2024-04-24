const Book = require("../models/Book");
const fs = require('fs');

// -- POST
// Create a book
exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book);
    // Save in Database
    const book = new Book({
        userId: req.auth.userId,
        ...bookObject,
        imageUrl : `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    })

    book.save()
    .then(() => res.status(201).json({message: "Livre ajouté"}))
    .catch( error => res.status(400).json({error}))
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
    Book.findOne({_id: req.params.id})
    .then(book => {
        if (book.userId === req.auth.userId) {
            const filename = book.imageUrl.split("/uploads/")[1];
            fs.unlink(`uploads/${filename}`, () => {
                Book.deleteOne({_id: req.params.id})
                .then(() => {
                    res.status(200).json({message: "Livre supprimé !"});
                })
                .catch(error => res.status(401).json({error}))
            });
        } else {
            res.status(401).json({message: "Non-authorisé à supprmé"});
        }
    })
    .catch(error => res.status(500).json({ error }))
}
