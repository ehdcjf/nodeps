const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = +input;
let memo = Array(N + 1).fill(-1);
memo[1] = 0;

let cnt = 1;
let temp = [1];

while (memo[N] == -1) {
	let temptemp = [];
	temp.forEach((v) => {
		if (memo[v * 3] == -1) {
			memo[v * 3] = cnt;
			temptemp.push(v * 3);
		}
		if (memo[v * 2] == -1) {
			memo[v * 2] = cnt;
			temptemp.push(v * 2);
		}
		if (memo[v + 1] == -1) {
			memo[v + 1] = cnt;
			temptemp.push(v + 1);
		}
	});

	temp = temptemp;
	cnt++;
}

console.log(memo[N]);
