const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const booksRoutes = require("./routes/book");
const usersRoutes = require("./routes/user");
const mongoConnection = process.env.MONGO_DB_URI;

// Mongo DB Connection
mongoose
  .connect(mongoConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas sucessfully"))
  .catch((error) => console.log("Failed to connect to MongoDB Atlas" + error));

//   CORS, etc...
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// JSON parsing
app.use(express.json());


// Routes
app.use("/api/books", booksRoutes);
app.use("/api/auth", usersRoutes);
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

module.exports = app;
