/**
 * 模拟客户端请求，并支持跨域
 */

const express = require('express');
const bodyParser = require('body-parser');
const ratings = require('./data/ratings');
const goods = require('./data/goods');
const app = express();
const PORT = 3000;

const allowCorsDomain = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCorsDomain);
// parse application/json
app.use(bodyParser.json());
app.get('/ratings', (req, res) => {
  // 请求头信息
  console.log(req.headers);
  console.log(req.query);
  res.json(ratings);
});

app.post('/goods', (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  res.json(goods);
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});