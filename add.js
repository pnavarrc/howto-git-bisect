
// Read command line arguments
var args = process.argv,
    n = args.length;

var numbers = args.slice(1, n).map(Number);

var sum = numbers.reduce(function(sum, num) {
  return sum + num;
}, 0);

console.log(sum);
