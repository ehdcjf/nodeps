// https://www.acmicpc.net/problem/13459
// 구슬 탈출

class Item {
	next: null | Item = null;
	constructor(public value: any) {}
}

class Queue {
	head: null | Item = null;
	tail: null | Item = null;
	size = 0;
	constructor() {}

	push(value: any) {
		const node = new Item(value);
		if (this.head == null) {
			this.head = node;
		} else if (this.tail) {
			this.tail.next = node;
		}
		this.tail = node;
		this.size += 1;
	}

	pop() {
		if (this.head) {
			const popItem = this.head;
			this.head = this.head.next;
			this.size -= 1;
			return popItem.value;
		} else {
			return null;
		}
	}
}

const input: string[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');

const [R, C] = input.shift()!.split(' ').map(Number);
const board = input.map((v) => v.split(''));
let redX: number;
let redY: number;
let blueX: number;
let blueY: number;
let outX: number;
let outY: number;

for (let i = 0; i < R; i++) {
	for (let j = 0; j < C; j++) {
		if (board[i][j] == 'R') {
			redX = i;
			redY = j;
			board[i][j] = '.';
		}
		if (board[i][j] == 'B') {
			blueX = i;
			blueY = j;
			board[i][j] = '.';
		}
		if (board[i][j] == 'O') {
			outX = i;
			outY = j;
		}
	}
}

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
const q = new Queue();
let answer = 0;
q.push([redX!, redY!, blueX!, blueY!, 0]);

while (q.size > 0 && answer == 0) {
	const [orx, ory, obx, oby, c] = q.pop();
	for (let i = 0; i < 4; i++) {
		let rx = orx;
		let ry = ory;
		let bx = obx;
		let by = oby;
		let redEnd = false;
		let blueEnd = false;
		while (!(redEnd && blueEnd)) {
			let nrx = rx;
			let nry = ry;
			let nbx = bx;
			let nby = by;
			if (!redEnd) {
				nrx += dx[i];
				nry += dy[i];
			}
			if (!blueEnd) {
				nbx += dx[i];
				nby += dy[i];
			}

			if (
				board[nrx][nry] == '.' &&
				!(board[bx + dx[i]][by + dy[i]] == '#' && nrx == bx && nry == by)
			) {
				// 새로운 빨강공이 갈수 있는 위치면
				//  벽이 아니고
				//  해당 위치에 파란공이 없거나
				//  파란공이 있어도 파란공 역시 이동할 수 있는 경우
				rx = nrx;
				ry = nry;
			} else if (board[nrx][nry] == 'O') {
				rx = nrx;
				ry = nry;
				redEnd = true;
			} else {
				redEnd = true;
			}

			if (
				board[nbx][nby] == '.' &&
				!(board[rx + dx[i]][ry + dy[i]] == '#' && nbx == rx && nby == ry)
			) {
				bx = nbx;
				by = nby;
			} else if (board[nbx][nby] == 'O') {
				bx = nbx;
				by = nby;
				blueEnd = true;
			} else {
				blueEnd = true;
			}
		}

		if (board[bx][by] == 'O' || (rx == orx && ry == ory && bx == obx && by == oby)) {
			continue;
		} else if (board[rx][ry] == 'O' && board[bx][by] != 'O') {
			answer = 1;
			break;
		} else {
			if (c < 9) q.push([rx, ry, bx, by, c + 1]);
		}
	}
}

console.log(answer);
