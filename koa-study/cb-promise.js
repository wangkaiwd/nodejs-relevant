// fs：文件系统模块，负责文件读写
// 所有的文件系统操作都有同步和异步俩种形式
const fs = require('fs')
fs.readFile('./package.json', (err, data) => {
  if (err) throw err
  // data: buffer
  console.log(JSON.parse(data).name)
})

// 通过promise进行封装
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
)