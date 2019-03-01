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
// cors跨域
app.use(allowCorsDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.get('/ratings', (req, res) => {
  console.log('query', req.query);
  res.json(ratings);
});

app.post('/goods', (req, res) => {
  console.log('body', req.body);
  res.json(goods);
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});