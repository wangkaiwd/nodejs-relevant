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
