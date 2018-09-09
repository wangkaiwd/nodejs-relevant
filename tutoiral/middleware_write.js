const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// bodyParser.json函数执行之后会返回一个新的函数，
// 而这个新的函数可以使用外层函数传入得参数，这里是对闭包的一个应用
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// function mw (options) {
//   return function (req, res, next) {
//     // 可以直接访问外层函数的变量
//     if (options.xxx) {
//       console.log('hey')
//     }
//     console.log('mw')
//     next()
//   }
// }

const mdw1 = (req, res, next) => {
  console.log(req.body)
  console.log('mdw1')
  next()
}
const mdw2 = (req, res, next) => {
  console.log('mdw2')
  next()
}
const mdw3 = (req, res, next) => {
  console.log('mdw3')
  res.end('done')
}

// app.use(mdw1)
// app.use(mdw2)
// app.use(mdw3)

// 调用方式
// app.use([mdw1, mdw2], mdw3)
app.use(mdw1, mdw2, mdw3)

app.use((err, req, res, next) => {
  res.end(err)
})
app.listen(3000, () => {
  console.log('监听3000端口！')
})