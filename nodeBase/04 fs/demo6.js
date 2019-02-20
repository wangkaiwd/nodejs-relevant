const fs = require('fs');
/**
 * oldPath: 原来文件的路径
 * newPath: 要改为的文件路径
 * callback: 处理异常信息
 */
fs.rename('./renameText.txt', './renameText1.txt', (err) => {
  if (err) {
    console.log(`重命名失败 ${err.message}`);
    return;
  }
  console.log('重命名成功');
});

// 如果oldPath和newPath不在同一级目录下的话，相当于剪切效果
