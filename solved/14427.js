//https://www.acmicpc.net/problem/14427
// 수열과 쿼리 15
// 최솟값의 인덱스
class Node {
	constructor(value = Infinity, index = Infinity) {
		this.value = value;
		this.index = index;
	}
}

class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// build
		const inputArrayLength = inputArray.length;
		this.n = 2 ** Math.ceil(Math.log2(inputArrayLength));
		this.tree = Array.from(new Array(2 * this.n), (v, k) => new Node());

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = new Node(inputArray[i], this.n + i);
		}

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
		}
	}

	merge(nodeA, nodeB) {
		if (nodeA.value > nodeB.value) return nodeB;
		else if (nodeA.value < nodeB.value) return nodeA;
		else return new Node(nodeA.value, Math.min(nodeA.index, nodeB.index));
	}

	update(target, value) {
		target += this.n;
		this.tree[target] = new Node(value, target);
		while (target > 1) {
			this.tree[target >> 1] = this.merge(this.tree[target], this.tree[target ^ 1]);
			target >>= 1;
		}
	}

	//   l <= x < r  구간에 대한 쿼리
	query() {
		return this.tree[1].index - this.n + 1;
	}
}

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
input.shift();
const nums = input.shift().split(' ').map(Number);
input.shift();
const segmentTree = new NonRecursiveSegmentTree(nums);
const answer = [];
input.forEach((query) => {
	const [c, a, b] = query.split(' ').map(Number);
	if (c == 1) segmentTree.update(a - 1, b);
	else answer.push(segmentTree.query());
});
console.log(answer.join('\n'));
