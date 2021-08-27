const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const likeSchema = new Schema({

  count: {
  type: Number,
  default: 0,
},
  uuid2: { type: String, required: false },
  pid:{ type: String, required: false }

});

module.exports = mongoose.model("Like", likeSchema);
