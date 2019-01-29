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
 *  callback: 回调函数
 */
// fs.writeFile('test.js', 'console.log("hello wk")', err => {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('写入成功');
//   }
// });
// fs.appendFile('test.js', '; \nvar str = "这段文字是追加的内容"', err => {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('追加成功!');
//   }
// });
// fs.readFile('./test.js', (err, data) => {
//   if (err) throw err;
//   console.log('文件读取成功!');
//   console.log(data);
//   // <Buffer 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 22e5 ad 97 e6 ... >
//   console.log(String(data));
//   // console.log("hello wk");
//   // var str = "这段文字是追加的内容"
// });
// 回调函数中files: 目录中的文件名的数组，不包括'.'和'..'
// fs.readdir('../node_modules', (err, files) => {
//   if (err) throw err;
//   console.log('读取目录成功!');
//   console.log(files);
// });
/**
 * 将oldPath上的文件重命名为newPath提供的路径名。在newPath已经存在的情况下，它将被覆盖（相当于剪切）
 * oldPath
 * newPath
 * callback
 */
// fs.rename('./test.js', './testRename.js', err => {
//   if (err) throw err;
//   console.log('重命名成功！');
// });