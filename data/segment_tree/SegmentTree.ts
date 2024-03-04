class Item {
	constructor(public value = 0) {}
}

class SegmentTree {
	private lg: number;
	private sz: number;
	private n: number;
	tree: Array<Item>;

	constructor(inputArray: Array<number>) {
		this.n = inputArray.length;
		this.lg = Math.ceil(Math.log2(this.n));
		this.sz = 1 << this.lg;
		this.tree = Array.from(new Array(this.sz << 1), () => new Item());
		this.init(inputArray, 1, 0, this.n - 1);
	}

	private merge(nodeA: Item, nodeB: Item) {
		return new Item(nodeA.value + nodeB.value);
	}

	private pull(i: number) {
		this.tree[i] = this.merge(this.tree[i * 2], this.tree[i * 2 + 1]);
	}

	private init(array: Array<any>, node: number, start: number, end: number) {
		if (start == end) this.tree[node] = new Item(array[start]);
		else {
			this.init(array, node << 1, start, (start + end) >> 1);
			this.init(array, (node << 1) | 1, ((start + end) >> 1) + 1, end);
			this.pull(node);
		}
	}

	private _update(node: number, start: number, end: number, index: number, value: number) {
		if (index < start || index > end) return;
		if (start == end) {
			this.tree[node] = new Item(value);
			return;
		}
		this._update(node << 1, start, (start + end) >> 1, index, value);
		this._update((node << 1) | 1, ((start + end) >> 1) + 1, end, index, value);
		this.pull(node);
	}

	private _query(node: number, start: number, end: number, left: number, right: number): Item {
		if (left > end || right < start) return new Item(0);
		if (left <= start && end <= right) return this.tree[node];
		const leftQuery = this._query(node << 1, start, (start + end) >> 1, left, right);
		const rightQuery = this._query((node << 1) | 1, ((start + end) >> 1) + 1, end, left, right);
		return this.merge(leftQuery, rightQuery);
	}

	public update(index: number, value: number) {
		return this._update(1, 0, this.n - 1, index, value);
	}

	public query(left: number, right: number) {
		return this._query(1, 0, this.n - 1, left, right);
	}
}

const arr = [1, 2, 3, 4, 5];
const test = new SegmentTree(arr);
console.log(test.query(0, 4));
test.update(0, 10);
console.log(test.query(0, 4));
