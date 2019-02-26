const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/users/:name', (req, res) => {
  res.send('hello' + req.params.name);
});
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

// 记录：
// 1. 为什么在package.json script中配置： "start":"nodemon demo2.js"，使用npm start命令可以运行成功
//    而直接使用nodemon start命令会运行失败
//    原因：每当执行`npm run`会新建一个Shell,这个Shell会将当前目录的node_modules/.bin子目录加入PATH
//          变量，执行结束后，再将PATH变量恢复原样。
//          这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不
//          必加上路径。
//    解决方法： 1. ./node_modules/.bin/nodemon ./demo2.js  2. npx nodemon demo2.js