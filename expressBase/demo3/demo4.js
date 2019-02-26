const express = require('express');
// const pug = require('pug');
const path = require('path');
// const compiledFunction = pug.compileFile(path.resolve(__dirname, './views/template.pug'));
const app = express();
const PORT = 3000;
const user = require('./routes/user');
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');
// app.get('/', (req, res) => {
//   res.send(compiledFunction({ name: '李莉' }));
// });

app.use('/user', user);
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
