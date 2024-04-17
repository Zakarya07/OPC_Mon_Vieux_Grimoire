const express = require("express");
const router = express.Router();

const bookController = require("../controller/book");

// _________________ POST
// Create a book
router.post("/", bookController.createBook)
// Rate a book
router.post("/:id/rating", bookController.rateBook)

// _________________ GET
// Get all books
router.get("/", bookController.getAllBooks);
// Get one books
router.get("/:id", bookController.getOneBook);
// Get the 3 best rated books
router.get("/bestrating", bookController.getBestBooksRating);

// _________________ PUT
// Modify a book
router.put("/:id", bookController.modifyBook);

// _________________ DELETE
// Deleta a book
router.delete("/:id", bookController.deleteBook);

module.exports = router;