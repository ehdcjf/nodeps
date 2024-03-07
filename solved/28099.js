// https://www.acmicpc.net/problem/28099
// 이상한 배열

class Item {
	constructor(value = 0) {
		this.value = value;
	}
}

class SegmentTree {
	constructor(inputArray) {
		const inputArrayLength = inputArray.length;

		this.lg = Math.ceil(Math.log2(inputArrayLength));

		this.sz = 1 << this.lg;

		this.tree = Array.from(new Array(this.sz << 1), () => new Item());

		for (let i = 1; i <= inputArrayLength; i++) {
			this.tree[(i - 1) | this.sz] = new Item(inputArray[i - 1]);
		}

		for (let i = this.sz - 1; i > 0; i--) {
			this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
			//  i << 1 은 왼쪽 자식 노드    i * 2
			// (i << 1) | 1 은 오른쪽 자식 노드 i * 2 + 1
		}
	}

	merge(A, B) {
		return new Item(Math.max(A.value, B.value));
	}

	update(value, item) {
		return new Item(Math.max(item.value, value));
	}

	apply(i, value) {
		this.tree[i] = this.update(value, this.tree[i]);
	}

	pull(i) {
		this.tree[i] = this.merge(this.tree[i << 1], this.tree[(i << 1) | 1]);
	}

	updatePoint(i, value) {
		i = (i - 1) | this.sz;
		this.apply(i, value);
		for (let j = 1; j <= this.lg; j++) this.pull(i >> j);
	}

	queryPoint(i) {
		i = (i - 1) | this.sz;
		return this.tree[i].value;
	}

	queryRange(l, r) {
		let L = new Item();
		let R = new Item();

		l = (l - 1) | this.sz;
		r = (r - 1) | this.sz;

		for (; l <= r; l >>= 1, r >>= 1) {
			if (l & 1) L = this.merge(L, this.tree[l++]);
			if (~r & 1) R = this.merge(this.tree[r--], R);
		}
		return this.merge(L, R).value;
	}
}

let index = 0;
const answer = [];
require('readline')
	.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
	.on('line', (line) => {
		index++;
		if (index == 1 || index % 2 == 0) return;
		const nums = line.split(' ').map(Number);

		const segmentTree = new SegmentTree(nums);
		const se = {}; // 시작 과 끝의 인덱스를 보관
		for (let j = 0; j < nums.length; j++) {
			const num = nums[j];
			if (!se[num]) se[num] = [j, -1];
			else se[num][1] = j;
		}

		if (
			Object.entries(se).some(
				([target, [s, e]]) => e != -1 && Number(target) < segmentTree.queryRange(s + 1, e + 1)
			)
		) {
			answer.push('No');
		} else {
			answer.push('Yes');
		}
	})
	.on('close', () => {
		console.log(answer.join('\n'));
		process.exit();
	});
