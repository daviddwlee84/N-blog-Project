const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup Sign up page
router.get('/', checkNotLogin, function (req, res, next) {
  res.send('Sign Up Page')
})

// POST /signup User sign up
router.post('/', checkNotLogin, function (req, res, next) {
  res.send('Sign Up')
})

module.exports = router
