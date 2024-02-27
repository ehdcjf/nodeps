class LazySegmentTree {
	private lg: number;
	private sz: number;
	private n: number;
	private tree: Array<number>;
	private lazy: number[];

	constructor(inputArray: Array<number>) {
		this.n = inputArray.length;
		this.lg = Math.ceil(Math.log2(this.n));
		this.sz = 1 << this.lg;
		this.tree = Array.from(new Array(this.sz << 1), () => 0);
		this.lazy = new Array(this.sz).fill(0);
		this.init(inputArray, 1, 0, this.n - 1);
	}

	private init(array: Array<any>, node: number, start: number, end: number) {
		if (start == end) this.tree[node] = array[start];
		else {
			this.init(array, node << 1, start, (start + end) >> 1);
			this.init(array, (node << 1) | 1, ((start + end) >> 1) + 1, end);
			this.pull(node);
		}
	}

	private merge(nodeA: number, nodeB: number) {
		return nodeA + nodeB;
	}

	private pull(i: number) {
		this.tree[i] = this.merge(this.tree[i * 2], this.tree[i * 2 + 1]);
	}

	private _update(node: number, start: number, end: number, index: number, value: number) {
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

	private _query(node: number, start: number, end: number, left: number, right: number): number {
		this.updateLazy(node, start, end);
		if (left > end || right < start) return 0;
		if (left <= start && end <= right) return this.tree[node];
		const leftQuery = this._query(node << 1, start, (start + end) >> 1, left, right);
		const rightQuery = this._query((node << 1) | 1, ((start + end) >> 1) + 1, end, left, right);
		return this.merge(leftQuery, rightQuery);
	}

	private updateLazy(node: number, start: number, end: number) {
		if (this.lazy[node] != 0) {
			this.tree[node] = +(end - start + 1) * this.lazy[node];
			if (start != end) {
				this.lazy[node << 1] += this.lazy[node];
				this.lazy[(node << 1) | 1] += this.lazy[node];
			}
			this.lazy[node] = 0;
		}
	}

	private _updateRange(node: number, start: number, end: number, left: number, right: number, value: number) {
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

	public updatePoint(index: number, value: number) {
		return this._update(1, 0, this.n - 1, index, value);
	}

	public updateRange(left: number, right: number, value: number) {
		return this._updateRange(1, 0, this.n - 1, left, right, value);
	}

	public query(left: number, right: number) {
		return this._query(1, 0, this.n - 1, left, right);
	}
}

const arr = [1, 2, 3, 4, 5];
const test = new LazySegmentTree(arr);

console.log(test.query(0, 1));
test.updateRange(0, 1, 10);
console.log(test.query(0, 1));
