const http = require('http');

// 虚拟数据库中的数据
const list = [];
const server = http.createServer((req, res) => {

});

server.listen(3000, (err) => {
  if (err) throw err;
  console.log(`服务器已启动，监听3000端口`);
});