const express = require('express')
const app = express()

const auth = (req, res, next) => {
  console.log(req.query)
  if (req.query.username === 'laoyang') {
    next()
  } else {
    res.end('please go away!')
  }
}

app.use(auth)

app.use((req, res) => {
  res.end('Hello world')
})
app.listen(3000, () => {
  console.log('listen 3000 port')
})