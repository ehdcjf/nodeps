// https://www.acmicpc.net/problem/7662
// 이중 우선순위 큐

/**
 * true 가 우선순위 더 높음
 */
class MinHeap {
	heap: any[] = [];
	constructor() {}

	getLeftChildIndex(parentIndex: number) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex: number) {
		return 2 * parentIndex + 2;
	}

	getParentIndex(childIndex: number) {
		return Math.floor((childIndex - 1) / 2);
	}

	hasParent(childIndex: number) {
		return this.getParentIndex(childIndex) >= 0;
	}

	hasLeftChild(parentIndex: number) {
		return this.getLeftChildIndex(parentIndex) < this.heap.length;
	}

	hasRightChild(parentIndex: number) {
		return this.getRightChildIndex(parentIndex) < this.heap.length;
	}

	leftChild(parentIndex: number) {
		return this.heap[this.getLeftChildIndex(parentIndex)];
	}

	rightChild(parentIndex: number) {
		return this.heap[this.getRightChildIndex(parentIndex)];
	}

	parent(childIndex: number) {
		return this.heap[this.getParentIndex(childIndex)];
	}

	swap(indexA: number, indexB: number) {
		const tmp = this.heap[indexA];
		this.heap[indexA] = this.heap[indexB];
		this.heap[indexB] = tmp;
	}

	peek() {
		return this.heap.length == 0 ? null : this.heap[0];
	}

	isEmpty() {
		return !this.heap.length;
	}

	pop() {
		if (this.heap.length == 0) {
			return null;
		}

		if (this.heap.length == 1) {
			return this.heap.pop();
		}

		const item = this.heap[0];

		this.heap[0] = this.heap.pop();
		this.bubbleDown();
		return item;
	}

	push(item: any) {
		this.heap.push(item);
		this.bubbleUp();
		return this;
	}

	bubbleUp() {
		let currentIndex = this.heap.length - 1;

		while (
			this.hasParent(currentIndex) &&
			!this.pairIsInCorrectOrder(this.parent(currentIndex), this.heap[currentIndex])
		) {
			this.swap(currentIndex, this.getParentIndex(currentIndex));
			currentIndex = this.getParentIndex(currentIndex);
		}
	}

	bubbleDown() {
		let currentIndex = 0;
		let nextIndex = null;

		while (this.hasLeftChild(currentIndex)) {
			if (
				this.hasRightChild(currentIndex) &&
				this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
			) {
				nextIndex = this.getRightChildIndex(currentIndex);
			} else {
				nextIndex = this.getLeftChildIndex(currentIndex);
			}
			if (this.pairIsInCorrectOrder(this.heap[currentIndex], this.heap[nextIndex])) {
				break;
			}
			this.swap(currentIndex, nextIndex);
			currentIndex = nextIndex;
		}
	}

	pairIsInCorrectOrder(elementA: number, elementB: number) {
		return elementA < elementB;
	}
}

class MaxHeap extends MinHeap {
	constructor() {
		super();
	}

	push(item: any) {
		super.push(-1 * item);
		return this;
	}

	pop() {
		return -1 * super.pop();
	}
	peek() {
		return -1 * super.peek();
	}
}

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

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const answer: string[] = [];
const q = new Queue();

readline.on('line', (line: any) => {
	q.push(line);
}).on('close', () => {
	const T = +q.pop();
	for (let t = 0; t < T; t++) {
		const N = +q.pop()!;
		const minPq = new MinHeap();
		const maxPq = new MaxHeap();
		const validNums = new Map();

		for (let n = 0; n < N; n++) {
			let [c, num]: [string, any] = q.pop()?.split(' ')! as [string, any];
			num = Number(num);
			if (c == 'I') {
				maxPq.push(num);
				minPq.push(num);
				if (validNums.has(num)) validNums.set(num, validNums.get(num) + 1);
				else validNums.set(num, 1);
			} else {
				if (num == 1) {
					while (!maxPq.isEmpty() && !validNums.has(maxPq.peek())) maxPq.pop();
					if (maxPq.isEmpty()) continue;
					const max = maxPq.pop();
					const cnt = validNums.get(max);
					if (cnt == 1) validNums.delete(max);
					else validNums.set(max, cnt - 1);
				} else {
					while (!minPq.isEmpty() && !validNums.has(minPq.peek())) minPq.pop();
					if (minPq.isEmpty()) continue;
					const min = minPq.pop();
					const cnt = validNums.get(min);
					if (cnt == 1) validNums.delete(min);
					else validNums.set(min, cnt - 1);
				}
			}
		}
		while (!maxPq.isEmpty() && !validNums.has(maxPq.peek())) maxPq.pop();
		while (!minPq.isEmpty() && !validNums.has(minPq.peek())) minPq.pop();

		const max = maxPq.peek();
		const min = minPq.peek();
		if (max == null || min == null) answer.push('EMPTY');
		console.log(answer);
	}
	process.exit();
});



