const mongoose = require('mongoose');
// 连接mongodb
// 连接本地test数据库，默认端口为27017
// 最简单的写法：mongoose.connect('mongodb://localhost/text')
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', {name: String});

const kitty = new Cat({name: 'Zildjian'});
kitty.save().then(() => console.log('meow'));

// connection继承了Nodejs的EventEmitter
// eventEmitter.on()注册监听器时，监听器会在每次触发命名事件时被调用
// eventEmitter.once()可以注册最多可以调用一次的监听器。当事件被触发后，监听器会被注销，之后调用不在会触发事件
mongoose.connection.once('open', () => {
  console.log('database has connect successful');
});
mongoose.connection.once('close', () => {
  console.log('database close');
});
mongoose.connection.on('error', (err) => {
  console.log('database connect error');
  console.log(err);
});

setTimeout(() => {
  // mongodb数据库很少会关闭，所以这个方法一般不会调用
  mongoose.disconnect();
}, 4000);
