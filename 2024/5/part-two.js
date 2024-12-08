import { input } from "./input.js";

// const input = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`
//   .toString()
//   .trim();

const data = input.split("\n\n");
const rules = data[0].split("\n");
const pages = data[1].split("\n");

const isCorrectlyOrdered = (a, b) => {
  for (const rule of rules) {
    const [first, second] = rule.split("|").map((num) => +num);
    if (first === b && second === a) {
      return false;
    }
  }
  return true;
};

const isOrdered = (array) => {
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (!isCorrectlyOrdered(array[j], array[i])) {
        return false;
      }
    }
  }
  return true;
};

const incorrectPages = [];
for (const page of pages) {
  const arrayOfPage = page.split(",").map((num) => +num);
  if (!isOrdered(arrayOfPage)) {
    incorrectPages.push(arrayOfPage);
  }
}

const setOrderCorrect = (array) => {
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (!isCorrectlyOrdered(array[j], array[i])) {
        array.splice(j, 0, array[i]);
        array.splice(i + 1, 1);
      }
    }
  }
  return array;
};

let result = 0;
for (const page of incorrectPages) {
  const orderedPage = setOrderCorrect(page);
  const middlePage = orderedPage[Math.floor(orderedPage.length / 2)];
  result += middlePage;
}

console.log(result);
