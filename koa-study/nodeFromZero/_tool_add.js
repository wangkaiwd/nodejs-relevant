const tools = {
  add: () => {
    console.log('add')
  }
}
const str = 'module'
// module变量是整个模块文件的顶层变量
module.exports = tools

// 模块化:CommonJS规范
// nodejs分为：核心模块，自定义模块