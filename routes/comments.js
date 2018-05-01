const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comments')
const commentString = require('../strings/comments.json')

// POST /comments Create a comment
router.post('/', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const postId = req.fields.postId
  const content = req.fields.content

  // Check input
  try {
    if (!content.length) {
      throw new Error(commentString.create.error.no_content)
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  const comment = {
    author: author,
    postId: postId,
    content: content
  }

  CommentModel.create(comment)
    .then(function () {
      req.flash('success', commentString.create.success)
      // Redirect to last page after leave the comment successfully
      res.redirect('back')
    })
    .catch(next)
})

// GET /comments/:commentId/remove Delete a comment
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
  const commentId = req.params.commentId
  const author = req.session.user._id

  CommentModel.getCommentById(commentId)
    .then(function (comment) {
      if (!comment) {
        throw new Error(commentString.delete.error.no_comment)
      }
      if (comment.author.toString() !== author.toString()) {
        throw new Error(commentString.delete.error.not_author)
      }
      CommentModel.delCommentById(commentId)
        .then(function () {
          req.flash('success', commentString.delete.success)
          // Redirect to last page after deleting successfully
          res.redirect('back')
        })
        .catch(next)
    })
})

module.exports = router
