// async 函数返回是一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到
// 异步操作完成，再执行函数体后面的语句。函数内部return语句返回的值，会成为then方法回调函数的参数

// await命令：await命令后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值
const f = async () => {
  return await 123
}
console.log(f()) // async函数返回的是一个Promise对象，需要通过await或这.then来获取执行结果
f().then(v => console.log(v))
