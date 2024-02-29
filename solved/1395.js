//https://www.acmicpc.net/problem/1395
// 스위치
// 구간 업데이트는 lazy하게

class Node {
	constructor(on = 0, off = 1) {
		this.on = on;
		this.off = off;
	}
}

// 느리게 갱신되는 세그먼트 트리 재귀 구현
class LazySegmentTree {
	constructor(inputArray) {
		this.n = inputArray.length;
		this.sz = 1 << Math.ceil(Math.log2(this.n));
		this.tree = Array.from(new Array(this.sz << 1), () => new Node());
		this.lazy = Array.from(new Array(this.sz << 1), () => false);
		this.init(inputArray, 1, 0, this.n - 1);
	}

	getMid(start, end) {
		return Math.floor((start + end) / 2);
	}

	merge(nodeA, nodeB) {
		return new Node(nodeA.on + nodeB.on, nodeA.off + nodeB.off);
	}

	update(lazy, node) {
		return lazy ? new Node(node.off, node.on) : node;
	}

	pull(i) {
		this.tree[i] = this.merge(this.tree[i * 2], this.tree[i * 2 + 1]);
	}

	init(array, node, start, end) {
		if (start == end) {
			this.tree[node] = new Node();
		} else {
			this.init(array, node * 2, start, this.getMid(start, end));
			this.init(array, node * 2 + 1, this.getMid(start, end) + 1, end);
			this.pull(node);
		}
	}

	_query(node, start, end, left, right) {
		this.updateLazy(node, start, end);
		if (left > end || right < start) return new Node(0, 0);
		if (left <= start && end <= right) return this.tree[node];
		const leftQuery = this._query(node * 2, start, this.getMid(start, end), left, right);
		const rightQuery = this._query(node * 2 + 1, this.getMid(start, end) + 1, end, left, right);
		return this.merge(leftQuery, rightQuery);
	}

	updateLazy(node, start, end) {
		if (this.lazy[node]) {
			this.tree[node] = this.update(this.lazy[node], this.tree[node]);
			if (start != end) {
				this.lazy[node * 2] = !this.lazy[node * 2];
				this.lazy[node * 2 + 1] = !this.lazy[node * 2 + 1];
			}
			this.lazy[node] = false;
		}
	}

	_updateRange(node, start, end, left, right, value) {
		this.updateLazy(node, start, end);
		if (left > end || right < start) return;
		if (left <= start && end <= right) {
			this.tree[node] = this.update(value, this.tree[node]);
			if (start != end) {
				this.lazy[node * 2] = !this.lazy[node * 2];
				this.lazy[node * 2 + 1] = !this.lazy[node * 2 + 1];
			}
			return;
		}

		this._updateRange(node * 2, start, this.getMid(start, end), left, right, value);
		this._updateRange(node * 2 + 1, this.getMid(start, end) + 1, end, left, right, value);
		this.pull(node);
	}

	updateRange(left, right, value) {
		return this._updateRange(1, 0, this.n - 1, left, right, value);
	}

	query(left, right) {
		return this._query(1, 0, this.n - 1, left, right);
	}
}

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const [N] = input.shift().split(' ').map(Number);
const arr = new Array(N).fill(0);
const segmentTree = new LazySegmentTree(arr);
const answer = [];

input.forEach((query) => {
	const [o, s, t] = query.split(' ').map(Number);
	if (o == 0) {
		segmentTree.updateRange(s - 1, t - 1, true);
	} else {
		const queryResult = segmentTree.query(s - 1, t - 1);
		answer.push(queryResult.on);
	}
});

console.log(answer.join('\n'));
