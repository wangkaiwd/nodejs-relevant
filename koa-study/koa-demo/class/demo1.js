// class的继承
// class可以通过extends关键字实现继承
// class Point {

// }

// class ColorPoint extends Point {
//   constructor(x, y, color) {
//     // super:表示父类的构造函数，用来新建父类的this对象
//     this.color = color // ReferenceError
//     super(x, y) // 调用父类的constructor
//     // 如果不调用super方法，子类就得不到this对象
//     this.color = color // 正确
//   }
//   toString() {
//     return this.color + ' ' + super.toString()
//   }
// }

// es6子类实例的构建，基于父类实例，只有super方法才能调用父类实例