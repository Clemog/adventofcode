import { input } from "./input.js";

const data = input;

const regex = /(mul\()+(\d{1,3},)+(\d{1,3}\))|(do\(\))|(don't\(\))/g;

const getDoMult = (match) => {
	let isDoable = true;
	const doableMult = [];
	for (const str of match) {
		if (str === "do()") {
			isDoable = true;
		}
		if (str === "don't()") {
			isDoable = false;
		}
		if (str !== "do()" && str !== "don't()" && isDoable) {
			doableMult.push(str);
		}
	}
	return doableMult;
};

const multi = getDoMult(data.match(regex));

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

//1014851 is too low
