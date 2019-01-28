/**
 * 接收get请求参数
 */

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

router.get('/', (ctx, next) => {
  ctx.body = ctx.query;
});
app.listen(3000, () => {
  console.log(`服务已启动，监听3000端口`);
});
