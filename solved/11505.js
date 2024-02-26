//https://www.acmicpc.net/problem/11505
// 구간 곱 구하기
// 비재귀 세그먼트 트리 구현
class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.n = 2 ** Math.ceil(Math.log2(inputArrayLength));
		this.tree = new Array(2 * this.n).fill(BigInt(1));

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = BigInt(inputArray[i]);
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = (this.tree[i << 1] * this.tree[(i << 1) | 1]) % BigInt(1000000007);
		}
	}

	update(target, value) {
		target += this.n;
		this.tree[target] = BigInt(value);
		while (target > 1) {
			this.tree[target >> 1] = (this.tree[target] * this.tree[target ^ 1]) % BigInt(1000000007);
			target >>= 1;
		}
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l, r) {
		let res = BigInt(1);
		l += this.n;
		r += this.n;
		for (; l < r; l >>= 1, r >>= 1) {
			if (l & 1) res = (res * this.tree[l++]) % BigInt(1000000007);
			if (r & 1) res = (res * this.tree[--r]) % BigInt(1000000007);
		}
		return res;
	}
}

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const N = input.shift().split(' ')[0];
const nums = input.splice(0, N);
const segmentTree = new NonRecursiveSegmentTree(nums);
const answer = [];
input.forEach((cmd) => {
	const [c, a, b] = cmd.split(' ');
	if (c == '1') segmentTree.update(Number(a) - 1, BigInt(b));
	else answer.push(segmentTree.query(Number(a) - 1, Number(b)));
});
console.log(answer.join('\n'));
