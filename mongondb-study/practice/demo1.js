// //1.进入my_test数据库
// use my_test;
// //2.向数据库的users集合中插入一个文档
// db.users.insert({name: 'sunwukong'});
// //3.查询users集合中的文档
// db.users.find();
// //4.向数据库的users集合中插入一个文档
// db.users.insert({name: '猪八戒'});
// //5.查询数据库users集合中的文档
// db.users.find();
// //6.统计数据库users集合中的文档数量
// db.users.find().count();
// //7.查询数据库users集合中name为sunwukong的文档
// db.users.find({name: 'sunwukong'});
// //8.向数据库user集合中的name为sunwukong的文档，添加一个address属性，属性值为huaguoshan
// db.users.update({name: 'sunwukong'}, {$set: {address: 'huaguoshan'}});
// //9.使用{name:"tangseng"} 替换 name 为 zhubajie的文档
// db.users.update({name: 'zhubajie'}, {name: 'tangseng'});
// //10.删除name为sunwukong的文档的address属性
// db.users.update({name: 'sunwukong'}, {$unset: {address: ''}});
//
// //11.向username为sunwukong的文档中，添加一个hobby:{cities:["beijing","shanghai","shenzhen"] , movies:["sanguo","hero"]}
// db.users.update({name: 'sunwukong'}, {
//   $set: {
//     hobby: {
//       cities: ['beijing', 'shanghai', 'shenzhen'],
//       movies: ['sanguo', 'hero']
//     }
//   }
// });
// //12.向username为tangseng的文档中，添加一个hobby:{movies:["A Chinese Odyssey","King of comedy"]}
// db.users.update({name: 'tangseng'}, {$set: {hobby: {movies: ['A Chinese Odyssey', 'King of comedy']}}});
// //13.查询喜欢电影hero的文档
// db.users.find({'hobby.movies': 'hero'});
// //14.向tangseng中添加一个新的电影Interstellar
// db.users.update({name: 'tangseng'}, {$push: {'hobby.movies': 'Interstellar'}});
// //15.删除喜欢beijing的用户
// db.users.remove({'hobby.cities': 'beijing'});
// //16.删除users集合
// db.users.drop();
// //17.向numbers中插入20000条数据
// // 多次插入: 6.2s
// for(var i=1;i<=20000;i++){
//   db.numbers.insert({number:i})
// }
//
// // 批量插入: 0.4s
// var arr1 = []
// for(var i=1;i<=20000;i++) {
//   arr1.push({number:i})
// }
// db.numbers.insert(arr1)
// // 总结：数据库操作的性能比较低，尽可能少的进行操作
