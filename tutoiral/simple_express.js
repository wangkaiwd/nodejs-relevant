const express = require('express')
const app = express()
// 监听3000端口
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

// 当以get方式请求'/'根路径的时候,返回hello world
app.get('/', (req, res) => {
  console.log('url')
  console.log(req.url)
  res.send('Hello World')
})

// 使用Node http模块实现

// const http = require('http')
// const server = http.createServer()
// server.listen(8880)
// server.on('request', (req, res) => {
//   console.log('监听请求')
// })