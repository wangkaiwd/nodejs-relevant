var fs = require('fs');
var content = fs.readFileSync(process.argv[2]).toString();
console.log(content.split('\n').length - 1);

