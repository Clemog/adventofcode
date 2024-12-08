import fs from "node:fs";

const input = fs
  .readFileSync("./input.txt", "utf8")
  .toString()
  .trim()
  .split("\n");

export { input };
