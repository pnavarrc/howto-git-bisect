
// Read command line arguments
var args = process.argv,
    n = args.length;

function toInt(num) { return parseInt(num, 10); }


var numbers = args.slice(2, n).map(toInt);

var total = numbers.reduce(function(sum, num) {
  return sum + num;
}, 0);

console.log(total);
