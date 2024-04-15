const express = require("express");
const router = express.Router();

const bookController = require("../controller/book");

// --- POST
// Create a book
router.post("/", bookController.createBook)
// Rate a book
router.post("/:id/rating", bookController.rateBook)

// --- GET
// Get all books
router.get("/", bookController.getAllBooks);
// Get one books
router.get("/:id", bookController.getOneBook);
// Get the rating of best 3 books
router.get("/bestrating", bookController.getBestBooksRating);

// --- PUT
// Modify a book
router.put("/:id", bookController.modifyBook);

// --- DELETE
// Deleta a book
router.delete("/:id", bookController.deleteBook);

module.exports = router;