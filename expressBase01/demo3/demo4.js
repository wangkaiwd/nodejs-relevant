const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
// 拆分路由
const user = require('./routes/user');

// express.static(root,[options]): Express唯一内置的中间件，它基于`serve-static`,负责在`express`中提供静态资源
app.use(express.static(path.resolve(__dirname, './views')));

// 使用模板引擎
// views: 设置放置模板引擎的目录
app.set('views', path.resolve(__dirname, './views'));
// view engine: 设置要用到的模板引擎
app.set('view engine', 'pug');

// 添加路由
app.use('/user', user);
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
