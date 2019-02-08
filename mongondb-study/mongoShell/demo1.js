const userName = 'wangkaiwd',
  timeStamp = new Date(),
  jsonDatabase = { loginUser: userName, loginTime: timeStamp },
  db = connect('log'); // 链接数据库
db.login.insert(jsonDatabase); // 建立login集合，并插入json数据

print('[demo]log print success');