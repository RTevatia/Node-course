const winston = require("winston");
require("express-async-errors");

// Common log format for files
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Console format with colors
const consoleFormat = winston.format.combine(
  winston.format.colorize(), // colorizes the level
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    // if message is an object, stringify it
    const msg =
      typeof message === "object" ? JSON.stringify(message, null, 2) : message;
    return `${timestamp} [${level}]: ${msg}`;
  })
);

const logger = winston.createLogger({
  level: "info",
  exitOnError: false,
  transports: [
    new winston.transports.File({
      filename: "logfile.log",
      level: "error",
      format: fileFormat,
    }),
    new winston.transports.Console({ level: "info", format: consoleFormat }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log", level: "error" }),
    new winston.transports.Console({ level: "error", format: consoleFormat }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log", level: "error" }),
    new winston.transports.Console({ level: "error", format: consoleFormat }),
  ],
});

module.exports = logger;
