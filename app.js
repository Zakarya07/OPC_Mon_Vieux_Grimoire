const express = require("express");
const app = express();

const mongoose = require("mongoose");
const mongo_uri =
  "mongodb+srv://Zakarya:zakarya11@cluster0.wwepwpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mongo DB Connection
mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use("/api/books");
app.use("/api/auth");

module.exports = app;
