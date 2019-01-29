/**
 * Created by wangkai on 2019/1/28
 * Desc: koa-static中间件使用：static file server middleware
 */

const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');
const app = new Koa();

// 在访问pug文件的时候会自动下载
app.use(serve(path.resolve(__dirname, './')));

app.listen(3000, () => {
  console.log(`服务已启动，监听3000端口`);
});
// todo:为什么在访问.pug文件的时候会自动下载？
