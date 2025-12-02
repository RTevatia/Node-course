const Joi = require("joi");
Joi.objectid = require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const config = require("config");
const homepage = require("./routes/homepage");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const express = require("express");
const app = express();

// Connect MongoDB
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Couldn't connect to MongoDB...", error));

// Middleware
app.use(express.json());
app.use("/", homepage);
app.use("/api/genre", genres);
app.use("/api/customer", customers);
app.use("/api/movie", movies);
app.use("/api/rental", rentals);

// Configuration
console.log(app.get("env"));
console.log("Application name:", config.get("name"));
console.log("Mail server:", config.get("mail.host"));

// Port access
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
