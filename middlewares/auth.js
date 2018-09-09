/**
 * Created by Administrator on 2018/9/8/008
 */
module.exports = auth = (req, res, next) => {
  console.log(req.query)
  if (req.query.username === 'laoyang') {
    next()
  } else {
    // res.end('please go away!')
    next('please go away!') // 直接抛出异常，会跳过之后的路由和中间件，进行错误处理
  }
}