// https://www.acmicpc.net/problem/15806
// 영우의 기숙사 청소

// 큐
class Item {
	public next: Item | null = null;
	constructor(public value: any) {}
}

class Queue {
	public head: Item | null = null;
	public tail: Item | null = null;
	public size = 0;
	constructor() {}

	push(value: any) {
		const node = new Item(value);
		if (!this.head) {
			this.head = node;
		} else if (this.tail) {
			this.tail.next = node;
		}
		this.tail = node;
		this.size += 1;
	}

	pop() {
		if (this.head) {
			const item = this.head;
			this.head = this.head.next;
			this.size -= 1;
			return item ? item.value : null;
		} else {
			return null;
		}
	}
}
const dx = [2, 2, 1, 1, -2, -2, -1, -1];
const dy = [1, -1, 2, -2, 1, -1, 2, -2];

const input: string[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const [N, M, K, T] = input.shift()!.split(' ').map(Number);
const moldList = input.splice(0, M).map((v: string) =>
	v
		.trim()
		.split(' ')
		.map((v) => +v - 1)
);
const inspectList = input.map((v: string) =>
	v
		.trim()
		.split(' ')
		.map((v) => +v - 1)
);

const q = new Queue();
const visited = Array.from(new Array(N), () => Array.from(new Array(N), () => Array(2).fill(false)));
moldList.forEach((mold) => {
	q.push(mold);
});

for (let t = 0; t < T; t++) {
	const qSize = q.size;
	for (let i = 0; i < qSize; i++) {
		const [x, y] = q.pop();
		let flag = false;
		for (let k = 0; k < 8; k++) {
			const nx = x + dx[k];
			const ny = y + dy[k];
			if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
			flag = true;
			if (!visited[nx][ny][(t + 1) % 2]) {
				q.push([nx, ny]);
				visited[nx][ny][(t + 1) % 2] = true;
			}
		}
		if (flag) visited[x][y][t % 2] = true;
	}
}

inspectList.forEach((v) => {
	const [x, y] = v;
	if (visited[x][y][T % 2]) {
		console.log('YES');
		process.exit();
	}
});
console.log('NO');
