const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threesixtySchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  featured: { type: Boolean, required: false },
  image: { type: String, required: false },
  category: { type: String, required: false },
  city: { type: String, required: false },
  link: { type: String, required: false },
  tag: { type: String, required: false },
  long: { type: String, required: false },
  creator: { type: String, required: false },
  threeSixtyGallery: [String]
})

module.exports = mongoose.model('Three Sixty', threesixtySchema)
