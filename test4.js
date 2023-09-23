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
	.trim()
	.split(' ')
	.map((v) => Number(v));

input.shift();
const K = input
	.shift()
	.trim()
	.split(' ')
	.map((v) => BigInt(v));
// input.shift();
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

const dx4 = [-4, 4, 0, 0];
const dy4 = [0, 0, -4, 4];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const mdx = [1, 1, 1, 0, 0, -1, -1, -1];
const mdy = [-1, 0, 1, -1, 1, -1, 0, 1];

let board = input.map((v) => v.split(''));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Price Of Number /////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PriceOfNumber = {};
for (let a = 9; a >= 1; a--) {
	const A = a * a;
	const AA = a;
	for (let b = a; b >= 1; b--) {
		const B = A + b * b;
		const BB = AA * 10 + b;
		for (let c = b; c >= 1; c--) {
			const C = B + c * c;
			const CC = BB * 10 + c;
			for (let d = c; d >= 1; d--) {
				const D = C + d * d;
				const DD = CC * 10 + d;
				for (let e = d; e >= 1; e--) {
					const E = D + e * e;
					const EE = DD * 10 + e;
					for (let f = e; f >= 1; f--) {
						const F = E + f * f;
						const FF = EE * 10 + f;
						for (let g = f; g >= 1; g--) {
							const G = F + g * g;
							const GG = FF * 10 + g;
							for (let h = g; h >= 1; h--) {
								const H = G + h * h;
								const HH = GG * 10 + h;
								for (let i = h; i >= 1; i--) {
									const I = H + i * i;
									const II = HH * 10 + i;
									PriceOfNumber[II] = II % (I + 15);
								}
							}
						}
					}
				}
			}
		}
	}
}
function getPriceOfNumber(cube) {
	let priceOfNumber = [];
	for (let i = 0; i < 6; i++) {
		const sideOfCube = cube[i].flat();
		const l = sideOfCube.sort((a, b) => b - a).join('');
		priceOfNumber.push(PriceOfNumber[l]);
	}

	priceOfNumber = priceOfNumber.sort((a, b) => a - b);
	return BigInt(priceOfNumber[0] + priceOfNumber[1] + priceOfNumber[5]);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Price Of Neighbor ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPriceOfNeighbor(cube) {
	let priceOfNeighbor = 1;
	for (let i = 0; i < 6; i++) {
		const target = cube[i];
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

		priceOfNeighbor *= cnt;
	}
	return BigInt(priceOfNeighbor);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Price Of Synergy ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const possibleSynergyNum = new Set();

for (let a = 1; a <= 9; a++) {
	for (let b = 1; b <= 9; b++) {
		for (let c = 1; c <= 9; c++) {
			for (let d = 1; d <= 9; d++) {
				for (let e = 1; e <= 9; e++) {
					const n = a * 10000 + b * 1000 + c * 100 + d * 10 + e;
					for (let k = 0; k < K.length; k++) {
						if (BigInt(K[k]) % BigInt(n) == 0) {
							possibleSynergyNum.add(n);
							break;
						}
					}
				}
			}
		}
	}
}

const mapOfpriceOfSynergy = new Map();
const synergyOrder = [
	[0, 1, 2, 3, 4],
	[0, 1, 2, 4, 3],
	[0, 1, 3, 2, 4],
	[0, 1, 3, 4, 2],
	[0, 1, 4, 2, 3],
	[0, 1, 4, 3, 2],
	[0, 2, 1, 3, 4],
	[0, 2, 1, 4, 3],
	[0, 2, 3, 1, 4],
	[0, 2, 3, 4, 1],
	[0, 2, 4, 1, 3],
	[0, 2, 4, 3, 1],
	[0, 3, 1, 2, 4],
	[0, 3, 1, 4, 2],
	[0, 3, 2, 1, 4],
	[0, 3, 2, 4, 1],
	[0, 3, 4, 1, 2],
	[0, 3, 4, 2, 1],
	[0, 4, 1, 2, 3],
	[0, 4, 1, 3, 2],
	[0, 4, 2, 1, 3],
	[0, 4, 2, 3, 1],
	[0, 4, 3, 1, 2],
	[0, 4, 3, 2, 1],
	[1, 0, 2, 3, 4],
	[1, 0, 2, 4, 3],
	[1, 0, 3, 2, 4],
	[1, 0, 3, 4, 2],
	[1, 0, 4, 2, 3],
	[1, 0, 4, 3, 2],
	[1, 2, 0, 3, 4],
	[1, 2, 0, 4, 3],
	[1, 2, 3, 0, 4],
	[1, 2, 3, 4, 0],
	[1, 2, 4, 0, 3],
	[1, 2, 4, 3, 0],
	[1, 3, 0, 2, 4],
	[1, 3, 0, 4, 2],
	[1, 3, 2, 0, 4],
	[1, 3, 2, 4, 0],
	[1, 3, 4, 0, 2],
	[1, 3, 4, 2, 0],
	[1, 4, 0, 2, 3],
	[1, 4, 0, 3, 2],
	[1, 4, 2, 0, 3],
	[1, 4, 2, 3, 0],
	[1, 4, 3, 0, 2],
	[1, 4, 3, 2, 0],
	[2, 0, 1, 3, 4],
	[2, 0, 1, 4, 3],
	[2, 0, 3, 1, 4],
	[2, 0, 3, 4, 1],
	[2, 0, 4, 1, 3],
	[2, 0, 4, 3, 1],
	[2, 1, 0, 3, 4],
	[2, 1, 0, 4, 3],
	[2, 1, 3, 0, 4],
	[2, 1, 3, 4, 0],
	[2, 1, 4, 0, 3],
	[2, 1, 4, 3, 0],
	[2, 3, 0, 1, 4],
	[2, 3, 0, 4, 1],
	[2, 3, 1, 0, 4],
	[2, 3, 1, 4, 0],
	[2, 3, 4, 0, 1],
	[2, 3, 4, 1, 0],
	[2, 4, 0, 1, 3],
	[2, 4, 0, 3, 1],
	[2, 4, 1, 0, 3],
	[2, 4, 1, 3, 0],
	[2, 4, 3, 0, 1],
	[2, 4, 3, 1, 0],
	[3, 0, 1, 2, 4],
	[3, 0, 1, 4, 2],
	[3, 0, 2, 1, 4],
	[3, 0, 2, 4, 1],
	[3, 0, 4, 1, 2],
	[3, 0, 4, 2, 1],
	[3, 1, 0, 2, 4],
	[3, 1, 0, 4, 2],
	[3, 1, 2, 0, 4],
	[3, 1, 2, 4, 0],
	[3, 1, 4, 0, 2],
	[3, 1, 4, 2, 0],
	[3, 2, 0, 1, 4],
	[3, 2, 0, 4, 1],
	[3, 2, 1, 0, 4],
	[3, 2, 1, 4, 0],
	[3, 2, 4, 0, 1],
	[3, 2, 4, 1, 0],
	[3, 4, 0, 1, 2],
	[3, 4, 0, 2, 1],
	[3, 4, 1, 0, 2],
	[3, 4, 1, 2, 0],
	[3, 4, 2, 0, 1],
	[3, 4, 2, 1, 0],
	[4, 0, 1, 2, 3],
	[4, 0, 1, 3, 2],
	[4, 0, 2, 1, 3],
	[4, 0, 2, 3, 1],
	[4, 0, 3, 1, 2],
	[4, 0, 3, 2, 1],
	[4, 1, 0, 2, 3],
	[4, 1, 0, 3, 2],
	[4, 1, 2, 0, 3],
	[4, 1, 2, 3, 0],
	[4, 1, 3, 0, 2],
	[4, 1, 3, 2, 0],
	[4, 2, 0, 1, 3],
	[4, 2, 0, 3, 1],
	[4, 2, 1, 0, 3],
	[4, 2, 1, 3, 0],
	[4, 2, 3, 0, 1],
	[4, 2, 3, 1, 0],
	[4, 3, 0, 1, 2],
	[4, 3, 0, 2, 1],
	[4, 3, 1, 0, 2],
	[4, 3, 1, 2, 0],
	[4, 3, 2, 0, 1],
	[4, 3, 2, 1, 0],
];
for (let a = 1; a <= 9; a++) {
	for (let b = a; b <= 9; b++) {
		for (let c = b; c <= 9; c++) {
			for (let d = c; d <= 9; d++) {
				for (let e = d; e <= 9; e++) {
					const num = [a, b, c, d, e];

					const s = new Set();
					synergyOrder.forEach((v) => {
						const synergy =
							num[v[0]] * 10000 +
							num[v[1]] * 1000 +
							num[v[2]] * 100 +
							num[v[3]] * 10 +
							num[v[4]];
						if (possibleSynergyNum.has(synergy)) {
							s.add(synergy);
						}
					});

					const key = a * 10000 + b * 1000 + c * 100 + d * 10 + e;
					const value = s.size * s.size + [...s].reduce((r, v) => r + v, 0);
					mapOfpriceOfSynergy.set(key, value);
				}
			}
		}
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

function getPriceOfSynergy(cube) {
	const priceOfSynergy = cube.map((c) => {
		const target = c;
		const synergies = possibleSynergy
			.map((synergy) => {
				const x = [
					target[synergy[0][0]][synergy[0][1]],
					target[synergy[1][0]][synergy[1][1]],
					target[synergy[2][0]][synergy[2][1]],
					target[synergy[3][0]][synergy[3][1]],
					target[synergy[4][0]][synergy[4][1]],
				]
					.sort((a, b) => a - b)
					.join('');
				return mapOfpriceOfSynergy.get(+x);
			})
			.sort((a, b) => a - b);
		return BigInt(synergies[0] + synergies[48] + synergies[24]);
	});

	const priceOfSynergy1 = priceOfSynergy[0] + priceOfSynergy[1] + priceOfSynergy[2];
	const priceOfSynergy2 = priceOfSynergy[0] + priceOfSynergy[3] + priceOfSynergy[2];
	const priceOfSynergy3 = priceOfSynergy[0] + priceOfSynergy[1] + priceOfSynergy[4];
	const priceOfSynergy4 = priceOfSynergy[0] + priceOfSynergy[3] + priceOfSynergy[4];
	const priceOfSynergy5 = priceOfSynergy[5] + priceOfSynergy[1] + priceOfSynergy[2];
	const priceOfSynergy6 = priceOfSynergy[5] + priceOfSynergy[3] + priceOfSynergy[2];
	const priceOfSynergy7 = priceOfSynergy[5] + priceOfSynergy[1] + priceOfSynergy[4];
	const priceOfSynergy8 = priceOfSynergy[5] + priceOfSynergy[3] + priceOfSynergy[4];

	let max = BigInt(0);
	if (priceOfSynergy1 > max) max = priceOfSynergy1;
	if (priceOfSynergy2 > max) max = priceOfSynergy2;
	if (priceOfSynergy3 > max) max = priceOfSynergy3;
	if (priceOfSynergy4 > max) max = priceOfSynergy4;
	if (priceOfSynergy5 > max) max = priceOfSynergy5;
	if (priceOfSynergy6 > max) max = priceOfSynergy6;
	if (priceOfSynergy7 > max) max = priceOfSynergy7;
	if (priceOfSynergy8 > max) max = priceOfSynergy8;

	return max;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Price Of Mine ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPriceOfMine(cube) {
	let priceOfMine = [0, 0, 0, 0, 0, 0];
	for (let i = 0; i < 6; i++) {
		const target = cube[i];

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
					priceOfMine[i]++;
				}
			}
		}
	}

	const priceOfMine01 = priceOfMine[0] * priceOfMine[1];
	const priceOfMine02 = priceOfMine[0] * priceOfMine[2];
	const priceOfMine03 = priceOfMine[0] * priceOfMine[3];
	const priceOfMine04 = priceOfMine[0] * priceOfMine[4];
	const priceOfMine51 = priceOfMine[5] * priceOfMine[1];
	const priceOfMine52 = priceOfMine[5] * priceOfMine[2];
	const priceOfMine53 = priceOfMine[5] * priceOfMine[3];
	const priceOfMine54 = priceOfMine[5] * priceOfMine[4];
	const priceOfMine12 = priceOfMine[2] * priceOfMine[1];
	const priceOfMine23 = priceOfMine[3] * priceOfMine[2];
	const priceOfMine34 = priceOfMine[4] * priceOfMine[3];
	const priceOfMine41 = priceOfMine[1] * priceOfMine[4];

	return BigInt(
		priceOfMine01 +
			priceOfMine02 +
			priceOfMine03 +
			priceOfMine04 +
			priceOfMine51 +
			priceOfMine52 +
			priceOfMine53 +
			priceOfMine54 +
			priceOfMine12 +
			priceOfMine23 +
			priceOfMine34 +
			priceOfMine41
	);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Price Of Chess ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function getPriceOfChess(cube) {
	let valueOfChess = 0;
	for (let i = 0; i < 6; i++) {
		const target = cube[i].flat();
		let num = 0;
		for (let i = 0; i < 9; i++) {
			if (target[i] % 2 == 0) {
				num |= 1 << (8 - i);
			}
		}

		valueOfChess += BISHOP[num];
	}
	return BigInt(valueOfChess);
}

function getPriceOfCube(a, b, c, d, e) {
	return Number((a + b + c + d + e) % BigInt(20010610));
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
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

const transformStandardNet = [
	//0
	(cube) => [cube[0][1], cube[1][0], cube[1][1], cube[1][2], cube[1][3], cube[2][1]],
	//1
	(cube) => [
		rotateParts90(cube[0][0]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		cube[1][3],
		rotateParts270(cube[2][0]),
	],
	//2
	(cube) => [cube[0][1], cube[1][0], cube[1][1], cube[1][2], cube[1][3], rotateParts270(cube[2][0])],
	//3
	(cube) => [rotateParts90(cube[0][0]), cube[1][0], cube[1][1], cube[1][2], cube[1][3], cube[2][1]],
	//4
	(cube) => [
		rotateParts270(cube[0][2]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		cube[1][3],
		rotateParts270(cube[2][0]),
	],
	//5
	(cube) => [
		rotateParts90(cube[0][0]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		cube[1][3],
		rotateParts90(cube[2][2]),
	],
	//6
	(cube) => [
		rotateParts180(cube[0][3]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		cube[1][3],
		rotateParts270(cube[2][0]),
	],
	//7
	(cube) => [
		rotateParts90(cube[0][0]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		cube[1][3],
		rotateParts180(cube[2][3]),
	],
	//8
	(cube) => [rotateParts270(cube[0][2]), cube[1][0], cube[1][1], cube[1][2], cube[1][3], cube[2][1]],
	//9
	(cube) => [cube[0][1], cube[1][0], cube[1][1], cube[1][2], cube[1][3], rotateParts90(cube[2][2])],
	//10
	(cube) => [
		rotateParts270(cube[0][2]),
		rotateParts90(cube[2][0]),
		cube[1][1],
		cube[1][2],
		rotateParts90(cube[0][3]),
		cube[2][1],
	],
	//11
	(cube) => [
		cube[0][1],
		rotateParts270(cube[0][0]),
		cube[1][1],
		cube[1][2],
		rotateParts270(cube[2][3]),
		rotateParts90(cube[2][2]),
	],
	//12
	(cube) => [
		rotateParts270(cube[0][2]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		rotateParts90(cube[0][3]),
		rotateParts270(cube[2][0]),
	],
	//13
	(cube) => [
		rotateParts90(cube[0][0]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		rotateParts270(cube[2][3]),
		rotateParts90(cube[2][2]),
	],

	//14
	(cube) => [cube[0][1], rotateParts90(cube[2][0]), cube[1][1], cube[1][2], cube[1][3], cube[2][1]],
	//15
	(cube) => [cube[0][1], rotateParts270(cube[0][0]), cube[1][1], cube[1][2], cube[1][3], cube[2][1]],

	//16
	(cube) => [
		cube[0][1],
		cube[1][0],
		cube[1][1],
		cube[1][2],
		rotateParts270(cube[2][3]),
		rotateParts90(cube[2][2]),
	],

	//17
	(cube) => [
		rotateParts270(cube[0][2]),
		cube[1][0],
		cube[1][1],
		cube[1][2],
		rotateParts270(cube[0][3]),
		cube[2][1],
	],

	//18
	(cube) => [
		rotateParts180(cube[1][0]),
		rotateParts90(cube[1][1]),
		cube[0][2],
		cube[0][3],
		cube[0][4],
		cube[1][2],
	],
	//19
	(cube) => [
		cube[0][2],
		rotateParts270(cube[0][1]),
		cube[1][2],
		cube[1][3],
		cube[1][4],
		rotateParts180(cube[0][0]),
	],
];

const standardNets = [];
for (let i = 0; i < H; i++) {
	for (let j = 0; j < W; j++) {
		if (isPartOfCube(i, j)) {
			const originNet = getOriginNet(i, j);
			const standardNet = changeNet(originNet);
			standardNets.push(standardNet);
		}
	}
}

const result = new Map();
const priceOfCubes = standardNets.map((standardNet) => {
	const rotatedCube = getrotatedCube(standardNet);

	const caseOfRotate = rotatedCube.map((cube) => {
		const key = cube.map((v) => v.map((x) => x.join('')).join('')).join('');
		if (result.has(key)) {
			return result.get(key);
		}

		const priceOfNumber = getPriceOfNumber(cube);

		const priceOfNeighbor = getPriceOfNeighbor(cube);

		const priceOfSynergy = getPriceOfSynergy(cube);

		const priceOfMine = getPriceOfMine(cube);

		const priceOfChess = getPriceOfChess(cube);

		const priceOfCube = getPriceOfCube(
			priceOfNumber,
			priceOfNeighbor,
			priceOfSynergy,
			priceOfMine,
			priceOfChess
		);

		result.set(key, priceOfCube);
		return priceOfCube;
	});

	const first = caseOfRotate[0];

	let max = 0;
	for (let i = 1; i < 19; i++) {
		if (caseOfRotate[i] > max) max = caseOfRotate[i];
	}
	return [first, max];
});

let firstSum = 0;
let maxSum = 0;
const priceOfCubesSorted = priceOfCubes
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
priceOfCubesSorted.unshift([0, 0]);

const answer = [];
const P = priceOfCubesSorted.length;

for (let i = 0; i < P; i++) {
	answer.push(priceOfCubesSorted[i][1] + priceOfCubesSorted[P - 1][0] - priceOfCubesSorted[i][0]);
}
console.log(answer.join('\n'));

function getOriginNet(i, j) {
	let net = Array.from(Array(9), () => Array(9).fill([]));
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
			if (net[0][k].length > 0) {
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
			if (net[net.length - 1][k].length > 0) {
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
			if (net[i][0].length > 0) {
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
			if (net[i][net[i].length - 1].length > 0) {
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
	return [
		[board[i + 1][j + 1], board[i + 1][j + 2], board[i + 1][j + 3]],
		[board[i + 2][j + 1], board[i + 2][j + 2], board[i + 2][j + 3]],
		[board[i + 3][j + 1], board[i + 3][j + 2], board[i + 3][j + 3]],
	];
}

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
}

function checkNetPattern(pattern, net) {
	const r = pattern.length;
	const c = pattern[0].length;
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			if (
				(pattern[i][j] == 1 && net[i][j].length == 0) ||
				(pattern[i][j] == 0 && net[i][j].length != 0)
			)
				return false;
		}
	}
	return true;
}

function rotateNet(net, cnt) {
	while (cnt < 4) {
		const r = net.length;
		const c = net[0].length;
		let rotated = Array.from(Array(c), () => Array(r).fill([]));
		for (let i = 0; i < r; i++) {
			for (let j = 0; j < c; j++) {
				if (net[i][j].length > 0) {
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

function rotateParts90(arr) {
	return [
		[arr[2][0], arr[1][0], arr[0][0]],
		[arr[2][1], arr[1][1], arr[0][1]],
		[arr[2][2], arr[1][2], arr[0][2]],
	];
}
function rotateParts180(arr) {
	return [
		[arr[2][2], arr[2][1], arr[2][0]],
		[arr[1][2], arr[1][1], arr[1][0]],
		[arr[0][2], arr[0][1], arr[0][0]],
	];
}
function rotateParts270(arr) {
	return [
		[arr[0][2], arr[1][2], arr[2][2]],
		[arr[0][1], arr[1][1], arr[2][1]],
		[arr[0][0], arr[1][0], arr[2][0]],
	];
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
