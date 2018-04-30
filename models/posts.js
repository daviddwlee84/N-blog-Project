const Post = require('../lib/mongo').Post

module.exports = {
  // Create an article
  create: function create (post) {
    return Post.create(post).exec()
  }
}
