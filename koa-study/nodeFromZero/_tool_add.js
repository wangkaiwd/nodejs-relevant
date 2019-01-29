const tools = {
  sum: (...numbers) => {
    let sum = 0;
    for (let number of numbers) {
      sum += number;
    }
    return sum;
  }
};
const str = 'module';
// module变量是整个模块文件的顶层变量

// module.exports :
module.exports = tools;

// 模块化:CommonJS规范
// nodejs分为：核心模块，自定义模块

