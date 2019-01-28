const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router.get('/', async (ctx, next) => {
  ctx.body = 'route html';
}).get('/todo', (ctx, next) => {
  ctx.body = 'todo html';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('服务已启动，监听3000端口');
});
