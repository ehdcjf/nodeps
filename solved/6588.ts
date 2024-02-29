//https://www.acmicpc.net/problem/6588
// 골드바흐의 추측

const input: number[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n').map(Number);
input.pop();
const isPrime = new Array(1000001).fill(true);
isPrime[0] = false;
isPrime[1] = false;
for (let i = 2; i * i <= 1000000; i++) {
	if (isPrime[i]) for (let j = i * i; j <= 1000000; j += i) isPrime[j] = false;
}

console.log(
	input
		.map((v) => {
			const half = v / 2;

			for (let i = 3; i <= half; i++) {
				if (!isPrime[i]) continue;
				if (!isPrime[v - i]) continue;
				return `${v} = ${i} + ${v - i}`;
			}
			return "Goldbach's conjecture is wrong.";
		})
		.join('\n')
);
