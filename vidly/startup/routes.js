const homepage = require("../routes/homepage");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const express = require("express");

module.exports = function (app) {
  // Middleware
  app.use(express.json());
  app.use("/", homepage);
  app.use("/api/genre", genres);
  app.use("/api/customer", customers);
  app.use("/api/movie", movies);
  app.use("/api/rental", rentals);
  app.use("/api/user", users);
  app.use("/api/auth", auth);
  app.use(error); // should be the last middleware
};
