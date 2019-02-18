const fs = require('fs');

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




