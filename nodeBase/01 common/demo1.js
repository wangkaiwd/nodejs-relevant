// 自定义模块
const tool1 = require('./myTools/tool1');
const http = require('http');
http.createServer((req, res) => {
  const result = tool1.add(1, 2, 3, 4);
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  const html = `
    <h1>
      evaluate is ${result}
    </h1>
  `;
  res.write(html);
  res.end();
}).listen(3000, err => {
  if (err) throw err;
  console.log(`server listening on port 3000`);
});
