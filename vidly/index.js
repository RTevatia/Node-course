const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

const config = require("config");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

// Configuration
console.log(app.get("env"));
console.log("Application name:", config.get("name"));
console.log("Mail server:", config.get("mail.host"));
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

// Port access
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
