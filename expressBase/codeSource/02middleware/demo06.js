const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('hello no error');
});
app.get('/error', (req, res) => {
  console.log(a);
  res.send('hello error');
});

app.get('/asyncError', (req, res, next) => {
  fs.readFile(path.resolve(__dirname, './static-file/public/index'), (err, data) => {
    if (err) {
      next(err); // 通过next函数将异步错误传递到错误处理中间件
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.send(data);
    }
  });
});

app.use((err, req, res, next) => {
  console.log(err); // 会捕获到错误信息
  res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
