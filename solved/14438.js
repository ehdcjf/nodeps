//https://www.acmicpc.net/problem/14438
// 수열과 쿼리 17
// 비재귀 세그먼트 트리 구현
class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.n = 2 ** Math.ceil(Math.log2(inputArrayLength));
		this.tree = new Array(2 * this.n).fill(Infinity);

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = inputArray[i];
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = Math.min(this.tree[i << 1], this.tree[(i << 1) | 1]);
		}
	}

	update(target, value) {
		target += this.n;
		this.tree[target] = value;
		while (target > 1) {
			this.tree[target >> 1] = Math.min(this.tree[target], this.tree[target ^ 1]);
			target >>= 1;
		}
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l, r) {
		let res = Infinity;
		l += this.n;
		r += this.n;
		for (; l < r; l >>= 1, r >>= 1) {
			if (l & 1) res = Math.min(this.tree[l++], res);
			if (r & 1) res = Math.min(this.tree[--r], res);
		}
		return res;
	}
}

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
input.shift();
const nums = input.shift().split(' ').map(Number);
input.shift();
const segmentTree = new NonRecursiveSegmentTree(nums);
const answer = [];
input.forEach((query) => {
	const [c, a, b] = query.split(' ').map(Number);
	if (c == 1) segmentTree.update(a - 1, b);
	else answer.push(segmentTree.query(a - 1, b));
});
console.log(answer.join('\n'));
