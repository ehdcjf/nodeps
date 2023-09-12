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

	// The main function to check whether
	// a given graph contains cycle or not
	// function isCycle()
	// {

	//         let subsets = new Array(V);
	//         for (let v = 0; v < V; v++) {

	//             subsets[v] = new subset();
	//             subsets[v].parent = v;
	//             subsets[v].rank = 0;
	//         }

	//         for (let e = 0; e < E; e++) {
	//             let x = find(subsets, edge[e].src);
	//             let y = find(subsets, edge[e].dest);
	//             if (x == y)
	//                 return 1;
	//             Union(subsets, x, y);
	//         }
	//         return 0;
	// }
}
