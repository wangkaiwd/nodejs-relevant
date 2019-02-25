const path = require('path');
// output: test.js
console.log(path.basename('tmp/demo/js/test.js'));

// output: test
console.log(path.basename('tmp/demo/js/test'));

// output: test
path.basename('tmp/demo/js/test.js', '.js');

// .html
console.log(path.extname('index.html'));

// output: .md
console.log(path.extname('index.coffee.md'));

// output: ''
console.log(path.extname('index'));