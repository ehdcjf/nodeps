function isPowerOfTwo(number) {
	if (number < 1) {
		return false;
	}

	let divideNumber = number;

	while (divideNumber != 1) {
		if (divideNumber % 2 !== 0) {
			return false;
		}
		divideNumber /= 2;
	}
	return true;
}

class SegmentTree {
	constructor(inputArray, operation, operationFallback) {
		this.inputArray = inputArray;
		this.operation = operation;
		this.operationFallback = operationFallback;
		this.segmentTree = this.initSegmentTree(this.inputArray);
		this.buildSegmentTree();
	}

	initSegmentTree(inputArray) {
		let segmentTreeArrayLength;
		const inputArrayLength = inputArray.length;

		if (isPowerOfTwo(inputArrayLength)) {
			segmentTreeArrayLength = 2 * inputArrayLength - 1;
		} else {
			const currentPower = Math.floor(Math.log2(inputArrayLength));
			const nextPower = currentPower + 1;
			const nextPowerOfTwo = 2 ** nextPower;
			segmentTreeArrayLength = 2 * nextPowerOfTwo - 1;
		}

		return new Array(segmentTreeArrayLength).fill(null);
	}

	buildSegmentTree() {
		const leftIndex = 0;
		const rightIndex = this.inputArray.length - 1;
		const position = 0;
		this.buildTreeRecursively(leftIndex, rightIndex, position);
	}

	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}

	buildTreeRecursively(leftInputIndex, rightInputIndex, position) {
		if (leftInputIndex == rightInputIndex) {
			this.segmentTree[position] = this.inputArray[leftInputIndex];
			return;
		}

		const middleIndex = Math.floor((leftInputIndex + rightInputIndex) / 2);

		this.buildTreeRecursively(leftInputIndex, middleIndex, this.getLeftChildIndex(position));
		this.buildTreeRecursively(middleIndex + 1, rightInputIndex, this.getRightChildIndex(position));
	}
}



   // limit for array size 
   let N = 1000001;  
        
   let n; // array size 
       
   // Max size of tree 
   let tree = new Array(2 * N); 
   tree.fill(0); 
       
   // function to build the tree 
   function build(arr)  
   {  
	   
       // insert leaf nodes in tree 
       for (let i = 0; i < n; i++)  
	   tree[n + i] = arr[i]; 
	   
       // build the tree by calculating 
       // parents 
       for (let i = n - 1; i > 0; --i)  
	   tree[i] = tree[i << 1] + 
		      tree[i << 1 | 1];  
   } 
       
   // function to update a tree node 
   function updateTreeNode(p, value)  
   {  
       // set value at position p 
       tree[p + n] = value; 
       p = p + n; 
	   
       // move upward and update parents 
       for (let i = p; i > 1; i >>= 1) 
	   tree[i >> 1] = tree[i] + tree[i^1]; 
   } 
       
   // function to get sum on 
   // interval [l, r) 
   function query(l, r)  
   {  
       let res = 0; 
	   
       // loop to find the sum in the range 
       for (l += n, r += n; l < r; 
			    l >>= 1, r >>= 1) 
       { 
	   if ((l & 1) > 0)  
	       res += tree[l++]; 
	   
	   if ((r & 1) > 0)  
	       res += tree[--r]; 
       } 
	   
       return res; 
   } 
     
   let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; 
       
   // n is global 
   n = a.length; 
 
   // build tree  
   build(a); 
 
   // print the sum in range(1,2) 
   // index-based 
   document.write(query(1, 3) + "</br>"); 
 
   // modify element at 2nd index 
   updateTreeNode(2, 1); 
 
   // print the sum in range(1,2) 
   // index-based 
   document.write(query(1, 3));  
     