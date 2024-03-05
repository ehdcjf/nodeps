// https://www.acmicpc.net/problem/2749
// 피보나치 수 3

// n > 2라면, k(10^n) = 15×10^(n-1)
//   k(1000000) = 15 * 100000;
const N = require('fs').readFileSync('./dev/stdin').toString().trim();
const dp = new Array(1500000 + 1).fill(0);
dp[0] = 0;
dp[1] = 1;
for (let i = 2; i <= 1500000; i++) {
	dp[i] = (dp[i - 2] + dp[i - 1]) % 1000000;
}
const target = BigInt(N) % BigInt(1500000);
console.log(dp[Number(target)]);
