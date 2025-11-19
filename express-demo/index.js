const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// single route parameter - in this case id
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

// muliple route parameter - in this case year and month
app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});

// query string parameter
app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
