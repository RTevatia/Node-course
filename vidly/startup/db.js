const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  // Connect MongoDB
  mongoose.connect("mongodb://localhost/vidly").then(() => {
    winston.info("Connected to MongoDB...");

    // Add MongoDB transport AFTER successful connection
    require("winston-mongodb");
    logger.add(
      new winston.transports.MongoDB({
        db: mongoose.connection,
        collection: "error_logs",
        level: "error",
      })
    );

    console.log("MongoDB logging enabled");
  });
};
