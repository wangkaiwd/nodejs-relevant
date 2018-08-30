// schema://host:port/path?query#hash
const http = require('http')
const server = http.createServer()
server.listen(8808)

server.on('request', (req, res) => {
  res.statusCode = 200
  res.end('welcome to my first http server')
})