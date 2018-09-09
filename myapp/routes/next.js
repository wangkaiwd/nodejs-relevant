const express = require('express')
const router = express.Router()

router.use('/', (req, res, next) => {
  console.log('mdw1')
  next('route')
})

router.use('/', (req, res, next) => {
  console.log('mdw2')
  next()
})
module.exports = router