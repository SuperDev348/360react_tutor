const HttpError = require('../models/http-error')
const { v4: uuid } = require('uuid')
const Counter = require('../models/Counter')
const fs = require('fs')



const getCounter = async (req, res, next) => {

  Counter.find()
    .exec()
    .then((counter) => res.json(counter))
    .catch((err) => next(err));


}





const createCounter = async (req, res, next) => {
    const { uuid1 } = req.body
const counter = new Counter({uuid1});

  counter.save()
    .then(() => res.json(counter))
    .catch((err) => next(err));

}


const increCounter = async (req, res, next) => {
  Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count++;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
}

const deleteCounter = async (req, res, next) => {
  Counter.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((counter) => res.json())
    .catch((err) => next(err));
}





exports.getCounter = getCounter
exports.createCounter = createCounter
exports.increCounter = increCounter
exports.deleteCounter = deleteCounter

// exports.addThreeSixty = addThreeSixty;
// exports.deleteThreeSixty = deleteThreeSixty;
