const fs = require('fs');
const input = fs
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));
const [N, M, k] = input.shift();
let board = [];
for (let i = 0; i < N; i++) {
	board.push(input.shift());
}
let smell = Array.from(Array(N), () => Array.from(Array(N), () => Array(2).fill(0)));
let loc = Array(M + 1);
for (let i = 0; i < N; i++) {
	for (let j = 0; j < N; j++) {
		if (board[i][j] > 0) {
			const index = board[i][j];
			loc[index] = [i, j];
			smell[i][j] = [index, k];
		}
	}
}
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
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
	// 냄새 지우기

	// console.log(smell.map((v) => v.join(' ')).join('\n'));
	let newBoard = Array.from(Array(N), () => Array(N).fill(0));
	// 이동하고 뿌리기
	dir.forEach((d, i) => {
		const [x, y] = loc[i + 1];
		//우선순위 따라서 비어 있는 곳 탐색
		for (let k = 0; k < 4; k++) {
			const pd = priority[i][d][k]; // 우선순위 방향
			const nx = x + dx[pd];
			const ny = y + dy[pd];
			if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
			const [s] = smell[nx][ny];
			// 냄새 없으면 바로 ㄱ
			if (s == 0) {
				// 갔는데 상어 있으면 탈락
				// 이미 더 쎈 상어가 그 자리에 있는거니까
				if (newBoard[nx][ny] != 0) {
					loc[i + 1] = [-Infinity, -Infinity];
					shark--;
					// 상어 없으면 ㄱㄱ
				} else {
					// 자리 옮기고
					newBoard[nx][ny] = i + 1;
					// 위치도 갱신하고
					loc[i + 1] = [nx, ny];
					// 방향도 바꾸고
					dir[i] = pd;
				}
				break;
			}
		}
		//냄새때문에 다른 곳으로 못 갔을 때, 결국 자기 냄새 나는 곳으로 가야됨. 우선순위에 따라
		if (loc[i + 1][0] == x && loc[i + 1][1] == y) {
			for (let k = 0; k < 4; k++) {
				const pd = priority[i][d][k];
				const nx = x + dx[pd];
				const ny = y + dy[pd];
				if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
				const [s] = smell[nx][ny];
				//자기 냄새면 그곳으로 다시 돌아가기
				// 자기 냄새가 무조건 있을 수 밖에 없음.
				//
				if (s == i + 1) {
					if (newBoard[nx][ny] != 0) {
						loc[i + 1] = [-Infinity, -Infinity];
						shark--;
						// 상어 없으면 ㄱㄱ
					} else {
						// 자리 옮기고
						newBoard[nx][ny] = i + 1;
						// 위치도 갱신하고
						loc[i + 1] = [nx, ny];
						// 방향도 바꾸고
						dir[i] = pd;
					}
					break;
				}
			}
		}
	});
	smell = smell.map((v) =>
		v.map((x) => {
			x[1] -= 1;
			if (x[1] <= 0) x = [0, 0];
			return x;
		})
	);
	// 다 갔으면 냄새뿌리기
	loc.forEach((v, i) => {
		const [x, y] = v;
		if (x >= 0 && i >= 1) {
			smell[x][y] = [i, k];
		}
	});
	board = newBoard;
	if (shark == 1) {
		console.log(time);
		process.exit(0);
	}
	// 시간++

	time++;
}
console.log(-1);
