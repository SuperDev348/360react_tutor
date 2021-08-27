// const HttpError = require("../models/http-error");
// const { validationResult } = require("express-validator");
// const User = require("../models/user");
// let jwt = require("jsonwebtoken"); // importing jwt
//
// const { v4: uuid } = require("uuid");
//
// let DYMMY_USERS = [
//   {
//     id: "p1",
//     name: "elias",
//     email: "eliaskhs@hotmail.com",
//     password: "1234qwer"
//   },
//   {
//     id: "p2",
//     name: "elias2",
//     email: "eliaskhs@hotmail.com",
//     password: "1234qwer"
//   }
// ];
//
// const getUsers = async (req, res, next) => {
//   // verify the token by jwt here as well to return users
//   jwt.verify(req.token, "secretkey", async (error, authData) => {
//     if (error) {
//       res.sendStatus(403);
//     } else {
//       let users;
//       try {
//         users = await User.find({}, "-password");
//       } catch (err) {
//         const error = new HttpError("can not find the users", 5000);
//         return next(error);
//       }
//       res.json(users.map(user => user.toObject({ getters: true })));
//     }
//   });
// };
//
// const signUp = async (req, res, next) => {
//   const error = validationResult(req); //validator
//   if (!error.isEmpty()) {
//     return next(
//       new HttpError(
//         "unable to sign up ,invalid input passed, please check your data ",
//         422
//       )
//     );
//   }
//   const { username, email, password, places, creator } = req.body;
//
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ emai: email }); // here we will check if the mail existing already
//   } catch (err) {
//     const error = new HttpError("can not sign up there is unknown error ", 500);
//     return next(error);
//   }
//   if (existingUser) {
//     const error = new HttpError(
//       "user exist already, please login instead",
//       422
//     );
//     return next(error);
//   }
//   const createdUser = new User({
//     username,
//     email,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/b/bb/Paul_Klee_WI_%28In_Memoriam%29_1938.jpg",
//     password,
//     places,
//     creator,
//     isAdmin: req.body.isAdmin?true:false
//   });
//   createdUser.save().then(user => res.status(201).json(createdUser.toObject({ getters: true }))).catch(error => {
//     if(error.code === 11000) {
//       return res.json({message : 'Email already exists'})
//     }
//     res.json({error, message:'User cannot be created'})
//   })
//
// };
//
// const signIn = async (req, res, next) => {
//   const { email, password } = req.body;
//
//   User.findOne({ email: email, password: password })
//     .then(user => {
//       if (!user) {
//         res.json({ message: "User not found" });
//       }
//       jwt.sign({ user: user }, "secretkey", (error, token) => {
//         //console.log(token);
//         res.json({ message: "logged in", token, user });
//       });
//     })
//     .catch(error => {
//       res.json({ error });
//     });
// };
//
// exports.getUsers = getUsers;
// exports.signUp = signUp;
// exports.signIn = signIn;

const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator')
const User = require('../models/user')
let jwt = require('jsonwebtoken') // importing jwt


const { v4: uuid } = require('uuid')

let DYMMY_USERS = [
  {
    id: 'p1',
    name: 'elias',
    email: 'eliaskhs@hotmail.com',
    password: '1234qwer'
  },
  {
    id: 'p2',
    name: 'elias2',
    email: 'eliaskhs@hotmail.com',
    password: '1234qwer'
  }
]

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dd97mjjt2',
  api_key: '274253912236812',
  api_secret: 'Uwjh26mCiIyphfEC46B2Fm-LFDA'
})

const getUsers = async (req, res, next) => {
  // verify the token by jwt here as well to return users

  let users
  try {
    users = await User.find({}, '-password')
  } catch (err) {
    const error = new HttpError('can not find the users', 5000)
    return next(error)
  }
  res.json(users.map(user => user.toObject({ getters: true })))
}

// const signUp = async (req, res, next) => {
//   const error = validationResult(req) //validator
//   if (!error.isEmpty()) {
//     return next(
//       new HttpError(
//         'unable to sign up ,invalid input passed, please check your data ',
//         422
//       )
//     )
//   }
//   const { username, email, password, places, creator } = req.body
//
//   let existingUser
//   try {
//     existingUser = await User.findOne({ emai: email }) // here we will check if the mail existing already
//   } catch (err) {
//     const error = new HttpError('can not sign up there is unknown error ', 500)
//     return next(error)
//   }
//   if (existingUser) {
//     const error = new HttpError('user exist already, please login instead', 422)
//     return next(error)
//   }
//   const createdUser = new User({
//     username,
//     email,
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/b/bb/Paul_Klee_WI_%28In_Memoriam%29_1938.jpg',
//     password,
//     places,
//     creator,
//     isAdmin: req.body.isAdmin ? true : false
//   })
//   createdUser
//     .save()
//     .then(user => res.status(201).json(createdUser.toObject({ getters: true })))
//     .catch(error => {
//       if (error.code === 11000) {
//         return res.json({ message: 'Email already exists' })
//       }
//       res.json({ error, message: 'User cannot be created' })
//     })
// }


const signUp = async (req, res, next) => {
  const error = validationResult(req) //validator
  if (!error.isEmpty()) {
    return next(
      new HttpError(
        'unable to sign up ,invalid input passed, please check your data ',
        422
      )
    )
  }
  const { username, email, password, places, creator,name,bio,website,twitter,facebook,google,linkid,instagram,isEditor } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ emai: email }) // here we will check if the mail existing already
  } catch (err) {
    const error = new HttpError('can not sign up there is unknown error ', 500)
    return next(error)
  }
  if (existingUser) {
    const error = new HttpError('user exist already, please login instead', 422)
    return next(error)
  }
  const createdUser = new User({
    username,
    email,
    image:
      'https://res.cloudinary.com/dx1zby8rs/image/upload/v1601817748/hemdgw3pqmp0cdtujlel.png',
    password,
    places,
    creator,
    name,
    bio,
    website,
    twitter,
    facebook,
    google,
    linkid,
    instagram,
    isEditor,
    isAdmin: req.body.isAdmin ? true : false
  })
  createdUser
    .save()
    .then(user => res.status(201).json(createdUser.toObject({ getters: true })))
    .catch(error => {
      if (error.code === 11000) {
        return res.json({ message: 'Email already exists' })
      }
      res.json({ error, message: 'User cannot be created' })
    })
}


const signIn = async (req, res, next) => {
  const { email, password } = req.body

  User.findOne({ email: email, password: password })
    .then(user => {
      if (!user) {
        res.json({ message: 'User not found' })
      }
      jwt.sign({ user: user }, 'secretkey', (error, token) => {
        //console.log(token);
        res.json({ message: 'logged in', token, user })
      })
    })
    .catch(error => {
      res.json({ error })
    })
}

// const updateUser = async (req, res, next) => {
//   const { uid } = req.params
//   const { username } = req.body
//
//   if (req.files) {
//     const image = req.files.image
//     const { username } = req.body
//     let imageUrl = null
//     cloudinary.uploader
//       .upload(image.tempFilePath, (error, result) => {
//         if (error) {
//           console.log('Error', error)
//         } else {
//           imageUrl = result.url
//         }
//       })
//       .then(() => {
//         User.findByIdAndUpdate(
//           uid,
//           { username, image: imageUrl },
//           { new: true }
//         )
//           .then(user => {
//             const { username, email, image } = user
//             const updatedUser = { username, email, image }
//             return res.json({ user: updatedUser })
//           })
//           .catch(error => {
//             return res.json({ error })
//           })
//       })
//       .catch(error => {
//         return res.json({ error })
//       })
//   } else {
//     User.findByIdAndUpdate(uid, { username }, { new: true }).then(user => {
//       const { username, email, image } = user
//       const updatedUser = { username, email, image }
//       return res.json({ user: updatedUser })
//     })
//   }
// }


const updateUser = async (req, res, next) => {
  const { uid } = req.params
  const { username } = req.body
  const {name} = req.body
  const {bio} = req.body
  const {website} = req.body
  const {twitter} = req.body
  const {facebook} = req.body
  const {linkid} = req.body
  const {google} = req.body
  const {instagram} = req.body

  if (req.files) {
    const image = req.files.image
    const { username } = req.body
    const {name} = req.body
    const {bio} = req.body
    const {website} = req.body
    const {twitter} = req.body
    const {facebook} = req.body
    const {linkid} = req.body
    const {google} = req.body
    const {instagram} = req.body

    let imageUrl = null
    cloudinary.uploader
      .upload(image.tempFilePath, (error, result) => {
        if (error) {
          console.log('Error', error)
        } else {
          imageUrl = result.url
        }
      })
      .then(() => {
        User.findByIdAndUpdate(
          uid,
          { username,name,bio,website,twitter,facebook,linkid,google,instagram,image: imageUrl },
          { new: true }
        )
          .then(user => {
            const { username,name,bio,website,twitter,facebook,linkid,google,instagram,email, image } = user
            const updatedUser = { sername,name,bio,website,twitter,facebook,linkid,google,instagram,email, image }
            return res.json({ user: updatedUser })
          })
          .catch(error => {
            return res.json({ error })
          })
      })
      .catch(error => {
        return res.json({ error })
      })
  } else {
    User.findByIdAndUpdate(uid, { username,name,bio,website,twitter,facebook,linkid,google,instagram }, { new: true }).then(user => {
      const { username,name,bio,website,twitter,facebook,linkid,google,instagram, email, image } = user
      const updatedUser = { username,name,bio,website,twitter,facebook,linkid,google,instagram, email, image }
      return res.json({ user: updatedUser })
    })
  }
}

const updatePassword = async (req, res, next) => {
  const { email, password, newPassword, confirmPassword } = req.body
  User.findOne({ email, password })
    .then(user => {
      if (user) {
        if (newPassword === confirmPassword) {
          const { id } = user
          User.findByIdAndUpdate(id, { password: newPassword }, { new: true })
            .then(updateUser => {
              return res.json({ user: updateUser })
            })
            .catch(error => {
              return res.json({ error })
            })
        } else {
          return res.json({
            message: 'Password and confirm password fields must match'
          })
        }
      } else {
        return res.json({ message: 'User not found' })
      }
    })
    .catch(error => {
      return res.json({ error })
    })
}

const deleteUserById = (req, res) => {
  const { id } = req.params
  console.log('id is: ', id)
  User.findOneAndDelete({ _id: id })
    .then(user => {
      if (user) {
        return res.json({ user, message: 'User deleted successfully' })
      } else {
        return res.json({ message: 'No user found by this id' })
      }
    })
    .catch(error => {
      return res.json({ message: 'User not found', error })
    })
}

const getUserById = async (req, res, next) => {
  const _id = req.params.uid
  let user
  try {
    user = await User.find({ _id: _id })
  } catch (err) {
    const error = HttpError(
      'can not find user with this user id, sorry Elias',
      500
    )
    return next(error)
  }

  if (!user || user.length === 0) {
    return next(
      new HttpError('Could not find a places for the provided id.', 404)
    )
  }
  res.json(user.map(place => place.toObject({ getters: true })))
}





exports.getUsers = getUsers
exports.signUp = signUp
exports.signIn = signIn
exports.updateUser = updateUser
exports.updatePassword = updatePassword
exports.deleteUserById = deleteUserById
exports.getUserById= getUserById
