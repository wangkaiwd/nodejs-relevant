// console.log(process.argv);
let sum = 0;
process.argv.forEach((item, index) => {
  if (index > 1) {
    sum += Number(item);
  }
})
console.log(sum);