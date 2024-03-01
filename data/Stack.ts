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
}
