class Node {
	constructor(item) {
		this.item = item;
		this.prev = null;
	}
}

class Stack {
	constructor() {
		this.top = null;
		this.size = 0;
	}

	push(item) {
		const node = new Node(item);
		node.prev = this.top;
		this.top = node;
		this.size += 1;
	}

	pop() {
		const popItem = this.top;
		this.top = this.top.prev;
		this.size -= 1;
		return popItem.item;
	}
}

const input = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));
input.pop();

let tc = 1;
while (input.length > 0) {
	const [N, M] = input.shift();
	const edges = Array.from(Array(N + 1), () => new Array());
	for (let i = 0; i < M; i++) {
		const [src, dest] = input.shift();
		edges[src].push(dest);
		edges[dest].push(src);
	}

	let tree = 0;
	let checked = Array(N + 1).fill(false);
	for (let i = 1; i <= N; i++) {
		if (!checked[i]) {
			let visited = Array(N + 1).fill(false);
			checked[i] = true;
			const st = new Stack();
			st.push(i);
			let edge = 0;
			let node = 0;
			while (st.length > 0) {
				const now = st.pop();
				node++;
				visited[now] = true;
				checked[now] = true;
				edges[now].forEach((next) => {
					if (!visited[next]) {
						edge++;
						st.push(next);
					}
				});
			}
			if (isTree) tree++;
		}
	}
}
