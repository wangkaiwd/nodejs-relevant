/**
 * Created by wangkai on 2019/1/28
 * Desc: 使用koa-views: template rendering middleware for koa
 */
const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
// 必须在所有路由被使用之前使用
app.use(views(path.resolve(__dirname, './pugPage'), {extension: 'pug'}));
app.use(async (ctx, next) => {
  await ctx.render('demo', {
    title: '测试title',
    name: 'wangkaiwd'
  });
});
app.listen(3000, () => {
  console.log('服务器已启动，监听3000端口');
});