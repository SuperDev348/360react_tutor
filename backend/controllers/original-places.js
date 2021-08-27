const HttpError = require('../models/http-error')
const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')
const Place = require('../models/place')
const User = require('../models/user')
const cloud = require('./../cloudinary.js')
const fs = require('fs')

const cloudinary = require('cloudinary').v2

// cloudinary.config({
//   cloud_name: 'dd97mjjt2',
//   api_key: '274253912236812',
//   api_secret: 'Uwjh26mCiIyphfEC46B2Fm-LFDA'
// })

cloudinary.config({
  cloud_name: 'dx1zby8rs',
  api_key: '153893571185525',
  api_secret: 'lR39XFUY5_-C3QP-yiPrBGtSUFs'
})


let DYMMY_PLACES = [
  {
    id: 'p1',
    featured: true,
    title: 'elias',
    description: 'elias elias ',
    category: 'elias',
    city: 'elias',
    link: 'elias',
    tag: 'elias',
    long: 'elias',
    creator: 'u1'
  },
  {
    id: 'p2',
    featured: true,
    title: 'elias',
    description: 'wla3at tneen ',
    category: 'elias',
    city: 'elias',
    link: 'elias',
    tag: 'elias',
    long: 'elias',
    creator: 'u1'
  }
]
const getPlaces = async (req, res, next) => {
  let places
  try {
    places = await Place.find()
  } catch (err) {
    const error = new HttpError('can not find the users', 5000)
    return next(error)
  }

  res.json(places.map(place => place.toObject({ getters: true })))
}
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid
  let places
  try {
    places = await Place.find({ userId: userId })
  } catch (err) {
    const error = HttpError(
      'can not find places with this user id, sorry Elias',
      500
    )
    return next(error)
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find a places for the provided id.', 404)
    )
  }
  res.json(places.map(place => place.toObject({ getters: true })))
}

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid // { pid: 'p1' }

  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    )
    return next(error)
  }

  if (!place) {
    const error = new HttpError(
      'Could not find a place for the provided id.',
      404
    )
    return next(error)
  }

  res.json({ place: place.toObject({ getters: true }) }) // => { place } => { place: place }
}

// const addPlace = async (req, res, next) => {
//   const {
//     title,
//     description,
//     category,
//     city,
//     link,
//     tag,
//     long,
//     creator,
//     userId,
//     time,
//     passwordo,
//     havePassword,
//     publish,
//     useit,
//     rotation,
//     rotationSpeed,
//     openDescription,
//     loop,
//     direction,
//      zoom,
//     pause,
//     showImageFeaturedInPause,
//     playicon,
//     disTourTitle,
//     pauseOpacity,
//     cssTourTitle,
//     EnableLine,
//     LineTitle,
//     imgsData,
// carouselDesing,
//     openCarousel
//
//   } = req.body
//   if (req.files) {
//     const featured = req.files.featured
//     let featuredUrl = null
//
//       cloudinary.uploader
//           .upload(featured.tempFilePath, (error, result) => {
//             if (error) {
//               console.log('Error', error)
//             } else {
//               //console.log("Result", result);
//               featuredUrl = result.url
//             }
//           })
//           .then(() => {
//             const newPlace = new Place({
//               title,
//               imgsData: imgsData,
//               // featuredImage: featuredImage,
//               image: featuredUrl,
//               description,
//               category,
//               city,
//               link,
//               tag,
//               long,
//               creator,
//               userId,
//               time,
//               passwordo,
//               havePassword,
//               publish,
//               useit,
//               rotation,
//               rotationSpeed,openDescription,loop,direction,
//               zoom,
//               pause,
//               showImageFeaturedInPause,
//               playicon,disTourTitle,pauseOpacity,cssTourTitle,EnableLine,LineTitle, carouselDesing ,openCarousel
//             })
//             console.log(newPlace)
//             newPlace
//               .save()
//               .then(place => {
//                 return res.json({ place })
//               })
//               .catch(error => {
//                 return res.json({ error })
//               })
//           })
//           .catch(error => {
//             return res.json({ error })
//         })
//
//   } else {
//     return res.json({
//       message: 'You must have to pass atleast one featured and one 360 image'
//     })
//   }
// }




const addPlace = async (req, res, next) => {
  const {
    title,
    description,
    category,
    city,
    link,
    tag,
    long,
    creator,
    userId,
    time,
    passwordo,
    havePassword,
    publish,
    useit,
    rotation,

    rotationSpeed,
    openDescription,
    loop,
    direction,
     zoom,
    pause,
    showImageFeaturedInPause,
    playicon,
    disTourTitle,
    pauseOpacity,
    cssTourTitle,
    EnableLine,
    LineTitle,
    imgsData,
    featured

  } = req.body
            const newPlace = new Place({
              title,
              imgsData: imgsData,
              image: featured,
              description,
              category,
              city,
              link,
              tag,
              long,
              creator,
              userId,
              time,
              passwordo,
              havePassword,
              publish,
              useit,
              rotation,

              rotationSpeed,openDescription,loop,direction,
              zoom,
              pause,
              showImageFeaturedInPause,
              playicon,disTourTitle,pauseOpacity,cssTourTitle,EnableLine,LineTitle
            })
            console.log(newPlace)
            newPlace
              .save()
              .then(place => {
                return res.json({ place })
              })
              .catch(error => {
                return res.json({ error })
              })
}










const updatePlace = async (req, res, next) => {
  // const file = req.files.photo;
  // console.log(file);
  const error = validationResult(req) //validator
  if (!error.isEmpty()) {
    throw new HttpError(
      'unable to update your data,,invalid input passed, please check your data ',
      422
    )
  }
  const { title, description, category, city, link, long, id, image, time,
    passwordo,
    havePassword,
    publish,
    useit,rotation,rotationSpeed,openDescription,loop,direction,
    zoom,
    pause,showImageFeaturedInPause,playicon,disTourTitle,pauseOpacity,cssTourTitle,EnableLine,LineTitle,carouselDesing,openCarousel } = req.body
  const placeId = req.params.pid
  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError(
      'we can not update your Place details, sorry ',
      500
    )
    return next(error)
  }

  if (req.files) {
    const file = req.files.photo
    let imageUrl = null
    cloudinary.uploader
      .upload(file.tempFilePath, (error, result) => {
        if (error) {
          console.log('Error', error)
        } else {
          //console.log("Result", result);
          imageUrl = result.url
        }
      })
      .then(() => {
        place.title = title
        place.description = description
        place.city = city
        place.link = link
        place.long = long
        place.category = category
        place.time = time
        place.passwordo= passwordo
        place.havePassword= havePassword
        place.publish= publish
        place.useit= useit
        place.rotation=rotation

        place.rotationSpeed= rotationSpeed
        place.openDescription=openDescription
        place.loop=loop
        place.direction=direction
        place.zoom=zoom
        place.pause=pause
        place.showImageFeaturedInPause=showImageFeaturedInPause
        place.playicon=playicon
        place.disTourTitle=disTourTitle
        place.pauseOpacity=pauseOpacity
        place.cssTourTitle=cssTourTitle
        place.LineTitle=LineTitle
        place.EnableLine=EnableLine
        place.carouselDesing=carouselDesing
        place.openCarousel=openCarousel



        if (imageUrl) {
          place.image = imageUrl
        }
        place
          .save()
          .then(() => {
            res.status(200).json({ place: place.toObject({ getters: true }) })
          })
          .catch(error => {
            res.json({ error })
          })
      })
  } else {
    place.title = title
    place.description = description
    place.city = city
    place.link = link
    place.long = long
    place.category = category
    place.time = time
    place.passwordo= passwordo
    place.havePassword= havePassword
    place.publish= publish
    place.useit= useit
    place.rotation=rotation

    place.rotationSpeed= rotationSpeed
    place.openDescription=openDescription
    place.loop=loop
    place.direction=direction
    place.zoom=zoom
    place.pause=pause
    place.showImageFeaturedInPause=showImageFeaturedInPause
    place.playicon=playicon
    place.disTourTitle=disTourTitle
    place.pauseOpacity=pauseOpacity
    place.cssTourTitle=cssTourTitle
    place.LineTitle=LineTitle
    place.EnableLine=EnableLine
    place.carouselDesing=carouselDesing
    place.openCarousel=openCarousel


    place
      .save()
      .then(() => {
        res.status(200).json({ place: place.toObject({ getters: true }) })
      })
      .catch(error => {
        res.json({ error })
      })
  }
}

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid
  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError('can not delete the place', 500)
    return next(error)
  }
  try {
    await place.remove()
  } catch (err) {
    const error = new HttpError('can not delete the place', 500)
    return next(error)
  }
  res.status(200).json({ message: 'place deleted' })
}

const uploadImages = async (req, res, next) => {
  const filePaths = req.files.image
  console.log(filePaths)

  let multipleUpload = new Promise(async (resolve, reject) => {
    let upload_len = filePaths.length
    let upload_res = new Array()

    for (let i = 0; i < upload_len; i++) {
      console.log('i am in')
      let filePath = filePaths[i]
      console.log(filePath)
      await cloudinary.uploader.upload(
        filePath.tempFilePath,
        (error, result) => {
          if (upload_res.length >= upload_len) {
            /* resolve promise after upload is complete */
            resolve(upload_res)
          } else if (result) {
            /*push public_ids in an array */
            upload_res.push(result.public_id)
          } else if (error) {
            console.log(error)
            reject(error)
          }
        }
      )
    }
  })
    .then(result => result)
    .catch(error => error)

  /*waits until promise is resolved before sending back response to user*/
  let upload = await multipleUpload
  res.json({ response: upload })
}

exports.getPlacesByUserId = getPlacesByUserId
exports.getPlaceById = getPlaceById
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace
exports.getPlaces = getPlaces
exports.uploadImages = uploadImages
exports.addPlace = addPlace
