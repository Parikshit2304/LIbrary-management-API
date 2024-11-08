const express = require("express");
const router = express.Router();
const Genre = require("../models/genre");

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.json(genres);
});

router.post("/", async (req, res) => {
  const genre = new Genre(req.body);
  await genre.save();
  res.status(201).json(genre);
});

module.exports = router;
