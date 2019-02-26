const path = require('path');

console.log(path.parse('/home/user/dir/file.txt'));
// {
//   root: '/',             // 获取文件的根路径
//   dir: '/home/user/dir', // path.dirname  获取文件所在目录
//   base: 'file.txt',      // path.basename 获取文件名（更准确的来讲：输出路径的一部分）
//   ext: '.txt',           // path.extname  获取文件扩展名
//   name: 'file'           // path.basename(path,[,ext])  通过传入第二个参数来获取文件名（不包含扩展名）
// }

// root会被忽略
console.log(path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
}));
// /home/user/dir/file.txt

// ext会被忽略
console.log(path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored'
}));
// file.txt

// 未指定base,则使用name + ext
console.log(path.format({
  root: '/',
  name: 'file',
  ext: '.txt'
}));
// /file.txt