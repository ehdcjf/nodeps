// https://www.geeksforgeeks.org/segment-tree-efficient-implementation/?ref=lbp
// 비재귀 구현

class Node {
	constructor(value = 0) {
		this.value = BigInt(value);
	}
}

class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.lg = Math.ceil(Math.log2(inputArrayLength));

		this.size = 1 << this.lg;

		this.tree = Array.from(new Array(this.size << 1), () => {
			return new Node();
		});

		//segemnt tree initial setting
		for (let i = 1; i <= inputArrayLength; i++) {
			this.tree[(i - 1) | this.size] = new Node(inputArray[i - 1]);
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
		}
	}

	merge(nodeA, nodeB) {
		return new Node(nodeA.value + nodeB.value);
	}

	update(i, value) {
		i = (i - 1) | this.size;
		const newValue = new Node(value);
		this.tree[i] = this.merge(this.tree[i], newValue);
		for (let j = 1; j <= this.lg; j++) {
			const k = i >> j;
			this.tree[k] = this.merge(this.tree[k << 1], this.tree[(k << 1) | 1]);
		}
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l, r) {
		let L = new Node();
		let R = new Node();

		l = (l - 1) | this.size;
		r = (r - 1) | this.size;

		for (; l <= r; l >>= 1, r >>= 1) {
			if (l & 1) L = this.merge(L, this.tree[l++]);
			if (~r & 1) R = this.merge(this.tree[r--], R);
		}
		return this.merge(L, R);
	}
}

const arr = [1, 2, 3, 4, 5];

const test = new NonRecursiveSegmentTree(arr);
console.log(test.tree[1]);
