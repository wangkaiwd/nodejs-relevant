const http = require('http')
const port = 8000
const hostname = 'localhost'
// http.createServer([options][,requestListener])
// res: http.ServerResponse类
// 该对象在HTTP服务器内部被创建
const server = http.createServer((req, res) => {
  // 发送一个响应头给请求
  // response.writeHead(statusCode[,statusMessage][,headers])
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=UTF-8'
  })
  // 发送请求主体的一个数据块
  // response.write(chunk[,encoding][,callback])
  // chunk:可以是一个字符串或是一个buffer
  // 如果chunk是字符串，encoding指定如何将它编码为一个字节流
  // encoding默认为utf8
  res.write('<h1 style="text-align:center;">Hello NodeJS</h1>')
  // response.end([data][,encoding][,callback])
  // 该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成
  // 每次响应都必须调用response.end()方法
  res.end()
})
// server.listen:开启http服务监听与连接
server.listen(port, hostname, (err) => {
  if (!err) console.log(`服务器运行在${hostname}:${port}端口`)
})