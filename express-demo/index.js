const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticate");
const courses = require("./routes/courses");
const home = require("./routes/home");
const Joi = require("joi");
const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(app.get('env'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
// console.log(`Application name: ${config.get("name")}`);
// console.log(`Mail server: ${config.get("mail.host")}`);
// console.log(`Mail password: ${config.get("mail.password")}`);

// Use debug module
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// Some db work...
dbDebugger("Connected to the database...");

app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
