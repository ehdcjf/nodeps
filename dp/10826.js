const input = +require('fs').readFileSync('./dev/stdin').toString().trim();

let dp = Array(input + 1).fill(0);
dp[1] = BigInt(1);
dp[2] = BigInt(1);

if (input <= 2) {
	console.log(dp[input].toString());
	process.exit();
}

for (let i = 3; i <= input; i++) {
	dp[i] = dp[i - 1] + dp[i - 2];
}

console.log(dp[input].toString());
