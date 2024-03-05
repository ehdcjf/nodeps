// https://www.acmicpc.net/problem/2243
// 사탕상자

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
}

class CandyBox extends SegmentTree {
	constructor() {
		super(new Array(1_000_000 + 1).fill(0));
	}

	public find(rank: number) {
		let node = 1;
		while (node < this.sz) {
			let left = this.tree[node << 1].value;
			if (left >= rank) {
				node = node << 1;
			} else {
				node = (node << 1) | 1;
				rank -= left;
			}
		}
		return node + 1 - this.sz;
	}
}

const candyBox = new CandyBox();
const answer: number[] = [];
let N: number;
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});
readline.on('line', (line: string) => {
	if (!N) {
		N = +line;
	} else {
		if (N == 0) return;
		N--;
		const [c, ...arg] = line.split(' ').map(Number);
		switch (c) {
			case 1:
				const result = candyBox.find(arg[0]);
				candyBox.updatePoint(result, -1);
				answer.push(result);
				break;
			case 2:
				candyBox.updatePoint(arg[0], arg[1]);
				break;
		}
	}
}).on('close', () => {
	console.log(answer.join('\n'));
	process.exit();
});


