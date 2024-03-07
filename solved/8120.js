// https://www.acmicpc.net/problem/8120
// Coding of Permutations

class Node {
	constructor(value = 0) {
		this.value = value;
	}
}

class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.lg = Math.ceil(Math.log2(inputArrayLength));

		this.sz = 1 << this.lg;

		this.tree = Array.from(new Array(this.sz << 1), () => {
			return new Node();
		});

		//segemnt tree initial setting
		for (let i = 1; i <= inputArrayLength; i++) {
			this.tree[(i - 1) | this.sz] = new Node(inputArray[i - 1]);
		}

		for (let i = this.sz - 1; i > 0; --i) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
		}
	}

	merge(nodeA, nodeB) {
		return new Node(nodeA.value + nodeB.value);
	}

	update(i, value) {
		i = (i - 1) | this.sz;
		this.tree[i] = this.merge(this.tree[i], new Node(value));
		for (let j = 1; j <= this.lg; j++) {
			const k = i >> j;
			this.tree[k] = this.merge(this.tree[k << 1], this.tree[(k << 1) | 1]);
		}
	}

	find(rank) {
		let node = 1;
		while (node < this.sz) {
			let left = this.tree[node << 1].value;
			if (left >= rank) {
				node = node << 1;
			} else {
				node = (node << 1) | 1;
				rank -= left;
			}
		}
		return node + 1 - this.sz;
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l, r) {
		let L = new Node();
		let R = new Node();

		l = (l - 1) | this.sz;
		r = (r - 1) | this.sz;

		for (; l <= r; l >>= 1, r >>= 1) {
			if (l & 1) L = this.merge(L, this.tree[l++]);
			if (~r & 1) R = this.merge(this.tree[r--], R);
		}
		return this.merge(L, R);
	}
}

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const code = input.map(Number);
const nums = Array(N + 1).fill(1);
nums[0] = 0;
const answer = [];
const segmentTree = new NonRecursiveSegmentTree(nums);
for (let i = N - 1; i >= 0; i--) {
	const c = code[i];
	const target = segmentTree.tree[1].value - c;
	const loc = segmentTree.find(target);
	if (loc == 1) {
		console.log(`NIE`);
		process.exit();
	}
	answer.unshift(loc - 1);
	segmentTree.update(loc, -1);
}
console.log(answer.join('\n'));
