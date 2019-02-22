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
 */
//23.查看numbers集合中的前10条数据
// db.numbers.find().limit(10)
//24.查看numbers集合中的第11条到20条数据
// db.numbers.find().skip(10).limit(10)
//25.查看numbers集合中的第21条到30条数据
// db.numbers.find().skip(20).limit(10)
