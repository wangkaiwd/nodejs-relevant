## `MongoDB`基础知识

### 常用数据库了解
> `NoSql`: not only Sql (不仅仅是Sql)

`MongoDB`是一个非关系型数据库(NoSql)。作为一个前端开发者来说，操作`MongoDB`是比较惬意的，因为`MongoDB`不用写`SQL`语句，而且里边的用法都是`JSON`对象的形式。

为了更好的理解非关系型数据库，这里我们先简单了解下关系型数据库。  
关系型数据库，是指采用了关系模型来组织数据的数据库，常用的关系型数据库有：`oracle`,`mySql`等。

#### 关系型数据库和非关系型数据库的区别
1. 实质。  
非关系型数据库的实质：非关系型数据库产品是传统关系型数据库的功能阉割版本，通过减少用不到或者很少用的功能，来大幅提高产品性能。

2. 价格。  
目前基本大部分主流的非关系型数据库都是免费的。而比较有名气的关系型数据库，比如`Oracle`,`DB2`,`MSSQL`是收费的。虽然`Mysql`免费，但它需要做很多工作才能正式用于生产。

3. 功能。  
实际开发中，有很多业务需求，其实并不需要完整的关系型数据库功能，非关系型数据库的功能就足够使用了。这种情况，使用性能更高、成本更低的非关系型数据库显然是更加明智的选择。

在比较大型的项目中，我们不建议使用非关系型数据库。但是我们只是想简单写一些小项目，比如搭建一个博客或者是`CMS`(内容管理系统)这类业务逻辑并不怎么复杂的程序，使用`MongoDB`是完全可以胜任的。
 
### 认识和安装`MongoDB`
再了解了非关系型数据库和关系型数库之后，我们接下来介绍一下`MongoDB`。

`MongoDB`是一个介于关系数据库和非关系数据库之间的开源产品，是最接近于关系型数据库的`NoSql`数据库。它在轻量级`JSON`交换基础上进行了扩展，即成为`BJSON`的方式来描述其无结构化的数据结构。

#### 安装`MongoDB`
首先打开`MongoDB`官网：https://www.mongodb.com/,然后在导航`Products`里选择`MongoDB Server`选择合适的版本。这里由于笔者使用的是`Mac`电脑，所以介绍一下`Mac`电脑的安装过程。 
![install](./screenshots/mongo_install_01.png)
![install](./screenshots/mongo_install_02.png)

下载完成后我们需要做3件事:  
1. 配置环境变量
2. 创建数据库存储目录
3. 为`MongoDB`数据库存储目录添加使用权限

首先，我们来为`MongoDB`配置环境变量，这样我们不管在个目录下，都可以在命令行通过`mongod`启动数据库，而不用再输入复杂的配置参数。

第一步，我们在终端输入：`export PATH=/usr/local/mongodv/bin:$PATH`。注意，这里要将`/usr/local/mongodv/bin`换成自己安装`MongoDB`目录下的`bin`目录。
  
第二步，在终端中输入：`sudo vi ~/.bash_profile`，之后在`vi`模式下将第一步配置好的路径复制粘贴并进行保存。

最后一步，使用`source ~/.bash_profile`更新配置，使配置文件生效。可以通过`echo $PATH`来查看当前系统环境变量

接下来我们要在磁盘根目录建立`/data/db`目录来存储数据库：`sudo mkdir -p /data/db`

在添加环境变量后和建立存储目录后，在终端中输入`mongod`会出现如下提示:
![read_only](screenshots/mongo_read_only.png)
之后我们在终端中通过如下命令来赋予目录权限：
```
sudo chown -R $USER /data/db
```
执行完成后，我们继续执行`mongod`命令：
![connec_successful](./screenshots/mongo_connec_successful.png)
至此，我们的`MongoDB`从安装到连接已经完成了，我们可以新开一个终端并输入`mongo`，通过`mongo shell`进行一些简单命令的测试：
![mongo_shell](./screenshots/mongo_shell_firstuse.png)


> 推荐文章：  
> 1. [Mac mongodb 安装 简书](https://www.jianshu.com/p/bb77f8be67f4)  
> 2. [为数据库目录添加权限](https://stackoverflow.com/questions/42446931/mongodb-exception-in-initandlisten-20-attempted-to-create-a-lock-file-on-a-rea)


### `MongoDB`基本概念
这里我们先介绍一些`MongoDB`中的基本概念：
* 数据库：`database`
* 集合：`collection`
* 文档：`document`
* 数据字段/域：`field`
* 主键： `_id`

`MongoDB`中存储的文档必须有一个`_id`键。这个键的值可以是任何类型的，默认是`ObjectId`对象。在一个集合里，每一个文档都有一个唯一的`id`值，来确保集合里的每一个文档都能被唯一标识。如果一个文档没有指定`_id`字段，`MongoDB`会自动为文档添加`_id`字段，它的值是一个唯一的`ObjectId。

`ObjectId`是一个12字节的`BJSON`类型数据，格式如下：
* 前4个字节表示时间戳
* 接下来的3个字节是机器码
* 紧接的2个字节由进程id组成（PID）
* 最后三个字节是随机数

`MongoDB`采用`ObjectId`,而不是其它的比较常规做法（比如自动增加的主键）的主要原因，是因为在多个服务器上同步自动增加主键值既费力还费时。


### `CRUD`操作

#### 可视化工具介绍

#### 插入操作(`insert`)

#### 查询操作(`find`)

##### 投影

##### 查询操作符

##### 游标操作

#### 修改操作(`update`)

#### 删除操作(`delete`)

### `mongoose`基本概念

