const express = require('express')
const router = express.Router()
const sha1 = require('sha1')

const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/users')
const signinString = require('../strings/signin.json')

// GET /signin Sign in page
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin')
})

// POST /signin User sign in
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const password = req.fields.password

  // Check input
  try {
    if (!name.length) {
      throw new Error(signinString.error.no_username)
    }
    if (!password.length) {
      throw new Error(signinString.error.no_password)
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('/signin')
  }

  UserModel.getUserByName(name)
    .then(function (user) {
      if (!user) {
        req.flash('error', signinString.error.user_undefine)
        return res.redirect('/signin')
      }
      // Check if password match
      if (sha1(password) !== user.password) {
        req.flash('error', signinString.error.wrong_input)
        return res.redirect('/signin')
      }
      req.flash('success', signinString.success)
      // Write user into session
      delete user.password
      req.session.user = user
      // Redirect to main page
      res.redirect('/posts')
    })
    .catch(next)
})

module.exports = router
