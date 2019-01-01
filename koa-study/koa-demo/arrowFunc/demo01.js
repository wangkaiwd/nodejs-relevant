// 函数的name属性：es6中与es5不一样
// const f = () => { }
// console.log(f.name)
// es5: "" ; es6:"f"

// 箭头函数
// 箭头函数可以简写：当函数内只有返回值的时候，可以省略大括号和return
// es5的普通函数是不可以的

// 一个参数，箭头函数可以省略括号
// const f = v => v
// const f = function (v) {
//   return v
// }

// 不需要参数或者需要多个参数，就使用一个圆括号代表参数部分
// const f = () => 5
// const f = function () {
//   return 5
// }

// const sum = (num1, num2) => num1 + num2

// 等同于
// const sum = function (num1, num2) {
//   return num1 + num2
// }
// 直接返回对象
// 必须在对象外面加上括号，否则会报错(没有括号的话浏览器会解析为函数的{},并不会解析为对象)
// const getTempItem = id => ({ id, name: 'Temp' })
// const getTempItem = id => { id, name: 'Temp' } // 这里的:，对象语法会报错

// 使用箭头函数简化回调
// [1, 2, 3].map(function (item) {
//   return item * item
// })
// 简化
// [1, 2, 3].map(item => item * item)

// rest参数与箭头函数结合
// const numbers = (...num) => num
// console.log(numbers(1, 2, 3, 4)) // [1,2,3,4]
// const headAndTail = (head, ...tail) => [head, tail]
// console.log(headAndTail(1, 2, 3, 4, 5)) // [1,[2,3,4,5]]

// 嵌套的箭头函数
// const plus1 = a => a + 2
// const mutl2 = a => a * 2
// const pipeline = (...func) => val => {
//   // 传入的后一个函数的参数是前一个函数的执行结果
//   let result
//   for (let i = 0; i < func.length; i++) {
//     const fPrev = func[i]
//     const fNext = func[i + 1]
//     if (fNext) {
//       result = fNext(fPrev(val))
//     }
//   }
//   return result
// }

// 嵌套的箭头函数
// 比较优雅的写法
// const plus1 = a => a + 2
// const mutl2 = a => a * 2
// const pipeline = (...func) =>
  // val => func.reduce((val, b) => b(val), val)

// 调用 pipeline(plus1,mutl2)(5)
// console.log(pipeline(plus1, mutl2)(5)) // 14
