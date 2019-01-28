/**
 * Created by wangkai on 2019/1/26
 * Desc: 原生方法实现路由
 */

const Koa = require('koa');
const app = new Koa();
const port = 8088;
app.use(async (ctx) => {
  const url = ctx.request.url;
  ctx.body = url;
});
app.listen(port, () => {
  console.log(`服务器已启动,监听${port}端口`);
});