const express = require('express');
const app = express();
const PORT = 3000;
const home = require('./routes/home');
const user = require('./routes/user');
// 通过express.Router来实现路由分割

// 应用级中间件
app.use('/', home);
app.use('/user', user);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
