const express = require('express');
const app = express();

const PORT = 3000;

// express中间件
app.use((req, res, next) => {
  console.log(1);
  next(new Error('appear error'));
});

app.use((req, res, next) => {
  console.log(2);
  res.status(200).end();
});

// 错误处理中间件
app.use((err, req, res, next) => {
  // console.dir(typeof err);
  // res.send([body])方法express进行了处理,根据body类型个来进行区分:
  // 1. Buffer: 自动设置响应头：Content-Type: application/octet-stream
  // 2. String: 自动设置响应头: Content-Type: type/html
  // 3. Object|Array: 会用json格式来表示，自动设置响应头: Content-Type: application/json
  res.send('Something error');
});
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
