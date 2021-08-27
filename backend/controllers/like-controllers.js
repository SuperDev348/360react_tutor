const HttpError = require('../models/http-error')
const { v4: uuid } = require('uuid')
const Like = require('../models/Like')
const fs = require('fs')



const getLike = async (req, res, next) => {

  Like.find()
    .exec()
    .then((like) => res.json(like))
    .catch((err) => next(err));


}





const createlike = async (req, res, next) => {
    const { uuid2 } = req.body
const like = new Like({uuid2});

  like.save()
    .then(() => res.json(like))
    .catch((err) => next(err));

}


const increLike = async (req, res, next) => {
  Like.findById(req.params.id)
      .exec()
      .then((like) => {
        like.count++;

        like.save()
          .then(() => res.json(like))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
}


const decreLike = async (req,res,next)=>{
    Like.findById(req.params.id)
      .exec()
      .then((like)=>{
        like.count--;
        like.save().then(()=>res.json(like))
        .catch((err) => next(err));
      })
      .catch((err) => next(err));
}

// const deleteCounter = async (req, res, next) => {
//   Counter.findOneAndDelete({ _id: req.params.id })
//     .exec()
//     .then((counter) => res.json())
//     .catch((err) => next(err));
// }
//


exports.getLike= getLike
exports.createlike= createlike
exports.increLike = increLike
exports.decreLike= decreLike
// exports.deleteCounter = deleteCounter

// exports.addThreeSixty = addThreeSixty;
// exports.deleteThreeSixty = deleteThreeSixty;
