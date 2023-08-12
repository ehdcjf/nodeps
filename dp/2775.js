const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n').map(Number);

let dp = Array.from(Array(15), () => Array(15).fill(0));
for (let i = 0; i < 15; i++) {
	dp[0][i] = i + 1;
}

for (let i = 0; i < 15; i++) {
	dp[i][0] = 1;
}

for (let k = 1; k < 15; k++) {
	for (let n = 1; n < 15; n++) {
		dp[k][n] = dp[k - 1][n] + dp[k][n - 1];
	}
}

const answer = [];
const T = input.shift();
for (let t = 0; t < T; t++) {
	const k = input.shift();
	const n = input.shift();
	answer.push(dp[k][n - 1]);
}

console.log(answer.join('\n'));
