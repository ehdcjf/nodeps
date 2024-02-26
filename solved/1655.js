//https://www.acmicpc.net/problem/1655
class MinHeap {
	constructor() {
		this.heap = [];
	}

	isEmpty() {
		return this.heap.length == 0;
	}

	swap(a, b) {
		[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
	}

	size() {
		return this.heap.length;
	}

	getMin() {
		return this.heap[0];
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

	isEmpty() {
		return this.heap.length == 0;
	}

	swap(a, b) {
		[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
	}

	getMax() {
		return this.heap[0];
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
		this.minHeap = new MinHeap();
		this.maxHeap = new MaxHeap();
		this.median = null;
		this.cnt = 0;
	}

	push(value) {
		this.cnt++;
		if (this.minHeap.isEmpty() && this.maxHeap.isEmpty()) {
			this.median = value;
		}

		if (value <= this.median) {
			this.maxHeap.push(value);
		} else {
			this.minHeap.push(value);
		}
		this.sort();
	}

	sort() {
		while (Math.abs(this.minHeap.size() - this.maxHeap.size()) > 1) {
			if (this.minHeap.size() > this.maxHeap.size()) {
				this.maxHeap.push(this.minHeap.pop());
			} else {
				this.minHeap.push(this.maxHeap.pop());
			}
		}
		if (this.cnt % 2 == 0) {
			// 외친 수가 짝수개면.
			this.median = this.maxHeap.getMax();
		} else {
			this.median =
				this.minHeap.size() > this.maxHeap.size()
					? this.minHeap.getMin()
					: this.maxHeap.getMax();
		}
	}

	getMedian() {
		return this.median;
	}
}

const medianHeap = new MedianHeap();
const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n').map(Number);
const answer = [];
input.shift();
input.forEach((v) => {
	medianHeap.push(v);
	answer.push(medianHeap.getMedian());
});

console.log(answer.join('\n'));
