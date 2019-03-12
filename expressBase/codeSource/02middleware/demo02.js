const express = require('express');
const app = express()
const port = 9000
// 1. 没有指定请求路径：中间件函数会在应用程序每次接收到请求的时候执行
app.use((req, res, next) => {
  console.log('time:', Date.now());
  next();
});

// 2. 指定请求路径：中间件函数会在请求路径匹配`/user/:id`的时候执行，这里的请求方式是任意的
app.use('/user/:id', (req, res, next) => {
  res.send(req.params.id);
  next();
})

// 3. 指定请求路径和请求方式：中间件函数会在请求路径匹配`/goods`以及请求方式为`get`的时候执行
app.get('/goods', () => {
  res.send('GOODS');
  next();
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})
