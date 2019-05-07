const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;
/**
 * 语法：express.static(root,[options])
 *  root参数指定了提供静态资源服务的根路径
 */
// 为public下的文件提供静态资源服务。express查找文件是相对于root参数对应的目录，因此url中不包含root参数
// 例：Request URL: http://localhost:8000/css/index.css (这里并不包含public)
// app.use(express.static('public'));
// 可以为多个目录下的静态资源提供静态服务，并且会按照设置顺序来进行文件查找
// app.use(express.static('files'));
// 为静态文件指定一个在当前目录中并不存在的前缀，访问路径会变成这样：
// app.use('/static', express.static('public'));
// 由于nodejs中路径是相对于当前运行进程的，所以我们这里通过相对更安全的绝对路径来设置静态资路径
app.use(express.static(path.resolve(__dirname, './public')));
app.get('/', (req, res) => {
  res.send('hello express');
});
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
