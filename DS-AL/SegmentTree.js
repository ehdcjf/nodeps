
class Node{
	constructor(left, right, value){
		this.left = left;
		this.right = right;
		this.value = value;
	}

}

class SegmentTree {
	constructor(inputArray) {
		const inputArrayLength = inputArray.length;

		const segmentTreeArrayLength = 2 ** Math.ceil(Math.log2(inputArrayLength));

		this.n = segmentTreeArrayLength;

		this.tree = new Array(2 * this.n).fill(0);

		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = inputArray[i];
		}

		// 구성된 리프노드를 바탕으로 위로 올라가면서 트리를 채워준다.

		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
		}
	}

	build(){

	}
}

// JavaScript program to implement persistent
// segment tree.
class node {
	// Node constructor for l,r,v
	constructor(l, r, v) {
		this.left = l;
		this.right = r;
		this.val = v;
	}
}

// Declaring maximum number
var MAXN = 100;

// Making Node for tree
// Input array
var arr = Array(MAXN);

// Root pointers for all versions
var version = Array(MAXN);

// Constructs Version-0
// Time Complexity : O(nlogn)
function build(n, low, high) {
	if (low == high) {
		n.val = arr[low];
		return;
	}

	var mid = parseInt((low + high) / 2);
	n.left = new node(null, null, 0);
	n.right = new node(null, null, 0);
	build(n.left, low, mid);
	build(n.right, mid + 1, high);
	n.val = n.left.val + n.right.val;
}

/* Upgrades to new Version
 * @param prev : points to node of previous version
 * @param cur  : points to node of current version
 * Time Complexity : O(logn)
 * Space Complexity : O(logn)  */
function upgrade(prev, cur, low, high, idx, value) {
	if (idx > high || idx < low || low > high) return;

	if (low == high) {
		// Modification in new version
		cur.val = value;
		return;
	}

	var mid = parseInt((low + high) / 2);

	if (idx <= mid) {
		// Link to right child of previous version
		cur.right = prev.right;

		// Create new node in current version
		cur.left = new node(null, null, 0);
		upgrade(prev.left, cur.left, low, mid, idx, value);
	} else {
		// Link to left child of previous version
		cur.left = prev.left;

		// Create new node for current version
		cur.right = new node(null, null, 0);
		upgrade(prev.right, cur.right, mid + 1, high, idx, value);
	}

	// Calculating data for current version
	// by combining previous version and current
	// modification
	cur.val = cur.left.val + cur.right.val;
}

function query(n, low, high, l, r) {
	if (l > high || r < low || low > high) return 0;

	if (l <= low && high <= r) return n.val;

	var mid = parseInt((low + high) / 2);
	var p1 = query(n.left, low, mid, l, r);
	var p2 = query(n.right, mid + 1, high, l, r);
	return p1 + p2;
}

// Driver code
var A = [1, 2, 3, 4, 5];
var n = A.length;

for (var i = 0; i < n; i++) arr[i] = A[i];

// Creating Version-0
var root = new node(null, null, 0);
build(root, 0, n - 1);

// Storing root node for version-0
version[0] = root;

// Upgrading to version-1
version[1] = new node(null, null, 0);
upgrade(version[0], version[1], 0, n - 1, 4, 1);

// Upgrading to version-2
version[2] = new node(null, null, 0);
upgrade(version[1], version[2], 0, n - 1, 2, 10);

// For print
document.write('In version 1 , query(0,4) : ');
document.write(query(version[1], 0, n - 1, 0, 4));

document.write('<br>In version 2 , query(3,4) : ');
document.write(query(version[2], 0, n - 1, 3, 4));

document.write('<br>In version 0 , query(0,3) : ');
document.write(query(version[0], 0, n - 1, 0, 3));
