import { input } from "./input.js";

// const input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`;

const equations = input.split("\n").reduce((acc, line) => {
	const [result, figures] = line.split(": ");
	acc.push([+result, figures.split(" ").map(Number)]);
	return acc;
}, []);

const operators = ["+", "*", "||"];

const isSolvable = (equation) => {
	const [result, figures] = equation;
	if (figures.length === 2) {
		return (
			result === figures[0] + figures[1] ||
			result === figures[0] * figures[1] ||
			result === +(figures[0].toString() + figures[1].toString())
		);
	}
	if (figures.length > 2) {
		for (const operator of operators) {
			const firstElement =
				operator === "+"
					? figures[0] + figures[1]
					: operator === "*"
						? figures[0] * figures[1]
						: operator === "||"
							? +(figures[0].toString() + figures[1].toString())
							: 0;
			const computedFigures = [firstElement, ...figures.slice(2)];
			if (isSolvable([result, computedFigures])) {
				return true;
			}
		}
	}
	return false;
};

let result = 0;
for (const equation of equations) {
	if (isSolvable(equation)) {
		result += equation[0];
	}
}

console.log(result);
