const http = require('http');

// 虚拟数据库中的数据
const list = [];
const server = http.createServer((req, res) => {
  // 设置跨域的域名
  // 如果要发送Cookie,Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 设置header类型
  // 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Cors请求默认不发送Cookie和HTTP认证信息,如果要把Cookie发到服务器，
  // 1. 指定响应头(后端)
  // Access-Control-Allow-Credentials: true,
  // 2. 在ajax请求中打开withCredentials属性(前端)
  // var xhr = new XMLHttpRequest()
  // xhr.withCredentials = true
  // 如果要省略xhr.withCredentials设置，要显式关闭withCredentials，否则有的浏览器还是会一起发送Cookie
  // 该响应的有效时间为86400秒，也就是24个小时。在有效时间内，浏览器无需为同一请求再次发起预检请求
  // 只有当取消chrome dev tool network 的 disable cache checkbox 才会看到效果
  // 指定了preflight请求的结果能被缓存多久
  res.setHeader('Access-Control-Max-Age', 86400);
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');
  switch (req.method) {
    // 当跨域发起post请求时，会先发送一个预检options请求
    //  非简单请求的CORS请求，会在正式通信之前，增加一次http查询请求，称为预检请求(preflight)
    case 'OPTIONS':
      res.statusCode = 200;
      res.end();
      break;
    case 'POST':
      let item = '';
      req.on('data', chunk => {
        item += chunk;
      });
      req.on('end', () => {
        const data = JSON.parse(item);
        list.push(data);
        res.write(JSON.stringify(list));
        res.end();
      });
      break;
    case 'GET':
      const data = JSON.stringify(list);
      res.write(data);
      res.end();
      break;
  }
});

server.listen(3000, (err) => {
  if (err) throw err;
  console.log(`服务器已启动，监听3000端口`);
});

// CORS：跨域资源共享(cross-origin resource sharing)
