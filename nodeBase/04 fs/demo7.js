// 1. 判断服务器上有没有upload目录，没有就创建这个目录
// 2. 找出html目录下面的所有目录，然后打印出来
const fs = require('fs');
/**
 * 将api转换为Promise的形式
 * @param callback
 * @returns {function(*=): Promise<any>}
 */
const transPromise = callback => path =>
  new Promise((resolve, reject) => {
    callback(path, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
makeUpload = () => {
  const createDir = transPromise(fs.mkdir)('./upload');
  createDir.then(
    data => {
      console.log(`创建成功`);
    },
    err => {
      console.log(`创建失败 ${err.message}`);
    }
  );
};
// 1.判断服务器上有没有upload目录，没有就创建这个目
fs.stat('./upload', (err, stats) => {
  // 如果没有upload文件或目录的话
  if (err) {
    console.log('err', err);
    makeUpload();
  } else {
    // 如果是文件的话，继续创建目录
    if (stats.isFile()) {return makeUpload();}
    // 存在目录，可以进行接下的操作
    console.log(`目录存在`);
  }
});

// 2.找出html目录下面的所有目录，然后打印出来
const readdir = transPromise(fs.readdir)('./html');
const stat = transPromise(fs.stat);
let files = [];
readdir.then(
  data => {
    console.log('html下的所有目录和文件', data);
    files = data;
    const promiseArray = data.map(item => stat(`./html/${item}`));
    return Promise.all(promiseArray);
  },
  err => {
    console.log(`目录读取失败 ${err.message}`);
  }
).then(
  stats => {
    const dirs = stats.map((item, i) => {
      if (item.isDirectory()) {
        return files[i];
      }
    }).filter(item => !!item);
    console.log('html下的所有目录', dirs);
  },
  err => {
    console.log(`当前操作的文件不存在 ${err.message}`);
  }
);
