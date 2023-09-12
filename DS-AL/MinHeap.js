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

const minHeap = new MinHeap();
minHeap.push(0);
minHeap.push(3);
minHeap.push(2);
minHeap.push(1);

while (!minHeap.isEmpty()) {
	console.log(minHeap.pop());
}
