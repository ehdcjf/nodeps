//https://www.acmicpc.net/problem/6198
const [N, ...arr] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n').map(Number);

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

let answer = 0;
const stack = new Stack();
for (let i = 0; i < N; i++) {
	if (stack.size == 0) {
		stack.push(arr[i]);
	} else if (stack.top.item > arr[i]) {
		answer += stack.size;
		stack.push(arr[i]);
	} else {
		while (stack.top && stack.top.item <= arr[i]) {
			stack.pop();
		}
		answer += stack.size;
		stack.push(arr[i]);
	}
}

console.log(answer);
