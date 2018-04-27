const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// GET /posts All users or specific user's article page
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  res.render('posts')
})

// POST /posts/create Create an article
router.post('/create', checkLogin, function (req, res, next) {
  res.send('Create Article')
})

// GET /posts/create Create article page
router.get('/create', checkLogin, function (req, res, next) {
  res.send('Create Article Page')
})

// GET /posts/:postId Single article page
router.get('/:postId', function (req, res, next) {
  res.send('Article Detail Page')
})

// GET /posts/:postId/edit Update article page
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('Update Article Page')
})

// POST /posts/:postId/edit Update an article
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('Update an Article')
})

// GET /posts/:postId/remove Delete an article
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  res.send('Delete an Article')
})

module.exports = router
