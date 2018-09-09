const express = require('express')
const app = express()

const auth = (req, res, next) => {
  console.log(req.query)
  if (req.query.username === 'laoyang') {
    next()
  } else {
    res.end('please go away!')
  }
}
// 权限验证中间件
app.use(require('../middlewares/auth'))
app.use((req, res, next) => {
  console.log('middleWare No.1')
  // 如果将任何项传递到next()函数(除了字符串'route'),那么express会将当前请求视为处于错误状态
  // 并跳过所有剩余的非错误处理路由和中间件函数
  next('something wrong')
})

app.use((req, res) => {
  res.end('Hello my express demo!')
})

// 错误处理中间件必须指明4个参数
// 要在app.use()和路由调用之后，最后定义错误处理中间件
app.use((err, req, res, next) => {
  console.log(err)
  res.end(err)
})
app.listen(3000, () => {
  console.log('listen 3000 port')
})