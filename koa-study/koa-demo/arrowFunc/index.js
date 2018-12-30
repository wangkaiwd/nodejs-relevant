// 函数参数默认值
let x = 99

// 在使用默认参数后，每次执行函数的时候,不是传值，而是重新计算x+1进行赋值
function foo(p = x + 1) {
  console.log(p)
}

foo() // 100
x = 100
foo() // 101