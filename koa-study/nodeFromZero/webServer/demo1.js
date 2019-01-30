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

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// link标签的href,script标签的src,img的src等类似的属性在对应元素加载的时候都会发起请求
// 就会触发服务的监听事件，获取到对应的req对象，处理之后返回对应的res
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let resFile = pathname;
  // switch (pathname) {
  //   case '/':
  //     // 直接读取进行加载，只能解析html文件，而在html中引入的css和js无法解析
  //     // fs.readFile(path.resolve(__dirname, './template/index.html'), (err, data) => {
  //     //   // res.writeHead(200, {
  //     //   //   'Content-Type': 'text/html;charset=utf-8'
  //     //   // });
  //     //   res.write(data);
  //     //   res.end();
  //     // });
  //     resFile = 'index.html';
  //     break;
  //   default:
  //     resFile = '404.html';
  //     break;
  // }
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
