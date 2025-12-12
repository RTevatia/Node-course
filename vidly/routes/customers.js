const asyncMiddleware = require('../middleware/async');
const auth = require("../middleware/auth");
const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", asyncMiddleware(async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
}));

router.get("/:id", asyncMiddleware(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with given ID was not found");

  res.send(customer);
}));

router.post("/", auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  
  await customer.save();

  res.send(customer);
}));


router.put("/:id", auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { isGold: req.body.isGold, name: req.body.name, phone: req.body.phone },
    { new: true }
  );
  if (!customer)
    return res.status(404).send("The customer with given ID was not found");

  res.send(customer);
}));

router.delete("/:id", auth, asyncMiddleware(async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with given ID was not found!");

  res.send(customer);
}));

module.exports = router;
