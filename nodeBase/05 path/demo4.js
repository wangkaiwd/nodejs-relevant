const path = require('path');

// output: /foo/bar/baz
console.log(path.resolve('/foo/bar', './baz'));

// cd /foo/bar
// cd ./baz

// output: /tmp/file
console.log(path.resolve('/foo/bar', '/tmp/file/'));

// 如果当前工作目录是/home/myself/node
// output: /home/myself/node/wwwroot/static_files/gif/image.gif
console.log(path.resolve('wwwroot', 'static_files/png/', '..gif/image.gif'));
