const koa = require('koa')
const app = new koa()
app.use(async (ctx, next) => {
  console.log('ctx', ctx.request)
  ctx.body = 'Hi Luke'
})

app.listen(8088, (err) => {
  if (!err) {
    console.log('服务已启动,监听8088端口')
  }
})