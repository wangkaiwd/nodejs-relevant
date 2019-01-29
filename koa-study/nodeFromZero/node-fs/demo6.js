/**
 *fs流：写入流
 */
const fs = require('fs');
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
let data = 'console.log("hello 我要存入数据")';
// 流形式写入数据
let writeStream = fs.createWriteStream(resolve('./index.js'));
writeStream.write(data, 'utf-8');
writeStream.end();
writeStream.on('finish', () => {
  console.log('写入完成');
});
