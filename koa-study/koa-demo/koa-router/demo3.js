const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router({
  prefix: '/wk'
});

app.use(router.routes()).use(router.allowedMethods());
// set prefix
router.get('/todo', (ctx, next) => {
  ctx.body = `todo page`;
});

app.listen(3000, () => {
  console.log('server starting and listen 3000 port');
});
