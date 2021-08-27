const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const usersControllers = require('../controllers/users-controllers')

// function to verify token from header
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'] //get token from authorization

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.json({
      token: 'Invalid Token'
    })
  }
}
router.route('/').get(usersControllers.getUsers) //added the callback of verify token here

router.get('/:uid', usersControllers.getUserById)

// router.route('/:uid').get(usersControllers.getUserById) //added the callback of verify token here

router.post(
  '/signup',

  usersControllers.signUp
)

router.post('/login', usersControllers.signIn)

router.route('/update-user/:uid').patch(usersControllers.updateUser)

router.route('/update-password').patch(usersControllers.updatePassword)

router.route('/remove/:id').delete(usersControllers.deleteUserById)

module.exports = router
