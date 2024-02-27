// https://www.acmicpc.net/blog/view/117
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

	/**
	 * i번 리프노드에 value 업데이트 적용
	 * @param {Index} i
	 * @param {Value} value
	 */
	updatePoint(i, value) {
		i = (i - 1) | this.size;

		// 루트노드부터, i번 노드까지 lazy 적용 (그동안 반영못했던 lazy를 반영)
		// push 호출은 루트노드부너, i번 노드의 부모노드까지지만
		// push는 자식노드에 lazy를 전파하는 거니까.. 루트노드부터 i번 노드까지 그동안 미루던 lazy를 적용한다.
		for (let j = this.lg; j > 0; j--) this.push(i >> j);

		// 리프노드에 update
		this.apply(i, value);

		// i번노드의 부모노드부터 루트노드까지 갱신
		for (let j = 1; j <= this.lg; j++) this.pull(i >> j);
	}

	/**
	 * i번 리프노드에 대한 쿼리
	 * @param {Index} i
	 * @returns {Node}
	 */
	queryPoint(i) {
		// 리프노드의 위치
		i = (i - 1) | this.size;

		// 루트노드부터 i번 노드까지 lazy 적용
		for (let j = this.lg; j > 0; j--) this.push(i >> j);
		return this.tree[i];
	}

	/**
	 *  [l,r] 범위의 리프노드에 value 업데이트 적용
	 * @param {Index} l
	 * @param {Index} r
	 * @param {Value} value
	 */
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

	/**
	 * [l,r] 범위의 리프노드에 대한 쿼리
	 *
	 * @param {Index} l
	 * @param {Index} r
	 * @returns {Node}
	 */
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
			if (~r & 1) R = this.merge(this.tree[r--], R);
		}
		return this.merge(L, R);
	}

	/**
	 *
	 * i번 노드에 value에 대한 업데이트를 적용하고, i번 노드의 lazy에 "서브트리에 value 업데이트를 적용하라는 표시를 남김"
	 * @param {Index} i
	 * @param {Value} value
	 *
	 */
	apply(i, value) {
		this.tree[i] = this.update(value, this.tree[i]); // 업데이트하기
		if (i < this.size) this.lazy[i] = this.composition(value, this.lazy[i]); // 표시하기
	}

	/**
	 *
	 * i번 노드의 lazy를 두 자식노드에 전파하고, lazy를 초기화
	 *
	 * @param {Index} i
	 */
	push(i) {
		this.apply(i << 1, this.lazy[i]);
		this.apply((i << 1) | 1, this.lazy[i]);
		this.lazy[i] = 0;
	}

	/**
	 *  i번 노드의 value를 i번 노드의 두 자식의 value을 합친 값으로 갱신
	 * @param {Index} i
	 */
	pull(i) {
		this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
	}

	/**
	 * 아래 세 메서드의 경우 매개변수로 받아서 처리하는 게 좋을듯
	 */

	/**
	 * 두 노드를 합치는 연산 수행
	 * @param {Node} a
	 * @param {Node} b
	 * @returns {Node}
	 */
	merge(a, b) {
		return new Node(a.value + b.value, a.size + b.size);
	}

	/**
	 * Node에 lazyr값을 적용하는 연산 수행
	 * @param {Value} lazy
	 * @param {Node} node
	 * @returns {Node}
	 */
	update(lazy, node) {
		return new Node(node.value + lazy * node.size, node.size);
	}

	/**
	 * lazy 값 위에 lazy 값을 적용하는 연산을 수행
	 * @param {Value} a
	 * @param {Value} b
	 * @returns {Value}
	 */
	composition(a, b) {
		return a + b;
	}
}

const arr = [1, 2, 3, 4, 5];
const test = new NonRecursiveSegmentTreeWithLazyPropagation(arr);
console.log(test.tree);
test.updateRange(2, 4, 10);
const x = test.queryPoint(3);
const y = test.queryRange(2, 4);
