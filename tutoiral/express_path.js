const express = require('express')
const app = express()

const mdw1 = (req, res, next) => {
  console.log('mdw1')
  next()
}
const mdw2 = (req, res, next) => {
  console.log('mdw2')
  next()
}
const mdw3 = (req, res, next) => {
  console.log('mdw3')
  res.end('done')
}

// 流程控制
app.use('/', mdw1)
app.use('/user', mdw2)
app.use(mdw3)

app.listen(3000, () => {
  console.log('监听3000端口')
})