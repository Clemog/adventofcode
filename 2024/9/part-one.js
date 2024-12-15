import { input } from "./input.js";

// const input = "2333133121414131402";

const compressedFiles = Array.from(Array(input.length), () => []);
let j = 1;
let spaceLength = +input[j];

for (let i = input.length - 1; i >= 0; i -= 2) {
	const fileLength = +input[i];
	const fileID = Math.floor(i / 2);
	for (let k = 0; k < fileLength; k++) {
		if (compressedFiles[j].length === spaceLength) {
			j += 2;
			spaceLength = +input[j];
			while (spaceLength === 0) {
				j += 2;
				spaceLength = +input[j];
			}
		}
		if (i <= j) {
			compressedFiles[i] = new Array(fileLength - k).fill(fileID);
			break;
		}
		compressedFiles[j].push(fileID);
	}
}

const result = compressedFiles.flat().reduce((acc, fileID, i) => {
	return acc + i * fileID;
}, 0);

console.log(result);
