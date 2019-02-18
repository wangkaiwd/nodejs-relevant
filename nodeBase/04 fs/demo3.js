const fs = require('fs');

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
