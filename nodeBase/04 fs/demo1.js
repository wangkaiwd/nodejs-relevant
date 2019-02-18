const fs = require('fs');

fs.stat('./test.txt', (err, stats) => {
  if (err) throw err;
  // fs.Stats对象：提供有关文件的信息
  console.log('stats', stats);
  // Stats {
  //   dev: 2280844857,
  //     mode: 33206,
  //     nlink: 1,
  //     uid: 0,
  //     gid: 0,
  //     rdev: 0,
  //     blksize: undefined,
  //     ino: 2251799813687678,
  //     size: 0,
  //     blocks: undefined,
  //     atimeMs: 1550466987951.39,
  //     mtimeMs: 1550466987951.39,
  //     ctimeMs: 1550466987951.39,
  //     birthtimeMs: 1550466987951.39,
  //     atime: 2019-02-18T05:16:27.951Z,
  //     mtime: 2019-02-18T05:16:27.951Z,
  //     ctime: 2019-02-18T05:16:27.951Z,
  //     birthtime: 2019-02-18T05:16:27.951Z }

  // stats.isFile(): 如果操作的是文件，返回true
  // stats.isDirectory(): 如果操作的是文件系统目录，则返回true
  console.log(`文件：${stats.isFile()}`); // 文件: true
  console.log(`目录：${stats.isDirectory()}`); // 目录：false
});
