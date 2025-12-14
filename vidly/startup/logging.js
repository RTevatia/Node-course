require("express-async-errors");
const winston = require("winston");

module.exports = function () {
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
};
