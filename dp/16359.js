const [n, k] = require('fs').readFileSync('./dev/stdin').toString().trim().split(' ').map(Number);

let dp = Array.from(Array(31), () => Array(31).fill(BigInt(0)));

for (let i = 1; i <= 30; i++) {
	dp[1][i] = BigInt(1);
}

for (let i = 1; i <= 30; i++) {
	dp[i][1] = BigInt(1);
}

for (let i = 2; i <= 30; i++) {
	for (let j = 2; j <= 30; j++) {
		dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
	}
}

console.log(dp[n - k + 1][k].toString());
