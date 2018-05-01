const marked = require('marked')
const Comment = require('../lib/mongo').Comment

// Transfer content of comment from markdown to html
Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

module.exports = {
  // Create a commment
  create: function create (comment) {
    return Comment.create(comment).exec()
  },

  // Get a comment by the comment id
  getCommentById: function getCommentById (commentId) {
    return Comment.findOne({ _id: commentId }).exec()
  },

  // Delete a comment by the comment id
  delCommentById: function delCommentById (commentId) {
    return Comment.deleteOne({ _id: commentId }).exec()
  },

  // Delete all the comment by the article id (Delete all comments when delete the article)
  delCommentsByPostId: function delCommentsByPostId (postId) {
    return Comment.deleteMany({ postId: postId }).exec()
  },

  // Get alll the comments by the article id and ascending order of created time
  getComments: function getComments (postId) {
    return Comment
      .find({ postId: postId })
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // Get comment amount by the article id
  getCommentsCount: function getCommentsCount (postId) {
    return Comment.count({ postId: postId }).exec()
  }
}
