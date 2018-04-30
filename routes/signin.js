const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin Sign in page
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin')
})

// POST /signin User sign in
router.post('/', checkNotLogin, function (req, res, next) {
  res.send('Sign In')
})

module.exports = router
