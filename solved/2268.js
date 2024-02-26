//https://www.acmicpc.net/problem/2268
// 수들의 합 7
// 비재귀 세그먼트 트리 구현

class NonRecursiveSegmentTree {
	constructor(N) {
		this.n = 2 ** Math.ceil(Math.log2(N));
		this.tree = new Array(2 * this.n).fill(BigInt(0));
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
const N = +input.shift().split(' ')[0];
const segmentTree = new NonRecursiveSegmentTree(N + 1);
const answer = [];
input.forEach((cmd) => {
	let [c, i, j] = cmd.split(' ').map(Number);

	if (c == 1) segmentTree.update(i - 1, j);
	else {
		if (i > j) {
			const temp = i;
			i = j;
			j = temp;
		}
		answer.push(segmentTree.query(i - 1, j));
	}
});
console.log(answer.join('\n'));
