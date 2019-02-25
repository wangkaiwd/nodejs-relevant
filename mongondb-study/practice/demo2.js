//17.向numbers中插入500条数据
// var dataSource = []
// for(var i=1;i<=500;i++){
//   dataSource.push({num:i})
// }
// db.numbers.insert(dataSource)
//18.查询numbers中num为50的文档
// db.numbers.find({num:50})
//19.查询numbers中num大于50的文档
// db.numbers.find({num:{$gt:50}})
//20.查询numbers中num小于30的文档
// db.numbers.find({num:{$lt:30}})
//21.查询numbers中num大于40小于50的文档
// db.numbers.find({num:{$gt:40,$lt:50}})
//22.查询numbers中num大于199的文档
// db.numbers.find({num:{$gt:199}})

/**
 * 分页：
 *  pageSize: 每页条数
 *  pageIndex: 当前页数
 *
 *  db.numbers.find().skip((pageIndex-1)*pageSize).limit(pageSize)
 *  totalPage: db.numbers.find().count()
 *
 *  实际工作中很少使用不带条件的查询
 */
//23.查看numbers集合中的前10条数据
// db.numbers.find().limit(10)
//24.查看numbers集合中的第11条到20条数据
// db.numbers.find().skip(10).limit(10)
//25.查看numbers集合中的第21条到30条数据
// db.numbers.find().skip(20).limit(10)
// use my_test
// show collections
// db.emps.find()
// //27.查询工资小于2000的员工
// db.emps.find({sal:{$lt:2000}})
// //28.查询工资在1000-2000之间的员工
// db.emps.find({sal:{$gte:1000,$lte:2000}})
// //29.查询工资小于1000或大于2500的员工
// $or: 返回查询语句中满足任一匹配条件的所有文档
// db.emps.find({$or:[{sal:{$gt:2500}},{sal:{$lt:1000}}]})
// //30.查询财务部的所有员工
// var depno = db.depts.findOne({dname:'财务部'}).deptno
// db.emps.find({depno:depno})
// //31.查询销售部的所有员工
// var depno = db.depts.findOne({dname:'销售部'}).deptno
// db.emps.find({depno:depno})
// //32.查询所有mgr为7698的所有员工
// db.emps.find({mgr:7698})
// //33.为所有薪资低于1000的员工增加工资400元
// 查询操作符：$inc：为对应字段的值增加指定数量
// db.emps.updateMany({sal:{$lte:1000}},{$inc:{sal:400}})
// db.emps.find({sal:{$lte:1000}})
