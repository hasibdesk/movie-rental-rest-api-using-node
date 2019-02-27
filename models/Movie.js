const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./Genre");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    required: true
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, min: 0, max: 10, required: true },
  dailyRentalRate: { type: Number, min: 0, max: 10, required: true }
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .trim()
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(10)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
  };
  return Joi.validate(movie, schema);
}

module.exports = {
  Movie: Movie,
  validate: validateMovie
};
