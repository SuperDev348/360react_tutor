const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threeDSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  placeId: { type: String, required: true }
});

module.exports = mongoose.model("ThreeD", threeDSchema);
