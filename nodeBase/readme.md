## `Node.js`基础知识整理
## `CommonJS`
### 什么是`CommonJS`
`CommonJS`就是为`JS`的表现来制定规范，由于`js`没有模块系统、标准库较少、缺乏包管理工具，所以`CommonJS`应运而生，它希望可以在`js`的任何地方运行，而不只是浏览器中，从而达到Java、C#、PHP这些后端语言具备开发大型应用的能力。
### `CommonJS`的应用
1. 服务端`javascript`应用程序(`Node.js`)
2. 命令行工具
3. 桌面图形界面应用程序
### `CommonJS`与`Nodejs`的关系
`CommonJS`是模块化的标准，`Nodejs`就是`CommonJS`(模块化)的实现
### `Nodejs`中的模块化
* 在`Node`中，模块分为俩类：一是`Node`自身提供的模块，称为核心模块；二是用户自己编写的模块，称为文件模块。核心模块在`Node`源代码的编译过程中，编译进了二进制执行文件，所以它的加载速度是最快的，如: HTTP模块，URL模块，FS模块；文件模块是在运行时动态加载的，需要完整的路径分析、文件定位、编译执行过程等......,所以它的速度相对核心模块来说会慢一些
* 我们可以将公共的功能抽离出一个单独的`js`文件来存放，然后在需要的情况下通过`exports`或`module.exports`将模块导出，并通过`require`进行引入

现在我们通过三种使用方式来学习`Node`中的模块化及`exports/require`的使用
### 创建第一个`Nodejs`应用
> 通过向客户端返回一个最简单的'Hello World'来初步接触`Nodejs`

`node`应用的组成部分：
* `require`引入模块：通过`require`来载入用到的`Node.js`模块
* 创建服务器：监听客户端（浏览器）的请求，类似于`Apache,Nginx`等`HTTP`服务器
* 接受请求并响应请求：客户端发送`HTTP`请求，服务器接收请求后返回响应数据

接下来我们使用`Node.js`的核心模块`HTTP`来创建`Node.js`应用：[demo链接](./02%20http/demo1.js)
```js
// 引入http模块
const http = require('http');
const port = 3000;
// 调用http的createServer方法来创建服务器，监听请求并响应请求
const server = http.createServer((req, res) => {
  // 向请求发送响应头：状态码：200，文件类型：html,字符集：utf-8
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  const html = `
    <h2>Hello World</h2>
  `;
  // 向客户端发送响应
  res.write(html);
  // 响应结束
  res.end();
});
// 监听3000端口
server.listen(port, err => {
  if (err) throw err;
  console.log(`服务已启动，监听${port}端口`);
});
```
在`demo`所在文件目录下打开终端执行`node demo1`，之后浏览器访问`localhost:3000`： 
![http](shotscreen/01http_demo1.png)


