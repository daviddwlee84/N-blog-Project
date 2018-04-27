const User = require('../lib/mongo').User

module.exports = {
  // Sign up an user
  create: function create (user) {
    return User.create(user).exec()
  }
}
