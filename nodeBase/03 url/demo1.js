// 1.引入http模块
const http = require('http');
// 2.引入url模块
const url = require('url');
const PORT = 3000;
// 3. http模块创建服务
http.createServer((req, res) => {
  // 4. 浏览器访问地址：localhost:3000?pageSize=10&pageIndex=2
  if (req.url !== '/favicon.ico') {
    /**
     * url.parse方法一般需要2个参数
     *  1. url地址
     *  2. 如果传入true,通过key1=val1&key2=val2&key3=val3传递的参数会转换为对象
     */
    const result = url.parse(req.url, true);
    console.log(result);
    // Url {
    //   protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '?pageSize=10&pageIndex=2',
    //     query: [Object: null prototype] { pageSize: '10', pageIndex: '2' },
    //   pathname: '/',
    //     path: '/?pageSize=10&pageIndex=2',
    //     href: '/?pageSize=10&pageIndex=2'
    // }
  }
}).listen(PORT, err => {
  if (err) throw err;
  console.log(`server listening on port ${PORT}`);
});
