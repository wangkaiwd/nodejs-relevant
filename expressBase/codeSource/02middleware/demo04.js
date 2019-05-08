const express = require('express');
const app = express();
const PORT = 8000;
// 处理Content-Type: application/json的post请求参数
app.use(express.json());
// 处理Content-Type: application/x-www-form-urlencoded的post请求参数
// extended:设置解析key=val&key1=val1的格式方式，false:使用querystring模块解析，true:使用qs模块进行解析
app.use(express.urlencoded({ extended: true }));
app.post('/json', (req, res) => {
  // json { data: [ { id: 1, name: 'wk' } ], pageSize: 10, pageIndex: 1 }
  console.log('json', req.body);
  res.send(req.body);
});
app.post('/form', (req, res) => {
  // form { pageSize: '10', pageIndex: '1' }
  console.log('form', req.body);
  res.send(req.body);
});
app.listen(PORT, () => {
  console.log(`server is listen on ${PORT}`);
});
