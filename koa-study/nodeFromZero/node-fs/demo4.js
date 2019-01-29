const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const resolve = dir => path.resolve(__dirname, dir);

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);

// 1. 判断upload文件是否存在
// const getStat = async (path) => {
//   const stats = await stat(resolve(path));
//   return stats;
// };
// 2. 找出 html 目录下面的所有的目录，然后打印出来
const isExistUpload = async () => {
  try {
    const stats = await stat(resolve('./upload'));
    console.log('upload目录已经存在');
  } catch (e) {
    const data = mkdir(resolve('./upload'));
    console.log('upload目录创建成功', data);
  }
};

const mapDir = async () => {
  try {
    const files = await readdir('./html');
    files.forEach(file => {
      const stats = stat(resolve(`./html/${file}`));
      if (stats.isDirectory()) {
        console.log(file);
      }
    });
  } catch (e) {
    console.log('读取html出错', e);
  }
};
isExistUpload();
mapDir();

// todo: 1. 如何优雅的处理async 和 await的错误  2. async函数直接执行时的warning提示

