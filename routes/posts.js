const express = require('express')
const router = express.Router()

const PostModel = require('../models/posts')
const postsString = require('../strings/posts.json')

const checkLogin = require('../middlewares/check').checkLogin

// GET /posts All users or specific user's article page
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  const author = req.query.author

  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
})

// POST /posts/create Create an article
router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  // Check input
  try {
    if (!title.length) {
      throw new Error(postsString.create.error.no_title)
    }
    if (!content.length) {
      throw new Error(postsString.create.error.no_content)
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  let post = {
    author: author,
    title: title,
    content: content
  }

  PostModel.create(post)
    .then(function (result) {
      // This post is a value inserted after mongodb, including _id
      post = result.ops[0]
      req.flash('success', postsString.create.success)
      // Redirect to the article page after successfully posting
      res.redirect(`/posts/${post._id}`)
    })
    .catch(next)
})

// GET /posts/create Create article page
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create')
})

// GET /posts/:postId Single article page
router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId

  Promise.all([
    PostModel.getPostById(postId), // Get article content
    PostModel.incPv(postId)// pv plus 1
  ])
    .then(function (result) {
      const post = result[0]
      if (!post) {
        throw new Error(postsString.view.error.no_post)
      }

      res.render('post', {
        post: post
      })
    })
    .catch(next)
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
