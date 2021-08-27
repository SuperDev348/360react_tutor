const express = require('express')
const router = express.Router()
const countercontrollers = require('../controllers/counter-controllers')
const fs = require('fs')


router.get('/', countercontrollers.getCounter)
router.post('/', countercontrollers.createCounter)
router.put('/:id/increment',countercontrollers.increCounter)
router.delete('/:id', countercontrollers.deleteCounter)

// router.post("/three/:pid", placecontrollers.addThreeSixty);
// router.delete("/three/:pid/:tid", placecontrollers.deleteThreeSixty);

module.exports = router
