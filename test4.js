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

let board = input.map((v) => v.split(''));
// 위, 아래, 왼쪽, 오른쪽
const bdx = [-4, 4, 0, 0];
const bdy = [0, 0, -4, 4];

const ddx = [-1, 1, 0, 0];
const ddy = [0, 0, -1, 1];

const tidyDice = [];
const symbolIndex = new Map();
for (let i = 0; i < 1 << 9; i++) {
	let x = i;
	let shift = 0;
	let symbol = '';
	while (shift < 9) {
		if ((x & (1 << shift)) != 0) {
			symbol += 'x';
		} else {
			symbol += '.';
		}
		shift++;
	}
	symbolIndex.set(symbol, i);
}

const symbols = new Map();
symbolIndex.forEach((value, key) => {
	const arr = [key.slice(0, 3).split(''), key.slice(3, 6).split(''), key.slice(6, 9).split('')];
	const rotated = rotate(arr)
		.map((v) => v.map((x) => x.join('')).join(''))
		.map((s) => symbolIndex.get(s));
	symbols.set(value, rotated);
});

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

const transformDice = [
	(arr) => arr, //0
	(arr) => {
		//1
		arr[0][1] = symbols.get(arr[0][0])[1];
		arr[0][0] = -1;

		arr[2][1] = symbols.get(arr[2][0])[3];
		arr[2][0] = -1;
		return arr;
	},
	(arr) => {
		//2
		arr[2][1] = symbols.get(arr[2][0])[3];
		arr[2][0] = -1;
		return arr;
	},
	(arr) => {
		//3
		arr[0][1] = symbols.get(arr[0][0])[1];
		arr[0][0] = -1;
		return arr;
	},
	(arr) => {
		//4
		arr[0][1] = symbols.get(arr[0][2])[3];
		arr[0][2] = -1;
		arr[2][1] = symbols.get(arr[2][0])[3];
		arr[2][0] = -1;
		return arr;
	},
	(arr) => {
		//5
		arr[0][1] = symbols.get(arr[0][0])[1];
		arr[0][0] = -1;
		arr[2][1] = symbols.get(arr[2][2])[1];
		arr[2][2] = -1;
		return arr;
	},
	(arr) => {
		//6
		arr[0][1] = symbols.get(arr[0][3])[2];
		arr[0][3] = -1;

		arr[2][1] = symbols.get(arr[2][0])[3];
		arr[2][0] = -1;
		return arr;
	},
	(arr) => {
		//7
		arr[0][1] = symbols.get(arr[0][0])[1];
		arr[0][0] = -1;
		arr[2][1] = symbols.get(arr[2][3])[2];
		arr[2][3] = -1;
		return arr;
	},
	(arr) => {
		//8
		arr[0][1] = symbols.get(arr[0][2])[3];
		arr[0][2] = -1;
		return arr;
	},
	(arr) => {
		//9

		arr[2][1] = symbols.get(arr[2][2])[1];
		arr[2][2] = -1;
		return arr;
	},
	(arr) => {
		//10
		arr[1][0] = symbols.get(arr[2][0])[1];
		arr[2][0] = -1;

		arr[0][1] = symbols.get(arr[0][2])[3];
		arr[0][2] = -1;

		arr[1][3] = symbols.get(arr[0][3])[1];
		arr[0][3] = -1;
		return arr;
	},
	(arr) => {
		//11

		arr[1][3] = symbols.get(arr[2][3])[3];
		arr[2][3] = -1;
		return arr;
	},
	(arr) => {
		//12

		arr[0][1] = symbols.get(arr[0][2])[3];
		arr[0][2] = -1;

		arr[1][3] = symbols.get(arr[0][3])[1];
		arr[0][3] = -1;

		arr[2][1] = symbols.get(arr[2][0])[3];
		arr[2][0] = -1;
		return arr;
	},
	(arr) => {
		//13
		arr[0][1] = symbols.get(arr[0][0])[1];
		arr[0][0] = -1;
		arr[2][1] = symbols.get(arr[2][2])[1];
		arr[2][2] = -1;
		arr[1][3] = symbols.get(arr[2][3])[3];
		arr[2][3] = -1;
		return arr;
	},

	(arr) => {
		//14
		arr[1][0] = symbols.get(arr[2][0])[1];
		arr[2][0] = -1;
		return arr;
	},
	(arr) => {
		//15
		arr[1][0] = symbols.get(arr[0][0])[3];
		arr[0][0] = -1;
		return arr;
	},
	(arr) => {
		//16
		arr[1][3] = symbols.get(arr[2][3])[3];
		arr[2][3] = -1;

		arr[2][1] = symbols.get(arr[2][2])[1];
		arr[2][2] = -1;
		return arr;
	},
	(arr) => {
		//17
		arr[1][3] = symbols.get(arr[0][3])[1];
		arr[0][3] = -1;

		arr[0][1] = symbols.get(arr[0][2])[3];
		arr[0][2] = -1;
		return arr;
	},
	(arr) => {
		//18
		const newArr = [
			[-1, symbols.get(arr[1][0])[2], -1, -1],
			[symbols.get(arr[1][1])[1], arr[0][2], arr[0][3], arr[0][4]],
			[-1, arr[1][2], -1, -1],
		];
		return newArr;
	},
	(arr) => {
		//19
		const newArr = [
			[-1, arr[0][2], -1, -1],
			[symbols.get(arr[0][1])[3], arr[1][2], arr[1][3], arr[1][4]],
			[-1, symbols.get(arr[0][0])[2], -1, -1],
		];
		return newArr;
	},
];

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

function getSymbol(i, j) {
	let symbol = '';
	symbol += board[i + 1][j + 1] + board[i + 1][j + 2] + board[i + 1][j + 3];
	symbol += board[i + 2][j + 1] + board[i + 2][j + 2] + board[i + 2][j + 3];
	symbol += board[i + 3][j + 1] + board[i + 3][j + 2] + board[i + 3][j + 3];
	return symbol;
}

function isPlane(i, j) {
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

function checkPattern(pattern, dice) {
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

function beFirstPattern(arr, cnt) {
	while (cnt < 4) {
		const r = arr.length;
		const c = arr[0].length;
		let rotated = Array.from(Array(c), () => Array(r).fill(-1));
		for (let i = 0; i < r; i++) {
			for (let j = 0; j < c; j++) {
				if (arr[i][j] > -1) rotated[j][r - i - 1] = symbols.get(arr[i][j])[1];
			}
		}
		arr = rotated;
		cnt++;
	}
	return arr;
}

function variation1(arr) {
	const arr1 = arr;

	const arr2 = [
		[-1, symbols.get(arr[0][1])[1], -1, -1],
		[arr[1][1], arr[1][2], arr[1][3], arr[1][0]],
		[-1, symbols.get(arr[2][1])[3], -1, -1],
	];

	const arr3 = [
		[-1, symbols.get(arr[0][1])[2], -1, -1],
		[arr[1][2], arr[1][3], arr[1][0], arr[1][1]],
		[-1, symbols.get(arr[2][1])[2], -1, -1],
	];

	const arr4 = [
		[-1, symbols.get(arr[0][1])[3], -1, -1],
		[arr[1][3], arr[1][0], arr[1][1], arr[1][2]],
		[-1, symbols.get(arr[2][1])[1], -1, -1],
	];
	const arr5 = [
		[-1, symbols.get(arr[1][3])[2], -1, -1],
		[symbols.get(arr[1][0])[1], arr[0][1], symbols.get(arr[1][2])[3], symbols.get(arr[2][1])[2]],
		[-1, arr[1][1], -1, -1],
	];

	const arr6 = [
		[-1, arr[1][1], -1, -1],
		[symbols.get(arr[1][0])[3], arr[2][1], symbols.get(arr[1][2])[1], symbols.get(arr[0][1])[2]],
		[-1, symbols.get(arr[1][3])[2], -1, -1],
	];

	return [
		...variation2(arr1),
		...variation2(arr2),
		...variation2(arr3),
		...variation2(arr4),
		...variation2(arr5),
		...variation2(arr6),
	];
}

function variation2(arr) {
	const arr1 = arr;

	const arr2 = [
		[-1, symbols.get(arr[1][2])[3], -1, -1],
		[
			symbols.get(arr[0][1])[3],
			symbols.get(arr[1][1])[3],
			symbols.get(arr[2][1])[3],
			symbols.get(arr[1][3])[1],
		],
		[-1, symbols.get(arr[1][0])[3], -1, -1],
	];

	const arr3 = [
		[-1, symbols.get(arr[2][1])[2], -1, -1],
		[
			symbols.get(arr[1][2])[2],
			symbols.get(arr[1][1])[2],
			symbols.get(arr[1][0])[2],
			symbols.get(arr[1][3])[2],
		],
		[-1, symbols.get(arr[0][1])[2], -1, -1],
	];

	const arr4 = [
		[-1, symbols.get(arr[1][0])[1], -1, -1],
		[
			symbols.get(arr[2][1])[1],
			symbols.get(arr[1][1])[1],
			symbols.get(arr[0][1])[1],
			symbols.get(arr[1][3])[3],
		],
		[-1, symbols.get(arr[1][2])[1], -1, -1],
	];

	return [arr1, arr2, arr3, arr4];
}

const diceInfo = [];
for (let i = 0; i < H; i++) {
	for (let j = 0; j < W; j++) {
		if (isPlane(i, j)) {
			let dice = Array.from(Array(9), () => Array(9).fill(-1));
			dice[4][4] = symbolIndex.get(getSymbol(i, j));
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

					if (isPlane(nbx, nby)) {
						dice[ndx][ndy] = symbolIndex.get(getSymbol(nbx, nby));
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
					if (checkPattern(pattern, dice)) {
						diceInfo.push([i, j]);
						tidyDice.push(
							variation1(transformDice[i](beFirstPattern(dice, j)))
								.map((v) => {
									let str = v[0][1].toString(2).padStart(9, '0');
									str += v[1][0].toString(2).padStart(9, '0');
									str += v[1][1].toString(2).padStart(9, '0');
									str += v[1][2].toString(2).padStart(9, '0');
									str += v[1][3].toString(2).padStart(9, '0');
									str += v[2][1].toString(2).padStart(9, '0');
									return str;
								})
								.sort()[0]
						);

						findPattern = true;
						break;
					}
				}
			}
		}
	}
}

const answerMap = new Map();
for (let i = 0; i < tidyDice.length; i++) {
	if (answerMap.has(tidyDice[i])) {
		const cnt = answerMap.get(tidyDice[i]);
		answerMap.set(tidyDice[i], cnt + 1);
	} else {
		answerMap.set(tidyDice[i], 1);
	}
}

const answer = [...answerMap]
	.sort((a, b) => b[1] - a[1])
	.map((v) => String(v[1]))
	.join(' ');
console.log(answer);
