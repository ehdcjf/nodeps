//https://www.acmicpc.net/problem/1918
const input = require('fs').readFileSync('./dev/stdin').toString().trim();
class Node {
	constructor(item) {
		this.item = item;
		this.prev = null;
	}
}

class Stack {
	constructor() {
		this.pointer = null;
		this.size = 0;
	}

	top() {
		return this.pointer.item;
	}

	push(item) {
		const node = new Node(item);
		node.prev = this.pointer;
		this.pointer = node;
		this.size += 1;
	}

	pop() {
		const popItem = this.pointer;
		this.pointer = this.pointer.prev;
		this.size -= 1;
		return popItem.item;
	}
}

const stack = new Stack();
let answer = '';
for (let i = 0; i < input.length; i++) {
	const char = input[i];
	switch (char) {
		case '(':
			stack.push(char);
			break;
		case ')':
			while (stack.size > 0 && stack.top() != '(') answer += stack.pop();
			stack.pop();
			break;
		case '*':
		case '/':
			while (stack.size > 0 && (stack.top() == '*' || stack.top() == '/')) answer += stack.pop();
			stack.push(char);

			break;
		case '+':
		case '-':
			while (stack.size > 0 && stack.top() != '(') answer += stack.pop();
			stack.push(char);
			break;
		default:
			answer += char;
	}
}

while (stack.size) {
	answer += stack.pop();
}

console.log(answer);
