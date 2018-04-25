const path = require('path')
const express = require('express')
const app = express()

app.set('views', path.join(__dirname, 'views')) // Setting directory of default template files.
app.set('view engine', 'ejs') // Setting template engine as ejs.

app.listen(3000)

