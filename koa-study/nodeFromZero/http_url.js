// url: 处理与解析url
const url = require('url')
const http = require('http')
const server = http.createServer((req, res) => {
  // 这里用浏览器请求的话会执行俩次
  // 因为还请求了'/favicon.ico'
  console.log(req.url)
  // url.parse: 解析url字符串并返回RUL对象
  // url.parse(urlString[,parseQuery[,slashesDenoteHost]])
  // parseQuery默认为false,设置为true之后会将url.parse中的query属性会是一个使用querystring
  // 模块的parse生成的对象
  // 设置为false:query是一个未解析未解码的字符串
  console.log(url.parse(req.url, true))
  // 要指定请求头，否则不会解析为html
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  // 发送请求体的数据块
  res.write('<h2 style="text-algin:center;">http node</h2>')
  res.end()
})
server.listen(8000, (err) => {
  if (!err) { console.log('服务器启动，连接8000端口') }
})