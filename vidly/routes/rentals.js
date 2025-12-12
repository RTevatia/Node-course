const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const rentals = await Rental.find().sort("-dateOut");
    res.send(rentals);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const rentals = await Rental.findById(req.params.id);

    if (!rentals)
      return res.status(404).send("The rental with given Id was not found!");

    res.send(rentals);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) res.status(400).send("Invalid movie!");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock");

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    try {
      // Save the rental first
      await rental.save();

      // Update movie stock
      const result = await Movie.updateOne(
        {
          _id: movie._id,
          numberInStock: { $gt: 0 }, // Ensure stock hasn't changed
        },
        {
          $inc: { numberInStock: -1 },
        }
      );

      // Check if update was successful
      if (result.modifiedCount === 0) {
        // Rollback: delete the rental if movie update failed
        await Rental.deleteOne({ _id: rental._id });
        return res.status(400).send("Movie is no longer in stock");
      }

      res.send(rental);
    } catch (ex) {
      res.status(500).send("Something failed: " + ex.message);
    }
  })
);

module.exports = router;
