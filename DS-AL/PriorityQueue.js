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

const callback = (a, b) => {
	if (a.time > b.time) return true;
	else if (a.time < b.time) return false;
	else {
		if (a.end < b.end) return true;
		else if (a.end > b.end) return false;
		else return false;
	}
};

const pq = new PriorityQueue(callback);
for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 4; j++) {
		const rand = Math.random();
		const item = { num: i, num2: rand };
		pq.push(item);
	}
}

while (pq.size()) {
	console.log(pq.pop());
}
4;
3;
2;
4;
1;
3;
4;
5;
