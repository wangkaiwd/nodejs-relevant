/**
 * koa set Cookie
 */

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('myName', 'wk', {
      domain: 'localhost', // 这里127.0.0.1和localhost不一样
      path: '/index',
      maxAge: 1000 * 60 * 60 * 24,
      expire: new Date('2019-1-28'),
      httpOnly: false,
      overwrite: false
    });
    ctx.body = `cookie is OK`;
  } else {
    if (ctx.cookies.get('myName')) {
      ctx.body = ctx.cookies.get('myName');
    } else {
      ctx.body = `cookie is None`;
    }
  }
});
app.listen(3000, () => {
  console.log('服务器已启动，监听3000端口');
});
