const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  placeId: { type: String, required: true },
  userId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Tour", tourSchema);
