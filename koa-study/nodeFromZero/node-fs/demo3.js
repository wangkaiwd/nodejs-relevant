/**
 * Created by wangkai on 2019/1/29
 * Desc: fs demo
 */
// 1. 判断服务器上面有没有 upload 目录，没有就创建这个目录
const fs = require('fs');
fs.stat('./upload', (err, stats) => {
  if (err) throw err;
  if (!stats.isDirectory()) {
    fs.mkdir('./upload', (err) => {
      if (err) throw err;
      console.log('创建upload目录');
    });
  } else {
    console.log('已经存在upload目录');
  }
});

// 2. 找出 html 目录下面的所有的目录，然后打印出来