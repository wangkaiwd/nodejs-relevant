require('./createModule/conn_mongo');

const Hero = require('./model/hero');

const hero1 = new Hero({
  name: '鲁班7号',
  skillCount: 3,
  position: '射手',
  alias: '小短腿'
});
Hero.findOne({name: '鲁班7号'}).then(
  data => {
    // 查询数据库中是否存在要插入的文档，不存在进行插入操作
    if (!data) {
      return Hero.create(hero1);
    }
    console.log('数据已存在!');
  }
).then(
  data => {
    if (typeof data !== 'undefined') {
      console.log('创建成功');
      console.log('data', data);
    }
  }
);
