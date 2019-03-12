const express = require('express');
const app = express();
const PORT = 3000;
// 除处理外的其它路径都会返回 404 Not Found
app.get('/', (req, res) => res.end('Hello world'));
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});