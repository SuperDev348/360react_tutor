const ThreeD = require("../models/ThreeD");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dd97mjjt2",
  api_key: "274253912236812",
  api_secret: "Uwjh26mCiIyphfEC46B2Fm-LFDA"
});

const getThreeSixty = (req, res, next) => {
  ThreeD.find()
    .then(places => {
      res.json({ places });
    })
    .catch(error => {
      res.json({ error });
    });
};

const getThreeSixtyByPlaceId = (req, res, next) => {
  const placeId = req.params.pid;
  ThreeD.find({ placeId })
    .then(places => {
      if (places) {
        res.json({ places, message: "Three sixty places found" });
      } else {
        res.json({ message: "No three sixty places found for this place id" });
      }
    })
    .catch(error => {
      res.json({ error });
    });
};

const addThreeSixty = (req, res, next) => {
  //console.log(req.files.image);
  console.log(req.body.title);

  const pid = req.params.pid;
  const title = req.body.title;
  console.log(pid);

  let url = null;
  if (req.files) {
    const file = req.files.image;

    cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Result", result);
        url = result.url;
        const three = new ThreeD({
          image: url,
          placeId: pid,
          title: title
        });
        three
          .save()
          .then(place => {
            res.json({ place, message: "Three sixty place added succesfully" });
          })
          .catch(error => {
            res.json({ error });
          });
      }
    });
  }
};

const deleteThreeSixty = (req, res, next) => {
  console.log(req.params.tid);
  const tid = req.params.tid;
  ThreeD.findByIdAndDelete(tid)
    .then(place => {
      if (place) {
        res.json({ place, message: "Deleted successfully" });
      } else {
        res.json({ message: "No three sixty place found by this id" });
      }
    })
    .catch(error => {
      res.json({ error });
    });
};

const updateThreeSixty = (req, res, next) => {
  console.log(req.params.tid);
  const tid = req.params.tid;
  const title = req.body.title;
  if (req.files) {
    const file = req.files.image;

    cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Result", result);
        url = result.url;
        ThreeD.findByIdAndUpdate(tid, {
          title,
          image: url
        })
          .then(place => {
            res.json({
              place,
              message: "Three sixty place updated succesfully"
            });
          })
          .catch(error => {
            res.json({ error });
          });
      }
    });
  } else {
    ThreeD.findByIdAndUpdate(tid, {
      title
    })
      .then(place => {
        res.json({ place, message: "Three sixty place updated succesfully" });
      })
      .catch(error => {
        res.json({ error });
      });
  }
};

exports.getThreeSixty = getThreeSixty;
exports.addThreeSixty = addThreeSixty;
exports.deleteThreeSixty = deleteThreeSixty;
exports.getThreeSixtyByPlaceId = getThreeSixtyByPlaceId;
exports.updateThreeSixty = updateThreeSixty;
