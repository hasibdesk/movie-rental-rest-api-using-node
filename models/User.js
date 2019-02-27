const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  email: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const payload = { id: this._id, isAdmin: this.isAdmin };
  const token = jwt.sign(payload, config.get("jwtPrivateKey"), {
    expiresIn: 30
  });
  return token;
};

const User = mongoose.model("User", userSchema);

function validateGenre(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = {
  User: User,
  validate: validateGenre
};
