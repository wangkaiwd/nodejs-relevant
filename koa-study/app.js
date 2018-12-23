const Koa = require('koa');
const app = new Koa();

// 响应
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000, (err) => {
  if (!err) {
    console.log('服务器启动，监听3000端口')
  }
});