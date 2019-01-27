/**
 * 嵌套路由
 * nested routers
 */
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router1 = new Router();
const router2 = new Router();

router1.get('/wk', (ctx, next) => {
  ctx.body = `router1 wk`;
}).get('/todo', (ctx, next) => {
  ctx.body = `router1 todo`;
});

// 将url和回调函数进行匹配
router2.get('/wk', (ctx, next) => {
  ctx.body = `router2 wk`;
}).get('/todo', (ctx, next) => {
  ctx.body = `router2 todo`;
});

const router = new Router();
// 给指定的路由使用中间件middleware
router.use('/router1', router1.routes(), router1.allowedMethods())
  .use('/router2', router2.routes(), router2.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log(`服务已启动，监听3000端口`);
});
