// 函数参数默认值
// let x = 99

// 在使用默认参数后，每次执行函数的时候,不是传值，而是重新计算x+1进行赋值
// function foo(p = x + 1) {
//   console.log(p)
// }

// foo() // 100
// x = 100
// foo() // 101

// es5的写法

// 这种写的问题： 
// y = '', y = 0, y = false, y=null
// 当y取这些值的时候都不会起作用，而es6的新写法可以很好的避免这些问题
// function log(x, y) {
//   y = y || 'World'
//   console.log(x, y)
// }

// 解构赋值结合函数默认参数
// function fetch(url, { body = '', method = 'get', headers = {} }) {
//   console.log(method)
// }

// fetch('http://example.com', {})
// "get"

// fetch('http://example.com') // 会报错

// 在第二个参数不传的时候默认传入空对象{}
// function fetch(url, { body = '', method = 'get', headers = {} } = {}) {
//   console.log(method)
// }

// fetch('http://example.com', {})
// // "get"

// fetch('http://example.com') // "get"

// 写法一
// 对对象解构添加了默认值，并且在函数传参的时候也给定了默认值
// function m1({ x = 0, y = 0 } = {}) {
//   return [x, y];
// }

// 写法二
// {x:x,y:y} = {x:0,y:0}
// 只给定了函数传参的默认值
// function m2({ x, y } = { x: 0, y: 0 }) {
//   return [x, y];
// }

// m1({ x: 3 }) // [3,0]
// m2({ x: 3 }) // [3,undefined]

// 如果传入参数undefiined，将触发该参数等于默认值，null则没有这个效果
// function f(x, y = 5, z) {
//   return [x, y, z]
// }
// undefined会触发默认值
// f(1, undefined, 2) // 1, 5, 2

// 函数length属性的含义：该函数预期传入的参数个数。

// 1. 设置的默认值如果不是尾参数length属性不再计入后面的参数
// (function (a = 0, b, c) { }).length // 0
// (function (a, b = 0, c) { }).length // 1

// 2. 指定默认值的参数不计算在length属性中
// 3. rest参数也不会计入length属性
// (function (...args) { }).length // 0


// 利用参数默认值可以指定某一个参数不得省略，如果省略就抛出一个错误
// function throwIfMissing() {
//   throw new Error('Missing parameter')
// }

// function foo(mustBeProvided = throwIfMissing()) {
//   return mustBeProvided
// }
// console.log(foo('必须传入参数'))
// console.log(foo())


// rest参数
// 用于获取函数的多余参数。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中
// function add(...values) {
//   let sum = 0;
//   // for... of:在可迭代对象上创建一个迭代循环，调用自定义迭代钩子，并为每个不同的属性执行
//   for (let val of values) {
//     sum += val
//   }
//   return sum
// }
// console.log(add(1, 2, 3, 4))

// arguments对象不是数组，而是一个类似的数组。而rest参数是一个真正的数组

// rest参数之后不能在有其它参数(即只能是最后一个参数),否则会报错
// function f(a, ...b, c) { Rest parameter must be last formal parameter
// }