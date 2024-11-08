const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find().populate("author").populate("genre");
  res.json(books);
});

// Get book by ID
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author").populate("genre");
  res.json(book);
});

// Add a new book
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

// Update a book
router.put("/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

// Delete a book
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
