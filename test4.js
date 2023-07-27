const input = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));

console.log(input);
const [N, M] = input.shift();
let board = Array(N);

for (let i = 0; i < N; i++) {
	board.push(input.shift());
}
const blizzard = input;

let boom1 = 0;
let boom2 = 0;
let boom3 = 0;
