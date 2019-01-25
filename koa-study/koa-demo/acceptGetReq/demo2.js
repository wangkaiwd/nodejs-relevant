/**
 * Created by wangkai on 2019/1/25
 * Desc: get demo2,结合post请求
 */
const parsePostData = (ctx) => {
  return new Promise((resolve, reject) => {
    ctx.req.on('data', () => {

    });
  });
};
const port = 8088;
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
//  当请求是get请求时，显示表单让用户填写
  if (ctx.url === '/' && ctx.method === 'GET') { // get请求
    const htmlTemplate = `
      <h1>Koa2 request post demo</h1>
      <Form method="post" action="">
        <label>userName</label><input name="userName" type="text"><br />
        <label>age</label><input name="age" type="text"><br />
        <label>website</label><input name="website" type="text"><br />
        <button type="submit">submit</button>
      </Form>
    `;
    ctx.body = htmlTemplate;
  } else if (ctx.url === '/' && ctx.method === 'POST') { // post请求
    ctx.body = '接收到请求';
  } else { // 其它请求
    ctx.body = `<h1>404：page not found</h1>`;
  }
});
app.listen(port, () => {
  console.log(`服务已启动,监听${port}端口`);
});