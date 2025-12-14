const mongoose = require("mongoose");
const winston = require("winston");
require("winston-mongodb");
const logger = require("./logger");

module.exports = async function () {
  // Connect MongoDB
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => {
      logger.info("Connected to MongoDB...");

      // Add MongoDB transport AFTER successful connection
      logger.add(
        new winston.transports.MongoDB({
          db: mongoose.connection,
          collection: "error_logs",
          level: "error",
        })
      );

      logger.info("MongoDB logging enabled");
    })
    .catch((err) => {
      logger.error("could not connect to MongoDB...", err);
    });
};
