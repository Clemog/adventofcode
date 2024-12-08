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

const isInArray = (array, elt) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === elt[0] && array[i][1] === elt[1]) {
      return true;
    }
  }
  return false;
};

const initialPosition = [];
const mapRow = input.split("\n");

const mapArray = mapRow.map((row) => {
  if (row.includes("^")) {
    initialPosition.push(mapRow.indexOf(row));
    initialPosition.push(row.indexOf("^"));
    initialPosition.push(0);
  }
  return row.split("");
});

const turnRight = (position) => {
  position[2] = position[2] === 3 ? 0 : position[2] + 1;
  return position;
};

const move = (position) => {
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

let currentPosition = initialPosition;
let previousDirection = initialPosition[2];
const allPositions = [[initialPosition[0], initialPosition[1]]];
let outOfMap = false;

while (!outOfMap) {
  previousDirection = currentPosition[2];
  [currentPosition, outOfMap] = move(currentPosition, outOfMap);
  const pos = [currentPosition[0], currentPosition[1]];
  if (
    currentPosition[2] === previousDirection &&
    !isInArray(allPositions, pos)
  ) {
    allPositions.push(pos);
  }
}

console.log(allPositions.length);
