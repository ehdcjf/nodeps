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

class SubSet {
	constructor(i) {
		this.parent = i;
		this.rank = 0;
	}
}

class UF {
	constructor(N) {
		this.subsets = Array.from(Array(N), (_, i) => {
			return new SubSet(i);
		});
	}

	find(i) {
		if (this.subsets[i].parent == i) {
			return i;
		} else {
			return this.find(this.subsets[i].parent);
		}
	}

	union(x, y) {
		const xroot = this.find(x);
		const yroot = this.find(y);
		if (this.subsets[xroot].rank < this.subsets[yroot].rank) {
			this.subsets[xroot].parent = yroot;
		} else if (this.subsets[xroot].rank > this.subsets[yroot].rank) {
			this.subsets[yroot].parent = xroot;
		} else {
			this.subsets[xroot].parent = yroot;
			this.subsets[yroot].rank++;
		}
	}
}

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});
const answer = [];
readline.on('line', (line) => {
	//
}).on('close', () => {
	console.log(answer.join('\n'));
	process.exit();
});

// if (!T) {
// 	T = +line;
// } else if (!uf) {
// 	tcAnswer = [];
// 	F = +line;
// 	uf = new UF(F + 1);
// } else if (uf) {
// 	if (R === null) {
// 		R = +line;
// 	} else if (R > 0) {
// 		const [a, b] = line.split(' ').map(Number);
// 		uf.union(a, b);
// 		R--;
// 	} else if (C === null) {
// 		C = +line;
// 	} else if (C > 0) {
// 		const [a, b] = line.split(' ').map(Number);
// 		if (uf.find(a) == uf.find(b)) {
// 			tcAnswer.push('1');
// 		} else {
// 			tcAnswer.push('0');
// 		}
// 	}
// }

// //
// //
