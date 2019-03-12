const express = require('express');
const path = require('path');
// multer是nodejs用来处理 multipart/form-data(主要用于上传文件) 的一个中间件
const multer = require('multer');
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  // 我们需要负责创建文件夹
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, './upload'));
  },
  // 用来生成文件夹中的文件名。如果没有设置filename，每个文件将设置为一个随机文件名
  // 并且是没有扩展名的
  filename: function (req, file, cb) {
    cb(null, Date.now().toString().slice(-4) + '_' + file.originalname);
  }
});

const upload = multer({ storage });

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('form', { uploadStatus: '点击上传头像' });
});
// 单文件上传
// upload.single(fieldname): 接受一个以field命名的文件。这个文件的信息保存在req.file
// 注意：这里的fieldname必须和页面html中input 的 name属性的定义相同,否则会出现问题
// app.post('/profile', upload.single('avatar'), (req, res) => {
//   console.log(req.file);
//   console.log('上传成功!');
//   res.send({ ret_code: 0, data: req.file });
// });
// 多文件上传
app.post('/profile', upload.array('avatar', 4), (req, res) => {
  console.log(req.files);
  console.log('上传成功!');
  res.send({ ret_code: 0, data: req.files });
});
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
