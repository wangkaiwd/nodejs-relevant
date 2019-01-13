const koa = require('koa')
const app = new koa()
app.use(async (ctx, next) => {
  ctx.body = 'Hi Luke'
})

app.listen(8088)