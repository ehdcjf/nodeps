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

const [[N, K], nums] = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));
const set = new Set();

set.add(nums.join(''));
if (check(nums)) {
	console.log(0);
	process.exit();
}

function check(arr) {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[i - 1]) return false;
	}
	return true;
}

const q = new Queue();
q.push([nums, 0]);

while (q.length > 0) {
	const [x, cnt] = q.pop();
	for (let i = 0; i + K <= N; i++) {
		const head = x.slice(0, i);
		const body = x.slice(i, i + K);
		const tail = x.slice(i + K, N);
		const reverse = [...head, ...body.reverse(), ...tail];
		if (check(reverse)) {
			console.log(cnt + 1);
			process.exit();
		} else {
			const str = reverse.join('');

			if (!set.has(str)) {
				set.add(str);
				q.push([reverse, cnt + 1]);
			}
		}
	}
}
console.log(-1);
