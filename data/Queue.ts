class Item {
	next: null | Item = null;
	constructor(public value: any) {}
}

class Queue {
	head: null | Item = null;
	tail: null | Item = null;
	size = 0;
	constructor() {}

	push(value: any) {
		const node = new Item(value);
		if (this.head == null) {
			this.head = node;
		} else if (this.tail) {
			this.tail.next = node;
		}
		this.tail = node;
		this.size += 1;
	}

	pop() {
		if (this.head) {
			const popItem = this.head;
			this.head = this.head.next;
			this.size -= 1;
			return popItem.value;
		} else {
			return null;
		}
	}
}
