import { input } from "./input.js";

const reports = input.map((line) => {
  const report = line.split(" ");
  return report.map((level) => +level);
});

const isSafe = (report) => {
  if (
    !report.every((val, i, arr) => i === 0 || val >= arr[i - 1]) &&
    !report.every((val, i, arr) => i === 0 || val <= arr[i - 1])
  ) {
    return false;
  }
  for (let i = 0; i < report.length; i++) {
    if (report[i] === report[i + 1]) {
      return false;
    }
    if (Math.abs(report[i] - report[i + 1]) > 3) {
      return false;
    }
  }
  return true;
};

const safeReports = reports
  .map((report) => isSafe(report))
  .filter((report) => report === true);

console.log("Number of safe reports:", safeReports.length);
