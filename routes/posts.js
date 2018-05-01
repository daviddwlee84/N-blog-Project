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
      throw new Error(postsString.post.error.no_title)
    }
    if (!content.length) {
      throw new Error(postsString.post.error.no_content)
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
      req.flash('success', postsString.post.success)
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
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error(postsString.edit.error.no_post)
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error(postsString.edit.error.not_author)
      }
      res.render('edit', {
        post: post
      })
    })
    .catch(next)
})

// POST /posts/:postId/edit Update an article
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  // Check input
  try {
    if (!title.length) {
      throw new Error(postsString.post.error.no_title)
    }
    if (!content.length) {
      throw new Error(postsString.post.error.no_content)
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error(postsString.edit.error.no_post)
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error(postsString.edit.error.not_author)
      }
      PostModel.updatePostById(postId, { title: title, content: content })
        .then(function () {
          req.flash('success', postsString.edit.success)
          // Redirect to last page after editting successfully
          res.redirect(`/posts/${postId}`)
        })
        .catch(next)
    })
})

// GET /posts/:postId/remove Delete an article
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error(postsString.post.error.no_title)
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error(postsString.post.error.no_content)
      }
      PostModel.delPostById(postId)
        .then(function () {
          req.flash('success', postsString.delete.success)
          // Redirect to main page after deleting successfully
          res.redirect('/posts')
        })
        .catch(next)
    })
})

module.exports = router
