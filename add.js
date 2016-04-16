#!/usr/local/bin/node

// Convers the input argument to an integer
function toInt(num) { return parseInt(num, 10); }

// Parse the input arguments
function readNumbers(input) {
  return input.slice(1, input.length).map(toInt);
}

// Read and parse command line arguments
var integers = readNumbers(process.argv);

// Compute the sum of the numbers
var sum = integers.reduce(function(total, num) {
  return total + num;
}, 0);

console.log(sum);
