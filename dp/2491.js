const [[N], [...arr]] = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.split('\n')
	.map((v) => v.split(' ').map(Number));
let increment = Array(N).fill(1);
let decrement = Array(N).fill(1);

for (let i = 0; i < N; i++) {
	if (arr[i + 1] >= arr[i]) {
		increment[i + 1] += increment[i];
	}
	if (arr[i + 1] <= arr[i]) {
		decrement[i + 1] += decrement[i];
	}
}

console.log(Math.max(...increment, ...decrement));
