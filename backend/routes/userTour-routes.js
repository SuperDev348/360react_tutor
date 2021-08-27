const express = require("express");
const router = express.Router();
const userTourControllers = require("../controllers/userTour-controllers");
const { check } = require("express-validator");

router.get("/", userTourControllers.getUserTours);
router.post("/", userTourControllers.addUserTour);
router.get("/:uid", userTourControllers.getUserToursByUserId);
router.delete("/:id", userTourControllers.deleteUserTourById);

module.exports = router;
