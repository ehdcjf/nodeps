//https://www.acmicpc.net/problem/1275
// 커피숍2
// 비재귀 세그먼트 트리 구현
class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.n = 2 ** Math.ceil(Math.log2(inputArrayLength));
		this.tree = new Array(2 * this.n).fill(BigInt(0));

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = BigInt(inputArray[i]);
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
		}
	}

	update(target, value) {
		target += this.n;
		this.tree[target] = BigInt(value);
		while (target > 1) {
			this.tree[target >> 1] = this.tree[target] + this.tree[target ^ 1];
			target >>= 1;
		}
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l, r) {
		let res = BigInt(0);
		l += this.n;
		r += this.n;
		for (; l < r; l >>= 1, r >>= 1) {
			if (l & 1) res += this.tree[l++];
			if (r & 1) res += this.tree[--r];
		}
		return res;
	}
}

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const N = input.shift().split(' ')[0];
const nums = input.shift().split(' ');
const segmentTree = new NonRecursiveSegmentTree(nums);
const answer = [];
input.forEach((cmd) => {
	let [x, y, a, b] = cmd.split(' ').map(Number);
	if (x > y) {
		const temp = x;
		x = y;
		y = temp;
	}
	answer.push(segmentTree.query(Number(x) - 1, Number(y)));
	segmentTree.update(Number(a) - 1, BigInt(b));
});
console.log(answer.join('\n'));
