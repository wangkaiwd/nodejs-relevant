// schema://host:port/path?query#hash
// port: 22 ssh, 80:http, 443:https, 27017:mongodb
const http = require('http')
const qs = require('querystring')
const server = http.createServer()
server.listen(8808)

server.on('request', (req, res) => {
  // console.log(req.url)
  res.statusCode = 200
  const {url} = req
  const queryString = url.slice(url.indexOf('?') + 1)
  const query = qs.parse(queryString)
  console.log(query)
  let resStr
  if (url === '/hello') {
    resStr = 'hi there'
  } else if (url === '/bye') {
    resStr = 'see ya next time'
  } else {
    resStr = 'I cant understand what are you saying'
  }
  res.end(resStr)
})