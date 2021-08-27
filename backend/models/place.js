// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
//
// const placeSchema = new Schema({
//   title: { type: String, required: false },
//   description: { type: String, required: false },
//   featured: { type: Boolean, required: false },
//   // image: { type: String, required: false },
// image: { type: String, required: false },
//   category: { type: String, required: false },
//   city: { type: String, required: false },
//   link: { type: String, required: false },
//   tag: { type: String, required: false },
//   long: { type: String, required: false },
//   creator: { type: String, required: false },
//   threeSixtyImage: { type: String, required: false },
//   userId: { type: String, required: false },
//   time: { type: String, required: false },
//   passwordo: {
//     type: String
//   },
//   havePassword: {
//   type: Boolean
// },
// useit: {
// type: Boolean
// },
// publish: {
// type: Boolean
// },
// rotation: {
// type: Boolean
// },
//
// openDescription: {
// type: Boolean
// },
// loop: {
// type: Boolean
// },
// direction: {
//   type: String
// },
// zoom: {
// type: String
// },
// zoom: {
// type: String
// },
// pause: {
// type: Boolean
// },
// showImageFeaturedInPause: {
// type: Boolean
// },
// disTourTitle: {
// type: Boolean
// },
// playicon: {
// type: String
// },
// pauseOpacity: {
// type: String
// },
// cssTourTitle:{
//   type: String
// },
// EnableLine:{
// type: Boolean
// },
// LineTitle:{
//   type: String
// },
// rotationSpeed:{ type: String },
// imgsData : [],
// carouselDesing : {
// type: String
// },
//
// openCarousel: {
// type:Boolean
// },
// })
//
// module.exports = mongoose.model('Place', placeSchema)








const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false },
  category: { type: String, required: false },
  city: { type: String, required: false },
  link: { type: String, required: false },
  tag: { type: String, required: false },
  long: { type: String, required: false },
  creator: { type: String, required: false },
  threeSixtyImage: { type: String, required: false },
  userId: { type: String, required: false },
  time: { type: String, required: false },
  lastEdit: { type: String, required: false },
  passwordo: {
    type: String
  },
  havePassword: {
  type: Boolean
},
useit: {
type: Boolean
},
publish: {
type: Boolean
},
rotation: {
type: Boolean
},
openDescription: {
type: Boolean
},
loop: {
type: Boolean
},
direction: {
  type: String
},
zoom: {
type: String
},
zoom: {
type: String
},
pause: {
type: Boolean
},
showImageFeaturedInPause: {
type: Boolean
},
disTourTitle: {
type: Boolean
},
playicon: {
type: String
},
pauseOpacity: {
type: String
},
cssTourTitle:{
  type: String
},
EnableLine:{
type: Boolean
},
LineTitle:{
  type: String
},
tourHd: {
  type:String
},
rotationSpeed:{ type: String },
imgsData : [],
date: {
  type: Date,
  default: Date.now
},
carouselDesing : {
  type: String
  },

  email : {
    type: String
    },
    uuid1: {
      type: String
      },
      uuid2: {
        type: String
        },
imageUser: { type: String, required: false },
tourCreator :{ type: String, required: false },
  openCarousel: {
  type:Boolean
  }
})

module.exports = mongoose.model('Place', placeSchema)
