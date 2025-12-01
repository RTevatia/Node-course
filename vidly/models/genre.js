const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  return Joi.object({
    name: Joi.string().min(3).max(30).required(),
  }).validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
