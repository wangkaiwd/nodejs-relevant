const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const init = async (count) => {
  try {
    const result = await readFile('./data.json')
    console.log('result', JSON.parse(result), count)
    // console.log('result', result)
  } catch (err) {
    console.log('err', err)
  }
  return '我是返回值'
}


init(1)

// 返回Promise对象
// async函数返回一个Promise对象。async函数内部return语句返回的值，会成为then方法回调函数的参数
console.log('init', init(2)) //返回值是一个Promise（调用函数后立即返回）
init(3).then(result => {
  console.log('return', result)
})

// es6 async 和 await
// async函数返回一个Promise对象，可以用.then方法添加回调函数。当函数执行的时候，一旦遇到await
// 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

// 由于async函数会返回Promise对象，所以可以作为await的参数
const fn = async () => {
  await init(4) // init是一个async函数，返回的Promise可以作为await的参数
  console.log('3执行完了吗？')
}
fn()

// 整个执行结果
// init Promise { <pending> }
// result { name: 'koa', weather: '贼冷', project: 'excellent' } 1
// result { name: 'koa', weather: '贼冷', project: 'excellent' } 4
// 3执行完了吗？
// result { name: 'koa', weather: '贼冷', project: 'excellent' } 3
// return 我是返回值
// result { name: 'koa', weather: '贼冷', project: 'excellent' } 2

// async函数的多种使用形式

// 函数声明
async function foo() { }

// 函数表达式
const foo = async function () { }

// 对象的方法
const obj = { async foo() { } }
// obj.foo().then(...)

// class的方法
// class Storage {
//   constructor(props) {
//     super(props);
//     this.cachePromise = cache.open()
//   }
//   async getAvatar() {
//     const cache = await this.cachePromise;
//     return cache
//   }
// }

// const storage = new Storage()
// storage.getAvatar().then(cache => console.log(cache))

// 箭头函数
const foo = async () => { }
