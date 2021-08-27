const Tour = require("../models/Tour");

const getTours = (req, res, next) => {
  Tour.find()
    .then(tours => {
      res.json({ tours });
    })
    .catch(error => {
      res.json({ error });
    });
};

const addTours = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const placeId = req.body.placeId;
  const userId = req.body.userId;

  const newTour = new Tour({ title, description, placeId, userId });

  newTour
    .save()
    .then(tour => {
      res.json({ tour, message: "Tour added successfully" });
    })
    .catch(error => {
      if (error.code === 11000) {
        res.json({ message: 'There should be only one tour for a user', error })
      }
      else {
        res.json({ error });
      }
    });
};

const getToursByUserId = (req, res, next) => {
  const userId = req.params.uid;
  Tour.find({ userId })
    .then(tours => {
      res.json({ tours });
    })
    .catch(error => {
      res.json({ error });
    });
};

const updateTour = (req, res, next) => {
  const id = req.params.tid;
  const title = req.body.title;
  const description = req.body.description;
  Tour.findByIdAndUpdate(id, { title, description })
    .then(tour => {
      res.json({ tour, message: "Tour updated successfully" });
    })
    .catch(error => {
      res.json({ error });
    });
};

const deleteTour = (req, res, next) => {
  const id = req.params.tid;
  Tour.findByIdAndDelete(id)
    .then(tour => {
      res.json({ tour, message: "Tour deleted successfully" });
    })
    .catch(error => {
      res.json({ error });
    });
};

const getTourById = (req, res, next) => {
  const tid = req.params.tid;
  Tour.findById(tid)
    .then(tour => {
      res.json({ tour, message: "Tour found" });
    })
    .catch(error => {
      res.json({ error });
    });
};

exports.getTours = getTours;
exports.addTours = addTours;
exports.getToursByUserId = getToursByUserId;
exports.updateTour = updateTour;
exports.deleteTour = deleteTour;
exports.getTourById = getTourById;
