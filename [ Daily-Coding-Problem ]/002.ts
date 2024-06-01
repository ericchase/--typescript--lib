import { zip } from '../$lib/Array/zip.js';

/*
This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?
*/

function getSuccessiveProductsLeftToRight(array: readonly number[]) {
  let product = 1;
  return [1, ...array.map((n) => ((product *= n), product))];
}

function getSuccessiveProductsRightToLeft(array: readonly number[]) {
  let product = 1;
  return [1, ...[...array].reverse().map((n) => ((product *= n), product))].reverse();
}

function arrayProductExcludingElement(array: number[]) {
  return (
    Array.isArray(array) &&
    [...zip(getSuccessiveProductsLeftToRight(array.slice(0, -1)), getSuccessiveProductsRightToLeft(array.slice(1)))].map(([a, b]) => a! * b!)
  );
}

console.log(arrayProductExcludingElement([1, 2, 3, 4, 5]));
// [120, 60, 40, 30, 24]
