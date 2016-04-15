
// Read command line arguments
var args = process.argv,
    n = args.length;

var numbers = args.slice(2, n).map(Number);

var total = numbers.reduce(function(sum, num) {
  return sum + num;
}, 0);

console.log(total);
