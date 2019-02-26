const express = require('express');
// 创建一个路由实例
const router = express.Router();

router.get('/home', (req, res) => {
  res.end('hello express');
});

module.exports = router;
