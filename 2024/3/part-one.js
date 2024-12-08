import { input } from "./input.js";

const data = input;

const regex = /(mul\()+(\d{1,3},)+(\d{1,3}\))/g;

const multi = data.match(regex);

const getNumbers = (str) => {
  return str.match(/\d{1,3}/g).map((num) => +num);
};

const getMultResult = ([a, b]) => {
  return a * b;
};

const result = multi.reduce(
  (acc, curr) => acc + getMultResult(getNumbers(curr)),
  0,
);

console.log(result);
