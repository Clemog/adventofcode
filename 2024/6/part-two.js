import { input } from "./input.js";

// const input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;

const mapRow = input.split("\n");
const initialPosition = [];

const originalMapArray = mapRow.map((row) => {
	if (row.includes("^")) {
		initialPosition.push(mapRow.indexOf(row));
		initialPosition.push(row.indexOf("^"));
		initialPosition.push(0);
	}
	return row.split("");
});

const isInArray = (array, elt) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === elt[0] && array[i][1] === elt[1]) {
			return true;
		}
	}
	return false;
};

const turnRight = (position) => {
	position[2] = position[2] === 3 ? 0 : position[2] + 1;
	return position;
};

const move = (position, mapArray) => {
	switch (position[2]) {
		case 0:
			if (!mapArray[position[0] - 1]?.[position[1]]) {
				return [position, true];
			}
			if (mapArray[position[0] - 1][position[1]] === "#") {
				return [turnRight(position), false];
			}
			return [[position[0] - 1, position[1], position[2]], false];
		case 1:
			if (!mapArray[position[0]]?.[position[1] + 1]) {
				return [position, true];
			}
			if (mapArray[position[0]][position[1] + 1] === "#") {
				return [turnRight(position), false];
			}
			return [[position[0], position[1] + 1, position[2]], false];
		case 2:
			if (!mapArray[position[0] + 1]?.[position[1]]) {
				return [position, true];
			}
			if (mapArray[position[0] + 1][position[1]] === "#") {
				return [turnRight(position), false];
			}
			return [[position[0] + 1, position[1], position[2]], false];
		case 3:
			if (!mapArray[position[0]]?.[position[1] - 1]) {
				return [position, true];
			}
			if (mapArray[position[0]][position[1] - 1] === "#") {
				return [turnRight(position), false];
			}
			return [[position[0], position[1] - 1, position[2]], false];
	}
};

const getAllPositions = (mapArray) => {
	let currentPosition = JSON.parse(JSON.stringify(initialPosition));
	let previousDirection = initialPosition[2];
	const allPositions = [[initialPosition[0], initialPosition[1]]];
	let outOfMap = false;
	let detectLoop = 0;

	while (!outOfMap) {
		previousDirection = currentPosition[2];
		[currentPosition, outOfMap] = move(currentPosition, mapArray);
		const pos = [currentPosition[0], currentPosition[1]];
		if (detectLoop > 10000) {
			return undefined;
		}
		if (isInArray(allPositions, pos)) {
			detectLoop++;
		}
		if (
			currentPosition[2] === previousDirection &&
			!isInArray(allPositions, pos)
		) {
			allPositions.push(pos);
		}
	}

	return allPositions;
};

const allPositions = getAllPositions(originalMapArray);
console.log(allPositions.length);

let result = 0;
allPositions.shift();

for (const obstacle of allPositions) {
	const mapArrayWithObstacle = JSON.parse(JSON.stringify(originalMapArray));
	mapArrayWithObstacle[obstacle[0]][obstacle[1]] = "#";
	const maybeAllPositions = getAllPositions(mapArrayWithObstacle);
	if (maybeAllPositions === undefined) {
		result++;
		console.log("obastacle done", obstacle, result);
	}
}

console.log(result);
