/**
 * 测试循环插入和批量插入的性能
 * */
const start = new Date().getTime(), array = [];
// for (let i = 0; i < 1000; i++) {
//   array.push({ num: i });
// }
//
// db.demo.insert(array);
for (let i = 0; i < 1000; i++) {
  db.demo.insert({ num: i });
}
const end = new Date().getTime();
print(`coast time:${end - start}ms`);