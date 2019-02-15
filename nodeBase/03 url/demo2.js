const url = require('url');
// console.log('parse', url.parse('www.baidu.com/new?name=zhangsan&age=14'));
// console.log('parse queryString', url.parse('www.baidu.com/new?name=zhangsan&age=14', true));

// console.log(url.format({
//   protocol: null,
//   slashes: null,
//   auth: null,
//   host: null,
//   port: null,
//   hostname: null,
//   hash: null,
//   search: '?name=zhangsan&age=14',
//   query: { name: 'zhangsan', age: '14' },
//   pathname: 'www.baidu.com/new',
//   path: 'www.baidu.com/new?name=zhangsan&age=14',
//   href: 'www.baidu.com/new?name=zhangsan&age=14'
// }));

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
