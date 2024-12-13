import { input } from "./input.js";

// const input = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`;

const map = input.split("\n").map((line) => line.split(""));

const antennas = map.reduce((acc, line, y) => {
	line.forEach((cell, x) => {
		if (cell !== ".") {
			acc[cell] = [...(acc[cell] || []), [x, y]];
		}
	});
	return acc;
}, {});

const getVector = (a, b) => [b[0] - a[0], b[1] - a[1]];

const isPartOfMap = (x, y) =>
	x >= 0 && x < map[0].length && y >= 0 && y < map.length;

const isInArray = (array, elt) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === elt[0] && array[i][1] === elt[1]) {
			return true;
		}
	}
	return false;
};

const antinodes = [];
for (const positions of Object.values(antennas)) {
	positions.map((position) => {
		const [x, y] = position;
		const otherPositions = positions.filter(
			(otherPosition) => otherPosition !== position,
		);
		const vectors = otherPositions.map((otherPosition) =>
			getVector(position, otherPosition),
		);
		for (const vector of vectors) {
			const [dx, dy] = vector;
			const antinode = [x - dx, y - dy];
			if (isPartOfMap(...antinode) && !isInArray(antinodes, antinode)) {
				antinodes.push(antinode);
			}
		}
	});
}

console.log(antinodes.length);
