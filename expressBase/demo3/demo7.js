const express = require('express');
const path = require('path');
// multer是nodejs用来处理 multipart/form-data(主要用于上传文件) 的一个中间件
const multer = require('multer');
const app = express();
const PORT = 3000;

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('form');
});
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
