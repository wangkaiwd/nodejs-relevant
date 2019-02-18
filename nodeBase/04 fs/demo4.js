const fs = require('fs');

fs.appendFile('./appendTest.txt', ',我是追加的内容', (err) => {
  if (err) {
    console.log('追加失败');
    throw err;
  }
  console.log('追加成功');
});
