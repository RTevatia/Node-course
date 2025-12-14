const winston = require("winston");
require("express-async-errors");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  exitOnError: false,
  transports: [
    new winston.transports.File({ filename: "logfile.log", level: 'error' }),
    new winston.transports.Console({ level: 'info' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log", level: 'error' }),
    new winston.transports.Console({ level: 'error' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log", level: 'error' }),
    new winston.transports.Console({ level: 'error' }),
  ],
});

module.exports = logger;
