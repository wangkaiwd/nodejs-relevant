## `Node.js`基础知识整理
### `CommonJS`
#### 什么是`CommonJS`
`CommonJS`就是为`JS`的表现来制定规范，由于`js`没有模块系统、标准库较少、缺乏包管理工具，所以`CommonJS`应运而生，它希望可以在`js`的任何地方运行，而不只是浏览器中，从而达到Java、C#、PHP这些后端语言具备开发大型应用的能力。
#### `CommonJS`的应用
1. 服务端`javascript`应用程序(`Node.js`)
2. 命令行工具
3. 桌面图形界面应用程序
#### `CommonJS`与`Nodejs`的关系
`CommonJS`是模块化的标准，`Nodejs`就是`CommonJS`(模块化)的实现
#### `Nodejs`中的模块化
* 在`Node`中，模块分为俩类：一是`Node`自身提供的模块，称为核心模块；二是用户自己编写的模块，称为文件模块。核心模块在`Node`源代码的编译过程中，编译进了二进制执行文件，所以它的加载速度是最快的，如: HTTP模块，URL模块，FS模块；文件模块是在运行时动态加载的，需要完整的路径分析、文件定位、编译执行过程等......,所以它的速度相对核心模块来说会慢一些
* 我们可以将公共的功能抽离出一个单独的`js`文件来存放，然后在需要的情况下通过`exports`或`module.exports`将模块导出，并通过`require`进行引入

这里通过代码简单描述一下`module.exports`和`exports`之间的联系，不过在工作中我们还是直接使用`module.exports`比较好，防止混淆: [demo链接](./01%20common/demo2.js)
```js
// 模拟exports的实现,注意：module.exports默认值是{}
const require = () => {
  ((module, exports) => {
    // 模块代码
    const doSomething = () => {};
    // 重新赋值将不再和module.exports公用同一片内存空间
    // 此时，模块导出一个空的默认对象
    exports = doSomething;
    // 此时，该模块导出doSomething,而不是默认空对象
    module.exports = doSomething;
  })(module, module.exports);
};
```

现在我们通过三种使用方式来学习`Node`中的模块化及`exports/require`的使用

**方法一：**
> 当前目录: [01 common/myTools/tool1.js](./01%20common/myTools/tool1.js)
```js
// 定义一个工具模块
const tools = {
  add (...numbers) {
    const sum = numbers.reduce((count, item) => count + item);
    return sum;
  }
};
// 将模块暴露出去,如果没有通过module.exports暴露变量的话，默认导出{}
module.exports = tools; // {add: Function}
// modules.exports被一个新的值完全取代时，也要重新赋值exports,否则exports仍为module.exports重新赋值前的值
// console.log('exports', exports); // {}
// module.exports = exports = tools
// 不会生效的写法
// exports = tools;
// 生效的写法
// exports.tools = tools; {tools: tools}
/**
 * exports是module.exports的简写，但是如果为exports重新赋值的话，相当于重新开辟了内存空间
 * 不再和module.exports公用同一块内存空间，切断了之间的联系，此时导出的会是默认值{},或者声明定义的module.exports
 */

```
上面代码实现的效果：
1. 我们自己定义了一个`tools`工具库
2. 通过`module.exports`将`tools`导出

当模块文件较多的时候，代码会比较乱，这时候需要统一管理，`Node`为我们提供了`node_modules`目录来统一存放我们的第三方模块，所以接下来我们要介绍方法二和方法三

**方法二**:

　如果将第三方模块放入到`node_modules`中让`nodejs`来帮我们管理的话，引入的时候不需要再使用`./`或者`../`,可以直接使用模块名。这样`node`会首先在当前目录下进行查找，如果没有找到的话会进入到`node_modules`中进行查找
> 当前目录: [01 common/node_modules](./01%20common/node_modules/tool2.js)
```js
const tools = {
  multiply (...numbers) {
    const result = numbers.reduce((count, item) => count * item);
    return result;
  }
};

module.exports = tools;
```

**方法三**：

通过`package.json`来引入文件： 
1. 在当前目录(tool3,即第三方模块的根目录下)执行`npm init -y`生成`package.json`文件
2. `package.json`文件中会告诉我们程序的入口文件: `"main": "tool.js"`
3. `nodejs`通过`require`查找到`tool3`，发现目录下有`package.json`文件
4. `node`执行`package.json`中写明的入口文件`tool.js`
> 当前目录： [01 common/node_modules/tool3/tool.js](./01%20common/node_modules/tool3/tool.js)
```js
const tool = {
  add (...numbers) {
    const sum = numbers.reduce((count, item) => count + item);
    return sum;
  },
  multiply (...numbers) {
    const result = numbers.reduce((count, item) => count * item);
    return result;
  }
};
module.exports = tool;
```

##### 小节
接下来，我们分别使用三种方法来实现模块的引入并使用
> 当前目录：[01 common/demo1.js](./01%20common/demo1.js)
```js
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
```
打开浏览器输入`localhost:3000`就可以看到我们的执行结果了:
![commonJS](./shotscreen/01commonJS_demo1.png)
### `npm`与包
> `npm`是世界上最大的开放源代码生态系统。我们可以通过`npm`下载各种各样的第三方模块(package：包)。在安装`Node`的时候，会默认安装`npm`。

`Nodejs`中除了它自己提供的核心模块之外，还可以自定义模块，以及使用**第三方模块**。`Node`的第三方模块由`npm`提供的包组成，可以通过包来对一组具有相互依赖关系的模块进行统一管理。

查找第三方模块的方法：
* 搜索引擎：直接查找你需要安装的第三方模块的关键字，并根据`readme`进行安装使用
* [`npm`官网](https://www.npmjs.com/): 通过包的名字直接进行搜索。（推荐在官网进行搜索，效果更好）
  
一些基础的`npm`命令：
* npm -v: 查看`npm`版本
* npm ls: 查看当前目录下都安装了哪些`npm`包
* npm install/i 模块名@版本号: 安装该模块的指定版本
* npm info 模块名：查看该模块的版本及内容
  
在使用`npm`的过程中，经常会用到的一些`npm`基础知识：
* i/install: 安装模块。使用`install`或者简写`i`都表示要下载包
* unstall: 卸载模块。如果你安装错了，或者不想使用某一个模块，可以使用`unstall`卸载它
* g(global): 全局安装。将包安装到计算机中，你可以在计算机任何一个位置使用它
* --save-dev/-D: 通过这种方式安装的包的名称及版本号会出现在`package.json`中的`devDependencies`中。`devDependencies`只在开发环境中使用。例如：`webpack-bundle-analyzer`使用来分析生产环境打包后代码的资源组成，程序运行时并不需要，所以通过`-D`命令来安装
  
下面是2个安装示例：
```shell
npm i webpack-bundle-analyzer -S
npm i axios -D
```

在实际项目中，我们会通过`package.json`来对使用`npm`安装的第三方模块进行管理。如果我们需要创建`package.json`,那我们应该在指定的包管理目录中通过以下命令进行生成：
```
npm init : 按步骤创建`package.json`
npm init -y : 快速创建`package.json`
```

由于国内网络的原因，有时候通过`npm`下载包可能会很慢或直接卡掉，这时候需要我们修改下载源为淘宝源：
```
npm config set registry http://registry.npm.taobao.org/
```
这里为大家推荐一个好用的工具来进行`npm`下载源的管理：[nrm](https://github.com/Pana/nrm)

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
const PORT = 3000;
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
server.listen(PORT, err => {
  if (err) throw err;
  console.log(`server listening on port ${PORT}`);
});
```
在`demo`所在文件目录下打开终端执行`node demo1`，之后浏览器访问`localhost:3000`： 
![http](shotscreen/02http_demo1.png)

### `url`模块
`url`模块用于处理于解析`URL`。使用方法如下：
```js
const url = require('url')
```

**`Web`中的[`URL`](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL): 统一资源定位符**

一个`URL`由不同的部分组成，其中一些是必须的，而另一些是可选的。我们以下面的`URL`为例，学习一下其中最重要的部分:
```
http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
```
* 协议： `http://`(Protocol),表明浏览器必须要使用何种协议
* 域名：`www.example.com`(Domain Name),表明正在请求哪个`Web`服务器
* 端口: `:80`(Port),表示用于访问`Web`服务器上的资源的技术"门"
* 网络服务器上资源的路径：`/path/to/myfile.html`(Path to the file)
* 提供给网路服务的额外参数: `?key1=value1&key2=value2`(Parameters),这些参数是用`&`符号分割的键值对列表
* 资源本身的另一部分锚点：`#SomewhereInTheDocument`(Anchor)

> 当前目录：[03 url/demo2.js](./03%20url/demo2.js)

接下来，我们通过一个例子来演示`NodeJS`中的`URL`模块,来解析请求地址中的额外参数:  
```js
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
     *  2. 如果传入true,通过key1=val1&key2=val2&key3=val3传递的额外参数会转换为对象
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
    let html = '', extraParams = result.query;
    for (let key in extraParams) {
      html += `<h3>${key}:${extraParams[key]}</h3>`;
    }
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.write(html);
    res.end();
  }
}).listen(PORT, err => {
  if (err) throw err;
  console.log(`server listening on port ${PORT}`);
});
```

浏览器访问`http://localhost:3000/?pageSize=10&pageIndex=2`: 
![03url/demo1](./shotscreen/03url_demo1.png)

在代码中我们通过`url.parse`方法对请求路径进行解析，并通过`query`属性获取到了额外参数，接下来我们继续学习`url`模块的其它`api`

#### 常用`api`
> 当前目录：[03 url/demo2.js](03%20url/demo2.js)
1. `url.parse`
    ```js
    url.parse('www.baidu.com/new?name=zhangsan&age=14')
    /**
    *Url {
       protocol: null,
       slashes: null,
       auth: null,
       host: null,
       port: null,
       hostname: null,
       hash: null,
       search: '?name=zhangsan&age=14',
       query: 'name=zhangsan&age=14',
       pathname: 'www.baidu.com/new',
       path: 'www.baidu.com/new?name=zhangsan&age=14',
       href: 'www.baidu.com/new?name=zhangsan&age=14' } 
    */
    // 传入第二个参数来将额外参数处理为对象格式
    url.parse('www.baidu.com/new?name=zhangsan&age=14', true)
    // query属性是一个对象
    /**
    *Url {
       protocol: null,
       slashes: null,
       auth: null,
       host: null,
       port: null,
       hostname: null,
       hash: null,
       search: '?name=zhangsan&age=14',
       query: [Object: null prototype] { name: 'zhangsan', age: '14' },
       pathname: 'www.baidu.com/new',
       path: 'www.baidu.com/new?name=zhangsan&age=14',
       href: 'www.baidu.com/new?name=zhangsan&age=14' }
    */
    ```
2. `url.format`
    ```js
    // 将URL对象转换为URL字符串
    url.format({
      protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?name=zhangsan&age=14',
      query: { name: 'zhangsan', age: '14' },
      pathname: 'www.baidu.com/new',
      path: 'www.baidu.com/new?name=zhangsan&age=14',
      href: 'www.baidu.com/new?name=zhangsan&age=14' 
    })
    // Console:
    // www.baidu.com/new?name=zhangsan&age=14
    ```
3. `url.resolve`
    ```js
    // 以一种`web`浏览器解析超链接的方式把一个目标URL解析成相对于一个基础URL
    console.log(url.resolve('/one/two/three', '/four'));
    // /four
    console.log(url.resolve('/one/two/three', 'four'));
    // /one/two/four
    console.log(url.resolve('http://example.com', 'one'));
    // http://example.com/one
    console.log(url.resolve('http://example.com/one', 'two'));
    // http://example.com/two
    console.log(url.resolve('http://example.com/one/', 'two'));
    // http://example.com/one/two
    console.log(url.resolve('http://example.com/one', '/two'));
    // http://example.com/two
    ```
    
这里只介绍了几个稍微常用一些的`api`,更多的`url`相关`api`可以去`node`官网深入学习: [`url-URL`](http://nodejs.cn/api/url.html)

### `fs`文件系统
`fs`提供了一系列`API`,来让`NodeJS`可以与操作系统的文件进行交互。所有文件系统操作都有同步和异步的形式，大多数情况下我们会使用异步形式，防止进程阻塞，提供性能

这里我们通过下面的几个`API`来学习`fs`文件系统：
1. `fs.stat`: 检测正在处理的是文件还是目录
2. `fs.mkdir`: 创建目录
3. `fs.writeFile`：将数据写入文件，如果文件存在则覆盖该文件
4. `fs.appendFile`: 将数据追加到文件，如果文件尚不存在则创建该文件
5. `fs.readFile`: 读取文件的全部内容
6. `fs.readdir`：读取目录内容
7. `fs.rename`: 文件重命名
8. `fs.rmdir`: 删除目录
9. `fs.unlink`: 删除文件

**这里需要留意：`fs`操作的第一个参数如果是文件路径的话，相对路径将相对于`process.cwd()`指定的当前工作目录进行解析**
> 当前目录：[04 fs/demo1.js](./04%20fs/demo1.js)

首先，我们通过`fs.stat`检测当前操作的内容是文件还是目录：
```js
const fs = require('fs');

fs.stat('./statTest.txt', (err, stats) => {
  if (err) throw err;
  // fs.Stats对象：提供有关文件的信息
  console.log('stats', stats);
  // Stats {
  //   dev: 2280844857,
  //     mode: 33206,
  //     nlink: 1,
  //     uid: 0,
  //     gid: 0,
  //     rdev: 0,
  //     blksize: undefined,
  //     ino: 2251799813687678,
  //     size: 0,
  //     blocks: undefined,
  //     atimeMs: 1550466987951.39,
  //     mtimeMs: 1550466987951.39,
  //     ctimeMs: 1550466987951.39,
  //     birthtimeMs: 1550466987951.39,
  //     atime: 2019-02-18T05:16:27.951Z,
  //     mtime: 2019-02-18T05:16:27.951Z,
  //     ctime: 2019-02-18T05:16:27.951Z,
  //     birthtime: 2019-02-18T05:16:27.951Z }

  // stats.isFile(): 如果操作的是文件，返回true
  // stats.isDirectory(): 如果操作的是文件系统目录，则返回true
  console.log(`文件：${stats.isFile()}`); // 文件: true
  console.log(`目录：${stats.isDirectory()}`); // 目录：false
});
```

然后，我们进行目录的删除和创建:
> 当前目录： [04 fs/demo2.js](./04%20fs/demo2.js)
```js
const fs = require('fs');
/**
* 参数1：创建路径
* 参数2：回调函数，用来传递错误信息
*/


fs.mkdir('./mkdirTest', (err) => {
  if (err) {
    console.log(`创建失败 ${err.message}`);
  }
  console.log('目录创建成功');
  fs.rmdir('./mkdirTest', (err) => {
    if (err) {
      console.log(`删除失败 ${err.message}`);
    }
    console.log('删除目录成功');
  });
});
```
执行代码后，浏览器控制台会提示错误信息，删除失败，之后会创建`mkdirTest`

接着，我们进行文件数据的写入:
> 当前目录：[04 fs/demo3.js](./04%20fs/demo3.js)
```js
const fs = require('fs');
/**
* path: 写入文件的路径，没有该文件会自动创建
* data: 要写入文件的内容(会覆盖原有内容)
* callback: 处理错误信息
*/

fs.writeFile('./writeTest.txt', 'hello nodejs', (err) => {
  if (err) {
    console.log(`写入失败 ${err.message}`);
    return;
  }
  console.log('写入数据成功');
  // 删除writeTest.txt
  fs.unlink('./writeTest.txt', (err) => {
    if (err) {
      console.log(`删除文件失败 ${err.message}`);
      return;
    }
    console.log('删除文件成功');
  });
});
```
执行上述代码后，首先会判断当前目录下是否有writeTest.txt文件，如果有的话，使用hello nodejs将原有内容覆盖，如果没有的话，会先创建writeTest.txt,然后在文件中写入hello nodejs。如果writeText文件写入成功的话，会继续删除文件

对应于`fs.writeFile`覆盖文件，`fs.appendFile`提供了追加文件内容的功能：
> 当前目录：[04 fs/demo4.js](./04%20fs/demo4.js)
```js
const fs = require('fs');
/**
* path: 文件路径
* data: 追加的内容
* callback: 处理错误信息
*/
fs.appendFile('./appendTest.txt', ',我是追加的内容', (err) => {
  if (err) {
    console.log('追加失败');
    throw err;
  }
  console.log('追加成功');
});
```
打开当前目录下的appendText.txt,发现内容由：
```
我是原来的内容
```
变成：
```
我是原来的内容
,我是追加的内容
```

之后按照我们的节奏来继续学习`fs.readFile`(读取文件)和`fs.readdir`(读取目录):
> 当前目录: [04 fs/demo5.js](./04%20fs/demo5.js)
```js
const fs = require('fs');
/**
 * path: 读取文件路径
 * callback: err:错误信息，data:读取的文件内容(Buffer)
 */
fs.readFile('./readFileTest.txt', (err, data) => {
  if (err) {
    console.log(`文件读取失败 ${err.message}`);
    return;
  }
  console.log('文件读取成功:', data.toString());
  // 文件读取成功: 读取文件操作测试
});

/**
 * path: 读取文件路径
 * callback: err: 错误信息，files: 目录下文件名组成的数组
 */
fs.readdir('../04 fs', (err, files) => {
  if (err) {
    console.log(`目录读取失败 ${err.message}`);
    return;
  }
  console.log('目录读取成功:', files);
  // 目录读取成功: [ 'appendTest.txt',
  //   'demo1.js',
  //   'demo2.js',
  //   'demo3.js',
  //   'demo4.js',
  //   'demo5.js',
  //   'mkdirTest',
  //   'readFileTest.txt',
  //   'statTest.txt' ]
});
```

最后，我们学习`fs.rename`:
> 当前目录：[04 fs/demo6.js](./04%20fs/demo6.js)
```js
const fs = require('fs');
/**
 * oldPath: 原来文件的路径
 * newPath: 要改为的文件路径
 * callback: 处理异常信息
 */
fs.rename('./renameText.txt', './renameText1.txt', (err) => {
  if (err) {
    console.log(`重命名失败 ${err.message}`);
    return;
  }
  console.log('重命名成功');
});

// 如果oldPath和newPath不在同一级目录下的话，相当于剪切效果
```
到这里，我们已经把列出来的`api`学习完毕了

#### `fs`案例
通过前面的学习，这里我们要通过`fs`做一些小事情：
1. 判断服务器上有没有upload目录，没有就创建这个目录
2. 找出html目录下面的所有目录，然后打印出来

由于这里我们用到的`api`都是异步执行，所以统一使用`Promise`进行封装一下。也可以使用`util-使用工具`里的[`util.promisify`](http://nodejs.cn/api/util.html#util_util_promisify_original)来进行处理。
```js
const fs = require('fs');
/**
 * 将api转换为Promise的形式
 * @param callback
 * @returns {function(*=): Promise<any>}
 */
const transPromise = callback => path =>
  new Promise((resolve, reject) => {
    callback(path, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

// 创建upload目录
makeUpload = () => {
  const createDir = transPromise(fs.mkdir)('./upload');
  createDir.then(
    data => {
      console.log(`创建成功`);
    },
    err => {
      console.log(`创建失败 ${err.message}`);
    }
  );
};

// 将api转换为Promise的形式
const stat = transPromise(fs.stat);
const readdir = transPromise(fs.readdir)('./html');
```

接下来我们用`Promise`版本来实现前面的俩个问题: 
```js
// 1.判断服务器上有没有upload目录，没有就创建这个目
stat('./upload').then(
  stats => {
    // 如果是文件的话，继续创建目录
    if (stats.isFile()) {return makeUpload();}
    // 存才upload目录，可以进行接下来的操作
    console.log('目录存在');
  },
  err => {
    // 没有upload文件或目录
    console.log('err', err);
    makeUpload();
  }
);

// 2.找出html目录下面的所有目录，然后打印出来
let files = [];
readdir.then(
  data => {
    console.log('html下的所有目录和文件', data);
    files = data;
    const promiseArray = data.map(item => stat(`./html/${item}`));
    return Promise.all(promiseArray);
  },
  err => {
    console.log(`目录读取失败 ${err.message}`);
  }
).then(
  stats => {
    const dirs = [];
    stats.map((item, i) => {
      if (item.isDirectory()) {
        dirs.push(files[i]);
      }
    });
    console.log('html下的所有目录', dirs);
  },
  err => {
    console.log(`当前操作的文件不存在 ${err.message}`);
  }
);
// 目录存在
// html下的所有目录和文件 [ 'file1.js', 'file2.js', 'file3.js', 'file4', 'file5', 'file6' ]
// html下的所有目录 [ 'file4', 'file5', 'file6' ]
```
完整代码: [demo](./04%20fs/demo7.js)
### `path`路径操作
> `path`模块提供用于处理文件路径和目录路径的使用工具  
> 当前目录：[05 path](./05%20path)

这里把`path`的常用接口按照用途来进行一个简单归类，方便学习理解
#### 获取路径/文件名/扩展名
* `path.dirname(filepath)`: 获取路径
* `path.basename(filepath)`: 获取文件名
* `path.extname(filepaht)`: 获取扩展名

##### 获取所在路径
例子如下：
```js
const path = require('path');
const filepath = '/tmp/demo/js/test.js';
// 返回filepath所在的目录名
console.log(path.dirname(filepath)); // /tep/demo/js
```
##### 获取文件名
严格来讲，`path.basename`只是输出路径的最后一部分，并不会判断是否是文件名。但是大部分情况我们都可以用它来作为简易的"获取文件名"的方法
```js
const path = require('path');
// output: test.js
console.log(path.basename('tmp/demo/js/test.js'));

// output: test
console.log(path.basename('tmp/demo/js/test'));
```
有些时候，我们可能不需要文件的扩展名，这里我们可以传入第二个参数：
```js
// output: test
path.basename('tmp/demo/js/test.js', '.js');
```
##### 获取扩展名
例子如下：
```js
// .html
console.log(path.extname('index.html'));

// output: .md
console.log(path.extname('index.coffee.md'));

// output: ''
console.log(path.extname('index'));
```

比较详细的解析规则(假设:`path.basename(filepath)===B`):
* 从`B`的最后一个`.`开始截取，直到最后一个字符
* 如果`B`中不存在`.`,或者`B`的第一个字符就是`.`,那么返回空字符串 

#### 路径拼接
在`Nodejs`中，路径都是相对于`process.cwd()`(`Nodejs`进程的当前工作目录)来进行操作的，大多数情况我们都会进行路径的拼接来方便路径的书写
* `path.join([...path])`: 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，`Unix`系统是`"/"`,`Windows`系统是`"\"`
* `path.resolve([...path])`: 将路径或路径片段的序列解析为绝对路径

##### 连接路径
```js
const path = require('path');

// output： '/foo/bar/baz'
console.log(path.join('/foo', 'bar', 'baz/asdf', '..'));
```
##### 解析为绝对路径
这个`API`简单理解就是在`shell`命令下，从左到右运行一遍`cd path`命令，最终获取的绝对路径/文件名，就是这个接口所返回的结果
```js
const path = require('path');

// output: /foo/bar/baz
console.log(path.resolve('/foo/bar', './baz'));

// cd /foo/bar
// cd ./baz
```

下面是一些例子的对比:
```js
// output: /tmp/file
console.log(path.resolve('/foo/bar', '/tmp/file/'));

// 如果当前工作目录是/home/myself/node
// output: /home/myself/node/wwwroot/static_files/gif/image.gif
console.log(path.resolve('wwwroot', 'static_files/png/', '..gif/image.gif'));
```

#### 文件路径分解/组合
* `path.format(pathObject)`: 从路径返回对象字符串。与`path.parse`相反
* `path.parse(filepath)`: 返回一个对象，表示`filepath`的各种信息

##### `path.parse`
会将路径解析为一个包含路径信息的对象，使用起来会比较方便:
```js
const path = require('path');

console.log(path.parse('/home/user/dir/file.txt'));
// {
//   root: '/',             // 获取文件的根路径
//   dir: '/home/user/dir', // path.dirname  获取文件所在目录
//   base: 'file.txt',      // path.basename 获取文件名（更准确的来讲：输出路径的一部分）
//   ext: '.txt',           // path.extname  获取文件扩展名
//   name: 'file'           // path.basename(path,[,ext])  通过传入第二个参数来获取文件名（不包含扩展名）
// }
```
##### `path.format`
可以将一个包含路径信息的对象转换为路径字符串，是`path.parse`的逆向操作。  
传入参数有一些参数是会被覆盖的，优先级如下：
* `dir` vs `root`: 如果提供了`pathObject.dir`,则忽略`pathObject.root`
* `base` vs `ext name`: 如果`pathObject.base`存在，则忽略`pathObject.ext`和`pathObject.name`
```js
const path = require('path');
// root会被忽略
console.log(path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
}));
// /home/user/dir/file.txt

// ext会被忽略
console.log(path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored'
}));
// file.txt

// 未指定base,则使用name + ext
console.log(path.format({
  root: '/',
  name: 'file',
  ext: '.txt'
}));
// /file.txt
```

### 创建`Web`服务器
这里，我们要通过http模块，url模块，path模块，fs模块来创建一个Web服务器

什么是web服务器？  
`Web`服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以向浏览器等`Web`客户端提供文档，也可以放置网站问文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的三个`Web`服务器是`Apache,Nginx,IIS`  
想要深入了解的话可以阅读`MDN`：[传送门](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_web_server)

当浏览器需要一个托管在网络服务器上的文件的时候，浏览器通过HTTP请求这个文件。当这个请求到达正确的网络服务器(硬件)时，HTTP服务器(软件)收到这个请求，找到这个被请求的文档(如果这个文档不存在，那么将返回一个404响应)，并把这个文档通过HTTP发送给浏览器。
![webServer_flow](./shotscreen/06webServer_flow.png)

> 当前目录：[06 webServer](./06%20webServer/demo1.js)

接下来，我们用代码来演示这个流程：
```js
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// process.cwd(): 返回Nodejs进程的当前工作目录
// 在执行fs.readFile操作时，第一个参数是相对于process.cwd()的路径
const getPath = dir => path.resolve(__dirname, dir);
/**
 * 通过后缀获取请求头
 * @param suffix：请求路径后缀
 * @returns {*}
 */
const getHeader = suffix => {
  const map = {
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'application/js',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
  };
  return map[suffix];
};

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let sourcePath = pathname;
  // 将请求路径和资源进行映射
  const routeConfig = {
    '/': '/index.html',
    '/about': '/about.html',
    '/list': '/list.html'
  };
  if (Object.keys(routeConfig).includes(pathname)) {
    sourcePath = routeConfig[pathname];
  }
  fs.readFile(getPath(`template${sourcePath}`), (err, data) => {
    if (err) {
      console.log('err', err);
      res.writeHead(404, 'NOT FOUND', {
        'Content-Type': 'text/html;charset=utf-8'
      });
      res.write(`<h2>Not Found</h2>`);
      res.end();
      return;
    }
    // 这里要根据请求资源的不同，来进行不同响应头的处理
    const suffix = path.extname(sourcePath), header = getHeader(suffix);
    // css,img,js
    res.writeHead(200, 'resolve OK', {
      'Content-Type': `${header};charset=utf-8`
    });
    res.write(data);
    res.end();
  });
}).listen(PORT, err => {
  if (err) throw err;
  console.log(`server is listening on port ${PORT}`);
});
```
### 非阻塞I/O,事件驱动
`Java`，`PHP` 或者 `.NET`等服务端语言，会为每一个客户端的连接创建一个新的线程。  
`Node`不会为每一个客户连接创建一个新的线程，而仅仅用一个线程。  
当有用户连接了，就会触发一个内部事件，通过非阻塞I/O、事件驱动机制，让`Node`程序宏观上也是并行的。  
使用`Node`,一个8GB内存的服务器，可以同时处理超过4万用户的连接。

在这一章节中，主要解决:
1. `Node`的非阻塞`I/O`是什么
2. `Node events`模块是什么

在我们正常编程中，我们是希望程序能够按照我们的编写意愿来一行一行执行：
```js
console.log(1);
console.log(2);
console.log(3);
/**
 * output:
 *  1
 *  2
 *  3
 */
```
可是大多数时候，我们会用到一些异步方法:
```js
const fs = require('fs');

console.log(1);
getTest = () => {
  fs.readFile('./test.json', (err, data) => {
    console.log(2);
  });
};
getTest();
console.log(3);
/**
 * output:
 *  1
 *  3
 *  2
 */
```
上面代码中，由于`fs.readFile`是`Node`的异步函数，会在文件读取完毕之后才会执行。所以程序会先执行1,3，最后执行`fs.readFile`的2部分。并不会因为读取文件的逻辑而影响到之后代码的执行。

但是这种也会引发一个问题：在步骤3的位置无法获取步骤2中执行结果！这就是`Node`的非阻塞I/O

那么我们怎么解决这个问题呢?
1. 通过回调函数
2. 通过`Node`的`events`模块

> 当前目录：[07 no-blocking IO event driven](./07%20no-blocking%20IO%20event%20driven)

首先，我们通过回调函数来解决这个问题:  
```js
const fs = require('fs');

const getTest = (callback) => {
  fs.readFile('./test.json', (err, data) => {
    callback(data);
  });
};

getTest(result => {
  console.log(JSON.parse(result));
  // { name: 'test', language: 'nodejs' }
})
```
通过回调函数，可以将`getExt`的数据获取到

接下来，我们通过`Node`的`events`模块来解决这个异步问题：
```js
// Emitter:触发器  EventEmitter:事件触发器
const EventEmitter = require('events');
const fs = require('fs');
/**
 * Nodejs事件循环：
 *  1. Node是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高
 *  2. Node的每一个API都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
 *  3. Node有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听事件
 */

const myEmitter = new EventEmitter();
const getTest = () => {
  fs.readFile('./test.json', (err, data) => {
    // 触发事件
    myEmitter.emit('data', data);
  });
};

// 注册监听器
myEmitter.on('data', (data) => {
  console.log(JSON.parse(data));
});
getTest();
```
上边的代码创建一个`EventEmitter`实例，绑定了一个监听器。`EventEmitter.on()`用于注册监听器，`EventEmitter.emit()`用于触发事件
  
到这里我们就简单了解了非阻塞`I/O`和事件驱动

### 模拟`get`与`post`请求

### `Node`连接`MongoDB`
