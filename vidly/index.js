require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

const config = require("config");
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

// Create logger WITHOUT MongoDB transport initially
global.logger = winston.createLogger({
  level: "error",
  exitOnError: false,
  transports: [
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.Console(),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
    new winston.transports.Console(),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
    new winston.transports.Console(),
  ],
});

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
