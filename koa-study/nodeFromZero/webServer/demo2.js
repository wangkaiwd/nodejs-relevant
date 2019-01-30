/**
 * web服务：完整代码
 */
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// 获取响应返回MIME类型
const getType = (extname) => {
  if (!extname) return 'text/html';
  const mimeConfig = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png'
  };
  return mimeConfig[extname];
};
const server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  if (pathname === '/') {pathname = '/index.html';}
  const extname = path.extname(pathname);
  const type = getType(extname);
  fs.readFile(path.resolve(__dirname, `./template${pathname}`), (err, data) => {
    if (err) throw err;
    res.writeHead(200, { 'Content-Type': `${type};charset=utf-8` });
    res.write(data);
    res.end();
  });
}).listen(3000, (err) => {
  if (err) throw err;
  console.log('服务以启动，监听3000端口');
});