const express = require('express');
const pug = require('pug');
const path = require('path');
const compiledFunction = pug.compileFile(path.resolve(__dirname, './views/template.pug'));
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
  res.send(compiledFunction({ name: '李莉' }));
});
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
