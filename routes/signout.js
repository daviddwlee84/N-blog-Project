const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// GET /signout Signout
router.get('/', checkLogin, function (req, res, next) {
  res.send('Sign Out')
})

module.exports = router