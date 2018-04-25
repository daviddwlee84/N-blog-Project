const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// POST /comments Create a comment
router.post('/', checkLogin, function (req, res, next) {
  res.send('Create Comment')
})

// GET /comments/:commentId/remove Delete a comment
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
  res.send('Delete Comment')
})

module.exports = router
