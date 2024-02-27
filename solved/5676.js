//https://www.acmicpc.net/problem/5676
// 음주 코딩

class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.n = 2 ** Math.ceil(Math.log2(inputArrayLength));
		this.tree = Array.from(new Array(2 * this.n), () => 1);

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = this.simple(inputArray[i]);
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
		}
	}

	simple(num) {
		if (num > 0) return 1;
		else if (num < 0) return -1;
		else return 0;
	}

	merge(a, b) {
		return a * b;
	}

	update(target, value) {
		target += this.n;
		this.tree[target] = this.simple(value);
		while (target > 1) {
			this.tree[target >> 1] = this.merge(this.tree[target], this.tree[target ^ 1]);
			target >>= 1;
		}
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l, r) {
		let res = 1;
		l += this.n;
		r += this.n;
		for (; l < r; l >>= 1, r >>= 1) {
			if (l & 1) res = this.merge(res, this.tree[l++]);
			if (r & 1) res = this.merge(this.tree[--r], res);
		}

		if (res > 0) return '+';
		else if (res < 0) return '-';
		else return '0';
	}
}

const input = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' '));
let answers = [];
for (let i = 0; i < input.length; ) {
	const [N, K] = input[i++];
	const nums = input[i++].map(Number);
	const segmentTree = new NonRecursiveSegmentTree(nums);
	let answer = '';
	for (let j = 0; j < K; j++) {
		const [c, x, y] = input[i + j];
		if (c == 'P') {
			answer += segmentTree.query(+x - 1, +y);
		} else {
			segmentTree.update(+x - 1, +y);
		}
	}
	answers.push(answer);
	i += +K;
}
console.log(answers.join('\n'));
