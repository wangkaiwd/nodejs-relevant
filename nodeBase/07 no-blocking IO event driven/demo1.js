// console.log(1);
// console.log(2);
// console.log(3);

const fs = require('fs');

console.log(1);
getTest = () => {
  fs.readFile('./test.json', (err, data) => {
    console.log(2);
  });
};
getTest();
console.log(3);
/**
 * output:
 *  1
 *  3
 *  2
 */

