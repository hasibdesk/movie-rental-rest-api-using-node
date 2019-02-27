const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User } = require("../models/User");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid User or Password");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid User or Password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .email()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(req, schema);
}
module.exports = router;
