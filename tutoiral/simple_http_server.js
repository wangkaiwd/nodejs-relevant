// schema://host:port/path?query#hash
// port: 22 ssh, 80:http, 443:https, 27017:mongodb
const http = require('http')
const qs = require('querystring')
const server = http.createServer()
server.listen(8808)

const users = []
server.on('request', (req, res) => {
  // res.statusCode = 200
  const {url} = req
  const queryString = url.slice(url.indexOf('?') + 1)
  const path = url.slice(0, url.indexOf('?'))
  const query = qs.parse(queryString)
  // let resStr
  // if (url === '/hello') {
  //   resStr = 'hi there'
  // } else if (url === '/bye') {
  //   resStr = 'see ya next time'
  // } else {
  //   resStr = 'I cant understand what are you saying'
  // }
  // console.log(url)
  console.log(path)
  switch (path) {
    case '/users':
      switch (req.method) {
        case 'GET':
          res.statusCode = 200
          res.end(JSON.stringify(users))
          break
        case 'POST':
          const contentType = req.headers['content-type']
          if (contentType !== 'application/json') {
            res.statusCode = 400
            res.end('error')
          }
          let requestBodyStr = ''
          req.on('data', (data) => {
            // console.log('data', data.toString())
            requestBodyStr += data.toString()
          })
          req.on('end', () => {
            const user = JSON.parse(requestBodyStr)
            users.push(user)
            res.statusCode = 200
            res.end(JSON.stringify(user))
          })
          // const user = {age: parseInt(Math.random() * 1000)}
          // users.push(user)
          // res.statusCode = 200
          // res.end(JSON.stringify(user))
          break
      }
      break
    default:
      res.statusCode = 404
      res.end('NOT_FOUND')
      break
  }
})