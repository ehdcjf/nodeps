class LazySegmentTree {
	constructor(inputArray) {
		this.n = inputArray.length;
		this.lg = Math.ceil(Math.log2(this.n));
		this.sz = 1 << this.lg;
		this.tree = Array.from(new Array(this.sz << 1), () => 0);
		this.lazy = new Array(this.sz).fill(0);
		this.init(inputArray, 1, 0, this.n - 1);
	}

	init(array, node, start, end) {
		if (start == end) this.tree[node] = array[start];
		else {
			this.init(array, node << 1, start, (start + end) >> 1);
			this.init(array, (node << 1) | 1, ((start + end) >> 1) + 1, end);
			this.pull(node);
		}
	}

	merge(nodeA, nodeB) {
		return nodeA + nodeB;
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
		this._update(node << 1, start, (start + end) >> 1, index, value);
		this._update((node << 1) | 1, ((start + end) >> 1) + 1, end, index, value);
		this.pull(node);
	}

	_query(node, start, end, left, right) {
		this.updateLazy(node, start, end);
		if (left > end || right < start) return 0;
		if (left <= start && end <= right) return this.tree[node];
		const leftQuery = this._query(node << 1, start, (start + end) >> 1, left, right);
		const rightQuery = this._query((node << 1) | 1, ((start + end) >> 1) + 1, end, left, right);
		return this.merge(leftQuery, rightQuery);
	}

	updateLazy(node, start, end) {
		if (this.lazy[node] != 0) {
			this.tree[node] = +(end - start + 1) * this.lazy[node];
			if (start != end) {
				this.lazy[node << 1] += this.lazy[node];
				this.lazy[(node << 1) | 1] += this.lazy[node];
			}
			this.lazy[node] = 0;
		}
	}

	_updateRange(node, start, end, left, right, value) {
		this.updateLazy(node, start, end);
		if (left > end || right < start) return;

		if (left <= start && end <= right) {
			this.tree[node] += (end - start + 1) * value;
			if (start != end) {
				this.lazy[node << 1] += value;
				this.lazy[(node << 1) | 1] += value;
			}
			return;
		}
		this._updateRange(node << 1, start, (start + end) >> 1, left, right, value);
		this._updateRange((node << 1) | 1, ((start + end) >> 1) + 1, end, left, right, value);
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

const arr = Array(86400).fill(0);
const test = new LazySegmentTree(arr);

test.updateRange(0, 1, 1);
test.updateRange(1, 3, 1);
test.updateRange(0, 2, 1);
console.log(test.query(0, 3));
