require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const config = require("config");
const homepage = require("./routes/homepage");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const express = require("express");
const app = express();

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

// Connect MongoDB
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("Connected to MongoDB...");

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
  })
  .catch((error) => {
    console.log("Couldn't connect to MongoDB...", error);
  });

// process.on("uncaughtException", (error) => {
//   logger.error("Uncaught Exception:", {
//     metadata: {
//       error: error.message,
//       stack: error.stack,
//       timestamp: new Date().toISOString(),
//     },
//   });
//   setTimeout(() => process.exit(1), 100);
// });

// Error handlers (they'll use whatever transports are available)
// process.on("unhandledRejection", (reason, promise) => {
//   logger.error("Unhandled Rejection:", {
//     metadata: {
//       reason: reason.message || reason,
//       stack: reason.stack,
//       timestamp: new Date().toISOString(),
//     },
//   });

//   setTimeout(() => process.exit(1), 100);
// });

// Test Promise error
// const p = Promise.reject(new Error("Failed miserably"));
// p.then(() => {
//   console.log("Done");
// });

// Middleware
app.use(express.json());
app.use("/", homepage);
app.use("/api/genre", genres);
app.use("/api/customer", customers);
app.use("/api/movie", movies);
app.use("/api/rental", rentals);
app.use("/api/user", users);
app.use("/api/auth", auth);

app.use(error); // should be the last middleware

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

  // Test error AFTER everything is set up
  // setTimeout(() => {
  //   throw new Error("Something failed during startup");
  // }, 1000);
});
