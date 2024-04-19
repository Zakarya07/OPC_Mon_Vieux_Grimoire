const express = require("express");
const bookController = require("../controller/book");
const auth_middleware = require("../middleware/auth");

const router = express.Router();

// _________________ POST
// Create a book
router.post("/", auth_middleware, bookController.createBook)
// Rate a book
router.post("/:id/rating", auth_middleware, bookController.rateBook)

// _________________ GET
// Get all books
router.get("/", bookController.getAllBooks);
// Get one books
router.get("/:id", bookController.getOneBook);
// Get the 3 best rated books
router.get("/bestrating", bookController.getBestBooksRating);

// _________________ PUT
// Modify a book
router.put("/:id", auth_middleware, bookController.modifyBook);

// _________________ DELETE
// Deleta a book
router.delete("/:id", auth_middleware, bookController.deleteBook);

module.exports = router;