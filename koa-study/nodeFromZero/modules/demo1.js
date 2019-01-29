/**
 * Created by wangkai on 2019/1/29
 * Desc: Node 3种引入和导出的方法
 */

const http = require('http');
const tool1 = require('../_tool_add');
const tool2 = require('mul_tool');
const tool3 = require('wk-module');
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  res.write(`
    <h2>tool1: ${tool1.sum(1, 2, 3)}</h2>
    <h2>tool2: ${tool2.multiply(1, 2, 3, 4)}</h2>
    <h3>tool3: ${tool3.multiply(4, 5, 6)}</h3>
  `);
  res.end();
});

server.listen(3000, (err) => {
  if (!err) {
    console.log(`服务已启动，监听3000端口`);
  }
});