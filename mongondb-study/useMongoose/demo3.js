const mongoose = require('mongoose');
// 缓存变量来进行之后方法的调用
const db = mongoose.connection;
// 连接本地mongo_test数据库
mongoose.connect('mongodb://localhost/mongo_test', {useNewUrlParser: true});
// 监听事件
db.once('open', () => {
  console.log('database has connect');
});
db.once('close', () => {
  console.log('database close');
});
db.on('error', err => {
  console.log(`database appearance error : ${err.message}`);
});
// 通过变量缓存mongoose.Schema
const Schema = mongoose.Schema;
// 建立heroes 集合的字段校验(Schema)
const HeroSchema = new Schema(
  {
    name: String,
    skillCount: Number,
    skill: Array,
    gender: Number,
    position: String,
    story: String
  },
  {versionKey: 'versionKey'}
);
// 通过字段校验规则建立heroes集合
const Hero = mongoose.model('hero', HeroSchema);

// 定义文档hero1
const hero1 = new Hero({
  name: '狄仁杰',
  skillCount: 3,
  skill: ['六令追凶', '逃脱', '王朝密令'],
  gender: 1,
  position: '射手',
  alias: '断案大师'
});

// 定义文档hero2
const hero2 = new Hero({
  name: '花木兰',
  skillCount: 6,
  skill: ['长城巡守者', '空裂斩', '旋舞之华', '↵绽放刀锋'],
  gender: 0,
  position: '刺客',
  alias: '传说之刃'
});

// 1. Model.create:在数据库中保存一个或多个文档
// 在数据库中插入定义好的文档
// Hero.create([hero1, hero2], (err, array) => {
//   if (err) {return console.log(`create failed: ${err.message}`);}
//   console.log('save database success');
//   console.log('data', array);
// });

/**
 * Model.find: 查询文档
 *  conditions: 查询条件
 *  [projection]: 投影（需要展示的字段）;
 *                投影也可以传入字符串，将字段用空格隔开，字段前添加+:包含该字段，字段前添加-:排除该字段，默认包含字段
 *  [options]: skip,limit等方法
 *  [callback]: 回调函数，用来获取查询信息和错误信息
 */
Hero.find({name: '狄仁杰'}, 'name skill -_id', (err, docs) => {
  if (!err) {
    console.log('查询成功');
    console.log(docs);
  }
});
