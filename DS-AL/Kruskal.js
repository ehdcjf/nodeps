class Edge {
	constructor(src, dest, cost = 0) {
		this.src = src;
		this.dest = dest;
		this.cost = cost;
	}
}

class Kruskal {
	//input: [[src,dest,cost], ...]
	constructor(V, input) {
		this.mstCost = 0;
		this.mstNode = new Set();
		this.parent = Array(V)
			.fill(0)
			.map((_, i) => i);
		this.edges = [];

		input.forEach(([s, d, c]) => {
			this.edges.push(new Edge(s, d, c));
		});

		this.edges = this.edges.sort((a, b) => a.cost - b.cost);
	}

	find(i) {
		if (this.parent[i] == i) {
			return i;
		}
		return this.find(this.parent[i]);
	}

	union(x, y) {
		this.parent[x] = y;
	}

	isCycle() {
		for (let i = 0; i < this.edges.length; i++) {
			const x = this.find(this.edges[i].src);
			const y = this.find(this.edges[i].dest);

			if (x == y) {
				return true;
			}

			this.union(x, y);
		}
		return false;
	}

	getMst() {
		for (let i = 0; i < this.edges.length; i++) {
			const { src, dest, cost } = this.edges[i];

			const x = this.find(src);
			const y = this.find(dest);
			if (x != y) {
				this.union(x, y);
				this.mstCost += cost;
				this.mstNode.add(x);
				this.mstNode.add(y);
			}
		}
	}
}

const input = [
	[1, 2, 1],
	[2, 3, 2],
	[1, 3, 3],
];
const V = 3;
const E = 3;

const x = new Kruskal(V + 1, input);

x.getMst();

console.log(x.mstCost);
console.log(x.mstNode);
