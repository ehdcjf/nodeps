// https://www.acmicpc.net/problem/1725
// 히스토그램
class Item {
	prev: null | Item = null;
	constructor(public value: any) {}
}

class Stack {
	top: null | Item = null;
	size = 0;
	constructor() {}

	push(value: any) {
		const node = new Item(value);
		node.prev = this.top;
		this.top = node;
		this.size += 1;
	}

	pop() {
		if (this.top) {
			const popItem = this.top;
			this.top = this.top.prev;
			this.size -= 1;
			return popItem.value;
		} else return null;
	}

	peek() {
		return this.top ? this.top.value : null;
	}

	isEmpty() {
		return this.size == 0;
	}
}

const input: string[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
input.shift();
let answer = 0;
const st = new Stack();
input.forEach((num: any) => {
	num = Number(num);
	if (st.isEmpty()) {
		if (num > answer) answer = num;
		st.push({ h: num, w: 1 });
	} else {
		if (num > answer) answer = num;
		let sz = 0;
		while (!st.isEmpty() && st.peek().h > num) {
			sz = sz == 0 ? st.peek().w : sz + st.peek().w;
			const possible = st.pop().h * sz;
			if (possible > answer) answer = possible;
		}

		if (st.isEmpty() || st.peek().h < num) {
			st.push({ h: num, w: sz + 1 });
		} else if (st.peek().h == num) {
			st.peek().w += sz + 1;
		}
	}
});

let sz = 0;
while (!st.isEmpty()) {
	sz = sz == 0 ? st.peek().w : sz + st.peek().w;
	const max = st.pop().h * sz;
	if (max > answer) answer = max;
}

console.log(answer);
