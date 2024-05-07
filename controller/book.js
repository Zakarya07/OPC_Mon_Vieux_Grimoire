const Book = require("../models/Book");
const fs = require("fs");

// -- POST
// Create a book
exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  // Save in Database
  const book = new Book({
    userId: req.auth.userId,
    ...bookObject,
    imageUrl: `${req.protocol}://${req.get("host")}/uploads/${
      req.file.originalname
    }`,
  });

  book
    .save()
    .then(() => res.status(201).json({ message: "Livre ajouté" }))
    .catch((error) => {
      res.status(400).json({ error: `CreateBook controller error: ${error}` });
    });
};
// Rate a book
exports.rateBook = (req, res) => {
  const grade = Number(req.body.rating);

  let not_good = isNaN(grade) || grade < 0 || grade > 5;

  // Verify if the note is on the good range and is not a NaN
  if (not_good) {
    return res.status(400).json({ error: "Note non valide" });
  }

  // Rate a book
  Book.findById(req.params.id)
    .then((book) => {
      const alreadyRated = book.ratings.find(
        (rating) => rating.userId === req.auth.userId
      );

      if (alreadyRated) {
        res.status(400).json({ message: "Vous avez déja noté ce livre" });
      } else {
        book.ratings.push({
          userId: req.auth.userId,
          grade: grade,
        });

        // Calculate and save the average rating in the DB
        let sum = 0;
        for (let i = 0; i < book.ratings.length; i++) {
          sum += book.ratings[i].grade;
        }
        let avg_rating = (sum / book.ratings.length).toFixed(2);
        book.averageRating = avg_rating;

        book
          .save()
          .then(() => {
            res.status(201).json(book);
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// -- GET
// Get all books
exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => res.status().json({ error }));
};
// Get one book
exports.getOneBook = (req, res) => {
  const book_id = req.params.id;
  Book.findOne({ _id: book_id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => res.status(404).json({ error }));
};
// Get the 3 books with the best rating
exports.getBestBooksRating = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((bestbooks) => {
      res.status(200).json(bestbooks);
    })
    .catch((error) => res.status(400).json({ error }));
};

// -- PUT
// Modify a book
exports.modifyBook = (req, res) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.originalname
        }`,
      }
    : { ...req.body };

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-authorisé" });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => {
            // Part that remove the older picture of the uploads Folder, if a new image file has been provided in the mo
            if (req.file === undefined) {
              console.log("There is NO File uploaded");
            } else {
              const old_picture = book.imageUrl.split("/uploads/")[1];
              
              fs.unlink(`./uploads/${old_picture}`, (err) => {
                if (err) {
                  console.log("FILE SYSTEM ERROR:" , err);
                } else {
                  console.log("The old image has been DELETED");
                }
              })
              console.log("A File was uploaded");
              console.log("Old picture: " + old_picture);
              console.log("New Picture: " + req.file.originalname);
            }
            res.status(200).json({ message: "Livre modifié !" });
          })
          .catch((error) => res.status().json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// -- DELETE
// Delete a book
exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId === req.auth.userId) {
        const filename = book.imageUrl.split("/uploads/")[1];
        fs.unlink(`uploads/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Livre supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        res.status(401).json({ message: "Non-authorisé à supprimer" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
