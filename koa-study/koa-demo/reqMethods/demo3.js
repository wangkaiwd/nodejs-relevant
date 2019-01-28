/**
 * Created by wangkai on 2019/1/26
 * Desc: koa-bodyParser
 */

const Koa = require('koa');
//
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const port = 8088;

//使用bodyParser中间件
app.use(bodyParser());
app.use(async (ctx) => {
  // 相当于将获取到的key1=value1&key2=value2的字符串解析为对象
  ctx.body = ctx.request.body;
});
app.listen(port, () => {
  console.log(`服务器已启动,监听${port}端口`);
});