/**
 * fs流:读取流
 */
const fs = require('fs');
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const fileReadStream = fs.createReadStream(resolve('./testRename.js'));
let count = 0;
let str = '';
// 流形式读取数据
fileReadStream.on('data', (chunk) => {
  console.log('chunk', chunk);
  console.log(`${++count} 接收到${chunk.length}`);
  // 这里只执行了一次，为什么可以一直进行拼接字符串？
  str += chunk;
});

fileReadStream.on('end', () => {
  console.log('----结束----');
  console.log(count);
  console.log(str);
});

fileReadStream.on('error', (err) => {
  console.log(err);
});
