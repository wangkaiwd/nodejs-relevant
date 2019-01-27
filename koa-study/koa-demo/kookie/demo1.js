/**
 * 操作cookie
 */
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const url = ctx.url;
  if (url === '/index') {
    // ctx.coolies.set(name,value,[options])
    // options:
    // maxAge: 一个数字表示从Date.now()得到的毫秒数
    // signed: cookie签名值
    // expired: cookie过期的Date
    // path: cookie路径，默认是'/'
    // domain: cookie域名
    // secure: 安全cookie
    // httpOnly: 服务端可访问cookie,默认是true
    // overwrite: 布尔值，是否覆盖以前设置的同名cookie(默认是false),
    ctx.cookies.set('myName', 'wk');
    ctx.body = `cookie is Ok`;
  } else {
    ctx.body = 'hello world';
  }
});

app.listen(3000, () => {
  console.log(`服务器已启动，监听3000端口`);
});

// http cookie: 服务器发送到用户浏览器并保存到本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带
// 并发送到服务器上。通常，它用于告知服务端俩个请求是否来自同一浏览器，如保持用户的登录状态

// 使用cookie会造成性能问题（浏览器的每次请求都会携带Cookie数据），前端开发者可以将信息存储到本地(web storage api 和 IndexDB)

// 当服务器收到http请求时，服务器可以在响应头里添加一个Set-Cookie选项，浏览器收到响应后通常会保存下Cookie
// 之后对该服务器每一次请求中都通过Cookie请求头部将Cookie信息发送给服务器。 Cookie的过期时间、域、路径、有效期、使用站点
// 都可以根据需要来指定。

// 为避免跨域脚本(XSS)攻击，通过javascript的document.cookie API无法访问带有HttpOnly标记的cookie,它们只应该发送给服务端。
// 如果包含Session信息的Cookie不想被客户端JavaScript脚本调用，那么就应该为其设置HttpOnly标记
