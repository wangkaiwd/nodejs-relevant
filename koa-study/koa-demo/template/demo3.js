/**
 * Created by wangkai on 2019/1/28
 * Desc: koa-static中间件使用：static file server middleware
 */

const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');
const app = new Koa();

app.use(serve(path.resolve(__dirname, './')));
// app.use(serve(path.resolve(__dirname, './test')));

app.listen(3000, () => {
  console.log(`服务已启动，监听3000端口`);
});