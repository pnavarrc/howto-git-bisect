#!/usr/local/bin/node

// Convers the input argument to an integer
function toInt(num) {
  return parseInt(num, 10);
}

// Parse the input arguments
function readNumbers(input) {
  var numArgs = input.length;
  return input.slice(2, numArgs).map(toInt);
}

// Read and parse command line arguments
var numbers = readNumbers(process.argv);

// Compute the sum of the numbers
var sum = numbers.reduce(function(total, num) {
  return total + num;
}, 0);


console.log(sum);
