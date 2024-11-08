const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

router.post("/", async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.status(201).json(author);
});

module.exports = router;
