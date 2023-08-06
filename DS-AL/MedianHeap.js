class MinHeap {
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

		while (this.heap[parent] > value) {
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
				if (this.heap[current] > this.heap[left]) {
					this.swap(current, left);
					current = left;
				} else {
					break;
				}
			} else {
				if (this.heap[left] < this.heap[current] || this.heap[right] < this.heap[current]) {
					let next = this.heap[left] < this.heap[right] ? left : right;
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
				if (this.heap[left] > this.heap[current] || this.heap[right] > this.heap[current]) {
					let next = this.heap[left] > this.heap[right] ? left : right;
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

class MedianHeap {
	constructor() {
		this.max = new MaxHeap();
		this.min = new MinHeap();
		this.mid = Infinity;
		this.cnt = 0;
	}

	push(value) {
		let mid = Infinity;
		if (this.min.heap[0] && !this.max.heap[0]) {
			mid = this.min.heap[0];
		} else if (!this.min.heap[0] && this.max.heap[0]) {
			mid = this.max.heap[0];
		} else if (this.min.heap[0] && this.max.heap[0]) {
			mid = (this.max.heap[0] + this.min.heap[0]) / 2;
		}

		if (value >= mid) {
			this.min.push(value);
		} else {
			this.max.push(value);
		}
		this.sort();
	}

	sort() {
		while (Math.abs(this.min.size() - this.max.size()) > 2) {
			const minLength = this.min.size();
			const maxLength = this.max.size();
			if (minLength > maxLength) {
				const item = this.min.pop();
				this.max.push(item);
			} else {
				const item = this.max.pop();
				this.max.push(item);
			}
		}
	}

	get() {
		const min = this.min.heap[0] ?? Infinity;
		const max = this.max.heap[0] ?? Infinity;
		const minLength = this.min.size();
		const maxLength = this.max.size();
		if (minLength == maxLength) {
			return Math.min(min, max);
		} else if (minLength > maxLength) {
			return min;
		} else {
			return max;
		}
	}
}

const test = new MedianHeap();
test.push(1);
console.log(test.get());
test.push(5);
console.log(test.get());
test.push(2);
console.log(test.get());
test.push(10);
console.log(test.get());
test.push(-99);
console.log(test.get());
test.push(7);
console.log(test.get());
test.push(5);
console.log(test.get());
