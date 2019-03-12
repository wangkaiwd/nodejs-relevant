const express = require('express');
const app = express();
const port = 9000
app.use((req, res, next) => {
  console.log(1);
  next();
});
app.use((req, res, next) => {
  console.log(2);
});
app.use((req, res, next) => {
  console.log(3);
});
app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})
// 访问localhost:9000
// output: 
// 1
// 2