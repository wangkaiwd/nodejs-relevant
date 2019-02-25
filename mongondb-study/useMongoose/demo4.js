const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo_test', {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', () => {
  console.log('database has connect successful');
});

db.once('close', () => {
  console.log('database close');
});
db.on('error', (err) => {
  console.log(`database connection appear error ${err.message}`);
});

const Schema = mongoose.Schema;

const HeroSchema = new Schema(
  {
    name: String,
    skillCount: Number,
    skill: Array,
    gender: Number,
    position: String,
    alias: String
  },
  {versionKey: 'versionKey'}
);

const Hero = mongoose.model('hero', HeroSchema);

const hero1 = new Hero({
  name: '孙悟空',
  skillCount: 3,
  skill: ['技能1', '技能2', '技能3'],
  gender: 1,
  position: 'jungle',
  alias: '大闹天宫'
});
const hero2 = new Hero({
  name: '猪八戒',
  skillCount: 3,
  skill: ['技能1', '技能2', '技能3'],
  gender: 1,
  position: 'tank',
  alias: '天蓬元帅'
});
// hero1.save().then(
//   data => {
//     console.log('将document保存到database成功');
//     console.log(data);
//   }
// );
//
// hero2.save().then(
//   data => {
//     console.log('将document保存到database成功');
//     console.log(data);
//   }
// );

// Hero.findOne({name: '花木兰'}, '-position').then(
//   data => {
//     console.log('查询成功');
//     console.log(data);
//     // data.position = 'assassin';
//     // data.save();
//     // 会自动将js语法转换为mongodb更新操作
//     // data.updateOne({$set: {position: '刺客'}}, (err, raw) => {
//     //
//     // });
//     // 转换为Object后，mongoose中有关Document的属性和方法就都不能使用了
//     // console.log('obj', data.toObject());
//   },
//   err => {
//     console.log('查询出错');
//     console.error(err);
//   }
// );

Hero.findOne({name: '花木兰'}).then(
  data => {
    // js的一些对Object的操作无法使用
    // delete data.position;
    // console.log(data);
    // toObject()方法一般用的比较少
    // data.toObject();
    // delete data.position;
    // console.log(data);
    // 在转换为js对象的时候，必须严格通过_id来进行获取
    console.log(data.id);
  }
);
