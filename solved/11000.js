// https://www.acmicpc.net/problem/11000
// 강의실 배정

class PriorityQueue {
	constructor(callback) {
		this.heap = [];
		this.callback = callback;
	}

	swap(a, b) {
		const temp = { ...this.heap[a] };
		this.heap[a] = this.heap[b];
		this.heap[b] = temp;
	}

	size() {
		return this.heap.length;
	}

	getParentIndex(cur) {
		return Math.floor((cur - 1) / 2);
	}

	push(value) {
		this.heap.push(value);
		let current = this.size() - 1;
		let parent = this.getParentIndex(current);

		while (parent >= 0 && this.callback(value, this.heap[parent])) {
			this.swap(parent, current);
			current = parent;
			parent = this.getParentIndex(current);
		}
	}

	pop() {
		const last = this.size() - 1;
		let current = 0;
		this.swap(current, last);
		const value = this.heap.pop();

		while (current < last) {
			const left = current * 2 + 1;
			const right = current * 2 + 2;

			if (left >= last) {
				break;
			} else if (right >= last) {
				if (this.callback(this.heap[left], this.heap[current])) {
					this.swap(current, left);
					current = left;
				} else {
					break;
				}
			} else {
				if (
					this.callback(this.heap[left], this.heap[current]) ||
					this.callback(this.heap[right], this.heap[current])
				) {
					const next = this.callback(this.heap[left], this.heap[right]) ? left : right;
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

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});
let N;
const pq = new PriorityQueue((a, b) => {
	if (b.s >= a.s) return true;
	else return false;
});

readline.on('line', function (line) {
	const nums = line.split(' ').map(Number);
	if (nums.length != 1) {
		const [s, t] = nums;
		pq.push({ s: s, t: t });
	}
}).on('close', function () {
	const minHeap = new MinHeap();
	while (pq.size() > 0) {
		const { s, t } = pq.pop();
		if (minHeap.size() == 0) {
			minHeap.push(t);
		} else {
			const head = minHeap.heap[0];
			if (s >= head) {
				minHeap.pop();
			}
			minHeap.push(t);
		}
	}
	console.log(minHeap.size());
	process.exit();
});
