const http = require('http')
const qs = require('querystring')
const server = http.createServer()
server.listen(8809)

server.on('request', (req, res) => {
  const {url, method} = req
  const path = url.slice(0, url.indexOf('?'))
  switch (path) {
    case '/users':
      switch (method) {
        case 'GET':
          res.statusCode = 200
          res.end('get 请求成功')
          break
        case 'POST':
          // 可以通过postman来进行图片上传的演示
          let dataCount = 0, reqBodyStr = ''
          req.on('data', (data) => {
            dataCount++
            reqBodyStr += data.toString()
          })
          req.on('end', () => {
            // console.log('dataCount', dataCount)
            // console.log('reqBody', reqBodyStr)
            // 参数是一个String或者Buffer类型
            res.end(dataCount + '')
          })
          break
      }
      break
    default:
      res.statusCode = 404
      res.end('NOT FOUND')
      break
  }
})