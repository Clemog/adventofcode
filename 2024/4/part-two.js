import { input } from "./input.js";

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

let result = 0;

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === "A") {
      const square = getSquare(data, i, j);
      if (
        square[0] === "M" && //upper left
        square[5] === "M" && //lower left
        square[2] === "S" && //upper right
        square[7] === "S" //lower right
      ) {
        result++;
      }
      if (
        square[0] === "S" &&
        square[5] === "S" &&
        square[2] === "M" &&
        square[7] === "M"
      ) {
        result++;
      }
      if (
        square[0] === "M" &&
        square[5] === "S" &&
        square[2] === "M" &&
        square[7] === "S"
      ) {
        result++;
      }
      if (
        square[0] === "S" &&
        square[5] === "M" &&
        square[2] === "S" &&
        square[7] === "M"
      ) {
        result++;
      }
    }
  }
}

console.log("Number of X-MAS: ", result);
