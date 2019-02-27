const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 20, required: true }
});
const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = {
  genreSchema: genreSchema,
  Genre: Genre,
  validate: validateGenre
};
