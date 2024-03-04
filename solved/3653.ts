// https://www.acmicpc.net/problem/3653
// 영화 수집

//세그먼트 트리 비재귀 구현
class Item {
	constructor(public value = 0) {}
}

class NonRecursiveSegmentTree {
	private lg: number;
	private size: number;
	private tree: Item[];
	private n!: number;
	constructor(inputArray: Array<any>) {
		// build
		this.n = inputArray.length;

		this.lg = Math.ceil(Math.log2(this.n));

		this.size = 1 << this.lg;

		this.tree = Array.from(new Array(this.size << 1), () => {
			return new Item();
		});

		//segemnt tree initial setting
		for (let i = 1; i <= this.n; i++) {
			this.tree[(i - 1) | this.size] = new Item(inputArray[i - 1]);
		}

		for (let i = this.size - 1; i > 0; --i) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
		}
	}

	merge(nodeA: Item, nodeB: Item) {
		return new Item(nodeA.value + nodeB.value);
	}

	update(i: number, value: any) {
		i = (i - 1) | this.size;
		// console.log('update', i, value);
		const newValue = new Item(value);
		this.tree[i] = this.merge(this.tree[i], newValue);
		for (let j = 1; j <= this.lg; j++) {
			const k = i >> j;
			this.tree[k] = this.merge(this.tree[k << 1], this.tree[(k << 1) | 1]);
		}
	}

	//   l <= x < r  구간에 대한 쿼리
	query(l: number) {
		let L = new Item();
		let R = new Item();

		l = (l - 1) | this.size;
		let r = (this.size << 1) - 1;
		for (; l <= r; l >>= 1, r >>= 1) {
			if (l & 1) L = this.merge(L, this.tree[l++]);
			if (~r & 1) R = this.merge(this.tree[r--], R);
		}
		return this.merge(L, R);
	}
}

const input: string[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const T = +input.shift()!;
const answers = [];
for (let t = 0; t < T; t++) {
	const answer: number[] = [];
	// 영화는 총 n 개 있고 m번 꺼낼 예정
	const [n, m] = input.shift()!.split(' ').map(Number);

	let floor = n; //  꺼낸 영화가 위치하게될 층

	const end = n + m + 1;
	const floorMap = new Array(n);
	const arr = Array(end).fill(0);

	for (let i = 0; i < floor; i++) {
		arr[i] = 1; // i층에는 영화가 있다.
		floorMap[i] = floor - i - 1; // 영화 i 는  floor-i-1 층에 있다.
	}

	const segemntTree = new NonRecursiveSegmentTree(arr);
	const movieList = input
		.shift()!
		.split(' ')
		.map((v) => Number(v) - 1);

	movieList.forEach((v) => {
		const nowFloor = floorMap[v]; // 지금 영화가 위치한 층
		const upper = segemntTree.query(nowFloor + 2); // 지금 영화보다 위에 있는 층에 있는 영화의 수
		answer.push(upper.value);
		segemntTree.update(nowFloor + 1, -1); // 지금 영화가 있는 층에서 해당 영화 제거
		floorMap[v] = floor++; // 새로운 영화 층
		segemntTree.update(floor, 1); // 새로운 층에 영화 추가
	});
	answers.push(answer.join(' '));
}
console.log(answers.join('\n'));
