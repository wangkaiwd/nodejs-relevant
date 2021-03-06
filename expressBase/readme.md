## `express`学习记录
这是我在学习`express`框架过程中对`express`基础知识学习过程的一个总结和梳理，方便自己之后的复习以及社区其它小伙的学习
### `hello world`
从这里，我们正式开始`express`框架的学习。  
首先在我们的工作目录建立`codeSource`来存放`demo`源码，然后在`codeSource`下生成`package.json`进行项目依赖管理
```
mkdir codeSource
cd codeSource
npm init -y
mkdir 01hello world
```
现在的目录结构是这样的：  
![directory](./screenshots/01hello-world-directory.png)

这里我们写出我们入门必备的`hello world`:
```js
const express = require('express');
const app = express();
// 读取当前目录下环境变量port的值，满足正式环境中的node服务的端口启动需求
const port = process.env.PORT || 3000;
// 当请求路径为'/'时返回'hello world'
app.get('/', (req, res) => {
  res.send('Hello Express!')
});
// 监听端口
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
```
安装项目需要用到的依赖并运行代码：
```
npm i express nodemon -S
npx nodemon ./01hello world/demo01.js
```
浏览器输入`localhost:3000`：  
![browser](./screenshots/01hello-world-browser.png)
![node](./screenshots/01hello-world-node.png)
这里简单介绍一下我们用到的依赖和工具：
* [`express`](https://github.com/expressjs/express): 一款`nodejs`的`web`框架
* [`nodemon`](https://github.com/remy/nodemon): 监测`nodejs`应用程序中的任何改变并且自动重启服务
* [`npx`](https://github.com/zkat/npx): 帮你执行依赖包里的二进制文件
可能有小伙伴没有接触过`npx`，这个工具会自动寻找`node_modules/.bin/`下的第三方依赖并进行运行，在我们不想全局安装某些依赖的时候节省了很多代码:  
```
// 查看webpack版本
node_modules/.bin/webpack -v
// 使用npx
npx webpack -v
```
当然，这只是`npx`最基础的一个功能，要想了解更多用法可以参考阮一峰老师的文章: [`npx`使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)

### `express`中间件介绍
一个`express`应用程序，本质上就是一系列中间件函数的调用。

什么是中间件？  
`express`中的中间件其实是一个用来处理请求和响应的函数，当中间件将对应逻辑处理完成后，通过执行`next()`函数，来继续执行接下来的中间件。如果没有执行`next()`的话，请求将会挂起。

`express`中间件函数具有以下功能：
* 执行任何代码
* 修改请求(req)和响应(res)对象
* 结束请求响应周期
* 调用中间件栈中的下一个中间件函数

下面是一个中间件执行的例子：
```js
const express = require('express');
const app = express();
const port = 9000
app.use((req, res, next) => {
  console.log(1);
  next();
});
app.use((req, res, next) => {
  console.log(2);
});
app.use((req, res, next) => {
  console.log(3);
});
app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})
// 访问localhost:9000
// output: 
// 1
// 2
```

`express`框架中，中间件主要分为以下几类：
1. 应用级中间件
2. 内置中间件
3. 路由中间件
4. 错误处理中间件
5. 第三方中间件
  
接下来我们对这几类中间件进行一一介绍
#### 应用中间件和路由中间件
应用级别的中间件绑定到`app`对象的实例上，通过`app.use`和`app.METHOD`来进行调用。这里提到`METHOD`是`http`请求动词的小写形式。  
接下来我们通过几个例子来理解应用级别的中间件。
```js
const express = require('express');
const app = express()
const port = 9000
// 1. 没有指定请求路径：中间件函数会在应用程序每次接收到请求的时候执行
app.use((req, res, next) => {
  console.log('time:', Date.now());
  next();
})

// 2. 指定请求路径：中间件函数会在请求路径匹配`/user/:id`的时候执行，这里的请求方式是任意的
app.use('/user/:id', (req, res, next) => {
  res.send(req.params.id);
  next();
})

// 3. 指定请求路径和请求方式：中间件函数会在请求路径匹配`/goods`以及请求方式为`get`的时候执行
app.get('/goods', () => {
  res.send('GOODS');
  next();
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})
```

路由级别的中间件和应用级中间件的工作方式相同，区别在于它绑定到`express.Router()`的实例：
```js
const router = express.Router()
```
路由级中间件的调用类似于应用级中间件，可以通过`router.use`和`router.METHOD`来进行调用。下面是一个最简单的使用例子： 
```js
const express = require('express');
const app = express();
const router = express.Router();
const PORT = 8000;

router.get('/router1', (req, res) => {
  res.send('router1');
});
router.get('/router2', (req, res) => {
  res.send('router2');
});
app.use('/router', router);
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
```
执行代码后浏览器输入`localhost:8000/router/router1`页面会显示：`router1`，输入`localhost:8000/router/router2`页面会显示:`router2`

#### 内置中间件
`express`为我们提供了如下内置中间件：
* `express.static`： 为html,images等提供静态资源服务器
* `express.json`： 解析`json`格式的请求
* `express.urlencoded`：解析`application/x-www-form-urlencoded`格式的请求

`express.json`和`express.urlencoded`是`Express v4.16.0`版本才加入的，基于第三方中间件`body-parser`，用来处理`post`请求，方便进行参数获取和逻辑处理。  

接下来我们用几个例子来演示一下`express.static`的使用：  
```js
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
```
总结一下,`express.static`大概有如下特性：
* 为指定目录下的文件提供静态资源服务器
* 可以为多个目录提供静态资源服务，但是相同文件会按照设置顺序来查找
* 静态资源路径并不会包含目录名，但是我们可以为它们统一添加一个虚拟前缀
* 根路径的设置最好使用绝对路径

代码最终效果如下：  
![express.static](screenshots/02middleware-express.static.png)  

接下来我们学习剩余俩个内置中间，来处理`post`请求，使用方法类似于`body-parse`中间件： 
```js
const express = require('express');
const app = express();
const PORT = 8000;
// 处理Content-Type: application/json的post请求参数
app.use(express.json());
// 处理Content-Type: application/x-www-form-urlencoded的post请求参数
// extended:设置解析key=val&key1=val1的格式方式，false:使用querystring模块解析，true:使用qs模块进行解析
app.use(express.urlencoded({ extended: true }));
app.post('/json', (req, res) => {
  // json { data: [ { id: 1, name: 'wk' } ], pageSize: 10, pageIndex: 1 }
  console.log('json', req.body);
  res.send(req.body);
});
app.post('/form', (req, res) => {
  // form { pageSize: '10', pageIndex: '1' }
  console.log('form', req.body);
  res.send(req.body);
});
app.listen(PORT, () => {
  console.log(`server is listen on ${PORT}`);
});
```
执行以上代码以后，可以用`postman`发起对应的请求，请求参数通过`req.body`来进行获取

到这里，我们已经将`express`的3个内置中间件学习完成。

#### 错误处理中间件
错误处理中间的使用方式和其它中间件完成相同，唯一的区别是其它中间的参数为3个，而错误处理中间件的参数为4个且必须传入4个参数，即使你不并不需要其中的某些参数：
  
下面是一个错误处理中间件的例子
```js
const path = require('path');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('hello no error');
});
app.get('/error', (req, res) => {
  console.log(a);
  res.send('hello error');
});

app.get('/asyncError', (req, res, next) => {
  fs.readFile(path.resolve(__dirname, './static-file/public/index'), (err, data) => {
    if (err) {
      next(err); // 通过next函数将异步错误传递到错误处理中间件
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.send(data);
    }
  });
});

app.use((err, req, res, next) => {
  console.log(err); // 会捕获到错误信息
  res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
```
运行代码后，当浏览器访问`localhost:8000/error`和`localhost:8000/asyncError`时，错误处理中间件会捕获到异常，并为浏览器返回`Something broke`。这里需要注意的是异步的异常是通过`next`函数进行传入。
#### 第三方中间件

### `express`路由

#### 路由拆分

### 请求参数处理

#### `get`请求

#### `post`请求

### 搭建静态服务

### `express`模板引擎

### 文件上传

#### 单文件上传
#### 多文件上传
#### 文件预览
#### 将`node.js`代码部署到服务器

### `express-generator`脚手架

#### 目录结构
#### 脚手架学习
