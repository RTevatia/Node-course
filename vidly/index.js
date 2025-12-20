const logger = require("./startup/logger");
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")(app);
require("./startup/validation")();

// Only start the HTTP server if not in test environment
if (process.env.NODE_ENV !== "test") {
  // Port access
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    logger.info(`Listening on Port ${port}...`);
  });
  module.exports = server;
} else {
  // In test environment, export just the app
  module.exports = app;
}
