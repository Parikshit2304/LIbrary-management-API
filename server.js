require("dotenv").config(); 

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 8000;  
const JWT_SECRET = process.env.JWT_SECRET; 

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Something went wrong!", err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "borrowed", "self-owned"],
    default: "available",
  },
});

const Book = mongoose.model("Book", bookSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Authentication Middleware
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// User Login Route 
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ msg: "Login successful", token });
  }

  res.status(401).json({ msg: "Invalid credentials" });
});

// Routes

// CREATE: Add a new book (Protected Route)
app.post("/books", auth, async (req, res) => {
  const { title, author, genre, status } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).json({ msg: "Title, Author, and Genre are required." });
  }

  try {
    const newBook = await Book.create({ title, author, genre, status });
    res.status(201).json({ msg: "Book created successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create book", error: error.message });
  }
});

// READ: Get all books (Public Route)
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ msg: "Failed to retrieve books", error: error.message });
  }
});

// READ: Get a single book by title (Public Route)
app.get("/books/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const book = await Book.findOne({ title });
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving book", error: error.message });
  }
});

// UPDATE: Update book details (Protected Route)
app.put("/books/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, status } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, status },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json({ msg: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ msg: "Failed to update book", error: error.message });
  }
});

// DELETE: Delete a book (Protected Route)
app.delete("/books/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json({ msg: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete book", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
