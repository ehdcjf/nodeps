// console.time('ddd');

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

const possibleSynergy = [
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 1],
	],
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 2],
	],
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 0],
		[2, 0],
	],
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 1],
		[1, 2],
	],
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 1],
		[2, 1],
	],
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 2],
		[2, 2],
	],
	[
		[0, 0],
		[0, 1],
		[1, 0],
		[1, 1],
		[1, 2],
	],
	[
		[0, 0],
		[0, 1],
		[1, 0],
		[1, 1],
		[2, 0],
	],
	[
		[0, 0],
		[0, 1],
		[1, 0],
		[1, 1],
		[2, 1],
	],
	[
		[0, 0],
		[0, 1],
		[1, 0],
		[2, 0],
		[2, 1],
	],
	[
		[0, 0],
		[0, 1],
		[1, 1],
		[1, 2],
		[2, 1],
	],
	[
		[0, 0],
		[0, 1],
		[1, 1],
		[1, 2],
		[2, 2],
	],
	[
		[0, 0],
		[0, 1],
		[1, 1],
		[2, 0],
		[2, 1],
	],
	[
		[0, 0],
		[0, 1],
		[1, 1],
		[2, 1],
		[2, 2],
	],
	[
		[0, 0],
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
	],
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
	],
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 1],
	],
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 2],
	],
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[2, 0],
		[2, 1],
	],
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[2, 1],
		[2, 2],
	],
	[
		[0, 0],
		[1, 0],
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
	],
	[
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 1],
		[2, 0],
	],
	[
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 1],
		[2, 1],
	],
	[
		[0, 1],
		[0, 2],
		[1, 1],
		[1, 2],
		[2, 1],
	],
	[
		[0, 1],
		[0, 2],
		[1, 1],
		[1, 2],
		[2, 2],
	],
	[
		[0, 1],
		[0, 2],
		[1, 1],
		[2, 0],
		[2, 1],
	],
	[
		[0, 1],
		[0, 2],
		[1, 1],
		[2, 1],
		[2, 2],
	],
	[
		[0, 1],
		[0, 2],
		[1, 2],
		[2, 1],
		[2, 2],
	],
	[
		[0, 1],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
	],
	[
		[0, 1],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 1],
	],
	[
		[0, 1],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 2],
	],
	[
		[0, 1],
		[1, 0],
		[1, 1],
		[2, 0],
		[2, 1],
	],
	[
		[0, 1],
		[1, 0],
		[1, 1],
		[2, 1],
		[2, 2],
	],
	[
		[0, 1],
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 1],
	],
	[
		[0, 1],
		[1, 1],
		[1, 2],
		[2, 1],
		[2, 2],
	],
	[
		[0, 1],
		[1, 1],
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
	],
	[
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 1],
	],
	[
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 2],
	],
	[
		[0, 2],
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 1],
	],
	[
		[0, 2],
		[1, 1],
		[1, 2],
		[2, 1],
		[2, 2],
	],
	[
		[0, 2],
		[1, 2],
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 1],
	],
	[
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 2],
	],
	[
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 1],
		[2, 2],
	],
	[
		[1, 0],
		[1, 1],
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[1, 0],
		[1, 2],
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 1],
		[2, 2],
	],
];

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

const input = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.trim());
const [H, W] = input
	.shift()
	.trim()
	.split(' ')
	.map((v) => Number(v));

input.shift();
const K = input
	.shift()
	.trim()
	.split(' ')
	.map((v) => BigInt(v));

// const K = [
// 	'358845337212887578',
// 	'744258161128681717',
// 	'174366162495847559',
// 	'299532576696613754',
// 	'249241735643126563',
// 	'726614748184524775',
// 	'784625319854366126',
// 	'712498846183298498',
// 	'248736632767176394',
// 	'853569272662363813',
// 	'254414293828319637',
// 	'334278943134217181',
// 	'977763282771572228',
// 	'364194225215948875',
// 	'819532298819874889',
// 	'971438174898939171',
// 	'416751918519874835',
// 	'892768267198957247',
// 	'882992217351331112',
// 	'175391588523474983',
// 	'594311484325374171',
// 	'939385273332662657',
// 	'425932917128648532',
// 	'413224365348519144',
// 	'946973877312314351',
// 	'978228757827797649',
// 	'943778735668184353',
// 	'423444186474725522',
// 	'821211425447144153',
// 	'344237624717116286',
// 	'538335279279952194',
// 	'536249793942372897',
// 	'554876743675268729',
// 	'411454945822677296',
// 	'464276435566822746',
// 	'282739926427681498',
// 	'933299161673168843',
// 	'598129323771489583',
// 	'818446176834463488',
// 	'885872198947827875',
// 	'927132843862163123',
// 	'157415653616581748',
// 	'215345278143651819',
// 	'491487425526435274',
// 	'471375375812861563',
// 	'748617987627964374',
// 	'374788232782269589',
// 	'452933628299756822',
// 	'216481852544544521',
// 	'254363757199126194',
// 	'227737125565166816',
// 	'983453221317563738',
// 	'816582438571997275',
// 	'357777412715977555',
// 	'583546463148713648',
// 	'852855551286399617',
// 	'515857672469794833',
// 	'454914341762871381',
// 	'674351519164418644',
// 	'471698519892218475',
// 	'536273313768937951',
// 	'687948272115628228',
// 	'836727933697393553',
// 	'226532552269735154',
// 	'123273615974558325',
// 	'767153675151983228',
// 	'628462868662785217',
// 	'783492513791316963',
// 	'116373434798434869',
// 	'471955499446425942',
// 	'852399171292292557',
// 	'434955775894464355',
// 	'658465931324146856',
// 	'683876329421284445',
// 	'517843814286428198',
// 	'899146629597766946',
// 	'117316267259575992',
// 	'911896696966879581',
// 	'323958798918636482',
// 	'829217689623623862',
// 	'221827886436231312',
// 	'596771428865716438',
// 	'468252473544728179',
// 	'477528315328475528',
// 	'193129938895563613',
// 	'798365673713964985',
// 	'676291531993847435',
// 	'933326717268559511',
// 	'482118136583947198',
// 	'315552126496175291',
// 	'142287745121592958',
// 	'286548588614672228',
// 	'722666641769446656',
// 	'327438936538464458',
// 	'936269224634335844',
// 	'169881869177645484',
// 	'567663967425472854',
// 	'889447646181772655',
// 	'897842277437152596',
// 	'532623235421873351',
// ];

let board = input.map((v) => v.trim().split(''));

const possibleSynergyNum = new Set();
for (let i = 11111; i <= 99999; i++) {
	for (let k = 0; k < K.length; k++) {
		if (BigInt(K[k]) % BigInt(i) == 0) {
			possibleSynergyNum.add(BigInt(i));
			break;
		}
	}
}
const synergyValues = Array(100000).fill(0);

for (let i = 1; i <= 9; i++) {
	for (let j = i; j <= 9; j++) {
		for (let k = j; k <= 9; k++) {
			for (let l = k; l <= 9; l++) {
				for (let m = l; m <= 9; m++) {
					const tmp = [i, j, k, l, m];
					let s = new Set();
					possibleNum.forEach((v2) => {
						const num = BigInt(
							v2.reduce((r, v) => {
								r += `${tmp[v]}`;
								return r;
							}, '')
						);
						if (possibleSynergyNum.has(num)) {
							s.add(num);
						}
					});

					const index = i * 10000 + j * 1000 + k * 100 + l * 10 + m;
					synergyValues[index] =
						BigInt(s.size * s.size) +
						[...s].reduce((r, v) => {
							r += v;
							return r;
						}, BigInt(0));
				}
			}
		}
	}
}

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
	(arr) => [
		['', arr[0][1], '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', arr[2][1], '', ''],
	],
	//1
	(arr) => [
		['', rotateParts90(arr[0][0]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', rotateParts270(arr[2][0]), '', ''],
	],
	//2
	(arr) => [
		['', arr[0][1], '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', rotateParts270(arr[2][0]), '', ''],
	],
	//3
	(arr) => [
		['', rotateParts90(arr[0][0]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', arr[2][1], '', ''],
	],
	//4
	(arr, r) => [
		['', rotateParts270(arr[0][2]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', rotateParts270(arr[2][0]), '', ''],
	],
	//5
	(arr, r) => [
		['', rotateParts90(arr[0][0]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', rotateParts90(arr[2][2]), '', ''],
	],
	//6
	(arr, r) => [
		['', rotateParts180(arr[0][3]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', rotateParts270(arr[2][0]), '', ''],
	],
	//7
	(arr, r) => [
		['', rotateParts90(arr[0][0]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', rotateParts180(arr[2][3]), '', ''],
	],
	//8
	(arr, r) => [
		['', rotateParts270(arr[0][2]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', arr[2][1], '', ''],
	],
	//9
	(arr, r) => [
		['', arr[0][1], '', ''],
		[arr[1][0], arr[1][1], arr[1][2], arr[1][3]],
		['', rotateParts90(arr[2][2]), '', ''],
	],
	//10
	(arr) => [
		['', rotateParts270(arr[0][2]), '', ''],
		[rotateParts90(arr[2][0]), arr[1][1], arr[1][2], rotateParts90(arr[0][3])],
		['', arr[2][1], '', ''],
	],
	//11
	(arr) => [
		['', arr[0][1], '', ''],
		[rotateParts270(arr[0][0]), arr[1][1], arr[1][2], rotateParts270(arr[2][3])],
		['', rotateParts90(arr[2][2]), '', ''],
	],
	//12
	(arr) => [
		['', rotateParts270(arr[0][2]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], rotateParts90(arr[0][3])],
		['', rotateParts270(arr[2][0]), '', ''],
	],
	//13
	(arr, r) => [
		['', rotateParts90(arr[0][0]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], rotateParts270(arr[2][3])],
		['', rotateParts90(arr[2][2]), '', ''],
	],

	//14
	(arr, r) => [
		['', arr[0][1], '', ''],
		[rotateParts90(arr[2][0]), arr[1][1], arr[1][2], arr[1][3]],
		['', arr[2][1], '', ''],
	],
	//15
	(arr, r) => [
		['', arr[0][1], '', ''],
		[rotateParts270(arr[0][0]), arr[1][1], arr[1][2], arr[1][3]],
		['', arr[2][1], '', ''],
	],

	//16
	(arr, r) => [
		['', arr[0][1], '', ''],
		[arr[1][0], arr[1][1], arr[1][2], rotateParts270(arr[2][3])],
		['', rotateParts90(arr[2][2]), '', ''],
	],

	//17
	(arr, r) => [
		['', rotateParts270(arr[0][2]), '', ''],
		[arr[1][0], arr[1][1], arr[1][2], rotateParts270(arr[0][3])],
		['', arr[2][1], '', ''],
	],

	//18
	(arr) => [
		['', rotateParts180(arr[1][0]), '', ''],
		[rotateParts90(arr[1][1]), arr[0][2], arr[0][3], arr[0][4]],
		['', arr[1][2], '', ''],
	],
	//19
	(arr) => [
		['', arr[0][2], '', ''],
		[rotateParts270(arr[0][1]), arr[1][2], arr[1][3], arr[1][4]],
		['', rotateParts180(arr[0][0]), '', ''],
	],
];

function rotateZero(dice) {
	const newDice = dice.map((parts) => parts.map((row) => [...row]));
	newDice[1][0][0] = dice[4][0][0];
	newDice[1][0][1] = dice[4][0][1];
	newDice[1][0][2] = dice[4][0][2];

	newDice[2][0][0] = dice[1][0][0];
	newDice[2][0][1] = dice[1][0][1];
	newDice[2][0][2] = dice[1][0][2];

	newDice[3][0][0] = dice[2][0][0];
	newDice[3][0][1] = dice[2][0][1];
	newDice[3][0][2] = dice[2][0][2];

	newDice[4][0][0] = dice[3][0][0];
	newDice[4][0][1] = dice[3][0][1];
	newDice[4][0][2] = dice[3][0][2];
	return newDice;
}

function rotateFive(dice) {
	const newDice = dice.map((parts) => parts.map((row) => [...row]));

	newDice[1][2][0] = dice[4][2][0];
	newDice[1][2][1] = dice[4][2][1];
	newDice[1][2][2] = dice[4][2][2];

	newDice[2][2][0] = dice[1][2][0];
	newDice[2][2][1] = dice[1][2][1];
	newDice[2][2][2] = dice[1][2][2];

	newDice[3][2][0] = dice[2][2][0];
	newDice[3][2][1] = dice[2][2][1];
	newDice[3][2][2] = dice[2][2][2];

	newDice[4][2][0] = dice[3][2][0];
	newDice[4][2][1] = dice[3][2][1];
	newDice[4][2][2] = dice[3][2][2];

	return newDice;
}

function rotateOne(dice) {
	const newDice = dice.map((parts) => parts.map((row) => [...row]));

	newDice[2][0][0] = dice[0][0][0];
	newDice[2][1][0] = dice[0][1][0];
	newDice[2][2][0] = dice[0][2][0];

	newDice[5][0][0] = dice[2][0][0];
	newDice[5][1][0] = dice[2][1][0];
	newDice[5][2][0] = dice[2][2][0];

	newDice[4][2][2] = dice[5][0][0];
	newDice[4][1][2] = dice[5][1][0];
	newDice[4][0][2] = dice[5][2][0];

	newDice[0][0][0] = dice[4][2][2];
	newDice[0][1][0] = dice[4][1][2];
	newDice[0][2][0] = dice[4][0][2];

	return newDice;
}

function rotateTwo(dice) {
	const newDice = dice.map((parts) => parts.map((row) => [...row]));

	newDice[0][2][0] = dice[1][2][2];
	newDice[0][2][1] = dice[1][1][2];
	newDice[0][2][2] = dice[1][0][2];

	newDice[3][0][0] = dice[0][2][0];
	newDice[3][1][0] = dice[0][2][1];
	newDice[3][2][0] = dice[0][2][2];

	newDice[5][0][2] = dice[3][0][0];
	newDice[5][0][1] = dice[3][1][0];
	newDice[5][0][0] = dice[3][2][0];

	newDice[1][2][2] = dice[5][0][2];
	newDice[1][1][2] = dice[5][0][1];
	newDice[1][0][2] = dice[5][0][0];

	return newDice;
}

function rotateThree(dice) {
	const newDice = dice.map((parts) => parts.map((row) => [...row]));
	newDice[0][2][2] = dice[2][2][2];
	newDice[0][1][2] = dice[2][1][2];
	newDice[0][0][2] = dice[2][0][2];

	newDice[4][0][0] = dice[0][2][2];
	newDice[4][1][0] = dice[0][1][2];
	newDice[4][2][0] = dice[0][0][2];

	newDice[5][2][2] = dice[4][0][0];
	newDice[5][1][2] = dice[4][1][0];
	newDice[5][0][2] = dice[4][2][0];

	newDice[2][2][2] = dice[5][2][2];
	newDice[2][1][2] = dice[5][1][2];
	newDice[2][0][2] = dice[5][0][2];

	return newDice;
}

function rotateFour(dice) {
	const newDice = dice.map((parts) => parts.map((row) => [...row]));

	newDice[1][0][0] = dice[0][0][2];
	newDice[1][1][0] = dice[0][0][1];
	newDice[1][2][0] = dice[0][0][0];

	newDice[5][2][0] = dice[1][0][0];
	newDice[5][2][1] = dice[1][1][0];
	newDice[5][2][2] = dice[1][2][0];

	newDice[3][2][2] = dice[5][2][0];
	newDice[3][1][2] = dice[5][2][1];
	newDice[3][0][2] = dice[5][2][2];

	newDice[0][0][2] = dice[3][2][2];
	newDice[0][0][1] = dice[3][1][2];
	newDice[0][0][0] = dice[3][0][2];
	return newDice;
}

function getrotatedDice(dice) {
	const rotate01 = rotateZero(dice);
	const rotate02 = rotateZero(rotate01);
	const rotate03 = rotateZero(rotate02);

	const rotate11 = rotateOne(dice);
	const rotate12 = rotateOne(rotate11);
	const rotate13 = rotateOne(rotate12);

	const rotate21 = rotateTwo(dice);
	const rotate22 = rotateTwo(rotate21);
	const rotate23 = rotateTwo(rotate22);

	const rotate31 = rotateThree(dice);
	const rotate32 = rotateThree(rotate31);
	const rotate33 = rotateThree(rotate32);

	const rotate41 = rotateFour(dice);
	const rotate42 = rotateFour(rotate41);
	const rotate43 = rotateFour(rotate42);

	const rotate51 = rotateFive(dice);
	const rotate52 = rotateFive(rotate51);
	const rotate53 = rotateFive(rotate52);

	return [
		dice,
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

function rotateParts90(str) {
	return str[6] + str[3] + str[0] + str[7] + str[4] + str[1] + str[8] + str[5] + str[2];
}
function rotateParts180(str) {
	return str[8] + str[7] + str[6] + str[5] + str[4] + str[3] + str[2] + str[1] + str[0];
}
function rotateParts270(str) {
	return str[2] + str[5] + str[8] + str[1] + str[4] + str[7] + str[0] + str[3] + str[6];
}

function getParts(i, j) {
	return `${board[i + 1][j + 1]}${board[i + 1][j + 2]}${board[i + 1][j + 3]}${board[i + 2][j + 1]}${
		board[i + 2][j + 2]
	}${board[i + 2][j + 3]}${board[i + 3][j + 1]}${board[i + 3][j + 2]}${board[i + 3][j + 3]}`;
}

function checkDicePattern(pattern, dice) {
	const r = pattern.length;
	const c = pattern[0].length;
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			if ((pattern[i][j] == 1 && dice[i][j] == '') || (pattern[i][j] == 0 && dice[i][j] != ''))
				return false;
		}
	}
	return true;
}

function beStandardDicePattern(arr, cnt) {
	while (cnt < 4) {
		const r = arr.length;
		const c = arr[0].length;
		let rotated = Array.from(Array(c), () => Array(r).fill(''));
		for (let i = 0; i < r; i++) {
			for (let j = 0; j < c; j++) {
				if (arr[i][j] != '') {
					const rotateParts = rotateParts90(arr[i][j]);
					rotated[j][r - i - 1] = rotateParts;
				}
			}
		}
		arr = rotated;
		cnt++;
	}
	return arr;
}
// console.time('find');
for (let i = 0; i < H; i++) {
	for (let j = 0; j < W; j++) {
		if (isPartOfDice(i, j)) {
			let dice = Array.from(Array(9), () => Array(9).fill(''));
			dice[4][4] = getParts(i, j);
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
						dice[ndx][ndy] = getParts(nbx, nby);
						board[nbx + 1][nby + 1] = 'o';
						q.push([nbx, nby, ndx, ndy]);
					}
				}
			}

			while (dice.length > 0) {
				let zero = true;
				for (let k = 0; k < dice[0].length; k++) {
					if (dice[0][k] != '') {
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
					if (dice[dice.length - 1][k] != '') {
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
					if (dice[i][0] != '') {
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
					if (dice[i][dice[i].length - 1] != '') {
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
					const diceColumn = dice[0].length;
					if (patternRow != diceRow || patternColumn != diceColumn) continue;
					if (checkDicePattern(pattern, dice)) {
						const result = transformDiceToFirstDicePattern[i](
							beStandardDicePattern(dice, j)
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
// console.timeEnd('find');
// console.log(standardDice);
// 이제 18번 돌린거 구하고..
// 거기서 무슨무슨 가치 구하면됨.

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
	return BigInt(von[0] + von[1] + von[5]);
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
	return BigInt(valueOfNeighbor);
}

function getValueOfSynergy(arr) {
	const vos = [];
	for (let i = 0; i < 6; i++) {
		const target = arr[i];
		const synergy = possibleSynergy
			.map((v) => {
				let list = [];
				v.forEach(([x, y]) => {
					list.push(target[x][y]);
				});

				list = list.sort((a, b) => a - b);

				const index = list[0] * 10000 + list[1] * 1000 + list[2] * 100 + list[3] * 10 + list[4];

				return synergyValues[index];
			})
			.sort((a, b) => Number(a - b));
		vos.push(synergy[0] + synergy[48] + synergy[24]);
	}

	const vos1 = vos[0] + vos[1] + vos[2];
	const vos2 = vos[0] + vos[3] + vos[2];
	const vos3 = vos[0] + vos[1] + vos[4];
	const vos4 = vos[0] + vos[3] + vos[4];
	const vos5 = vos[5] + vos[1] + vos[2];
	const vos6 = vos[5] + vos[3] + vos[2];
	const vos7 = vos[5] + vos[1] + vos[4];
	const vos8 = vos[5] + vos[3] + vos[4];

	let max = BigInt(0);
	if (vos1 > max) max = vos1;
	if (vos2 > max) max = vos2;
	if (vos3 > max) max = vos3;
	if (vos4 > max) max = vos4;
	if (vos5 > max) max = vos5;
	if (vos6 > max) max = vos6;
	if (vos7 > max) max = vos7;
	if (vos8 > max) max = vos8;

	return max;
}

function getValueOfMine(arr) {
	let vom = [0, 0, 0, 0, 0, 0];
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

	return BigInt(vom01 + vom02 + vom03 + vom04 + vom51 + vom52 + vom53 + vom54 + vom12 + vom23 + vom34 + vom41);
}

const BISHOP = [
	0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 1, 2, 2, 3, 2, 3, 1, 1, 2, 2, 1, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 1, 2, 1, 2, 2,
	3, 2, 3, 2, 3, 2, 3, 3, 4, 3, 4, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 4, 3, 4, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3,
	2, 3, 2, 3, 2, 3, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 3, 4, 3, 4, 3, 4, 3,
	4, 2, 3, 2, 3, 2, 3, 2, 3, 3, 4, 3, 4, 3, 4, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 2, 3, 3,
	2, 3, 3, 4, 2, 2, 3, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 2, 3, 3, 4, 3, 4, 2, 2, 3, 3, 2, 3, 3, 4, 3,
	3, 3, 3, 3, 4, 3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 2, 3,
	3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 1, 1, 2,
	2, 2, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3,
	3, 3, 3, 3, 4, 4, 4, 4, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3,
	3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3,
	3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 3, 3, 3, 3, 4,
	4, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3,
	4, 4, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3,
	3, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
];

function getValueOfChess(dice) {
	let valueOfChess = 0;
	for (let i = 0; i < 6; i++) {
		const target = dice[i]
			.flat()
			.map((v) => {
				if (v % 2 == 0) {
					return 1;
				} else {
					return 0;
				}
			})
			.join('');
		valueOfChess += BISHOP[parseInt(target, 2)];
	}
	return BigInt(valueOfChess);
}

function getValueOfCube(a, b, c, d, e) {
	return Number((a + b + c + d + e) % BigInt(20010610));
}

// console.time('real');

const result = new Map();
const valueOfCubes = standardDice.map((v) => {
	const planeIndexes = v
		.flat()
		.filter((v) => v != '')
		.map((str) => [
			[+str[0], +str[1], +str[2]],
			[+str[3], +str[4], +str[5]],
			[+str[6], +str[7], +str[8]],
		]);
	const rotatedDice = getrotatedDice(planeIndexes);
	const caseOfRotate = rotatedDice.map((dice) => {
		const key = dice.map((v) => v.flat().join('')).join('');

		if (result.has(key)) {
			return result.get(key);
		}
		// 숫자의 가치
		// console.time('valueOfNumber');
		const valueOfNumber = getValueOfNumber(dice);
		// console.timeEnd('valueOfNumber');
		// console.log('valueOfNumber', valueOfNumber);
		// 이웃의 가치
		// console.time('valueOfNeighbor');
		const valueOfNeighbor = getValueOfNeighbor(dice);
		// console.timeEnd('valueOfNeighbor');
		// console.log('valueOfNeighbor', valueOfNeighbor);

		// 시너지의 가치
		console.time('valueOfSynergy');
		const valueOfSynergy = getValueOfSynergy(dice);
		console.timeEnd('valueOfSynergy');
		// console.log('valueOfSynergy', valueOfSynergy);
		// 지뢰찾기 가치
		// console.time('valueOfMine');
		const valueOfMine = getValueOfMine(dice);
		// console.timeEnd('valueOfMine');
		// console.log('valueOfMine', valueOfMine);
		// 체스의 가치
		// console.time('valueOfChess');
		const valueOfChess = getValueOfChess(dice);
		// console.timeEnd('valueOfChess');
		// console.log('valueOfChess', valueOfNumber);
		// 큐브의 가치
		const valueOfCube = getValueOfCube(
			valueOfChess,
			valueOfMine,
			valueOfSynergy,
			valueOfNeighbor,
			valueOfNumber
		);
		result.set(key, valueOfCube);
		return valueOfCube;
	});
	const first = caseOfRotate[0];

	let max = 0;
	for (let i = 1; i < 19; i++) {
		if (caseOfRotate[i] > max) max = caseOfRotate[i];
	}
	return [first, max];
});
// console.timeEnd('real');
let firstSum = 0;
let maxSum = 0;
const valueOfCubesSorted = valueOfCubes
	.sort((a, b) => {
		const diffA = a[1] - a[0];
		const diffB = b[1] - b[0];
		return diffB - diffA;
	})
	.map((v) => {
		firstSum += v[0];
		maxSum += v[1];
		return [firstSum, maxSum];
	});
valueOfCubesSorted.unshift([0, 0]);

const answer = [];
const P = valueOfCubesSorted.length;

for (let i = 0; i < P; i++) {
	answer.push(valueOfCubesSorted[i][1] + valueOfCubesSorted[P - 1][0] - valueOfCubesSorted[i][0]);
}
console.log(answer.join('\n'));
// console.timeEnd('ddd');
