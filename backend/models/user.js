const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: { type: String, required: false },
  name: { type: String, required: false },
  bio: { type: String, required: false },
  website:{ type: String, required: false },
  twitter:{ type: String, required: false },
  facebook:{ type: String, required: false },
  google:{ type: String, required: false },
  linkid:{ type: String, required: false },
  instagram:{ type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: false },
  places: { type: String, required: false },
  isAdmin: { type: Boolean, required: false },
  isEditor: { type: Boolean, required: false }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
