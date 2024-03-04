// https://www.acmicpc.net/problem/2243
// 사탕상자
/*입력
첫째 줄에 수정이가 사탕상자에 손을 댄 횟수 n(1 ≤ n ≤ 100,000)이 주어진다.
다음 n개의 줄에는 두 정수 A, B, 혹은 세 정수 A, B, C가 주어진다.
A가 1인 경우는 사탕상자에서 사탕을 꺼내는 경우이다.
이때에는 한 정수만 주어지며, B는 꺼낼 사탕의 순위를 의미한다.
이 경우 사탕상자에서 한 개의 사탕이 꺼내지게 된다.
또, A가 2인 경우는 사탕을 넣는 경우이다.
이때에는 두 정수가 주어지는데, B는 넣을 사탕의 맛을 나타내는 정수이고 C는 그러한 사탕의 개수이다.
C가 양수일 경우에는 사탕을 넣는 경우이고, 음수일 경우에는 빼는 경우이다.
맨 처음에는 빈 사탕상자에서 시작한다고 가정하며, 사탕의 총 개수는 2,000,000,000을 넘지 않는다.
또한 없는 사탕을 꺼내는 경우와 같은 잘못된 입력은 주어지지 않는다.


출력
A가 1인 모든 입력에 대해서, 꺼낼 사탕의 맛의 번호를 출력한다.

*/

class Item {
	constructor(public value = 0) {}
}

class SegmentTree {
	protected lg: number;
	protected sz: number;
	protected tree: Array<Item>;

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

	protected merge(A: Item, B: Item): Item {
		return new Item(A.value + B.value);
	}

	protected update(value: number, item: Item): Item {
		return new Item(item.value + value);
	}

	protected apply(i: number, value: number) {
		this.tree[i] = this.update(value, this.tree[i]);
	}

	protected pull(i: number) {
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

class CandyBox extends SegmentTree {
	constructor() {
		super(new Array(1_000_000 + 1).fill(0));
	}

	public find(rank: number) {
		let node = 1;
		while (node <= this.sz) {
			let left = this.tree[node << 1].value;
			if (left >= rank) {
				node = node << 1;
			} else {
				node = (node << 1) | 1;
				rank -= left;
			}
		}
		return node;
	}
}

const input: number[][] = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v: string) => v.split(' ').map(Number));
input.shift();
const candyBox = new CandyBox();
input.forEach((cmd) => {
	switch (cmd[0]) {
		case 1:
			const result = candyBox.find(cmd[1]);
			console.log(result);
			break;
		case 2:
			candyBox.updatePoint(cmd[1], cmd[2]);
			break;
	}
});
