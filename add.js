
// Read command line arguments
var args = process.argv,
    n = args.length;

function toInt(num) { return parseInt(num, 10); }

var numbers = args.slice(2, n).map(toInt);

// Adding numbers iterating
var sum = 0;
for (var k = 0, m = numbers.length; k < m; k += 1) {
  sum += numbers[k];
}

console.log(sum);
