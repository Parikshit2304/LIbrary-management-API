const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
  publishedYear: Number,
  copiesAvailable: Number,
});

module.exports = mongoose.model("Book", bookSchema);
