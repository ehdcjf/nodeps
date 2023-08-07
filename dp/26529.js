const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n').map(Number);
const N = input.shift();

let dp = Array(46).fill(1);

for (let i = 2; i <= 45; i++) {
	dp[i] = dp[i - 1] + dp[i - 2];
}

const answer = [];
for (let i = 0; i < N; i++) {
	const h = input[i];
	answer.push(dp[h]);
}

console.log(answer.join('\n'));
