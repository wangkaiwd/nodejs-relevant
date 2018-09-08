/**
 * Created by Administrator on 2018/9/8/008
 */
module.exports = auth = (req, res, next) => {
  console.log(req.query)
  if (req.query.username === 'laoyang') {
    next()
  } else {
    res.end('please go away!')
  }
}