// 引入http模块
const http = require('http');
const PORT = 3000;
// 调用http的createServer方法来创建服务器，监听请求并响应请求
const server = http.createServer((req, res) => {
  // 向请求发送响应头：状态码：200，文件类型：html,字符集：utf-8
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  const html = `
    <h2>Hello World</h2>
  `;
  // 向客户端发送响应
  res.write(html);
  // 响应结束
  res.end();
});
// 监听3000端口
server.listen(PORT, err => {
  if (err) throw err;
  console.log(`server listening on port ${PORT}`);
});