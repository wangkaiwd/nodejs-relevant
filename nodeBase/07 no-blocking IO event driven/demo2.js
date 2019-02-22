// 回调函数
// const fs = require('fs');
// const getTest = (callback) => {
//   fs.readFile('./test.json', (err, data) => {
//     callback(data);
//   });
// };
//
// getTest(result => {
//   console.log(JSON.parse(result));
//   // { name: 'test', language: 'nodejs' }
// });

// Emitter:触发器  EventEmitter:事件触发器
const EventEmitter = require('events');
const fs = require('fs');
/**
 * Nodejs事件循环：
 *  1. Node是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高
 *  2. Node的每一个API都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
 *  3. Node有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听事件
 */

const myEmitter = new EventEmitter();
const getTest = () => {
  fs.readFile('./test.json', (err, data) => {
    // 触发事件
    myEmitter.emit('data', data);
  });
};

// 注册监听器
myEmitter.on('data', (data) => {
  console.log(JSON.parse(data));
});
getTest();