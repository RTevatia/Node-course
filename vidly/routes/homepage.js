const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welocome to Vidly...");
});

module.exports = router;
