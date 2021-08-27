const express = require("express");
const router = express.Router();
const threeDControllers = require("../controllers/threeD-controllers");
const { check } = require("express-validator");

router.get("/", threeDControllers.getThreeSixty);
router.get("/:pid", threeDControllers.getThreeSixtyByPlaceId);

router.post("/:pid", threeDControllers.addThreeSixty);
router.delete("/:tid", threeDControllers.deleteThreeSixty);

router.patch("/:tid", threeDControllers.updateThreeSixty);

module.exports = router;
