const Koa = require('koa');
const path = require('path');
const pug = require('pug');
const app = new Koa();
const getDir = dir => path.resolve(__dirname, dir);
const compiledFunction = pug.compileFile(getDir('./pugPage/demo.pug'));
app.use(async (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8';
  const html = compiledFunction({name: '张伟', title: '测试标题'});
  ctx.body = html;
});

// 服务已启动，监听3000端口
app.listen(3000, () => {
  console.log(`服务已启动，监听3000端口`);
});
