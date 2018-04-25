const path = require('path')
const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const ejstestRouter = require('./routes/ejstest')

app.set('views', path.join(__dirname, 'views')) // Setting directory of default template files.
app.set('view engine', 'ejs') // Setting template engine as ejs.

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/ejstest', ejstestRouter)

app.listen(3000)

