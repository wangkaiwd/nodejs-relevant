// Iterator
// es6新的遍历命令for...of循环，Iterator接口主要供for...of消费
// Iterator的遍历过程是这样的。
// 创建一个指针对象，指向当前数据结构的起始位置。遍历器本质上，就是一个指针对象
// 调用指针对象的next方法，可以指向数据结构的下一个位置，直到它指向数据结构的结束位置

// 模拟next方法返回值的例子
const makeIterator = array => {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < array.length ?
        { value: array[nextIndex++], done: false }
        :
        { value: undefined, done: true }
    }
  }
}
const it = makeIterator(['a', 'b'])
// 代码思路：通过必包的形式，来保存并且更新局部变量，最终通过维护的局部变量，来进行next返回值的确定
// console.log('one', it.next())
// console.log('two', it.next())
// console.log('three', it.next())

// generator
// simple generator function
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

// 调用generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象：遍历器对象
const hw = helloWorldGenerator();

// 调用next方法，使得指针移向下一个状态。

// 第一次调用,gengrator函数开始执行，直到遇到第一个yield表达式为止
console.log(hw.next()) // {value: 'hello', done: false}
// 第二次调用，generator函数从上次yield表达式停下的地方，一直执行到下一个yield表达式
console.log(hw.next()) // {value: 'world', done: false}
// 第三次调用，generator函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）
console.log(hw.next()) // {value: 'ending', done: true}
console.log(hw.next()) // {value: undefined, done: true} ，以后再调用next方法，都会返回这个值

// 总结：generator函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行

