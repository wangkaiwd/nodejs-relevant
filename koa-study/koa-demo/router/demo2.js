/**
 * Created by wangkai on 2019/1/26
 * Desc: 原生路由实现
 */

const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const app = new Koa();
// 通过全局process.argv来获取命令行参数
const getCommandLinePort = () => {
  let port = 8088;
  process.argv.forEach(item => {
    if (item.includes('port')) {
      const startIndex = item.lastIndexOf('=');
      port = item.slice(startIndex);
    }
  });
  return port;
};
const port = getCommandLinePort();
const getRelativeUrl = dir => {
  return path.resolve(__dirname, dir);
};
const renderHtml = async (page) => {
  let html;
  const readFile = promisify(fs.readFile);
  try {
    html = await readFile(getRelativeUrl(`./page/${page}`));
  } catch (e) {
    console.log('err', e);
    html = '文件读取失败';
  }
  return html.toString();
};
const handleRoute = (url) => {
  let page = `404.html`;
  switch (url) {
    case '/':
      page = `index.html`;
      break;
    case '/index':
      page = `index.html`;
      break;
    case '/todo':
      page = `todo.html`;
      break;
    case '/404':
      page = `404.html`;
      break;
    default:
      break;
  }
  return page;
};
app.use(async (ctx) => {
  const url = ctx.request.url;
  const page = handleRoute(url);
  const html = await renderHtml(page);
  ctx.body = html;
});

app.listen(port, () => {
  console.log(`服务器已启动,监听${port}端口`);
});