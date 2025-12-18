const mongoose = require("mongoose");
const winston = require("winston");
require("winston-mongodb");
const logger = require("./logger");
const config = require("config");

module.exports = async function () {
  const db = config.get("db");
  // Connect MongoDB
  mongoose
    .connect(db)
    .then(() => {
      logger.info(`Connected to ${db}...`);

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
      logger.error(`could not connect to ${db}...`, err);
    });
};
