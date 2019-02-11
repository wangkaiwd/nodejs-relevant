// 自定义模块
const tool1 = require('./myTools/tool1');
// 通过node_modules进行包管理
const tool2 = require('tool2');
// 通过`package.json`中的入口文件导入模块
const tool3 = require('tool3');
const http = require('http');
http.createServer((req, res) => {
  const result1 = tool1.add(1, 2, 3, 4);
  const result2 = tool2.multiply(1, 2, 3, 4);
  const result3 = tool3.add(1, 2, 3, 4) + tool3.multiply(1, 2, 3, 4);
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  const html = `
    <div>
      <h1>tool1: evaluate is ${result1}</h1>
      <h1>tool2: evaluate is ${result2}</h1>
      <h1>tool3: evaluate is ${result3}</h1>
    </div>
  `;
  res.write(html);
  res.end();
}).listen(3000, err => {
  if (err) throw err;
  console.log(`server listening on port 3000`);
});
