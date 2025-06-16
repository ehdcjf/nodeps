// 13334

class PriorityQueue {
	constructor(priority) {
		this.heap = [];
		this.pairIsInCorrectOrder = priority;
	}

	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}

	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}

	hasParent(childIndex) {
		return this.getParentIndex(childIndex) >= 0;
	}

	hasLeftChild(parentIndex) {
		return this.getLeftChildIndex(parentIndex) < this.heap.length;
	}

	hasRightChild(parentIndex) {
		return this.getRightChildIndex(parentIndex) < this.heap.length;
	}

	leftChild(parentIndex) {
		return this.heap[this.getLeftChildIndex(parentIndex)];
	}

	rightChild(parentIndex) {
		return this.heap[this.getRightChildIndex(parentIndex)];
	}

	parent(childIndex) {
		return this.heap[this.getParentIndex(childIndex)];
	}

	swap(indexA, indexB) {
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

	push(item) {
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
}

class MinHeap {
	constructor() {
		this.heap = [];
	}

	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}

	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}

	hasParent(childIndex) {
		return this.getParentIndex(childIndex) >= 0;
	}

	hasLeftChild(parentIndex) {
		return this.getLeftChildIndex(parentIndex) < this.heap.length;
	}

	hasRightChild(parentIndex) {
		return this.getRightChildIndex(parentIndex) < this.heap.length;
	}

	leftChild(parentIndex) {
		return this.heap[this.getLeftChildIndex(parentIndex)];
	}

	rightChild(parentIndex) {
		return this.heap[this.getRightChildIndex(parentIndex)];
	}

	parent(childIndex) {
		return this.heap[this.getParentIndex(childIndex)];
	}

	swap(indexA, indexB) {
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

	push(item) {
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

	pairIsInCorrectOrder(elementA, elementB) {
		return elementA < elementB;
	}
}



const priority = (a, b) => {
	if (a.e < b.e) return true;
	else if (a.e > b.e) return false;
	else {
		if (a.s < b.s) return true;
		else return false;
	}
};

const [[N], ...rawData] = require('fs')
	.readFileSync('./dev/stdin').toString().split('\n').map(v => v.split(' ').map(Number))

const d = rawData.pop()[0]


const pq = new PriorityQueue(priority)

let end = -Infinity
rawData.forEach(v => {

	const [h, o] = v
	const [s, e] = h > o ? [o, h] : [h, o]
	end = e > end ? e : end
	pq.push({ s, e })
})

let le = pq.peek().e
let ls = le - d


while (!pq.isEmpty()) {

	

	// 철도 이동
	le++
	ls++
}




