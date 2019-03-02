const http = require('http');
const url = require('url');
const PORT = 3000;
const baseUrl = '/api/todos/';
// 模拟数据库，建立一个初始值,在服务器重启的时候会消失
const todos = [
  { id: 1, text: '待办事项1', createTime: new Date().getTime() },
  { id: 2, text: '待办事项1', createTime: new Date().getTime() },
  { id: 3, text: '待办事项1', createTime: new Date().getTime() },
  { id: 4, text: '待办事项1', createTime: new Date().getTime() }
];

// Promise封装post请求
const postRequest = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    resolve(JSON.parse(body));
  });
  req.on('error', (err) => {
    reject(err);
  });
});
// 回调函数封装post请求
const postCb = (req, success, fail) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    success(JSON.parse(body));
  });
  req.on('error', (err) => {
    fail(err);
  });
};
const allowCors = (res) => {
  // 设置跨域的域名,*表示允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 跨域允许的请求方式
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  // 设置header类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};
http.createServer((req, res) => {
  allowCors(res); // 允许跨域
  // 将用到的参数解构出来，由于没有涉及到get传参，所以query暂时没有用到
  let { query, pathname } = url.parse(req.url, true);
  const method = req.method.toLowerCase();
  // res.writeHead和res.setHeader的区别：
  //    1. res.writeHead设置的响应头会合res.setHeader设置的响应头合并
  //    2. 如果响应头的key值相同，那么优先使用res.writeHead设置的响应头
  res.writeHead(200, 'resolve OK', {
    'Content-Type': 'application/json'
  });
  if (method === 'post') {
    if (pathname === `${baseUrl}add`) {
      postRequest(req).then(
        body => {
          const last = todos.slice(-1)[0];
          const newId = last ? last.id + 1 : 1;
          body.id = newId;
          body.createTime = new Date().getTime();
          todos.push(body);
          res.write(JSON.stringify({ code: 0, msg: 'success' }));
          res.end();
        },
        err => console.log(err)
      );
    }
    if (pathname === `${baseUrl}delete`) {
      postRequest(req).then(
        body => {
          const index = todos.findIndex(item => item.id === body.id);
          todos.splice(index, 1);
          res.write(JSON.stringify({ code: 0, msg: 'success' }));
          res.end();
        }
      );
    }
  } else if (method === 'get') {
    if (pathname === `${baseUrl}list`) {
      res.write(JSON.stringify({ todos }));
      res.end();
    }
  } else { // 处理options预检请求，直接响应结束
    res.end();
  }
}).listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is listening on port ${PORT}`);
});

