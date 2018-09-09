var express = require('express')
var router = express.Router()
const User = require('../models/in_memo/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
