// 우선순위큐
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



/**
 * 우선순위 큐를 위한 콜백함수 정의
 * 작은 값을 시작지점(s),  큰 값을 끝지점(e) 이라고 할 때
 * 1. 끝지점이 작은 값이 우선
 * 2. 끝지점이 같다면 시작값이 작은 값이 우선
 * 사실 끝지점이 같다면 
 * 
 */
const priority = (a, b) => {
    if (a.e < b.e) return true;
    else return false;

};
const pq = new PriorityQueue(priority)
const minh = new MinHeap()


const [[N], ...rawData] = require('fs')
    .readFileSync('./dev/stdin').toString().trim().split('\n').map(v => v.trim().split(' ').map(Number))

const d = rawData.pop()[0]


/**
 * 집인지 사무실인지 중요한 것은 아니기 때문에
 * {s:작은 값, e:큰 값} 으로 정리한다.
 */
rawData.forEach(v => {
    const [h, o] = v
    const [s, e] = h > o ? [o, h] : [h, o]
    pq.push({ s, e })
})

// while (!pq.isEmpty()) {
// 	console.log(pq.pop())
// }




let max = 0;
while (!pq.isEmpty()) {
    const le = pq.peek().e
    const ls = le - d

    while (!minh.isEmpty()) {
        if (minh.peek() >= ls) break;
        minh.pop()
    }

    while (!pq.isEmpty()) {
        if (pq.peek().e > le) break
        const { s } = pq.pop()
        if (s < ls) continue;
        minh.push(s);

    }
    const cnt = minh.heap.length
    max = cnt > max ? cnt : max;
}

console.log(max)




