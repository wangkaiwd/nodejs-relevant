/**
 * Created by wangkai on 2019/1/30
 * Desc: 静态服务
 */
// web服务器：一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以向浏览器等Web客户端提供文档
// 也可以放置网站文件，让全市界浏览
// 目前最主流的三个 web 服务器是: Apache/Nginx/IIS

// 实现web服务器来返回页面中的对应元素：
  //  1. 在用户访问地址的时候，默认加载主页index.html
  //  2. 在加载index.html的过程中会有通过link标签引入css文件，有通过script的src引入的js文件
  //     以及通过img的src引入的图片等不同的加载资源
  //  3. 当上述资源在加载的时候，都会对服务器发起请求，相应的都会触发createServer的监听事件
  //  4. 根据请求资源的不同，要设置对应的响应头: Content-Type进行返回给客户端

// MIME类型：一种标准化的方式来表示文档的性质和格式
//  浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档；因此服务器设置正确以将正确的MIME类型
//  附加到响应对象的头部是非常重要的

// 常用的MIME类型： application/octet-stream: 应用程序文件的默认值
  //  1. text/plain : 文本文件默认值
  //  2. text/css: 在网页中要被解析为CSS的任何CSS文件必须指定MIME为text/css。
  //  3. text/html: 所有的html内容都应该使用这种类型
  //  4. application/javascript: js文件
  //  5. image/gif: gif图片
  //  6. image/jpeg: JPEG图片
  //  7. image/png: PNG图片
  //  8. image/svg+xml: SVG图片（矢量图）
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// link标签的href,script标签的src,img的src等类似的属性在对应元素加载的时候都会发起请求
// 就会触发服务的监听事件，获取到对应的req对象，处理之后返回对应的res
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let resFile = pathname;
  if (pathname === '/') {
    resFile = 'index.html';
  }
  const ext = path.extname(resFile).slice(1);
  fs.readFile(path.resolve(__dirname, `./template/${resFile}`), (err, data) => {
    if (err) throw err;
    res.writeHead(200, {
      'Content-Type': `text/${ext};charset=utf-8`
    });
    res.write(data);
    res.end();
  });
});

server.listen(3000, (err) => {
  if (!err) {
    console.log('服务已启动，监听3000端口');
  }
});
