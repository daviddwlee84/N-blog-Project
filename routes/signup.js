const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup Sign up page
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signup')
})

// POST /signup User sign up
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const gender = req.fields.gender
  const bio = req.fields.bio
  let avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password
  const repassword = req.fields.repassword

  // Testing input parameters
  try {
    if (!(name.length >= 1 && name.length <= 20)) {
      throw new Error('Username length is restricted between 1~20 characters')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('Gender can only be m, f or x')
    }
    if (!(bio.length >= 1 && bio.length <= 100)) {
      throw new Error('Bio length is limited in 1~100 characters')
    }
    if (password.length < 6) {
      throw new Error('Password length must be at least 6 characters')
    }
    if (password !== repassword) {
      throw new Error('Inconsistent password')
    }
  } catch (e) {
    // Sign up fail, delete avatar asynchronously
    fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/signup')
  }

  // Plaintext password encryption
  password = sha1(password)

  // If user don't upload avatar
  if (!req.files.avatar.name) {
    if (gender === 'f') {
      avatar = 'UnknownWoman.png'
    } else {
      avatar = 'UnknownMan.png'
    }
  }

  // User information to be written to the database
  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  }
  // Written user information into database
  UserModel.create(user)
    .then(function (result) {
      // This user is a value inserted after mongodb, including _id
      user = result.ops[0]
      // Delete password (sensitive information). Store user information into session
      delete user.password
      req.session.user = user
      // Write into flash
      req.flash('success', 'Sign up successfully')
      // Redirect to main page
      res.redirect('/posts')
    })
    .catch(function (e) {
      // Sign up fail, delete avatar asynchronously
      fs.unlink(req.files.avatar.path)
      // Username has been used then redirect to main page instead of error page
      if (e.message.match('duplicate key')) {
        req.flash('error', 'Userneme has been used')
        return res.redirect('/signup')
      }
      next(e)
    })
})

module.exports = router
