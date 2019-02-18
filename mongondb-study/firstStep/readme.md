## 常用数据库了解

## 认识和安装`MongoDB`
## `Mongo`基本命令
### `MongoDB`的一些基本概念
* 数据库: `database`
* 集合: `collection`
* 文档：`document`

**在`mongoDB`中，数据库和集合都不需要手动创建。当我们创建文档时，如果文档所在的集合或数据库不存在会自动创建数据库和集合**

### 常用操作
* `show dbs/database`: 显示当前的所有数据库
* `use 数据库名称`: 进入到指定的数据库中
* `db`: 显示当前所处的数据库
* `show collection`:显示数据库中所有的集合

## [数据库`CRUD`操作](http://www.mongoing.com/docs/crud.html)
[`CRUD`](https://developer.mozilla.org/zh-CN/docs/Glossary/CRUD):（创建：Create,读取：Read,更新: Update,删除：Delete）是对于存储的信息可以进行操作的同义词。是一个对四种操作持久化信息的基本操作的助记符。

首先我们新建一个`demo`数据库，在`demo`数据库下进行增删改查的演示
```
use demo
```
### 插入文档
`db.<collection>.insert()`:向集合插入一个或多个文档
```js
db.test.insert({name:'wk',age:18,job:'前端工程师'})
db.test.insert([
  {name:'wk1',age:19,job:'UI'},
  {name:'wk2',age:20,job:'后端工程师'}
])
```

`db.<collection>.insertOne()`：向集合插入单个文档
```js
db.test.insert({name:'wk3',age:21,job:'job1'})
```
`db.<collection>.insertMany()`：向集合插入多个文档
```js
db.test.insert({name:'wk4',age: 22,job:'job2'})
```

### 使用可视化工具
这里用到的是`NoSQL Mangaer for MongoDB`,大家可以到官网自行下载:https://www.mongodbmanager.com,下载的时候选择`Freeware`免费版

这里介绍一下简单的使用方法：
![tools01](../screenshots/mongoTools01.png)
![tools01](../screenshots/mongoTools02.png)
