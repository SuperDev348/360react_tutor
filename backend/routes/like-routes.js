const express = require('express')
const router = express.Router()
const likecontrollers = require('../controllers/like-controllers')
const fs = require('fs')


router.get('/', likecontrollers.getLike)
router.post('/', likecontrollers.createlike)
router.put('/:id/increment',likecontrollers.increLike)
router.put('/:id/decrement',likecontrollers.decreLike)
// router.delete('/:id', countercontrollers.deleteCounter)

// router.post("/three/:pid", placecontrollers.addThreeSixty);
// router.delete("/three/:pid/:tid", placecontrollers.deleteThreeSixty);

module.exports = router
