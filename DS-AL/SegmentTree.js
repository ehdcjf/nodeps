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
