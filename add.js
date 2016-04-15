
// Read command line arguments
var args = process.argv,
    n = args.length;

function toInt(num) { return parseInt(num, 10); }

var numbers = args.slice(2, n).map(toInt);

var sum = numbers.reduce(function(total, num) {
  return total + num;
}, 0);


console.log(sum);
