const mongoose = require('mongoose');
// 连接mongodb
// 连接本地test数据库，默认端口为27017
// 最简单的写法：mongoose.connect('mongodb://localhost/text')
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', {name: String});

const kitty = new Cat({name: 'Zildjian'});
kitty.save().then(() => console.log('meow'));

// connection继承了Nodejs的EventEmitter
mongoose.connection.on('open', () => {
  console.log('database has connect successful');
});
mongoose.connection.on('close', () => {
  console.log('database close');
});
mongoose.connection.on('error', (err) => {
  console.log('database connect error');
  console.log(err);
});

setTimeout(() => {
  mongoose.disconnect();
}, 4000);
