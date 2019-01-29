const fs = require('fs'); // 文件系统
// fs.stat(): 检测是文件还是目录
// fs.mkdir(): 创建目录
// fs.writeFile(): 创建写入文件 
// fs.appendFile(): 追加文件
// fs.readFile(): 读取文件
// fs.readdir：读取目录
// fs.rename: 重命名
// fs.rmdir: 删除目录
// fs.unlink: 删除文件
// console.log(process.cwd()); // cwd: current work directory 当前工作目录

// fs.stat: 参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件还是目录
// fs.stats类： 对象提供的有关文件的信息
fs.stat('index.js', (error, stats) => {
  if (error) {
    console.log(error);
    return false;
  } else {
    console.log('stats', stats);
    // stats Stats {
    //   dev: 2280844857,
    //     mode: 33206,
    //     nlink: 1,
    //     uid: 0,
    //     gid: 0,
    //     rdev: 0,
    //     blksize: undefined,
    //     ino: 4222124651099355,
    //     size: 0,
    //     blocks: undefined,
    //     atimeMs: 1545994956804.238,
    //     mtimeMs: 1545994956804.238,
    //     ctimeMs: 1545994956804.238,
    //     birthtimeMs: 1545994956804.238,
    //     atime: 2018-12-28T11:02:36.804Z,
    //     mtime: 2018-12-28T11:02:36.804Z,
    //     ctime: 2018-12-28T11:02:36.804Z,
    //     birthtime: 2018-12-28T11:02:36.804Z }
    // stats.isFile(): fs.Stats对象描述常规文件，则返回true
    // stats.isDirectory(): 如果fs.Stats对象描述文件系统目录，则返回true
    console.log(`文件:${stats.isFile()}`); // '文件：true'

    console.log(`目录:${stats.isDirectory()}`); // '目录：false'
    return false;
  }
});


