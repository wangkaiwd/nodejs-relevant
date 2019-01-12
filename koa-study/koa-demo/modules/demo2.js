import { promisify } from 'util'
import { resolve } from 'path'
import { readFile, writeFileSync } from 'fs'

// path.resolve([...paths]):将路径或路径片段处理成绝对路径
// const filePath = resolve('foo/bar', './baz')
// const filePath2 = resolve('foo/bar', '/tmp/file/')
// console.log('file', filePath, filePath2)
// __dirname: 当前模块的目录名
console.log('__dirname', __dirname)
promisify(readFile)(resolve(__dirname, '../../package.json')).then(
  data => {
    const { name } = JSON.parse(data)
    writeFileSync(resolve(__dirname, './name.js'), name)
  }
)

// 问题：1.写文件的代码导致node服务一直在重启 2. path.resolve还是不清楚有什么作用