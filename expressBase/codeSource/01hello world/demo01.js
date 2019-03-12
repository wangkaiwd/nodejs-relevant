const express = require('express');
const app = express();
// 读取当前目录下环境变量port的值，满足正式环境中的node服务的端口启动需求
const port = process.env.PORT || 3000;
// 当请求路径为'/'时返回'hello world'
app.get('/', (req, res) => {
  res.send('Hello Express!')
});
// 监听端口
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});