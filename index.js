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

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('');

const pair = [];
const stack = new Stack();
for (let i = 0; i < input.length; i++) {
	const c = input[i];
	if (c == '(') {
		stack.push(['(', i]);
	} else if (c == ')') {
		const [_, j] = stack.pop();
		pair.push([j, i]);
	}
}
const answer = [];
for (let i = 1; i < 1 << pair.length; i++) {
	let x = i;
	const temp = [...input];
	const exclude = [];
	let combination = 0;
	while (x > 0) {
		if ((x & 1) == 1) {
			exclude.push(...pair[combination]);
		}
		x >>= 1;
		combination++;
	}
	answer.push(temp.filter((v, i) => !exclude.includes(i)).join(''));
}
console.log([...new Set(answer)].sort().join('\n'));
