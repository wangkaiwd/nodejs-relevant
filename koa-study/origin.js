const http = require('http')
// http.createServer([options][,requestListener])
const server = http.createServer((req, res) => {
  console.log(req, res)
})
// server.listen:开启http服务监听与连接
server.listen(3000, () => {
  console.log('服务器运行在3000端口')
})