//https://www.acmicpc.net/problem/10868
// 비재귀 세그먼트 트리 구현
// 최솟값
class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.n = 2 ** Math.ceil(Math.log2(inputArrayLength));
		this.tree = new Array(2 * this.n).fill(0);

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = inputArray[i];
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = Math.min(this.tree[i << 1], this.tree[(i << 1) | 1]);
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
const [N, K] = input.shift().split(' ').map(Number);
const nums = input.splice(0, N).map(Number);
const segmentTree = new NonRecursiveSegmentTree(nums);
const answer = [];
input.forEach((query) => {
	const [a, b] = query.split(' ').map(Number);
	answer.push(segmentTree.query(a - 1, b));
});
console.log(answer.join('\n'));
