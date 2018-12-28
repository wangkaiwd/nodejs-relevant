const fs = require('fs')
const util = require('util')
const readAsync = util.promisify(fs.readFile)

// util.promisify的底层实现模拟,通过传入一个函数，来让这个函数支持Promise
// const myPromisify = (cb) => {
//   return (path) => {
//     return new Promise((resolve, reject) => {
//       cb(path, (err, data) => {
//         if (err) return reject(err)
//         return resolve(data)
//       })
//     })
//   }
// }
readAsync('./data.json')
  .then(
    data => {
      console.log(JSON.parse(data))
    },
    err => {
      console.log(err)
    }
  )