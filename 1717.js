// https://www.acmicpc.net/problem/1717
// 집합의 표현
class SubSet {
	constructor(i) {
		this.parent = i;
		this.rank = 0;
	}
}

class UF {
	constructor(N) {
		this.subsets = Array.from(Array(N), (_, i) => {
			return new SubSet(i);
		});
	}

	find(i) {
		if (this.subsets[i].parent == i) {
			return i;
		} else {
			return this.find(this.subsets[i].parent);
		}
	}

	union(x, y) {
		const xroot = this.find(x);
		const yroot = this.find(y);
		if (this.subsets[xroot].rank < this.subsets[yroot].rank) {
			this.subsets[xroot].parent = yroot;
		} else if (this.subsets[xroot].rank > this.subsets[yroot].rank) {
			this.subsets[yroot].parent = xroot;
		} else {
			this.subsets[xroot].parent = yroot;
			this.subsets[yroot].rank++;
		}
	}
}
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});
const answer = [];
let uf;
readline.on('line', function (line) {
	const nums = line.split(' ').map(Number);
	if (nums.length == 2) {
		const [N, M] = nums;
		uf = new UF(N + 1);
	} else {
		const [c, a, b] = nums;
		switch (c) {
			case 0: // 합집합
				uf.union(a, b);
				break;
			case 1: // 확인
				if (uf.find(a) == uf.find(b)) {
					answer.push('YES');
				} else {
					answer.push('NO');
				}
				break;
		}
	}
}).on('close', function () {
	console.log(answer.join('\n'));
	process.exit();
});
