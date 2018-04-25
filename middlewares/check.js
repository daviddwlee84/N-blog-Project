// Auhority Control

module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    /* When req.session.user doesn't exist,
    we determine user hasn't logged in.
    Redirect to signin page and show "Please Log In" notification.
    Use on the page require logged in to manipulate.
    */
    if (!req.session.user) {
      req.flash('error', 'Please Log In')
      return res.redirect('/signin')
    }
    next()
  },

  /* When req.session.user exist,
    we determine user has logged in.
    Redirect to previous page and show "Logged In" notification.
    Prohibit user visito login page or signup page when logged in.
    */
  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', 'Logged In')
      return res.redirect('back') // Return previous page
    }
    next()
  }
}
