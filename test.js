const fs = require('fs');
const input = fs
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));
const [N, M, k] = input.shift();
// N 격자 . M 상어수 k 냄새

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let board = [];
for (let i = 0; i < N; i++) {
	board.push(input.shift());
}
let smell = Array.from(Array(N), () => Array.from(Array(N), () => Array(2).fill(0)));
let loc = Array(M);

for (let i = 0; i < N; i++) {
	for (let j = 0; j < N; j++) {
		if (board[i][j] > 0) {
			const index = board[i][j] - 1;
			loc[index] = [i, j];
			smell[i][j] = [index + 1, k];
		}
	}
}

let dir = input.shift().map((v) => v - 1);
const priority = [];
for (let i = 0; i < M; i++) {
	priority.push([]);
	for (let j = 0; j < 4; j++) {
		priority[i].push(input.shift().map((v) => v - 1));
	}
}
// 1 위
// 2 아
// 3 왼
// 4 오
let shark = M;
let time = 1;
while (time < 1000) {
	let newBoard = Array.from(Array(N), () => Array(N).fill(0));

	for (let sk = 0; sk < dir.length; sk++) {
		// sk는 상어 번호  그림그리때는 +1
		const [x, y] = loc[sk]; // 상어 위치

		for (let k = 0; k < 4; k++) {
			const pd = priority[s][dir[s]][k];
			const nx = x + dx[pd];
			const ny = y + dy[pd];
			if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
			const [s] = smell[nx][ny]; // 상어번호

			if (s == 0) {
				// 냄새 없으면
				if (newBoard[nx][ny] != 0) {
					// 다른 상어 이미 있으면
					loc[i] = [-Infinity, -Infinity];
					shark--;
				} else {
					// 다른 상어 없으면
					newBoard[nx][ny] = sk + 1;
					loc[s];
				}
			}
		}
	}
}
