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

const input = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.trim());
const [H, W] = input
	.shift()
	.split(' ')
	.map((v) => Number(v));

input.shift();
const K = input
	.shift()
	.split(' ')
	.map((v) => BigInt(v));

let board = input.map((v) => v.split(''));

const standardDice = [];
// 위, 아래, 왼쪽, 오른쪽
const bdx = [-4, 4, 0, 0];
const bdy = [0, 0, -4, 4];

const ddx = [-1, 1, 0, 0];
const ddy = [0, 0, -1, 1];

const mdx = [1, 1, 1, 0, 0, -1, -1, -1];
const mdy = [-1, 0, 1, -1, 1, -1, 0, 1];

const dicePattern = [
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

// process.exit();
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

function isPartOfDice(i, j) {
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

const transformDiceToFirstDicePattern = [
	//0
	(arr, r) => [
		[-1, arr[0][1] + (r % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][1] + (r % 4), -1, -1],
	],
	//1
	(arr, r) => [
		[-1, arr[0][0] + ((r + 1) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][0] + ((r + 3) % 4), -1, -1],
	],
	//2
	(arr, r) => [
		[-1, arr[0][1] + (r % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][0] + ((r + 3) % 4), -1, -1],
	],
	//3
	(arr, r) => [
		[-1, arr[0][0] + ((r + 1) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][0] + (r % 4), -1, -1],
	],
	//4
	(arr, r) => [
		[-1, arr[0][2] + ((r + 3) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][0] + ((r + 3) % 4), -1, -1],
	],
	//5
	(arr, r) => [
		[-1, arr[0][0] + ((r + 1) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][2] + ((r + 1) % 4), -1, -1],
	],
	//6
	(arr, r) => [
		[-1, arr[0][3] + ((r + 2) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][0] + ((r + 3) % 4), -1, -1],
	],
	//7
	(arr, r) => [
		[-1, arr[0][0] + ((r + 1) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][3] + ((r + 2) % 4), -1, -1],
	],
	//8
	(arr, r) => [
		[-1, arr[0][2] + ((r + 3) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][1] + (r % 4), -1, -1],
	],
	//9
	(arr, r) => [
		[-1, arr[0][2] + (r % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][2] + ((r + 1) % 4), -1, -1],
	],
	//10
	(arr, r) => [
		[-1, arr[0][2] + ((r + 3) % 4), -1, -1],
		[arr[2][0] + ((r + 1) % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[0][3] + ((r + 1) % 4)],
		[-1, arr[2][1] + (r % 4), -1, -1],
	],
	//11
	(arr, r) => [
		[-1, arr[0][1] + (r % 4), -1, -1],
		[arr[0][0] + ((r + 3) % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[2][3] + ((r + 3) % 4)],
		[-1, arr[2][2] + ((r + 1) % 4), -1, -1],
	],
	//12
	(arr, r) => [
		[-1, arr[0][2] + ((r + 3) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[0][3] + ((r + 1) % 4)],
		[-1, arr[2][0] + ((r + 3) % 4), -1, -1],
	],
	//13
	(arr, r) => [
		[-1, arr[0][0] + ((r + 1) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[2][3] + ((r + 3) % 4)],
		[-1, arr[2][2] + ((r + 1) % 4), -1, -1],
	],

	//14
	(arr, r) => [
		[-1, arr[0][1] + (r % 4), -1, -1],
		[arr[2][0] + ((r + 1) % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][1] + (r % 4), -1, -1],
	],
	//15
	(arr, r) => [
		[-1, arr[0][1] + (r % 4), -1, -1],
		[arr[0][0] + ((r + 3) % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4)],
		[-1, arr[2][1] + (r % 4), -1, -1],
	],
	//16

	(arr, r) => [
		[-1, arr[0][1] + (r % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[2][3] + ((r + 3) % 4)],
		[-1, arr[2][2] + ((r + 1) % 4), -1, -1],
	],

	//17
	(arr, r) => [
		[-1, arr[0][2] + ((r + 3) % 4), -1, -1],
		[arr[1][0] + (r % 4), arr[1][1] + (r % 4), arr[1][2] + (r % 4), arr[0][3] + ((r + 1) % 4)],
		[-1, arr[2][1] + (r % 4), -1, -1],
	],

	(arr, r) => [
		[-1, arr[1][0] + ((r + 2) % 4), -1, -1],
		[arr[1][1] + ((r + 1) % 4), arr[0][2] + (r % 4), arr[0][3] + (r % 4), arr[0][4] + (r % 4)],
		[-1, arr[1][2] + (r % 4), -1, -1],
	],

	(arr, r) => [
		[-1, arr[0][2] + (r % 4), -1, -1],
		[arr[0][1] + ((r + 3) % 4), arr[1][2] + (r % 4), arr[1][3] + (r % 4), arr[1][4] + (r % 4)],
		[-1, arr[0][0] + ((r + 2) % 4), -1, -1],
	],
];

const partsOfDice = [];

function getPartsIndex(i, j) {
	const plane = [
		[+board[i + 1][j + 1], +board[i + 1][j + 2], +board[i + 1][j + 3]],
		[+board[i + 2][j + 1], +board[i + 2][j + 2], +board[i + 2][j + 3]],
		[+board[i + 3][j + 1], +board[i + 3][j + 2], +board[i + 3][j + 3]],
	];
	partsOfDice.push(...rotate(plane));
	return partsOfDice.length - 4;
}

function checkDicePattern(pattern, dice) {
	const r = pattern.length;
	const c = pattern[0].length;
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			if ((pattern[i][j] == 1 && dice[i][j] == -1) || (pattern[i][j] == 0 && dice[i][j] >= 0))
				return false;
		}
	}
	return true;
}

function beStandardDicePattern(arr, cnt) {
	while (cnt < 4) {
		const r = arr.length;
		const c = arr[0].length;
		let rotated = Array.from(Array(c), () => Array(r).fill(-1));
		for (let i = 0; i < r; i++) {
			for (let j = 0; j < c; j++) {
				rotated[j][r - i - 1] = arr[i][j];
			}
		}
		arr = rotated;
		cnt++;
	}
	return arr;
}

for (let i = 0; i < H; i++) {
	for (let j = 0; j < W; j++) {
		if (isPartOfDice(i, j)) {
			let dice = Array.from(Array(9), () => Array(9).fill(-1));
			dice[4][4] = getPartsIndex(i, j);
			board[i + 1][j + 1] = 'o';

			const q = new Queue();
			q.push([i, j, 4, 4]);
			while (q.length > 0) {
				const [boardX, boardY, diceX, diceY] = q.pop();

				for (let k = 0; k < 4; k++) {
					const nbx = boardX + bdx[k];
					const nby = boardY + bdy[k];
					const ndx = diceX + ddx[k];
					const ndy = diceY + ddy[k];

					if (isPartOfDice(nbx, nby)) {
						dice[ndx][ndy] = getPartsIndex(nbx, nby);
						board[nbx + 1][nby + 1] = 'o';
						q.push([nbx, nby, ndx, ndy]);
					}
				}
			}

			while (dice.length > 0) {
				let zero = true;
				for (let k = 0; k < dice[0].length; k++) {
					if (dice[0][k] >= 0) {
						zero = false;
						break;
					}
				}
				if (zero) {
					dice.shift();
				} else {
					break;
				}
			}
			while (dice.length > 0) {
				let zero = true;
				for (let k = 0; k < dice[0].length; k++) {
					if (dice[dice.length - 1][k] >= 0) {
						zero = false;
						break;
					}
				}
				if (zero) {
					dice.pop();
				} else {
					break;
				}
			}

			while (true) {
				let zero = true;
				for (let i = 0; i < dice.length; i++) {
					if (dice[i][0] >= 0) {
						zero = false;
						break;
					}
				}
				if (zero) {
					for (let i = 0; i < dice.length; i++) {
						dice[i].shift();
					}
				} else {
					break;
				}
			}

			while (true) {
				let zero = true;
				for (let i = 0; i < dice.length; i++) {
					if (dice[i][dice[i].length - 1] >= 0) {
						zero = false;
						break;
					}
				}
				if (zero) {
					for (let i = 0; i < dice.length; i++) {
						dice[i].pop();
					}
				} else {
					break;
				}
			}

			let findPattern = false;
			for (let i = 0; i < dicePattern.length; i++) {
				if (findPattern) break;
				for (let j = 0; j < 4; j++) {
					const pattern = dicePattern[i][j];
					const patternRow = pattern.length;
					const patternColumn = pattern[0].length;

					const diceRow = dice.length;
					const diceCoulum = dice[0].length;
					if (patternRow != diceRow || patternColumn != diceCoulum) continue;

					if (checkDicePattern(pattern, dice)) {
						const result = transformDiceToFirstDicePattern[i](
							beStandardDicePattern(dice),
							4 - j
						);
						standardDice.push(result);
						findPattern = true;
						break;
					}
				}
			}
		}
	}
}

// 이제 18번 돌린거 구하고..
// 거기서 무슨무슨 가치 구하면됨.

const possibleNum = [];

function possibleNumDfs(arr) {
	if (arr.length == 5) {
		possibleNum.push(arr);
		return;
	} else {
		for (let i = 0; i < 5; i++) {
			if (!arr.includes(i)) {
				possibleNumDfs([...arr, i]);
			}
		}
	}
}

possibleNumDfs([]);

function rotate18(arr) {
	const rst = [arr];

	//0 을 회전
	for (let i = 0; i < 3; i++) {
		let newArr = rst[rst.length - 1].map((v) => [...v]);
		const temp = [...newArr[1][0]];
		newArr[1][0][0] = newArr[2][0][0];
		newArr[1][0][1] = newArr[2][0][1];
		newArr[1][0][2] = newArr[2][0][2];
		newArr[2][0][0] = newArr[3][0][0];
		newArr[2][0][1] = newArr[3][0][1];
		newArr[2][0][2] = newArr[3][0][2];
		newArr[3][0][0] = newArr[4][0][0];
		newArr[3][0][1] = newArr[4][0][1];
		newArr[3][0][2] = newArr[4][0][2];
		newArr[4][0][0] = temp[0];
		newArr[4][0][1] = temp[1];
		newArr[4][0][2] = temp[2];
		rst.push(newArr);
	}

	// 5를 회전
	for (let i = 0; i < 3; i++) {
		let newArr = i == 0 ? arr.map((v) => [...v]) : rst[rst.length - 1].map((v) => [...v]);
		const temp = [...newArr[1][2]];
		newArr[1][2][0] = newArr[2][2][0];
		newArr[1][2][1] = newArr[2][2][1];
		newArr[1][2][2] = newArr[2][2][2];
		newArr[2][2][0] = newArr[3][2][0];
		newArr[2][2][1] = newArr[3][2][1];
		newArr[2][2][2] = newArr[3][2][2];
		newArr[3][2][0] = newArr[4][2][0];
		newArr[3][2][1] = newArr[4][2][1];
		newArr[3][2][2] = newArr[4][2][2];
		newArr[4][2][0] = temp[0];
		newArr[4][2][1] = temp[1];
		newArr[4][2][2] = temp[2];
		rst.push(newArr);
	}

	// 2를 회전
	for (let i = 0; i < 3; i++) {
		let newArr = i == 0 ? arr.map((v) => [...v]) : rst[rst.length - 1].map((v) => [...v]);
		const temp = [...newArr[0][2]];
		newArr[0][2][0] = newArr[3][0][0];
		newArr[0][2][1] = newArr[3][1][0];
		newArr[0][2][2] = newArr[3][2][0];

		newArr[3][0][0] = newArr[5][0][2];
		newArr[3][1][0] = newArr[5][0][1];
		newArr[3][2][0] = newArr[5][0][0];

		newArr[5][0][2] = newArr[1][2][2];
		newArr[5][0][1] = newArr[1][1][2];
		newArr[5][0][0] = newArr[1][0][2];

		newArr[1][0][2] = temp[2];
		newArr[1][1][2] = temp[1];
		newArr[1][2][2] = temp[0];

		rst.push(newArr);
	}

	//3 을 회전
	for (let i = 0; i < 3; i++) {
		let newArr = i == 0 ? arr.map((v) => [...v]) : rst[rst.length - 1].map((v) => [...v]);

		const temp = [newArr[0][2][2], newArr[0][1][2], newArr[0][0][2]];

		newArr[0][2][2] = newArr[4][0][0];
		newArr[0][1][2] = newArr[4][1][0];
		newArr[0][0][2] = newArr[4][2][0];

		newArr[4][0][0] = newArr[5][2][2];
		newArr[4][1][0] = newArr[5][1][2];
		newArr[4][2][0] = newArr[5][0][2];

		newArr[5][2][2] = newArr[2][2][2];
		newArr[5][1][2] = newArr[2][1][2];
		newArr[5][0][2] = newArr[2][0][2];

		newArr[2][0][2] = temp[2];
		newArr[2][1][2] = temp[1];
		newArr[2][2][2] = temp[0];
		rst.push(newArr);
	}

	// 1을 회전
	for (let i = 0; i < 3; i++) {
		let newArr = i == 0 ? arr.map((v) => [...v]) : rst[rst.length - 1].map((v) => [...v]);

		const temp = [newArr[4][0][2], newArr[4][1][2], newArr[4][2][2]];

		newArr[4][0][2] = newArr[0][2][0];
		newArr[4][1][2] = newArr[0][1][0];
		newArr[4][2][2] = newArr[0][0][0];

		newArr[0][0][0] = newArr[2][0][0];
		newArr[0][1][0] = newArr[2][1][0];
		newArr[0][2][0] = newArr[2][2][0];

		newArr[2][0][0] = newArr[5][0][0];
		newArr[2][1][0] = newArr[5][1][0];
		newArr[2][2][0] = newArr[5][2][0];

		newArr[5][0][0] = temp[2];
		newArr[5][1][0] = temp[1];
		newArr[5][2][0] = temp[0];

		rst.push(newArr);
	}

	//4를 회전
	for (let i = 0; i < 3; i++) {
		let newArr = i == 0 ? arr.map((v) => [...v]) : rst[rst.length - 1].map((v) => [...v]);

		const temp = [newArr[3][0][2], newArr[3][1][2], newArr[3][2][2]];

		newArr[3][0][2] = newArr[0][0][0];
		newArr[3][1][2] = newArr[0][0][1];
		newArr[3][2][2] = newArr[0][0][2];

		newArr[0][0][0] = newArr[1][2][0];
		newArr[0][0][1] = newArr[1][1][0];
		newArr[0][0][2] = newArr[1][0][0];

		newArr[1][0][0] = newArr[5][2][0];
		newArr[1][1][0] = newArr[5][2][1];
		newArr[1][2][0] = newArr[5][2][2];

		newArr[5][2][0] = temp[2];
		newArr[5][2][1] = temp[1];
		newArr[5][2][2] = temp[0];

		rst.push(newArr);
	}

	return rst;
}

function getPossibleSynergy() {
	const position = [
		[-1, -1],
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 1],
		[2, 2],
	];

	const dx = [0, 0, -1, 1];
	const dy = [-1, 1, 0, 0];
	const answer = [];
	for (let a = 1; a <= 9; a++) {
		for (let b = a + 1; b <= 9; b++) {
			for (let c = b + 1; c <= 9; c++) {
				for (let d = c + 1; d <= 9; d++) {
					for (let e = d + 1; e <= 9; e++) {
						const items = [a, b, c, d, e];
						const check = Array.from(Array(3), () => Array(3).fill(false));
						items.forEach((v) => {
							const [x, y] = position[v];
							check[x][y] = true;
						});

						let possible = false;
						for (let i = 0; i < 3; i++) {
							for (let j = 0; j < 3; j++) {
								if (check[i][j]) {
									let q = [];
									q.push([i, j]);
									check[i][j] = false;
									let cnt = 1;
									while (q.length > 0) {
										const [x, y] = q.shift();

										for (let k = 0; k < 4; k++) {
											const nx = x + dx[k];
											const ny = y + dy[k];
											if (nx < 0 || nx >= 3) continue;
											if (ny < 0 || ny >= 3) continue;
											if (check[nx][ny]) {
												q.push([nx, ny]);
												check[nx][ny] = false;
												cnt++;
											}
										}
									}
									if (cnt == 5) possible = true;
								}
							}
						}

						if (possible) {
							answer.push(items);
						}
					}
				}
			}
		}
	}

	return answer.map((v) => v.map((x) => position[x]));
}

const possibleSynergy = getPossibleSynergy();

function getValueOfNumber(arr) {
	let von = [];
	for (let i = 0; i < 6; i++) {
		const flatDice = arr[i].flat();
		const s = flatDice.reduce((r, v) => {
			r += v * v;
			return r;
		}, 0);
		const l = +flatDice.sort((a, b) => b - a).join('');
		const v = l % (s + 15);
		von.push(v);
	}

	von = von.sort((a, b) => a - b);
	return von[0] + von[1] + von[5];
}

function getValueOfNeighbor(arr) {
	let valueOfNeighbor = 1;
	for (let i = 0; i < 6; i++) {
		const target = arr[i];
		let cnt = 1;
		if (Math.abs(target[0][0] - target[0][1]) <= 3) cnt++;
		if (Math.abs(target[0][1] - target[0][2]) <= 3) cnt++;
		if (Math.abs(target[1][0] - target[1][1]) <= 3) cnt++;
		if (Math.abs(target[1][1] - target[1][2]) <= 3) cnt++;
		if (Math.abs(target[2][0] - target[2][1]) <= 3) cnt++;
		if (Math.abs(target[2][1] - target[2][2]) <= 3) cnt++;
		if (Math.abs(target[0][0] - target[1][0]) <= 3) cnt++;
		if (Math.abs(target[1][0] - target[2][0]) <= 3) cnt++;
		if (Math.abs(target[0][1] - target[1][1]) <= 3) cnt++;
		if (Math.abs(target[1][1] - target[2][1]) <= 3) cnt++;
		if (Math.abs(target[0][2] - target[1][2]) <= 3) cnt++;
		if (Math.abs(target[1][2] - target[2][2]) <= 3) cnt++;

		valueOfNeighbor *= cnt;
	}
	return valueOfNeighbor;
}

function getValueOfSynergy(arr) {
	const vos = [];
	for (let i = 0; i < 6; i++) {
		const target = arr[i];
		const synergy = possibleSynergy
			.map((v) => {
				const list = [];
				v.forEach(([x, y]) => {
					list.push(target[x][y]);
				});

				let s = new Set();

				possibleNum.forEach((v2) => {
					const num = BigInt(
						v2.reduce((r, i) => {
							r += `${list[i]}`;
							return r;
						}, '')
					);

					for (let k = 0; k < K.length; k++) {
						if (K[k] % num == 0n) s.add(Number(num));
					}
				});
				return (
					s.size * s.size +
					[...s].reduce((r, v) => {
						r += v;
						return r;
					}, 0)
				);
			})
			.sort((a, b) => a - b);
		vos.push(synergy[0] + synergy[48] + synergy[24]);
	}

	const vos1 = Number(vos[0] + vos[1] + vos[2]);
	const vos2 = Number(vos[0] + vos[3] + vos[2]);
	const vos3 = Number(vos[0] + vos[1] + vos[4]);
	const vos4 = Number(vos[0] + vos[3] + vos[4]);
	const vos5 = Number(vos[5] + vos[1] + vos[2]);
	const vos6 = Number(vos[5] + vos[3] + vos[2]);
	const vos7 = Number(vos[5] + vos[1] + vos[4]);
	const vos8 = Number(vos[5] + vos[3] + vos[4]);
	return Math.max(vos1, vos2, vos3, vos4, vos5, vos6, vos7, vos8);
}

function getValueOfMine(arr) {
	const vom = [0, 0, 0, 0, 0, 0];
	for (let i = 0; i < 6; i++) {
		const target = arr[i];
		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				let cnt = 0;
				let sum = 0;
				for (let k = 0; k < 8; k++) {
					const nx = x + mdx[k];
					const ny = y + mdy[k];
					if (nx < 0 || nx >= 3) continue;
					if (ny < 0 || ny >= 3) continue;
					cnt++;
					sum += target[nx][ny];
				}
				const result = Math.abs(cnt - (sum % 9));
				if (result <= 4) {
					vom[i]++;
				}
			}
		}
	}

	const vom01 = vom[0] * vom[1];
	const vom02 = vom[0] * vom[2];
	const vom03 = vom[0] * vom[3];
	const vom04 = vom[0] * vom[4];
	const vom51 = vom[5] * vom[1];
	const vom52 = vom[5] * vom[2];
	const vom53 = vom[5] * vom[3];
	const vom54 = vom[5] * vom[4];
	const vom12 = vom[2] * vom[1];
	const vom23 = vom[3] * vom[2];
	const vom34 = vom[4] * vom[3];
	const vom41 = vom[1] * vom[4];

	return vom01 + vom02 + vom03 + vom04 + vom51 + vom52 + vom53 + vom54 + vom12 + vom23 + vom34 + vom41;
}

function getValueOfChess(dice) {
	let valueOfChess = 0;
	for (let i = 0; i < 6; i++) {
		const target = dice[i];

		const cross = Array.from(Array(2 * 3), () => []);

		for (let a = 0; a < 3; a++) {
			for (let b = 0; b < 3; b++) {
				if (target[a][b] % 2 == 0) cross[a + b].push([a, b]);
			}
		}
		let visited = Array.from(Array(2 * 3), () => false);
		let max = 0;

		function chessDfs(n, cnt) {
			if (max >= cnt + Math.ceil((2 * 3 - 1 - n) / 2)) return;

			if (n >= 2 * 3 - 1) {
				max = Math.max(cnt, max);
				return;
			}

			cross[n].forEach(([i, j]) => {
				// console.log(i - j + N);
				if (visited[i - j + 3] == false) {
					visited[i - j + 3] = true;
					chessDfs(n + 2, cnt + 1);
					visited[i - j + 3] = false;
				}
			});
			chessDfs(n + 2, cnt);
		}

		chessDfs(0, 0);
		valueOfChess += max;
		chessDfs(1, 0);
		valueOfChess += max;
	}
	return valueOfChess;
}

function getValueOfCube(a, b, c, d, e) {
	return (a + b + c + d + e) % 20010610;
}

const valueOfCubes = standardDice.map((v) => {
	const planeIndexes = v
		.flat()
		.filter((v) => v != -1)
		.map((v) => partsOfDice[v]);

	const valueOfNumber = getValueOfNumber(planeIndexes);
	console.log('valueOfNumber', valueOfNumber);
	// 이웃의 가치
	const valueOfNeighbor = getValueOfNeighbor(planeIndexes);
	console.log('valueOfNeighbor', valueOfNeighbor);

	// 시너지의 가치
	const valueOfSynergy = getValueOfSynergy(planeIndexes);
	console.log('valueOfSynergy', valueOfSynergy);

	// 지뢰찾기 가치
	const valueOfMine = getValueOfMine(planeIndexes);
	console.log('valueOfMine', valueOfMine);

	// 체스의 가치
	const valueOfChess = getValueOfChess(planeIndexes);
	console.log('valueOfChess', valueOfNumber);
	console.log('==========');
	// 큐브의 가치
	const valueOfCube = getValueOfCube(valueOfChess, valueOfMine, valueOfSynergy, valueOfNeighbor, valueOfNumber);
	return valueOfCube;
	// const rotatedDice = rotate18(planeIndexes);
	// const caseOfRotate = rotatedDice.map((dice) => {
	// 	// 숫자의 가치
	// 	const valueOfNumber = getValueOfNumber(dice);
	// 	// console.log('valueOfNumber', valueOfNumber);
	// 	// 이웃의 가치
	// 	const valueOfNeighbor = getValueOfNeighbor(dice);
	// 	// console.log('valueOfNeighbor', valueOfNeighbor);

	// 	// 시너지의 가치
	// 	const valueOfSynergy = getValueOfSynergy(dice);
	// 	// console.log('valueOfSynergy', valueOfSynergy);

	// 	// 지뢰찾기 가치
	// 	const valueOfMine = getValueOfMine(dice);
	// 	// console.log('valueOfMine', valueOfMine);

	// 	// 체스의 가치
	// 	const valueOfChess = getValueOfChess(dice);
	// 	// console.log('valueOfChess', valueOfNumber);

	// 	// 큐브의 가치
	// 	const valueOfCube = getValueOfCube(
	// 		valueOfChess,
	// 		valueOfMine,
	// 		valueOfSynergy,
	// 		valueOfNeighbor,
	// 		valueOfNumber
	// 	);

	// 	return valueOfCube;
	// });
	// console.log(caseOfRotate);
	// const first = caseOfRotate.shift();
	// const max = Math.max(...caseOfRotate);
	// return [first, max];
});

console.log(valueOfCubes[0] + valueOfCubes[1], 4341321);
console.log(valueOfCubes[0] + valueOfCubes[1] == 4341321);
