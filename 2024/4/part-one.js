import { input } from "./input.js";

// We imagine a square of 8 posisition around each letter
// We look for each "X" in the table and check if there are "M" in the square
// For each "M", we keep the position (ie direction)
// We check if there is a "A" in the same position.
// For the "A", we check if there is a "S" in the same position

const data = input;

// const data = [
//   "MMMSXXMASM",
//   "MSAMXMSMSA",
//   "AMXSXMAAMM",
//   "MSAMASMSMX",
//   "XMASAMXAMM",
//   "XXAMMXXAMA",
//   "SMSMSASXSS",
//   "SAXAMASAAA",
//   "MAMMMXMMMM",
//   "MXMXAXMASX",
// ];

const getAllIndexes = (arr, val) => {
  const indexes = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }
  return indexes;
};

const getSquare = (data, i, j) => {
  return [
    data[i - 1]?.[j - 1],
    data[i - 1]?.[j],
    data[i - 1]?.[j + 1],
    data[i]?.[j - 1],
    data[i]?.[j + 1],
    data[i + 1]?.[j - 1],
    data[i + 1]?.[j],
    data[i + 1]?.[j + 1],
  ];
};

const getSquarePosition = (i, j, pos) => {
  const squarePosition = {
    0: [i - 1, j - 1],
    1: [i - 1, j],
    2: [i - 1, j + 1],
    3: [i, j - 1],
    4: [i, j + 1],
    5: [i + 1, j - 1],
    6: [i + 1, j],
    7: [i + 1, j + 1],
  };
  return squarePosition[pos];
};

let result = 0;

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === "X") {
      const square = getSquare(data, i, j);
      if (square.includes("M")) {
        const indexesOfM = getAllIndexes(square, "M");
        for (const m of indexesOfM) {
          const posM = getSquarePosition(i, j, m);
          const posA = getSquarePosition(posM[0], posM[1], m);
          if (data[posA[0]]?.[posA[1]] === "A") {
            const posS = getSquarePosition(posA[0], posA[1], m);
            if (data[posS[0]]?.[posS[1]] === "S") {
              result++;
            }
          }
        }
      }
    }
  }
}

console.log("Number of XMAS: ", result);
