const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({

  count: {
  type: Number,
  default: 1,
},
  uuid1: { type: String, required: false },
  pid:{ type: String, required: false }

});

module.exports = mongoose.model("Counter", userSchema);
