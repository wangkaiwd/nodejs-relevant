const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const getPath = dir => path.resolve(__dirname, dir);
const getExtname = (ext) => {
  // 通过引入一个json文件来生成对应的Content-Type
  const extData = fs.readFileSync(getPath('./_ext.json'));
  const extJson = JSON.parse(extData);
  return extJson[ext];
};
const server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  if (pathname === '/') {
    pathname = 'index.html';
  }
  const extname = path.extname(pathname);
  // 过滤掉/favicon.ico的请求，浏览器每次都会请求图标
  if (pathname !== '/favicon.ico') {
    fs.readFile(getPath(`./template/${pathname}`), (err, data) => {
      if (err) {
        console.log('没有找到此文件');
        fs.readFile(getPath('./template/404.html'), (err, data) => {
          if (err) throw err;
          res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
          });
          res.write(data);
          res.end();
        });
      } else {
        const contentType = `${getExtname(extname)};charset=utf-8`;
        res.writeHead(200, {
          'Content-Type': contentType
        });
        res.write(data);
        res.end();
      }
    });
  }
}).listen(3000, (e) => {
  if (e) throw e;
  console.log('服务器已启动，监听3000端口');
});