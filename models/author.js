const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  birthYear: Number,
});

module.exports = mongoose.model("Author", authorSchema);
