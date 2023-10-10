console.time('kk');
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

const dx4 = [-4, 4, 0, 0];
const dy4 = [0, 0, -4, 4];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
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
	let min0 = Infinity;
	let min1 = 0;
	let max = 0;
	cube.forEach((net) => {
		const str = [...net].sort((a, b) => b - a);
		const num =
			+str[0] * 100000000 +
			+str[1] * 10000000 +
			+str[2] * 1000000 +
			+str[3] * 100000 +
			+str[4] * 10000 +
			+str[5] * 1000 +
			+str[6] * 100 +
			+str[7] * 10 +
			+str[8];

		const result = PriceOfNumber[num];
		if (max == 0) {
			min0 = result;
			min1 = result;
			max = result;
		} else {
			if (result > max) {
				max = result;
			} else {
				if (result < min0) {
					let tmp = min0;
					min0 = result;
					min1 = tmp;
				} else if (result > min0 && result < min1) {
					min1 = result;
				}
			}
		}
	});
	// return BigInt(priceOfNumber[0] + priceOfNumber[1] + priceOfNumber[5]);
	return BigInt(min0 + min1 + max);
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
		if (Math.abs(target[0] - target[1]) <= 3) cnt++;
		if (Math.abs(target[1] - target[2]) <= 3) cnt++;
		if (Math.abs(target[3] - target[4]) <= 3) cnt++;
		if (Math.abs(target[4] - target[5]) <= 3) cnt++;
		if (Math.abs(target[6] - target[7]) <= 3) cnt++;
		if (Math.abs(target[7] - target[8]) <= 3) cnt++;
		if (Math.abs(target[0] - target[3]) <= 3) cnt++;
		if (Math.abs(target[3] - target[6]) <= 3) cnt++;
		if (Math.abs(target[1] - target[4]) <= 3) cnt++;
		if (Math.abs(target[4] - target[7]) <= 3) cnt++;
		if (Math.abs(target[2] - target[5]) <= 3) cnt++;
		if (Math.abs(target[5] - target[8]) <= 3) cnt++;

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
	[0, 1, 2, 3, 4],
	[0, 1, 2, 3, 5],
	[0, 1, 2, 3, 6],
	[0, 1, 2, 4, 5],
	[0, 1, 2, 4, 7],
	[0, 1, 2, 5, 8],
	[0, 1, 3, 4, 5],
	[0, 1, 3, 4, 6],
	[0, 1, 3, 4, 7],
	[0, 1, 3, 6, 7],
	[0, 1, 4, 5, 7],
	[0, 1, 4, 5, 8],
	[0, 1, 4, 6, 7],
	[0, 1, 4, 7, 8],
	[0, 2, 3, 4, 5],
	[0, 3, 4, 5, 6],
	[0, 3, 4, 5, 7],
	[0, 3, 4, 5, 8],
	[0, 3, 4, 6, 7],
	[0, 3, 4, 7, 8],
	[0, 3, 6, 7, 8],
	[1, 2, 3, 4, 5],
	[1, 2, 3, 4, 6],
	[1, 2, 3, 4, 7],
	[1, 2, 4, 5, 7],
	[1, 2, 4, 5, 8],
	[1, 2, 4, 6, 7],
	[1, 2, 4, 7, 8],
	[1, 2, 5, 7, 8],
	[1, 3, 4, 5, 6],
	[1, 3, 4, 5, 7],
	[1, 3, 4, 5, 8],
	[1, 3, 4, 6, 7],
	[1, 3, 4, 7, 8],
	[1, 4, 5, 6, 7],
	[1, 4, 5, 7, 8],
	[1, 4, 6, 7, 8],
	[2, 3, 4, 5, 6],
	[2, 3, 4, 5, 7],
	[2, 3, 4, 5, 8],
	[2, 4, 5, 6, 7],
	[2, 4, 5, 7, 8],
	[2, 5, 6, 7, 8],
	[3, 4, 5, 6, 7],
	[3, 4, 5, 6, 8],
	[3, 4, 5, 7, 8],
	[3, 4, 6, 7, 8],
	[3, 5, 6, 7, 8],
	[4, 5, 6, 7, 8],
];

const synergyMap = new Map();
function getPriceOfSynergy(cube) {
	const priceOfSynergy = cube.map((net) => {
		if (synergyMap.has(net)) {
			return synergyMap.get(net);
		}
		const synergies = possibleSynergy
			.map((synergy) => {
				let count = new Array(10).fill(0);

				synergy.forEach((v) => {
					count[net[v]]++;
				});
				let str = '';
				for (let i = 1; i <= 9; i++) {
					for (let j = 0; j < count[i]; j++) {
						str += `${i}`;
					}
				}
				return mapOfpriceOfSynergy.get(+str);
			})
			.sort((a, b) => a - b);
		const result = BigInt(synergies[0] + synergies[48] + synergies[24]);
		synergyMap.set(net, result);
		return result;
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
	const priceOfMine = cube.map((net) => {
		const target = [...net].map(Number);
		const net0 = Math.abs(3 - ((target[1] + target[3] + target[4]) % 9)) <= 4 ? 1 : 0;
		const net1 =
			Math.abs(5 - ((target[0] + target[3] + target[4] + target[5] + target[2]) % 9)) <= 4 ? 1 : 0;
		const net2 = Math.abs(3 - ((target[1] + target[5] + target[4]) % 9)) <= 4 ? 1 : 0;

		const net3 =
			Math.abs(5 - ((target[0] + target[1] + target[4] + target[6] + target[7]) % 9)) <= 4 ? 1 : 0;
		const net4 =
			Math.abs(
				8 -
					((target[0] +
						target[1] +
						target[2] +
						target[3] +
						target[5] +
						target[6] +
						target[7] +
						target[8]) %
						9)
			) <= 4
				? 1
				: 0;
		const net5 =
			Math.abs(5 - ((target[2] + target[1] + target[4] + target[7] + target[8]) % 9)) <= 4 ? 1 : 0;

		const net6 = Math.abs(3 - ((target[7] + target[3] + target[4]) % 9)) <= 4 ? 1 : 0;
		const net7 =
			Math.abs(5 - ((target[5] + target[3] + target[4] + target[6] + target[8]) % 9)) <= 4 ? 1 : 0;
		const net8 = Math.abs(3 - ((target[7] + target[5] + target[4]) % 9)) <= 4 ? 1 : 0;

		return net0 + net1 + net2 + net3 + net4 + net5 + net6 + net7 + net8;
	});

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
	cube.forEach((net) => {
		const num = [...net].reduce((r, v, i) => {
			if (+v % 2 == 0) {
				r |= 1 << (8 - i);
			}
			return r;
		}, 0);

		valueOfChess += BISHOP[num];
	});
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
	return `${board[i + 1][j + 1]}${board[i + 1][j + 2]}${board[i + 1][j + 3]}${board[i + 2][j + 1]}${
		board[i + 2][j + 2]
	}${board[i + 2][j + 3]}${board[i + 3][j + 1]}${board[i + 3][j + 2]}${board[i + 3][j + 3]}`;

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

function rotateParts90(str) {
	return `${str[6]}${str[3]}${str[0]}${str[7]}${str[4]}${str[1]}${str[8]}${str[5]}${str[2]}`;
}
function rotateParts180(str) {
	return `${str[8]}${str[7]}${str[6]}${str[5]}${str[4]}${str[3]}${str[2]}${str[1]}${str[0]}`;
}
function rotateParts270(str) {
	return `${str[2]}${str[5]}${str[8]}${str[1]}${str[4]}${str[7]}${str[0]}${str[3]}${str[6]}`;
}

function rotateZero(cube) {
	const one = cube[1];
	const two = cube[2];
	const three = cube[3];
	const four = cube[4];

	const newOne = four[0] + four[1] + four[2] + one[3] + one[4] + one[5] + one[6] + one[7] + one[8];
	const newTwo = one[0] + one[1] + one[2] + two[3] + two[4] + two[5] + two[6] + two[7] + two[8];
	const newThree = two[0] + two[1] + two[2] + three[3] + three[4] + three[5] + three[6] + three[7] + three[8];
	const newFour = three[0] + three[1] + three[2] + four[3] + four[4] + four[5] + four[6] + four[7] + four[8];

	return [cube[0], newOne, newTwo, newThree, newFour, cube[5]];
}

function rotateFive(cube) {
	const one = cube[1];
	const two = cube[2];
	const three = cube[3];
	const four = cube[4];

	const newOne = one[0] + one[1] + one[2] + one[3] + one[4] + one[5] + four[6] + four[7] + four[8];
	const newTwo = two[0] + two[1] + two[2] + two[3] + two[4] + two[5] + one[6] + one[7] + one[8];
	const newThree = three[0] + three[1] + three[2] + three[3] + three[4] + three[5] + two[6] + two[7] + two[8];
	const newFour = four[0] + four[1] + four[2] + four[3] + four[4] + four[5] + three[6] + three[7] + three[8];

	return [cube[0], newOne, newTwo, newThree, newFour, cube[5]];
}

function rotateOne(cube) {
	const zero = cube[0];
	const two = cube[2];
	const five = cube[5];
	const four = cube[4];

	const newZero = four[8] + zero[1] + zero[2] + four[5] + zero[4] + zero[5] + four[2] + zero[7] + zero[8];
	const newTwo = zero[0] + two[1] + two[2] + zero[3] + two[4] + two[5] + zero[6] + two[7] + two[8];
	const newFive = two[0] + five[1] + five[2] + two[3] + five[4] + five[5] + two[6] + five[7] + five[8];
	const newFour = four[0] + four[1] + five[0] + four[3] + four[4] + five[3] + four[6] + four[7] + five[6];

	return [newZero, cube[1], newTwo, cube[3], newFour, newFive];
}

function rotateTwo(cube) {
	const zero = cube[0];
	const three = cube[3];
	const five = cube[5];
	const one = cube[1];

	const newZero = zero[0] + zero[1] + zero[2] + zero[3] + zero[4] + zero[5] + one[8] + one[5] + one[2];

	const newThree = zero[6] + three[1] + three[2] + zero[7] + three[4] + three[5] + zero[8] + three[7] + three[8];
	const newFive = three[6] + three[3] + three[0] + five[3] + five[4] + five[5] + five[6] + five[7] + five[8];
	const newOne = one[0] + one[1] + one[2] + five[0] + one[4] + five[1] + one[6] + one[7] + five[2];

	return [newZero, newOne, cube[2], newThree, cube[4], newFive];
}

function rotateThree(cube) {
	const zero = cube[0];
	const four = cube[4];
	const five = cube[5];
	const two = cube[2];

	const newZero = zero[0] + zero[1] + two[2] + zero[3] + zero[4] + two[5] + zero[6] + zero[7] + two[8];
	const newFour = zero[8] + four[1] + four[2] + zero[5] + four[4] + four[5] + zero[2] + four[7] + four[8];
	const newFive = five[0] + five[1] + four[6] + five[3] + five[4] + four[3] + five[6] + five[7] + four[0];
	const newTwo = two[0] + two[1] + five[2] + two[3] + two[4] + five[5] + two[6] + two[7] + five[8];

	return [newZero, cube[1], newTwo, cube[3], newFour, newFive];
}

function rotateFour(cube) {
	const one = cube[1];
	const five = cube[5];
	const three = cube[3];
	const zero = cube[0];

	const newOne = zero[2] + one[1] + one[2] + zero[1] + one[4] + one[5] + zero[0] + one[7] + one[8];
	const newFive = five[0] + five[1] + five[2] + five[3] + five[4] + five[5] + one[0] + one[3] + one[6];
	const newThree = three[0] + three[1] + five[8] + three[3] + three[4] + five[7] + three[6] + three[7] + five[6];
	const newZero = three[2] + three[5] + three[8] + zero[3] + zero[4] + zero[5] + zero[6] + zero[7] + zero[8];

	return [newZero, newOne, cube[2], newThree, cube[4], newFive];
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
const priceOfCubes = standardNets.map((standardNet) => {
	const rotatedCube = getrotatedCube(standardNet);

	const caseOfRotate = rotatedCube.map((cube) => {
		const priceOfNumber = getPriceOfNumber(cube);
		const priceOfNeighbor = getPriceOfNeighbor(cube);

		const priceOfSynergy = BigInt(0);
		//  getPriceOfSynergy(cube);

		const priceOfMine = getPriceOfMine(cube);
		const priceOfChess = getPriceOfChess(cube);

		const priceOfCube = getPriceOfCube(
			priceOfNumber,
			priceOfNeighbor,
			priceOfSynergy,
			priceOfMine,
			priceOfChess
		);

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
console.timeEnd('kk');
