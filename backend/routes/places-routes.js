const express = require('express')
const router = express.Router()
const placecontrollers = require('../controllers/places-controllers')
const { check } = require('express-validator')
const upload = require('./../multer.js')
const fs = require('fs')

router.get('/', placecontrollers.getPlaces)

router.get('/:pid', placecontrollers.getPlaceById)

router.get('/user/:uid', placecontrollers.getPlacesByUserId)

// router.post('/', placecontrollers.createPlace)
router.post('/add', placecontrollers.addPlace)

router.patch(
  '/:pid',

  placecontrollers.updatePlace
)
router.post('/upload-image', placecontrollers.uploadImages)

router.delete('/:pid', placecontrollers.deletePlace)

// router.post("/three/:pid", placecontrollers.addThreeSixty);
// router.delete("/three/:pid/:tid", placecontrollers.deleteThreeSixty);

module.exports = router
