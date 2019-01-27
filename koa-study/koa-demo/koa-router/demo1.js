const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello koa router';
});
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(8088, () => {
  console.log(`服务已启动，监听8088端口`);
});
