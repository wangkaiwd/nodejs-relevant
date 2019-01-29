const tools = require('./_tool_add');
//如果node在当前目录没有找到mul_tool文件，就会取node_modules里面去查找
const toolsSelfModule = require('mul_tool');
const wkTools = require('./node_modules/wk-module/tools');
console.log('wkTools', wkTools);
console.log('tools', tools.sum(1, 2, 3));
console.log('selfModule', toolsSelfModule);
const url = require('url');
console.log('parse', url.parse('http://www.baidu.com'));
// parse Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com',
//   port: null,
//   hostname: 'www.baidu.com',
//   hash: null,
//   search: null,
//   query: null,
//   pathname: '/',
//   path: '/',
//   href: 'http://www.baidu.com/' }

// 解析一个完整的路径
console.log('parse1', url.parse('http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument'));
// parse1 Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.example.com:80',
//   port: '80',
//   hostname: 'www.example.com',
//   hash: '#SomewhereInTheDocument',
//   search: '?key1=value1&key2=value2',
//   query: 'key1=value1&key2=value2',
//   pathname: '/path/to/myfile.html',
//   path: '/path/to/myfile.html?key1=value1&key2=value2',
//   href:
//    'http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument' }

// url.format()
console.log('format', url.format({
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.example.com:80',
  port: '80',
  hostname: 'www.example.com',
  hash: '#SomewhereInTheDocument',
  search: '?key1=value1&key2=value2',
  query: 'key1=value1&key2=value2',
  pathname: '/path/to/myfile.html',
  path: '/path/to/myfile.html?key1=value1&key2=value2',
  href: 'http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument'
}));
// format http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument

// url.resolve():
console.log('resovle', url.resolve('http://www.baidu.com', 'wk')); // http://www.baidu.com/wk
console.log('resovle', url.resolve('http://www.baidu.com/hh', 'wk')); // http://www.baidu.com/wk