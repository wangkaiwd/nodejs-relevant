// 模拟exports的实现,注意：module.exports默认值是{}
const require = () => {
  ((module, exports) => {
    // 模块代码
    const doSomething = () => {};
    // 重新赋值将不再和module.exports公用同一片内存空间
    // 此时，模块导出一个空的默认对象
    exports = doSomething;
    // 此时，该模块导出doSomething,而不是默认空对象
    module.exports = doSomething;
  })(module, module.exports);
};
