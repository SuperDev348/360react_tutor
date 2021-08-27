const express = require("express");
const router = express.Router();
const tourControllers = require("../controllers/tour-controllers");
const { check } = require("express-validator");

router.get("/", tourControllers.getTours);
router.get("/:uid", tourControllers.getToursByUserId);
router.post("/", tourControllers.addTours);
router.patch("/:tid", tourControllers.updateTour);

router.delete("/:tid", tourControllers.deleteTour);
router.get("/tour/:tid", tourControllers.getTourById);

module.exports = router;
