//https://www.acmicpc.net/problem/1517
//버블 소트
/**
 * 세그먼트 트리를 이용
 * 수의 범위가 큰 경우 => 좌표 압축
 *
 *
 */
class Item {
	constructor(public value = 0) {}
}

class SegmentTree {
	private lg: number;
	private sz: number;
	private tree: Array<Item>;

	constructor(inputArray: Array<number>) {
		const inputArrayLength = inputArray.length;

		this.lg = Math.ceil(Math.log2(inputArrayLength));

		this.sz = 1 << this.lg;

		this.tree = Array.from(new Array(this.sz << 1), () => new Item());

		for (let i = 1; i <= inputArrayLength; i++) {
			this.tree[(i - 1) | this.sz] = new Item(inputArray[i - 1]);
		}

		for (let i = this.sz - 1; i > 0; i--) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
			//  i << 1 은 왼쪽 자식 노드    i * 2
			// (i << 1) | 1 은 오른쪽 자식 노드 i * 2 + 1
		}
	}

	private merge(A: Item, B: Item): Item {
		return new Item(A.value + B.value);
	}

	private update(value: number, item: Item): Item {
		return new Item(item.value + value);
	}

	private apply(i: number, value: number) {
		this.tree[i] = this.update(value, this.tree[i]);
	}

	private pull(i: number) {
		this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
	}

	public updatePoint(i: number, value: number) {
		i = (i - 1) | this.sz;
		this.apply(i, value);
		for (let j = 1; j <= this.lg; j++) this.pull(i >> j);
	}

	queryPoint(i: number) {
		i = (i - 1) | this.sz;
		return this.tree[i].value;
	}

	queryRange(l: number, r: number) {
		let L = new Item();
		let R = new Item();

		l = (l - 1) | this.sz;
		r = (r - 1) | this.sz;

		for (; l <= r; l >>= 1, r >>= 1) {
			if (l & 1) L = this.merge(L, this.tree[l++]);
			if (~r & 1) R = this.merge(this.tree[r--], R);
		}
		return this.merge(L, R).value;
	}
}
const input: string[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const N = +input[0]!;
const nums = input[1]
	.split(' ')
	.map((v, i) => [i, +v])
	.sort((a: any, b: any) => a[1] - b[1])
	.map((v, i) => [v[0], i + 1])
	.sort((a, b) => a[0] - b[0])
	.map((v) => v[1]);

const segmentTree = new SegmentTree(Array(N + 2).fill(0));

let answer = 0;
nums.forEach((num) => {
	segmentTree.updatePoint(num, 1);
	answer += segmentTree.queryRange(num + 1, N + 1);
});
console.log(answer);
