//https://www.acmicpc.net/problem/2357
// 비재귀 세그먼트 트리 구현
// 최솟값과 최댓값
class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		const segmentTreeArrayLength = 2 ** Math.ceil(Math.log2(inputArrayLength));
		this.n = segmentTreeArrayLength;
		this.tree = new Array(2 * this.n).fill(BigInt(0));

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = { min: inputArray[i], max: inputArray[i] };
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = {
				min: Math.min(this.tree[i << 1].min, this.tree[(i << 1) | 1].min),
				max: Math.max(this.tree[i << 1].max, this.tree[(i << 1) | 1].max),
			};
		}
	}

	isPowerOfTwo(number) {
		if (number < 1) return false;
		while (number != 1) {
			if (number % 2 !== 0) return false;
			number /= 2;
		}
		return true;
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l, r) {
		let res = { min: Infinity, max: -Infinity };
		l += this.n;
		r += this.n;
		for (; l < r; l >>= 1, r >>= 1) {
			if (l & 1) {
				res.min = Math.min(res.min, this.tree[l].min);
				res.max = Math.max(res.max, this.tree[l].max);
				l++;
			}
			if (r & 1) {
				--r;
				res.min = Math.min(res.min, this.tree[r].min);
				res.max = Math.max(res.max, this.tree[r].max);
			}
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
	const { min, max } = segmentTree.query(a - 1, b);
	answer.push(`${min} ${max}`);
});
console.log(answer.join('\n'));
