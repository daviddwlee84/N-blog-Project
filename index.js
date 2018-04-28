// The order of loading middleware is very important
const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('./config/default')
const routes = require('./routes')
const pkg = require('./package')

const app = express()

// Setting directory of default template files.
app.set('views', path.join(__dirname, 'views'))
// Setting template engine as ejs.
app.set('view engine', 'ejs')

// Setting Static file directory
app.use(express.static(path.join(__dirname, 'public')))
// Import express-session to support session
app.use(session({
  name: config.session.key, // Setting session id store in cookie
  secret: config.session.secret, // Calculate hash value by setting secret and then store in cookie, produce signedCookie to prevent altering
  resave: true, // Force update session
  saveUninitialized: false, // Setting false. Force to create a session even though user doesn't login
  cookie: {
    maxAge: config.session.maxAge// Overdue time. When it reach expiration, automatically delete session id stored in cookie
  },
  store: new MongoStore({// Store session to mongodb
    url: config.mongodb// Mongodb address
  })
}))
// flash middleware. Used to show notification
app.use(flash())

// Configure template global constant
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// Adding three necessary template variable
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// Middleware handles forms and document uploading
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // Document uploading directory
  keepExtensions: true // Keep filename exentsion (e.g. *.jpeg, *.png)
}))

// Router
routes(app)

// Listening Port and Start Program
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
