import { input } from "./input.js";

const A = [];
const B = [];

input.map((line) => {
	const [a, b] = line.split("   ");
	A.push(+a);
	B.push(+b);
});

A.sort((a, b) => a - b);
B.sort((a, b) => a - b);

const total = A.reduce((acc, a, i) => {
	return acc + Math.abs(a - B[i]);
}, 0);

console.log(total);
