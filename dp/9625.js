const input = +require('fs').readFileSync('./dev/stdin').toString().trim();
let dp = Array.from(Array(46), () => Array(2).fill(0));
dp[0] = [1, 0];
for (let i = 1; i <= 45; i++) {
	const a = dp[i - 1][0];
	const b = dp[i - 1][1];
	dp[i] = [b, a + b];
}
console.log(dp[input].join(' '));
