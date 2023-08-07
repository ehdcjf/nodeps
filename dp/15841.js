const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n').map(Number);
const max = input.reduce((r, v) => {
	r = Math.max(r, v);
	return r;
}, -1);

let dp = Array(max + 1).fill(BigInt(1));

for (let i = 3; i <= 490; i++) {
	dp[i] = dp[i - 1] + dp[i - 2];
}

const answer = [];
for (let i = 0; i < input.length; i++) {
	const h = input[i];
	if (h == -1) {
		console.log(answer.join('\n'));
		process.exit();
	}

	answer.push(`Hour ${h}: ${dp[h]} cow(s) affected`);
}
