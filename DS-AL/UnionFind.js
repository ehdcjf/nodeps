let V, E;

// Collection of all edges;
let edge;

class Edge {
	constructor(src, dest, cost) {
		this.src = 0;
		this.dest = 0;
		this.cost = 0;
	}
}

// Creates a graph with V
// vertices and E edges
function initialize(v, e) {
	V = v;
	E = e;
	edge = Array.from(Array(E), () => Array());
}

function find(parent, i) {
	if (parent[i] == i) {
		return i;
	}
	return find(parent, parent[i]);
}

function union(parent, x, y) {
	parent[x] = y;
}

function isCycle() {
	let parent = Array(V).fill(0);

	for (let i = 0; i < V; i++) {
		parent[i] = i;
	}

	for (let i = 0; i < E; i++) {
		const x = find(parent, edge[i].src);
		const y = find(parent, edge[i].dest);

		if (x == y) {
			return true;
		}

		union(parent, x, y);
	}
	return false;
}
