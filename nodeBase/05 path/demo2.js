const path = require('path');
// output: test.js
console.log(path.basename('tmp/demo/js/test.js'));

// output: test
console.log(path.basename('tmp/demo/js/test'));

// output: test
path.basename('tmp/demo/js/test.js', '.js');