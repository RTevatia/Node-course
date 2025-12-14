const config = require("config");
const logger = require('./logger');

module.exports = function (app) {
  // Configuration
  logger.info(app.get("env"));
  logger.info("Application name:", config.get("name"));
  logger.info("Mail server:", config.get("mail.host"));
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
