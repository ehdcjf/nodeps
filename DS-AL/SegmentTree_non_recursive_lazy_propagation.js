// 느리게 갱신되는 세그먼트 트리의 비재귀 구현

class Node {
	constructor(value = 0, size = 0) {
		this.value = value;
		this.size = size;
	}
}

class NonRecursiveSegmentTreeWithLazyPropagation {
	constructor(inputArray) {
		// build segment tree
		const inputArrayLength = inputArray.length;

		this.lg = Math.ceil(Math.log2(inputArrayLength));

		this.size = 1 << this.lg;

		this.tree = Array.from(new Array(this.size << 1), () => {
			return new Node();
		});

		this.lazy = new Array(this.size).fill(0);

		//segemnt tree initial setting
		for (let i = 1; i <= inputArrayLength; i++) {
			this.tree[(i - 1) | this.size] = new Node(inputArray[i - 1], 1);
		}

		for (let i = this.size - 1; i > 0; i--) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
		}
	}

	updatePoint(i, value) {
		i = (i - 1) | this.size;
		for (let j = this.lg; j > 0; j--) this.push(i >> j);
		this.apply(i, value);
		for (let j = 1; j <= this.lg; j++) this.pull(i >> j);
	}

	queryPoint(i) {
		i = (i - 1) | this.size;
		for (let j = this.lg; j > 0; j--) this.push(i >> j);
		return this.tree[i];
	}

	updateRange(l, r, value) {
		l = (l - 1) | this.size;
		r = (r - 1) | this.size;

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

	queryRange(l, r) {
		let L = new Node();
		let R = new Node();

		l = (l - 1) | this.size;
		r = (r - 1) | this.size;
		for (let i = this.lg; i > 0; i--) {
			if ((l >> i) << i != l) this.push(l >> i);
			if (((r + 1) >> i) << i != r + 1) this.push(r >> i);
		}
		for (; l <= r; l >>= 1, r >>= 1) {
			if (l & 1) L = this.merge(L, this.tree[l++]);
			if (~r & 1) R = this.merge(this.tree[(r--, R)]);
		}
		return this.merge(L, R);
	}

	apply(i, value) {
		this.tree[i] = this.update(value, this.tree[i]);
		if (i < this.size) this.lazy[i] = this.compose(value, this.lazy[i]);
	}

	push(i) {
		this.apply(i << 1, this.lazy[i]);
		this.apply((i << 1) | 1, this.lazy[i]);
		this.lazy[i] = 0;
	}

	pull(i) {
		this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
	}

	// 이게.. 매번 수정해줘야 하는 함수
	merge(a, b) {
		return new Node(a.value + b.value, a.size + b.size);
	}

	update(lazy, node) {
		return new Node(node.value + lazy * node.size, node.size);
	}

	compose(a, b) {
		return a + b;
	}
}

const arr = [1, 2, 3, 4, 5];
const test = new NonRecursiveSegmentTreeWithLazyPropagation(arr);
console.log(test.tree);
test.updateRange(2, 4, 10);
const x = test.queryPoint(3);
const y = test.queryRange(2, 4);
