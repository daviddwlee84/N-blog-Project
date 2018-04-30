const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

const signoutString = require('../strings/signout.json')

// GET /signout Sign out
router.get('/', checkLogin, function (req, res, next) {
  // Clear user information in session
  req.session.user = null
  // Show success message
  req.flash('success', signoutString.success)
  // Return to main page when sign out successfully
  res.redirect('/posts')
})

module.exports = router
