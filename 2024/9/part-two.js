import { input } from "./input.js";

// const input = "2333133121414131402";

const compressedFiles = Array.from(Array(input.length), () => []);

for (let i = input.length - 1; i >= 0; i -= 2) {
	const fileLength = +input[i];
	const fileID = Math.floor(i / 2);
	mainLoop: for (let k = 0; k < fileLength; k++) {
		let j = 1;
		while (j < i) {
			if (compressedFiles[j].length === 0) {
				compressedFiles[j] = new Array(+input[j]).fill(0);
			}

			const spaceStart = compressedFiles[j].indexOf(0);
			if (spaceStart === -1) {
				j += 2;
				continue;
			}
			const spaceLength = compressedFiles[j].slice(
				spaceStart,
				compressedFiles[j].length,
			).length;
			if (i === 9998 * 2) {
				console.log(compressedFiles[j]);
			}
			if (fileLength <= spaceLength) {
				for (let l = 0; l < fileLength; l++) {
					console.log(spaceStart);
					compressedFiles[j][spaceStart + l] = fileID;
					compressedFiles[i].push(0);
				}
				break mainLoop;
			}

			j += 2;
		}
		if (i <= j) {
			compressedFiles[i] = new Array(fileLength).fill(fileID);
			break;
		}
	}
}
const result = compressedFiles.flat().reduce((acc, fileID, i) => {
	return acc + i * fileID;
}, 0);

console.log(result);
