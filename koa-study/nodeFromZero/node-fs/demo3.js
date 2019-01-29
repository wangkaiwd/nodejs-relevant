/**
 * Created by wangkai on 2019/1/29
 * Desc: fs demo
 */
// 1. 判断服务器上面有没有 upload 目录，没有就创建这个目录
const fs = require('fs');
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
fs.stat(resolve('./upload'), (err, stats) => {
  if (err) {
    fs.mkdir(resolve('./upload'), (err) => {
      if (err) throw err;
      console.log('创建upload目录');
    });
  } else {
    console.log('upload目录已经存在');
  }
});

// 2. 找出 html 目录下面的所有的目录，然后打印出来
fs.readdir(resolve('./html'), (err, files) => {
  files.forEach(file => {
    fs.stat(resolve(`./html/${file}`), (err, stats) => {
      if (stats.isDirectory()) {
        console.log(file);
      }
    });
  });
});
