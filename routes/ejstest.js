const express = require('express')
const router = express.Router()


router.get('/', function (req, res) {
  res.render('ejstest', {
    supplies: ['mop', 'broom', 'duster']
  })
})

module.exports = router
