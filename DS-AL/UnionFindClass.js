class Edge {
	constructor() {
		this.src = 0;
		this.dest = 0;
	}
}

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
			this.subsets[i].parent = this.find(this.subsets[i].parent);
			return this.subsets[i].parent;
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
