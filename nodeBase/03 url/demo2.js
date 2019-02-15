const url = require('url');
console.log('parse', url.parse('www.baidu.com/new?name=zhangsan&age=14'));
console.log('parse queryString', url.parse('www.baidu.com/new?name=zhangsan&age=14', true));
