const Koa = require('koa');
const app = new Koa();

app.use(async () => {
  ctx.body = 'hello wk';
});

// 服务已启动，监听3000端口
app.listen(3000, () => {
  console.log(`服务已启动，监听3000端口`);
});
