type Lazy = number;

class Node {
	constructor(public value = 0, public size = 0) {}
}

class SegmentTree {
	private lg: number;
	private sz: number;
	private tree: Array<Node>;
	private lazy: Array<Lazy>;
	constructor(inputArray: Array<number>) {
		const inputArrayLength = inputArray.length;

		// inputArray를 감당할 수 있는 부모 노드 depth
		this.lg = Math.ceil(Math.log2(inputArrayLength));

		this.sz = 1 << this.lg;

		this.tree = Array.from(new Array(this.sz << 1), () => new Node());
		this.lazy = new Array(this.sz).fill(0);

		// 입력된 Array 리프노드에 할당
		for (let i = 1; i <= inputArrayLength; i++) {
			this.tree[(i - 1) | this.sz] = new Node(inputArray[i - 1], 1);
		}

		for (let i = this.sz - 1; i > 0; i--) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
			//  i << 1 은 왼쪽 자식 노드    i * 2
			// (i << 1) | 1 은 오른쪽 자식 노드 i * 2 + 1
		}
	}

	private merge(A: Node, B: Node): Node {
		return new Node(A.value + B.value, A.size + B.size);
	}

	private update(lazy: Lazy, node: Node): Node {
		return new Node(node.value + lazy * node.size, node.size);
	}

	private compose(a: Lazy, b: Lazy): Lazy {
		return a + b;
	}

	private apply(i: number, value: Lazy) {
		this.tree[i] = this.update(value, this.tree[i]);
		if (i < this.sz) this.lazy[i] = this.compose(value, this.lazy[i]);
	}

	private push(i: number) {
		this.apply(i << 1, this.lazy[i]);
		this.apply((i << 1) | 1, this.lazy[i]);
		this.lazy[i] = 0;
	}

	private pull(i: number) {
		this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
	}

	public updatePoint(i: number, value: number) {
		i = (i - 1) | this.sz;
		for (let j = this.lg; j > 0; j--) this.push(i >> j);
		this.apply(i, value);
		for (let j = 1; j <= this.lg; j++) this.pull(i >> j);
	}

	queryPoint(i: number) {
		i = (i - 1) | this.sz;
		for (let j = this.lg; j > 0; j--) this.push(i >> j);
		return this.tree[i].value;
	}

	updateRange(l: number, r: number, value: number) {
		l = (l - 1) | this.sz;
		r = (r - 1) | this.sz;

		for (let i = this.lg; i > 0; i--) {
			if ((l >> i) << i != l) this.push(l >> i);
			if (((r + 1) >> i) << i != r + 1) this.push(r >> i);
		}

		for (let L = l, R = r; L <= R; L >>= 1, R >>= 1) {
			if (L & 1) this.apply(L++, value);
			if (~R & 1) this.apply(R--, value);
		}

		for (let i = 1; i <= this.lg; i++) {
			if ((l >> i) << i != l) this.pull(l >> i);
			if (((r + 1) >> i) << i != r + 1) this.pull(r >> i);
		}
	}

	queryRange(l: number, r: number) {
		let L = new Node();
		let R = new Node();

		l = (l - 1) | this.sz;
		r = (r - 1) | this.sz;
		for (let i = this.lg; i > 0; i--) {
			if ((l >> i) << i != l) this.push(l >> i);
			if (((r + 1) >> i) << i != r + 1) this.push(r >> i);
		}
		for (; l <= r; l >>= 1, r >>= 1) {
			if (l & 1) L = this.merge(L, this.tree[l++]);
			if (~r & 1) R = this.merge(this.tree[r--], R);
		}
		return this.merge(L, R).value;
	}
}

const arr = [1, 2, 3, 4, 5];
const test = new SegmentTree(arr);
test.updatePoint(1, 10);
console.log(test.queryPoint(1));
console.log(test.queryRange(1, 5));
test.updateRange(1, 5, 10);
console.log(test.queryRange(1, 5));
