const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTourSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    tourId: { type: String, required: true },
    userId: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model("UserTour", userTourSchema);
