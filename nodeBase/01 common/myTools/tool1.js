// 定义一个工具模块
const tools = {
  add (...numbers) {
    const sum = numbers.reduce((count, item) => count + item);
    return sum;
  }
};
// 将模块暴露出去,如果没有通过module.exports暴露变量的话，默认导出{}
module.exports = tools; // {add: Function}
// modules.exports被一个新的值完全取代时，也要重新赋值exports,否则exports仍为module.exports重新赋值前的值
// console.log('exports', exports); // {}
// module.exports = exports = tools
// 不会生效的写法
// exports = tools;
// 生效的写法
// exports.tools = tools; {tools: tools}
/**
 * exports是module.exports的简写，但是如果为exports重新赋值的话，相当于重新开辟了内存空间
 * 不再和module.exports公用同一块内存空间，切断了之间的联系，此时导出的会是默认值{},或者声明定义的module.exports
 */

