/**
 * Created by wangkai on 2019/1/29
 * Desc: fs.mkdir 和 fs.rmdir
 */

const fs = require('fs');

// fs.mkdir: 异步的创建目录，完成回调没有其它参数
// fs.mkdir('./test1', (err) => {
//   if (err) throw err;
//   console.log('创建目录成功');
// });

// fs.rmdir: 异步的删除目录，完成回调没有其它参数
// fs.rmdir('./test1', err => {
//   if (err) throw err;
//   console.log('删除目录成功');
// });

// fs.writeFile
/**
 * 异步地将数据写入文件，如果文件已存在则覆盖该文件。data是字符串或buffer
 * 如果data是buffer，则忽略encoding选项
 *  file: 文件名或文件描述符
 *  data(String|Buffer)
 *
 *  callback
 */
fs.writeFile('test.js', 'console.log("hello wk")', err => {
  if (err) {
    console.log(err);
    return false;
  } else {
    console.log('写入成功');
  }
});
fs.appendFile('test.js', '; \nvar str = "这段文字是追加的内容"', err => {
  if (err) {
    console.log(err);
    return false;
  } else {
    console.log('追加成功!');
  }
});