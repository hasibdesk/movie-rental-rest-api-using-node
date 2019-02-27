const Joi = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true }
});

const Customer = mongoose.model("Customer", customerSchema);

function customerValidate(customerData) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    isGold: Joi.string(),
    phone: Joi.string()
      .min(8)
      .max(20)
      .required()
  };
  return Joi.validate(customerData, schema);
}

module.exports = {
  Customer: Customer,
  validate: customerValidate
};
