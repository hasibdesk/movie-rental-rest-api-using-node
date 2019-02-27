const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  customer: {
    type: new Schema({
      name: { type: String, required: true, minlength: 3, maxlength: 50 },
      email: { type: String, required: true },
      isGold: { type: Boolean, default: false },
      phone: { type: String, required: true }
    }),
    required: true
  },
  movie: {
    type: new Schema({
      title: {
        type: String,
        minlength: 5,
        maxlength: 50,
        trim: true,
        required: true
      },
      dailyRentalRate: { type: Number, min: 0, max: 10, required: true }
    }),
    required: true
  },
  dateOut: { type: Date, default: Date.now, required: true },
  dateReturned: { type: Date },
  rentalPrice: { type: Number, min: 0 }
});
const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}

module.exports = {
  Rental: Rental,
  validate: validateRental
};
