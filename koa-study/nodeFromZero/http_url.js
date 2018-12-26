// url: 处理与解析url
const url    = require('url')
const http   = require('http')
const server = http.createServer((req, res) => {
  // 这里用浏览器请求的话会执行俩次
  // 因为还请求了'/favicon.ico'
  console.log(req.url)
  // url.parse: 解析url字符串并返回RUL对象
  // url.parse(urlString[,parseQuery[,slashesDenoteHost]])
  // parseQuery默认为false,设置为true之后会将url.parse中的query属性会是一个使用querystring
  // 模块的parse生成的对象
  // 设置为false:query是一个未解析未解码的字符串
  const result = url.parse(req.url, true)
  console.log('result', result)
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

// URL: 给定的独特资源在web上的地址

// url示例：https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL
// http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
// 协议(protocol)：http://, 它表明了浏览器必须使用何种协议。可能是：https,http,mialto,ftp
// 域名(domain Name)：www.example.com,表明正在请求哪个web服务器
// 端口(port): :80。
// 网络服务资源路径(path to file)： /path/to/myfile.html
// 提供给网络服务的额外参数(parameters)： ?key1=value1&key2=value2（用&符号分隔的键值对列表）
// 资源本身的另一部分的锚点： #SomewhereInTheDocument

