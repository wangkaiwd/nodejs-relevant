// fs：文件系统模块，负责文件读写
// 所有的文件系统操作都有同步和异步俩种形式
const fs   = require('fs')
const util = require('util')
fs.readFile('./package.json', (err, data) => {
  if (err) throw err
  // data: buffer
  console.log(JSON.parse(data).name)
})

// 通过promise进行封装(相当于promisify的一个简单实现)
const readFileAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) { return reject(err) }
      resolve(JSON.parse(data))
    })
  })
}
readFileAsync('./package.json').then(
  data => {
    console.log('获取数据成功', data)
  }
).catch(err => console.log(err))

// util.promisify(original)
// 让一个遵循异常优先的回调风格的函数，即(err,value) => ... 回调函数是最后一个参数，返回一个返回值是一个promise版本的函数
const readFile = util.promisify(fs.readFile)
readFile('./package-lock.json')
  .then(data => {
    console.log('util.promisify', JSON.parse(data))
  })
  .catch(err => {
    console.log(err)
  })
