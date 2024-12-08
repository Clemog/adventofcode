import { input } from "./input.js";

const A = [];
const B = [];

input.map((line) => {
	const [a, b] = line.split("   ");
	A.push(+a);
	B.push(+b);
});

const total = A.reduce((acc, a, i) => {
	let occ = 0;
	for (const b of B) {
		if (b === a) {
			occ++;
		}
	}
	return acc + a * occ;
}, 0);

console.log(total);
