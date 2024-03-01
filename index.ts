// https://www.acmicpc.net/problem/6549
// 히스토그램에서 가장 큰 직사각형
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
input.pop();
const answer: string[] = [];
input.map((v) => v.split(' ').map(BigInt)).forEach((arr) => {
	arr.shift();
	let max: bigint = BigInt(0);
	const st = new Stack();
	arr.forEach((v) => {
		if (st.isEmpty()) {
			if (v > max) max = v;
			st.push({ h: v, w: BigInt(1) });
		} else {
			let sz = BigInt(0);
			while (!st.isEmpty() && st.peek().h > v) {
				if (sz == BigInt(0)) sz = st.peek().w;
				else sz += st.peek().w;
				const temp = st.pop().h * sz;
				if (temp > max) max = temp;
			}

			if (!st.isEmpty() && st.peek().h == v) {
				st.peek().w += sz + BigInt(1);
			} else {
				st.push({ h: v, w: BigInt(1) });
			}
		}
	});

	let sz = BigInt(0);
	while (!st.isEmpty()) {
		if (sz == BigInt(0)) sz = st.peek().w;
		else sz += st.peek().w;
		const temp = st.pop().h * sz;
		if (temp > max) max = temp;
	}

	answer.push(max.toString());
});

console.log(answer.join('\n'));
