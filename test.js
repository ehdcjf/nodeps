class Node {
	constructor(item) {
		this.item = item;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(item) {
		const node = new Node(item);
		if (this.head == null) {
			this.head = node;
		} else {
			this.tail.next = node;
		}

		this.tail = node;
		this.length += 1;
	}

	pop() {
		const popItem = this.head;
		this.head = this.head.next;
		this.length -= 1;
		return popItem.item;
	}
}

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const input = new Queue();

readline.on('line', function (line) {
	input.push(line.split(' ').map(Number));
}).on('close', function () {
	const newGogaek = Array(100001);

	const q = new Queue();
	const [N, T, W] = input.pop();
	for (let i = 0; i < N; i++) {
		const [p, t] = input.pop();
		q.push([p, t]);
	}
	const [M] = input.pop();

	for (let i = 0; i < M; i++) {
		const [p, t, c] = input.pop();
		newGogaek[c] = [p, t];
	}

	let w = 0;
	const answer = [];
	while (true) {
		const [p, t] = q.pop();
		const tx = Math.min(T, t);
		for (let i = 1; i <= tx; i++) {
			w += 1;
			answer.push(p);
			if (newGogaek[w]) {
				q.push(newGogaek[w]);
			}

			if (w == W) {
				console.log(answer.slice(0, W).join('\n'));
				process.exit(0);
			}
		}

		if (t - tx > 0) {
			q.push([p, t - tx]);
		}
	}
});
