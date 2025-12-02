const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();
console.log("Object ID: ", id);
console.log("Time stamp from Object ID: ", id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid("1234");
console.log(isValid);
