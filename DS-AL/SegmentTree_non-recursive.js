// https://www.geeksforgeeks.org/segment-tree-efficient-implementation/?ref=lbp
// 비재귀 구현

class NonRecursiveSegmentTree {
	constructor(inputArray) {
		// 세그먼트 트리를 구현하는 데 사용할 원소들의 개수를 확인한다.
		const inputArrayLength = inputArray.length;

		// 세그먼트 트리의 리프노드 개수를 구하는 과정이다.
		// 주어진 inputArray의 원소의 개수보다 크거나 같은 2의 제곱수 중에서 가장 작은 수를 취하면 된다.

		const segmentTreeArrayLength = 2 ** Math.ceil(Math.log2(inputArrayLength));

		// 이게 세그먼트 트리의 리프노드의 개수가 된다.
		this.n = segmentTreeArrayLength;

		// 트리의 size는 리프노드의 개수*2를 해주면 된다.
		// 포화이진트리를 구성하는거라 2*(리프노드의 개수)-1 개가 필요하지만
		// 인덱스를 1번부터 사용하면 세그먼트 트리 구현이 편리해진다.

		this.tree = new Array(2 * this.n).fill(0);

		// 세그먼트 트리의 리프노드에 주어진 입력을 할당한다.
		for (let i = 0; i < inputArrayLength; i++) {
			this.tree[this.n + i] = inputArray[i];
		}

		// 구성된 리프노드를 바탕으로 위로 올라가면서 트리를 채워준다.
		//  i<<1 은 i*2 와 같다.  => 노드의 왼쪽 자식노드
		//  i<<1 | 1  은  i*2 + 1 과  같다. => 노드의 오른쪽 자식 노드
		// i번 노드의 값 =  i번 노드의 왼쪽 자식 노드 값 + i번 노드의 오른쪽 자식 노드의 값
		for (let i = this.n - 1; i > 0; --i) {
			this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
		}

		// 이렇게 세그먼트 트리 초기설정을 마친다.
		// tree의 루트노드(tree[1]) 에는 전체 구간의 합이 담겨있는 것을 확인할 수 있다.
	}

	update(target, value) {
		// array[target]의 값을 value로 변경
		target += this.n; // 리프노드 위치(array의 tree에서의 인덱스)를 찾는다.
		this.tree[target] = value; // 해당 리프노드의 값을 변경해준다.

		// 트리를 다시 살펴보면..
		// 짝수번 인덱스를 갖는 노드는 해당 노드의 부모 노드의 왼쪽 자식이고,
		// 홀수번 인덱스를 갖는 노드는 해당 노드의 부모 노드의 오른쪽 자식이다.
		//  i xor 1 연산을 하게 되면
		//  i 가 왼쪽 자식이라면(짝수) 오른쪽에 있는 형제노드를
		//  i 가 오른쪽 자식이라면(홀수) 왼쪽에 있는 형제노드를 구할 수있다.
		for (let i = target; i > 1; i >>= 1) {
			this.tree[i >> 1] = this.tree[i] + this.tree[i ^ 1];
		}
		// 이런식으로 루트노드까지 갱신한다.
	}

	query(l, r) {
		// 주어진 입력 array 에서  인덱스가 l보다 크거나 같고, r보다 작은 구간의 합을 구한다.
		let res = 0;

		// 리프노드 위치를 찾아가는 과정
		l += this.n;
		r += this.n;

		// x & 1 연산은  x가 홀수인지 짝수인지 확인할 수 있게 한다.
		// x & 1 이 1 이라면 홀수, 0이라면 짝수다.
		//  l만 살펴본다. r의 거꾸로 생각하면 된다.
		//  만약에 l 왼쪽 자식이라면 => l 이 짝수라면  l의 부모노드가 l을 포함하고 있기 때문에.. l을 굳이 더해주지 않아도 된다.
		//  그냥 바로 부모노드로 이동해도 부모노드가 해당 구간을 포함하고 있기 때문.

		// l이 오른쪽 자식이라면 => l의 부모는  l-1 과 l의 합을 갖고 있을 것이다.
		//우리가 구하고자하는 구간에 l-1은 포함되지 않기 때문에
		// 우선 l에 해당하는 값을 더하고, 이동한다.
		// l++ : 오른쪽으로 넘어간 다음
		// l>>=1  부모노드를 취하면 해당 부모노드는  l+1 과 l+2 의 합을 갖고 있다.  l>>=2이 r보다 작다면 우리가 구하고자 하는 구간에 포함되는 값이다.
		//  그냥 그림으로 보는게 이해가 빠르다.

		// r은 반대로 생각해주면 된다.

		for (; l < r; l >>= 1, r >>= 1) {
			if ((l & 1) > 0) res += this.tree[l++];
			if ((r & 1) > 0) res += this.tree[--r];
		}
		return res;
	}
}

const arr = [1, 2, 3, 4, 5];

const test = new NonRecursiveSegmentTree(arr);
console.log(test.tree[1]);
