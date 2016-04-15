#!/usr/local/bin/node

function toInt(num) { return parseInt(num, 10); }

function parseArgs(input) {
  var numArgs = input.length;
  return input.slice(2, numArgs).map(toInt);
}

// Read command line arguments
var numbers = parseArgs(process.argv);

// Compute the sum of the numbers
var sum = numbers.reduce(function(total, num) {
  return total + num;
}, 0);


console.log(sum);
