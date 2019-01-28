/**
 * Created by wangkai on 2019/1/25
 * Desc: demo01
 */
/**
 * 小节：获得额外参数都可以通过query和querystring,因为请求的时候不论是post还是get可以在路径中传递额外参数
 *  获得get请求的方式：1. 从request中获得 2. 从上下文中获得ctx。
 *  获得的格式： 1. query: {key1:value1,key2:value2}  2. querystring: key1=value1&key2=value2
 */
const Koa = require('koa');
const app = new Koa();

const port = 8088;

app.use(async (ctx) => {
  const url = ctx.url,
    request = ctx.request,
    reqQuery = request.query,
    reqQueryString = request.querystring,
    // 通过ctx来获取路径上?后拼接的额外参数
    ctxQuery = ctx.query,
    ctxQueryString = ctx.querystring;
  ctx.body = {
    url,
    reqQuery,
    reqQueryString,
    ctxQuery,
    ctxQueryString
  };
});

app.listen(port, () => {
  console.log(`服务器已启动,监听${port}端口`);
});