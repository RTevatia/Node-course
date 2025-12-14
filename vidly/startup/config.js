const config = require("config");

module.exports = function () {
  // Configuration
  console.log(app.get("env"));
  console.log("Application name:", config.get("name"));
  console.log("Mail server:", config.get("mail.host"));
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
