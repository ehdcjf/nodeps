const input = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));
const [N] = input.shift();

// console.log(input);
let dp = Array(N + 2).fill(0); // dp[i] 는 i일에 얻을 수 있는 최대 수익

for (let i = N; i > 0; i--) {
	if (input[i - 1][0] + i - 1 > N) {
		dp[i] = dp[i + 1];
	} else {
		const work = input[i - 1][1] + dp[input[i - 1][0] + i];
		const rest = dp[i + 1];
		dp[i] = Math.max(work, rest);
	}
}

console.log(dp[1]);
