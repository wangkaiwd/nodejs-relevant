import { promisify } from 'util'
import { resolve } from 'path'
import { readFile, writeFileSync, writeFile } from 'fs'

// path.resolve([...paths]):将路径或路径片段处理成绝对路径
// const filePath = resolve('foo/bar', './baz')
// const filePath2 = resolve('foo/bar', '/tmp/file/')
// console.log('file', filePath, filePath2)
// __dirname: 当前模块的目录名
// console.log('__dirname', __dirname)
// promisify(readFile)(resolve(__dirname, '../../package.json')).then(
//   data => {
//     console.log('data')
//     const { name } = JSON.parse(data)
//     writeFileSync(resolve(__dirname, './name.js'), String(name), err => {
//       if (err) throw err
//       // console.log('文件已存在')
//     })
//   }
// )

// async await
// async function read() {
//   // ./name.js是相对于当前进程所在的路径(process.cwd()),而不是相对于当前脚本所在路径
//   // console.log(process.cwd()) // process.cwd():返回进程的当前工作目录
//   // const data = await promisify(readFile)('./name.js')
//   const data = await promisify(readFile)(resolve(__dirname, './name.js'))
//   console.log('data', String(data))
// }
// read()

// 问题：1.写文件的代码导致node服务一直在重启 2. path.resolve还是不清楚有什么作用
// path.resolve: 接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径
// 拼接规则：
//  1. '/': 会被当成根路径来进行拼接
//  2. 'a': 如果字符串前边没有任何字符，会解析为当前路径:'./'
// console.log('路径1', resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')) // /temp/subfile
// console.log('路径2', resolve('/foo/bar', './baz')); // /foo/bar/baz
// console.log('路径3', resolve('/foo/bar', '/tmp/file/')); // 'tmp/file'
// console.log('路径4', resolve('wwwroot', 'static_files/png/', '../gif/image.gif')); // 当前目录下的 /wwwroot/static_files/gif/image.gif
