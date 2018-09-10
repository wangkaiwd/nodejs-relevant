var express = require('express')
var router = express.Router()
const User = require('../models/in_memo/user')

/* GET users listing. */
router.get('/', (req, res) => {
  console.log(req.query)
  const u = new User(req.query.firstName, req.query.lastName, req.age)
  res.render('user', {title: u.getName()})
})

module.exports = router
