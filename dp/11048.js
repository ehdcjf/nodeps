const input = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));
const [N, M] = input.shift();

let memo = Array.from(Array(N + 1), () => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
	for (let j = 1; j <= M; j++) {
		memo[i][j] = Math.max(memo[i][j - 1], memo[i - 1][j], memo[i - 1][j - 1]) + input[i - 1][j - 1];
	}
}

console.log(memo[N][M]);
