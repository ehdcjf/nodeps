//https://www.acmicpc.net/problem/1394
/**
 * 이런 문제는 규칙을 찾는 게 중요한데
 *
 * 그냥 종이에 써가면서 찾으면 됨.
 *
 */

const [memo, crypto] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');

const L = memo.length;

let answer = 0;

const indexMap = memo.split('').reduce((r, v, i) => {
	r[v] = i + 1;
	return r;
}, {});

for (let i = 0; i < crypto.length; i++) {
	const char = crypto[i];
	const order = indexMap[char];
	answer = (answer * L + order) % 900528;
}

console.log(answer % 900528);
