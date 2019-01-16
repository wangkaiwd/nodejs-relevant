const Koa = require('koa')
const app = new Koa()
const port = 8080
app.use(async ctx => {
  // 
  ctx.status = 404 //not found
  // 检查指定的type(s)是否可以接受，如果true,返回最佳匹配，否则为false
  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html'
      ctx.body = '<h2>Page Not Found</h2>'
      break
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Page Not Found'
  }
})
app.listen(port, err => {
  if (!err) { console.log(`服务已启动，监听${8080}端口!`) }
})
// node.js命令行选项
// node [options][v8 options] [script.js | -e "script" | -] [--] [arguments]