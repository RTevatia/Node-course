const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental was not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed.");

  rental.return();
  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  );

  return res.status(200).send(rental);
});

Joi.objectId = JoiObjectId(Joi);

function validateReturn(req) {
  return Joi.object({
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
  }).validate(req);
}

module.exports = router;
