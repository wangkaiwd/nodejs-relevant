/**
 * mongoose里的三个重要概念：
 *  Schema
 *  Model
 *  Document
 */
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
// Mongoose会在创建每个文档时会自动设定versionKey,默认是__v。
// versionKey是一个字符串，代表版本号的属性名，我们也可以进行手动设置
const StudentSchema = new Schema(
  {
    name: String,
    age: Number,
    gender: {
      type: Number,
      default: 0
    },
    address: String
  },
  {
    versionKey: 'mongoDB v5_4_15'
  }
);
// 连接数据库
mongoose.connect('mongodb://localhost/mongo_test', {useNewUrlParser: true});

db.once('open', () => {
  console.log('database has connect successful');
});
db.once('close', () => {
  console.log('database close');
});
db.once('error', () => {
  console.log('database connect error');
});

// 构建Schema
const Student = mongoose.model('Student', StudentSchema);
const student1 = new Student({
  name: '小红',
  age: 18,
  gender: 1,
  address: '北京朝阳区'
});
const student2 = new Student({
  name: '小黑',
  age: 18,
  gender: 0,
  address: '杭州萧山区'
});
student1.save((err, data) => {
  if (err) {return console.log('保存出错', err);}
  console.log('保存成功', data);
});
student2.save((err, data) => {
  if (err) {return console.log('保存出错', err);}
  console.log('保存成功', data);
});
