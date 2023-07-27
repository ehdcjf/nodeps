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

const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');

const answer = [];

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

while (true) {
	const [M, N] = input.shift().split(' ').map(Number);
	if (N == 0) {
		console.log(answer.join('\n'));
		process.exit();
	}
	const board = getBoard(N);
	const points = [];
	let symbol = 1;
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < M; j++) {
			if (board[i][j] == 'o') {
				board[i][j] = 0;
				points.unshift([i, j]);
			} else if (board[i][j] == '*') {
				board[i][j] = symbol++;
				points.push([i, j]);
			}
		}
	}
	const L = points.length;

	const cost = Array.from(Array(L), () => Array(L).fill(Infinity));
	for (let i = 0; i < L; i++) {
		const visited = Array.from(Array(N), () => Array(M).fill(false));
		const [cx, cy] = points[i];
		visited[cx][cy] = true;
		const q = new Queue();
		q.push([cx, cy, 0]);
		while (q.length > 0) {
			const [x, y, c] = q.pop();
			for (let k = 0; k < 4; k++) {
				const nx = x + dx[k];
				const ny = y + dy[k];
				if (nx < 0 || ny < 0 || nx >= N || ny >= M || visited[nx][ny] || board[nx][ny] == 'x')
					continue;
				visited[nx][ny] = true;
				q.push([nx, ny, c + 1]);

				if (board[nx][ny] != '.' && board[nx][ny] > i && cost[i][board[nx][ny]] > c + 1) {
					cost[i][board[nx][ny]] = c + 1;
					cost[board[nx][ny]][i] = c + 1;
				}
			}
		}
	}

	let visited = Array(L).fill(false);
	const q = new Queue();
	let result = Infinity;
	q.push(0);
	visited[0] = true;

	function dfs(now, sum, cnt) {
		if (sum > result) return;
		if (cnt == L) {
			result = Math.min(result, sum);
			return;
		}
		const next = cost[now];
		for (let i = 0; i < L; i++) {
			if (visited[i]) continue;
			visited[i] = true;
			dfs(i, sum + next[i], cnt + 1);
			visited[i] = false;
		}
	}
	dfs(0, 0, 1);
	if (result == Infinity) result = -1;
	answer.push(result);
}

function getBoard(N) {
	const board = [];
	for (let i = 0; i < N; i++) {
		const line = input.shift().split('');
		board.push(line);
	}
	return board;
}
