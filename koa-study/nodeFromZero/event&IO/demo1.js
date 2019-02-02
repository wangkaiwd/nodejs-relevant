/**
 * Nodejs是一个单线程应用，不会为每一个客户连接创建一个新的线程
 *
 * 当有用户连接了，就会触发一个内部事件，通过非阻塞I/O、事件驱动机制，让Node宏观程序上也是并行的
 */

const fs = require('fs');
const path = require('path');
// console.log('1');
//
// const getExt = () => {
//   fs.readFile(path.resolve('../webServer/_ext.json'), (err, data) => {
//     console.log('2');
//   });
// };
// getExt();
// console.log('3');

// 1. 通过回调解决异步问题
// const getExt = (callback) => {
//   fs.readFile(path.resolve(__dirname, '../webServer/_ext.json'), (err, data) => {
//     callback(data);
//   });
// };
// getExt((data) => {
//   console.log('data', data.toString());
// });

// 2. 通过Node event模块来解决异步问题
/**
 * Node事件循环：
 *  1. Node是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高
 *  2. Node的每一个API都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
 *  3. Node有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听事件
 */
const events = require('events');
const eventEmitter = new events;
const getExt = () => {
  fs.readFile(path.resolve(__dirname, '../webServer/_ext.json'), (err, data) => {
    // 将data事件通过emit广播出去
    eventEmitter.emit('data', data.toString());
  });
};
getExt();
// eventEmitter.on() 用于注册监听器，eventEmitter.on() 用于触发事件
eventEmitter.on('data', (data) => {
  console.log('data', data);
});