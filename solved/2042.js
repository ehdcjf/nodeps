//https://www.acmicpc.net/problem/2042
// 구간 합 구하기
// 비재귀 세그먼트 트리 구현
class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		const segmentTreeArrayLength = this.isPowerOfTwo(inputArrayLength)
			? inputArrayLength
			: 2 ** (Math.floor(Math.log2(inputArrayLength)) + 1);
		this.n = segmentTreeArrayLength;
		this.tree = new Array(2 * this.n).fill(BigInt(0));

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = BigInt(inputArray[i]);
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
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
const nums = input.splice(0, N);
const segmentTree = new NonRecursiveSegmentTree(nums);
const answer = [];
input.forEach((cmd) => {
	const [c, a, b] = cmd.split(' ');
	if (c == '1') segmentTree.update(Number(a) - 1, BigInt(b));
	else answer.push(segmentTree.query(Number(a) - 1, Number(b)));
});
console.log(answer.join('\n'));
