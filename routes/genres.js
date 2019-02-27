const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/Genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name
  });
  await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre not found with that id");
  genre = await genre.save();
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  let genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre Not found with the given ID");
  res.send(genre);
});
module.exports = router;
