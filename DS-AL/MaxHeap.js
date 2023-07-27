class MaxHeap {
	constructor() {
		this.heap = [];
	}
	swap(a, b) {
		[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
	}

	size() {
		return this.heap.length;
	}

	push(value) {
		this.heap.push(value);
		let current = this.heap.length - 1;
		let parent = Math.floor((current - 1) / 2);

		while (this.heap[parent] < value) {
			this.swap(parent, current);
			current = parent;
			parent = Math.floor((current - 1) / 2);
		}
	}

	pop() {
		const last = this.heap.length - 1;
		let current = 0;
		this.swap(current, last); // 0번이 루트노드
		const value = this.heap.pop();

		while (current < last) {
			let left = current * 2 + 1;
			let right = current * 2 + 2;

			if (left >= last) {
				break;
			} else if (right >= last) {
				if (this.heap[current] < this.heap[left]) {
					this.swap(current, left);
					current = left;
				} else {
					break;
				}
			} else {
				if (
					this.heap[left] > this.heap[current] ||
					this.heap[right] > this.heap[current]
				) {
					let next =
						this.heap[left] >
						this.heap[right]
							? left
							: right;
					this.swap(current, next);
					current = next;
				} else {
					break;
				}
			}
		}
		return value;
	}
}

const h = new MaxHeap();

h.push(10);
h.push(14);
h.push(15);
h.push(100);
h.push(1023);

console.log(h.pop());
console.log(h.pop());
console.log(h.pop());
console.log(h.pop());
console.log(h.pop());
