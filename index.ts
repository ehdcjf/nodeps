// https://www.acmicpc.net/problem/7662
// 이중 우선순위 큐
const input: string[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');

/**
 * true 가 우선순위 더 높음
 */
type PriorityFunc = (a: any, b: any) => boolean;

class PriorityQueue {
	private heap: any[] = [];

	constructor(private pairIsInCorrectOrder: PriorityFunc) {}

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

	bubbleUp(startIndex?: number) {
		let currentIndex = startIndex || this.heap.length - 1;

		while (
			this.hasParent(currentIndex) &&
			!this.pairIsInCorrectOrder(this.parent(currentIndex), this.heap[currentIndex])
		) {
			this.swap(currentIndex, this.getParentIndex(currentIndex));
			currentIndex = this.getParentIndex(currentIndex);
		}
	}

	bubbleDown(currentIndex = 0) {
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

	find(item: any) {
		return this.heap.reduce((r, v, i) => {
			if (v == item) r.push(i);
			return r;
		}, []);
	}

	remove(item: any) {
		const willRemove = this.find(item);

		willRemove.forEach((index: number) => {
			if (index == this.heap.length - 1) {
				this.heap.pop();
			} else {
				this.heap[index] = this.heap.pop();
				const parentItem = this.parent(index);

				if (
					this.hasLeftChild(index) &&
					(!parentItem || this.pairIsInCorrectOrder(parentItem, this.heap[index]))
				) {
					this.bubbleDown(index);
				} else {
					this.bubbleUp(index);
				}
			}
		});
	}
}

const priorityMax = (a: any, b: any) => {
	if (a >= b) return true;
	else return false;
};

const priorityMin = (a: any, b: any) => {
	if (a <= b) return true;
	else return false;
};

const answer = [];
const T = +input.shift()!;
for (let t = 0; t < T; t++) {
	const N = +input.shift()!;
	const minPq = new PriorityQueue(priorityMin);
	const maxPq = new PriorityQueue(priorityMax);
	for (let n = 0; n < N; n++) {
		const [c, num] = input.shift()?.split(' ')!;
		if (c == 'I') {
			maxPq.push(+num);
			minPq.push(+num);
		} else {
			if (minPq.isEmpty()) continue;

			if (num == '-1') {
				maxPq.remove(minPq.pop());
			} else {
				minPq.remove(maxPq.pop());
			}
		}
	}
	const max = maxPq.peek();
	const min = minPq.peek();
	if (max == null || min == null) {
		answer.push('EMPTY');
	} else {
		answer.push(max + ' ' + min);
	}
}

console.log(answer.join('\n'));
