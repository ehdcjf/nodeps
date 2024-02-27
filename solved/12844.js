//https://www.acmicpc.net/problem/12844
// XOR
// 구간 업데이트는 lazy하게

// 느리게 갱신되는 세그먼트 트리 재귀 구현
class LazySegmentTree {
	constructor(inputArray) {
		this.n = inputArray.length;
		this.lg = Math.ceil(Math.log2(this.n));
		this.sz = 1 << this.lg;
		this.tree = Array.from(new Array(this.sz << 1), () => 0);
		this.lazy = new Array(this.sz << 1).fill(0);
		this.init(inputArray, 1, 0, this.n - 1);
	}

	getMid(start, end) {
		return Math.floor((start + end) / 2);
	}

	init(array, node, start, end) {
		if (start == end) {
			this.tree[node] = array[start];
		} else {
			// console.log(node, node << 1, (node << 1) | 1);
			this.init(array, node * 2, start, this.getMid(start, end));
			this.init(array, node * 2 + 1, this.getMid(start, end) + 1, end);
			this.pull(node);
		}
	}

	merge(nodeA, nodeB) {
		return nodeA ^ nodeB;
	}

	pull(i) {
		this.tree[i] = this.merge(this.tree[i * 2], this.tree[i * 2 + 1]);
	}

	_update(node, start, end, index, value) {
		this.updateLazy(node, start, end);
		if (index < start || index > end) return;
		if (start == end) {
			this.tree[node] = value;
			return;
		}
		this._update(node * 2, start, Math.floor((start + end) / 2), index, value);
		this._update(node * 2 + 1, Math.floor((start + end) / 2) + 1, end, index, value);
		this.pull(node);
	}

	_query(node, start, end, left, right) {
		this.updateLazy(node, start, end);
		if (left > end || right < start) return 0;
		if (left <= start && end <= right) return this.tree[node];
		const leftQuery = this._query(node * 2, start, Math.floor((start + end) / 2), left, right);
		const rightQuery = this._query(node * 2 + 1, Math.floor((start + end) / 2) + 1, end, left, right);
		return this.merge(leftQuery, rightQuery);
	}

	updateLazy(node, start, end) {
		if (this.lazy[node] != 0) {
			if ((end - start + 1) % 2 == 1) this.tree[node] ^= this.lazy[node];
			if (start != end) {
				this.lazy[node * 2] ^= this.lazy[node];
				this.lazy[node * 2 + 1] ^= this.lazy[node];
			}
			this.lazy[node] = 0;
		}
	}

	_updateRange(node, start, end, left, right, value) {
		this.updateLazy(node, start, end);
		if (left > end || right < start) return;

		if (left <= start && end <= right) {
			if ((end - start + 1) % 2 == 1) this.tree[node] ^= value;

			if (start != end) {
				this.lazy[node * 2] ^= value;
				this.lazy[node * 2 + 1] ^= value;
			}
			return;
		}
		this._updateRange(node * 2, start, Math.floor((start + end) / 2), left, right, value);
		this._updateRange(node * 2 + 1, Math.floor((start + end) / 2) + 1, end, left, right, value);
		this.pull(node);
	}

	updatePoint(index, value) {
		return this._update(1, 0, this.n - 1, index, value);
	}

	updateRange(left, right, value) {
		return this._updateRange(1, 0, this.n - 1, left, right, value);
	}

	query(left, right) {
		return this._query(1, 0, this.n - 1, left, right);
	}
}

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
input.shift();
const nums = input.shift().split(' ').map(Number);
input.shift();
const segmentTree = new LazySegmentTree(nums);
const answer = [];

input.forEach((query) => {
	const [c, ...arg] = query.split(' ').map(Number);
	if (c == 1) {
		const [i, j, k] = arg;
		segmentTree.updateRange(i, j, k);
	} else {
		const [i, j] = arg;
		answer.push(segmentTree.query(i, j));
	}
});

console.log(answer.join('\n'));
