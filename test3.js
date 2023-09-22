//Nice Cube Price
class Node {
	constructor(item) {
		this.item = item;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(item) {
		const node = new Node(item);
		if (this.head == null) {
			this.head = node;
		} else {
			this.tail.next = node;
		}

		this.tail = node;
		this.length += 1;
	}

	pop() {
		const popItem = this.head;
		this.head = this.head.next;
		this.length -= 1;
		return popItem.item;
	}
}

let H;
let W;
let K;
let A;
let board = [];
let x = 0;
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

// 가능한 큐브 전개도
const cubePattern = [
	////////////////////////0
	[
		[0, 1, 0, 0],
		[1, 1, 1, 1],
		[0, 1, 0, 0],
	],
	///////////////////////////1
	[
		[1, 0, 0, 0],
		[1, 1, 1, 1],
		[1, 0, 0, 0],
	],
	/////////////////////////// 2 3
	[
		[0, 1, 0, 0],
		[1, 1, 1, 1],
		[1, 0, 0, 0],
	],
	[
		[1, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 1, 0, 0],
	],
	///////////////////////////4 5
	[
		[0, 0, 1, 0],
		[1, 1, 1, 1],
		[1, 0, 0, 0],
	],
	[
		[1, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 1, 0],
	],
	/////////////////////////// 6 7
	[
		[0, 0, 0, 1],
		[1, 1, 1, 1],
		[1, 0, 0, 0],
	],
	[
		[1, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 1],
	],

	/////////////////////////// 8 9
	[
		[0, 0, 1, 0],
		[1, 1, 1, 1],
		[0, 1, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 1, 0],
	],
	///////////////////////////10 11
	[
		[0, 0, 1, 1],
		[0, 1, 1, 0],
		[1, 1, 0, 0],
	],
	[
		[1, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 1],
	],
	/////////////////////////// 12 13
	[
		[0, 0, 1, 1],
		[1, 1, 1, 0],
		[1, 0, 0, 0],
	],
	[
		[1, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 0, 1, 1],
	],
	/////////////////////////// 14 15
	[
		[0, 1, 0, 0],
		[0, 1, 1, 1],
		[1, 1, 0, 0],
	],
	[
		[1, 1, 0, 0],
		[0, 1, 1, 1],
		[0, 1, 0, 0],
	],
	/////////////////////////// 16 17
	[
		[0, 1, 0, 0],
		[1, 1, 1, 0],
		[0, 0, 1, 1],
	],
	[
		[0, 0, 1, 1],
		[1, 1, 1, 0],
		[0, 1, 0, 0],
	],
	/////////////////////////// 18 19
	[
		[0, 0, 1, 1, 1],
		[1, 1, 1, 0, 0],
	],

	[
		[1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1],
	],
].map((v) => rotate(v));

// 전개도는 4칸씩 움직임
const dx4 = [-4, 4, 0, 0];
const dy4 = [0, 0, -4, 4];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 모든 큐브의 전개도는 아래 꼴로 만들어 줄꺼임
//
//   ㅁ
//ㅁ ㅁ ㅁ ㅁ
//   ㅁ
//

const transformStandardNet = [
	//0
	(cube) => [
		['', cube[0][1], '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', cube[2][1], '', ''],
	],
	//1
	(cube) => [
		['', rotateParts90(cube[0][0]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', rotateParts270(cube[2][0]), '', ''],
	],
	//2
	(cube) => [
		['', cube[0][1], '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', rotateParts270(cube[2][0]), '', ''],
	],
	//3
	(cube) => [
		['', rotateParts90(cube[0][0]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', cube[2][1], '', ''],
	],
	//4
	(cube) => [
		['', rotateParts270(cube[0][2]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', rotateParts270(cube[2][0]), '', ''],
	],
	//5
	(cube) => [
		['', rotateParts90(cube[0][0]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', rotateParts90(cube[2][2]), '', ''],
	],
	//6
	(cube) => [
		['', rotateParts180(cube[0][3]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', rotateParts270(cube[2][0]), '', ''],
	],
	//7
	(cube) => [
		['', rotateParts90(cube[0][0]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', rotateParts180(cube[2][3]), '', ''],
	],
	//8
	(cube) => [
		['', rotateParts270(cube[0][2]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', cube[2][1], '', ''],
	],
	//9
	(cube) => [
		['', cube[0][1], '', ''],
		[cube[1][0], cube[1][1], cube[1][2], cube[1][3]],
		['', rotateParts90(cube[2][2]), '', ''],
	],
	//10
	(cube) => [
		['', rotateParts270(cube[0][2]), '', ''],
		[rotateParts90(cube[2][0]), cube[1][1], cube[1][2], rotateParts90(cube[0][3])],
		['', cube[2][1], '', ''],
	],
	//11
	(cube) => [
		['', cube[0][1], '', ''],
		[rotateParts270(cube[0][0]), cube[1][1], cube[1][2], rotateParts270(cube[2][3])],
		['', rotateParts90(cube[2][2]), '', ''],
	],
	//12
	(cube) => [
		['', rotateParts270(cube[0][2]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], rotateParts90(cube[0][3])],
		['', rotateParts270(cube[2][0]), '', ''],
	],
	//13
	(cube) => [
		['', rotateParts90(cube[0][0]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], rotateParts270(cube[2][3])],
		['', rotateParts90(cube[2][2]), '', ''],
	],

	//14
	(cube) => [
		['', cube[0][1], '', ''],
		[rotateParts90(cube[2][0]), cube[1][1], cube[1][2], cube[1][3]],
		['', cube[2][1], '', ''],
	],
	//15
	(cube) => [
		['', cube[0][1], '', ''],
		[rotateParts270(cube[0][0]), cube[1][1], cube[1][2], cube[1][3]],
		['', cube[2][1], '', ''],
	],

	//16
	(cube) => [
		['', cube[0][1], '', ''],
		[cube[1][0], cube[1][1], cube[1][2], rotateParts270(cube[2][3])],
		['', rotateParts90(cube[2][2]), '', ''],
	],

	//17
	(cube) => [
		['', rotateParts270(cube[0][2]), '', ''],
		[cube[1][0], cube[1][1], cube[1][2], rotateParts270(cube[0][3])],
		['', cube[2][1], '', ''],
	],

	//18
	(cube) => [
		['', rotateParts180(cube[1][0]), '', ''],
		[rotateParts90(cube[1][1]), cube[0][2], cube[0][3], cube[0][4]],
		['', cube[1][2], '', ''],
	],
	//19
	(cube) => [
		['', cube[0][2], '', ''],
		[rotateParts270(cube[0][1]), cube[1][2], cube[1][3], cube[1][4]],
		['', rotateParts180(cube[0][0]), '', ''],
	],
];

const standardNets = [];

readline.on('line', (line) => {
	switch (x) {
		case 0:
			[H, W] = line.split(' ').map(Number);
			x++;
			break;
		case 1:
			K = +line;
			x++;
			break;
		case 2:
			A = line.trim().split(' ');
			x++;
			break;
		default:
			board.push(line.trim().split(''));
	}
}).on('close', () => {
	// 위, 아래, 왼쪽, 오른쪽
	console.time('net');
	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (isPartOfCube(i, j)) {
				const originNet = getOriginNet(i, j);
				console.log(originNet);
				const standardNet = changeNet(originNet);
				standardNets.push(standardNet);
			}
		}
	}

	const valueOfCubeList = standardNets.map((net) => {
		console.log(net);
		const cube = net
			.flat()
			.filter((v) => v != '')
			.map((str) => [
				[+str[0], +str[1], +str[2]],
				[+str[3], +str[4], +str[5]],
				[+str[6], +str[7], +str[8]],
			]);
		const rotatedDice = getrotatedCube(cube);
	});

	console.timeEnd('net');
	console.log(standardNets.length);

	process.exit();
});

/**
 *  큐브의 전개도를 돌리는 함수
 * @param {*}
 * @returns
 */
function rotate(arr1) {
	const r = arr1.length;
	const c = arr1[0].length;

	const arr2 = Array.from(Array(c), () => Array(r));
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			arr2[j][r - i - 1] = arr1[i][j];
		}
	}

	const arr3 = Array.from(Array(r), () => Array(c));
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			arr3[r - i - 1][c - j - 1] = arr1[i][j];
		}
	}
	const arr4 = Array.from(Array(c), () => Array(r));
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			arr4[c - j - 1][i] = arr1[i][j];
		}
	}
	return [arr1, arr2, arr3, arr4];
}

/**
 *
 * 큐브인지 확인하는 함수
 *
 * @param {*} i
 * @param {*} j
 * @returns
 */
function isPartOfCube(i, j) {
	return (
		i >= 0 &&
		j >= 0 &&
		i + 4 < H &&
		j + 4 < W &&
		board[i][j] == '+' &&
		board[i][j + 1] == '-' &&
		board[i + 1][j] == '|' &&
		board[i][j + 4] == '+' &&
		board[i][j + 3] == '-' &&
		board[i + 1][j + 4] == '|' &&
		board[i + 4][j] == '+' &&
		board[i + 4][j + 1] == '-' &&
		board[i + 3][j] == '|' &&
		board[i + 4][j + 4] == '+' &&
		board[i + 4][j + 3] == '-' &&
		board[i + 3][j + 4] == '|' &&
		board[i + 1][j + 1] != 'o'
	);
}

function getOriginNet(i, j) {
	let net = Array.from(Array(9), () => Array(9).fill(''));
	net[4][4] = getParts(i, j);
	board[i + 1][j + 1] = 'o';
	const q = new Queue();
	q.push([i, j, 4, 4]);

	while (q.length > 0) {
		const [boardX, boardY, cubeX, cubeY] = q.pop();
		for (let k = 0; k < 4; k++) {
			const nbx = boardX + dx4[k];
			const nby = boardY + dy4[k];
			const ndx = cubeX + dx[k];
			const ndy = cubeY + dy[k];

			if (isPartOfCube(nbx, nby)) {
				net[ndx][ndy] = getParts(nbx, nby);
				board[nbx + 1][nby + 1] = 'o';
				q.push([nbx, nby, ndx, ndy]);
			}
		}
	}
	while (net.length > 0) {
		let zero = true;
		for (let k = 0; k < net[0].length; k++) {
			if (net[0][k] != '') {
				zero = false;
				break;
			}
		}
		if (zero) {
			net.shift();
		} else {
			break;
		}
	}

	while (net.length > 0) {
		let zero = true;
		for (let k = 0; k < net[0].length; k++) {
			if (net[net.length - 1][k] != '') {
				zero = false;
				break;
			}
		}
		if (zero) {
			net.pop();
		} else {
			break;
		}
	}

	while (true) {
		let zero = true;
		for (let i = 0; i < net.length; i++) {
			if (net[i][0] != '') {
				zero = false;
				break;
			}
		}
		if (zero) {
			for (let i = 0; i < net.length; i++) {
				net[i].shift();
			}
		} else {
			break;
		}
	}

	while (true) {
		let zero = true;
		for (let i = 0; i < net.length; i++) {
			if (net[i][net[i].length - 1] != '') {
				zero = false;
				break;
			}
		}
		if (zero) {
			for (let i = 0; i < net.length; i++) {
				net[i].pop();
			}
		} else {
			break;
		}
	}

	return net;
}

function getParts(i, j) {
	return `${board[i + 1][j + 1]}${board[i + 1][j + 2]}${board[i + 1][j + 3]}${board[i + 2][j + 1]}${
		board[i + 2][j + 2]
	}${board[i + 2][j + 3]}${board[i + 3][j + 1]}${board[i + 3][j + 2]}${board[i + 3][j + 3]}`;
}

function rotateParts90(str) {
	return str[6] + str[3] + str[0] + str[7] + str[4] + str[1] + str[8] + str[5] + str[2];
}
function rotateParts180(str) {
	return str[8] + str[7] + str[6] + str[5] + str[4] + str[3] + str[2] + str[1] + str[0];
}
function rotateParts270(str) {
	return str[2] + str[5] + str[8] + str[1] + str[4] + str[7] + str[0] + str[3] + str[6];
}

function changeNet(net) {
	for (let i = 0; i < cubePattern.length; i++) {
		for (let j = 0; j < 4; j++) {
			const pattern = cubePattern[i][j];
			const patternRow = pattern.length;
			const patternColumn = pattern[0].length;

			const netRow = net.length;
			const netColumn = net[0].length;

			if (patternRow != netRow || patternColumn != netColumn) continue;

			if (checkNetPattern(pattern, net)) {
				const result = transformStandardNet[i](rotateNet(net, j));
				return result;
			}
		}
	}
	console.log(net);
	process.exit();
}

function checkNetPattern(pattern, net) {
	const r = pattern.length;
	const c = pattern[0].length;
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			if ((pattern[i][j] == 1 && net[i][j] == '') || (pattern[i][j] == 0 && net[i][j] != ''))
				return false;
		}
	}
	return true;
}

function rotateNet(net, cnt) {
	while (cnt < 4) {
		const r = net.length;
		const c = net[0].length;
		let rotated = Array.from(Array(c), () => Array(r).fill(''));
		for (let i = 0; i < r; i++) {
			for (let j = 0; j < c; j++) {
				if (net[i][j] != '') {
					const rotateParts = rotateParts90(net[i][j]);
					rotated[j][r - i - 1] = rotateParts;
				}
			}
		}
		net = rotated;
		cnt++;
	}
	return net;
}

function rotateZero(cube) {
	const newCube = cube.map((parts) => parts.map((row) => [...row]));
	newCube[1][0][0] = cube[4][0][0];
	newCube[1][0][1] = cube[4][0][1];
	newCube[1][0][2] = cube[4][0][2];

	newCube[2][0][0] = cube[1][0][0];
	newCube[2][0][1] = cube[1][0][1];
	newCube[2][0][2] = cube[1][0][2];

	newCube[3][0][0] = cube[2][0][0];
	newCube[3][0][1] = cube[2][0][1];
	newCube[3][0][2] = cube[2][0][2];

	newCube[4][0][0] = cube[3][0][0];
	newCube[4][0][1] = cube[3][0][1];
	newCube[4][0][2] = cube[3][0][2];
	return newCube;
}

function rotateFive(cube) {
	const newCube = cube.map((parts) => parts.map((row) => [...row]));

	newCube[1][2][0] = cube[4][2][0];
	newCube[1][2][1] = cube[4][2][1];
	newCube[1][2][2] = cube[4][2][2];

	newCube[2][2][0] = cube[1][2][0];
	newCube[2][2][1] = cube[1][2][1];
	newCube[2][2][2] = cube[1][2][2];

	newCube[3][2][0] = cube[2][2][0];
	newCube[3][2][1] = cube[2][2][1];
	newCube[3][2][2] = cube[2][2][2];

	newCube[4][2][0] = cube[3][2][0];
	newCube[4][2][1] = cube[3][2][1];
	newCube[4][2][2] = cube[3][2][2];

	return newCube;
}

function rotateOne(cube) {
	const newCube = cube.map((parts) => parts.map((row) => [...row]));

	newCube[2][0][0] = cube[0][0][0];
	newCube[2][1][0] = cube[0][1][0];
	newCube[2][2][0] = cube[0][2][0];

	newCube[5][0][0] = cube[2][0][0];
	newCube[5][1][0] = cube[2][1][0];
	newCube[5][2][0] = cube[2][2][0];

	newCube[4][2][2] = cube[5][0][0];
	newCube[4][1][2] = cube[5][1][0];
	newCube[4][0][2] = cube[5][2][0];

	newCube[0][0][0] = cube[4][2][2];
	newCube[0][1][0] = cube[4][1][2];
	newCube[0][2][0] = cube[4][0][2];

	return newCube;
}

function rotateTwo(cube) {
	const newCube = cube.map((parts) => parts.map((row) => [...row]));

	newCube[0][2][0] = cube[1][2][2];
	newCube[0][2][1] = cube[1][1][2];
	newCube[0][2][2] = cube[1][0][2];

	newCube[3][0][0] = cube[0][2][0];
	newCube[3][1][0] = cube[0][2][1];
	newCube[3][2][0] = cube[0][2][2];

	newCube[5][0][2] = cube[3][0][0];
	newCube[5][0][1] = cube[3][1][0];
	newCube[5][0][0] = cube[3][2][0];

	newCube[1][2][2] = cube[5][0][2];
	newCube[1][1][2] = cube[5][0][1];
	newCube[1][0][2] = cube[5][0][0];

	return newCube;
}

function rotateThree(cube) {
	const newCube = cube.map((parts) => parts.map((row) => [...row]));
	newCube[0][2][2] = cube[2][2][2];
	newCube[0][1][2] = cube[2][1][2];
	newCube[0][0][2] = cube[2][0][2];

	newCube[4][0][0] = cube[0][2][2];
	newCube[4][1][0] = cube[0][1][2];
	newCube[4][2][0] = cube[0][0][2];

	newCube[5][2][2] = cube[4][0][0];
	newCube[5][1][2] = cube[4][1][0];
	newCube[5][0][2] = cube[4][2][0];

	newCube[2][2][2] = cube[5][2][2];
	newCube[2][1][2] = cube[5][1][2];
	newCube[2][0][2] = cube[5][0][2];

	return newCube;
}

function rotateFour(cube) {
	const newCube = cube.map((parts) => parts.map((row) => [...row]));

	newCube[1][0][0] = cube[0][0][2];
	newCube[1][1][0] = cube[0][0][1];
	newCube[1][2][0] = cube[0][0][0];

	newCube[5][2][0] = cube[1][0][0];
	newCube[5][2][1] = cube[1][1][0];
	newCube[5][2][2] = cube[1][2][0];

	newCube[3][2][2] = cube[5][2][0];
	newCube[3][1][2] = cube[5][2][1];
	newCube[3][0][2] = cube[5][2][2];

	newCube[0][0][2] = cube[3][2][2];
	newCube[0][0][1] = cube[3][1][2];
	newCube[0][0][0] = cube[3][0][2];
	return newCube;
}

function getrotatedCube(cube) {
	const rotate01 = rotateZero(cube);
	const rotate02 = rotateZero(rotate01);
	const rotate03 = rotateZero(rotate02);

	const rotate11 = rotateOne(cube);
	const rotate12 = rotateOne(rotate11);
	const rotate13 = rotateOne(rotate12);

	const rotate21 = rotateTwo(cube);
	const rotate22 = rotateTwo(rotate21);
	const rotate23 = rotateTwo(rotate22);

	const rotate31 = rotateThree(cube);
	const rotate32 = rotateThree(rotate31);
	const rotate33 = rotateThree(rotate32);

	const rotate41 = rotateFour(cube);
	const rotate42 = rotateFour(rotate41);
	const rotate43 = rotateFour(rotate42);

	const rotate51 = rotateFive(cube);
	const rotate52 = rotateFive(rotate51);
	const rotate53 = rotateFive(rotate52);

	return [
		cube,
		rotate01,
		rotate02,
		rotate03,
		rotate11,
		rotate12,
		rotate13,
		rotate21,
		rotate22,
		rotate23,
		rotate31,
		rotate32,
		rotate33,
		rotate41,
		rotate42,
		rotate43,
		rotate51,
		rotate52,
		rotate53,
	];
}
