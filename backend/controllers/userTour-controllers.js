const UserTour = require("../models/user-tour");

const getUserTours = (req, res, next) => {
    UserTour.find()
        .then(userTours => {
            res.json({ userTours });
        })
        .catch(error => {
            res.json({ error });
        });
};


const addUserTour = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const image = req.body.image
    const userId = req.body.userId
    const tourId = req.body.tourId
    const newUserTour = new UserTour({ title, description, image, userId, tourId })

    newUserTour.save()
        .then(userTour => {
            return res.json({ userTour, message: "User tour added successfully" })
        }).catch(error => {
            return res.json({ error })
        })
}

const getUserToursByUserId = (req, res, next) => {
    const userId = req.params.uid
    UserTour.find({ userId })
        .then(userTours => {
            res.json({ userTours });
        })
        .catch(error => {
            res.json({ error });
        });
};

const deleteUserTourById = (req, res, next) => {
    const id = req.params.id
    UserTour.findByIdAndDelete(id).then(userTour => {
        return res.json({ userTour, message: 'User tour deleted successfully' })
    }).catch(error => {
        return res.json({ error })
    })
}

exports.getUserToursByUserId = getUserToursByUserId
exports.addUserTour = addUserTour
exports.getUserTours = getUserTours
exports.deleteUserTourById = deleteUserTourById
