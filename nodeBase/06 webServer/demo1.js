const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// process.cwd(): 返回Nodejs进程的当前工作目录
// 在执行fs.readFile操作时，第一个参数是相对于process.cwd()的路径
const getPath = dir => path.resolve(__dirname, dir);
/**
 * 通过后缀获取请求头
 * @param suffix：请求路径后缀
 * @returns {*}
 */
const getHeader = suffix => {
  const map = {
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'application/js',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
  };
  return map[suffix];
};

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let sourcePath = pathname;
  // 将请求路径和资源进行映射
  const routeConfig = {
    '/': '/index.html',
    '/about': '/about.html',
    '/list': '/list.html'
  };
  if (Object.keys(routeConfig).includes(pathname)) {
    sourcePath = routeConfig[pathname];
  }
  fs.readFile(getPath(`template${sourcePath}`), (err, data) => {
    if (err) {
      console.log('err', err);
      res.writeHead(404, 'NOT FOUND', {
        'Content-Type': 'text/html;charset=utf-8'
      });
      res.write(`<h2>Not Found</h2>`);
      res.end();
      return;
    }
    // 这里要根据请求资源的不同，来进行不同响应头的处理
    const suffix = path.extname(sourcePath), header = getHeader(suffix);
    // css,img,js
    res.writeHead(200, 'resolve OK', {
      'Content-Type': `${header};charset=utf-8`
    });
    res.write(data);
    res.end();
  });
}).listen(PORT, err => {
  if (err) throw err;
  console.log(`server is listening on port ${PORT}`);
});
