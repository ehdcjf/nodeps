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
