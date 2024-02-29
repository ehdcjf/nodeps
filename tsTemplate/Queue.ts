class Item {
	public next: Item | null = null;
	constructor(public value: any) {}
}

class Queue {
	public head: Item | null = null;
	public tail: Item | null = null;
	public size = 0;
	constructor() {}

	push(value: any) {
		const node = new Item(value);
		if (!this.head) {
			this.head = node;
		} else if (this.tail) {
			this.tail.next = node;
		}
		this.tail = node;
		this.size += 1;
	}

	pop() {
		if (this.head) {
			const item = this.head;
			this.head = this.head.next;
			this.size -= 1;
			return item ? item.value : null;
		} else {
			return null;
		}
	}
}
