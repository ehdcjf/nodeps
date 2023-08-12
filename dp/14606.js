const input = +require('fs').readFileSync('./dev/stdin').toString().trim();

let dp = Array(11).fill(0);
dp[1] = 0;
dp[2] = 1;

for (let i = 3; i <= 10; i++) {
	const B = Math.floor(i / 2);
	const C = i - B;
	dp[i] = B * C + dp[B] + dp[C];
}
console.log(dp[input]);
