https://github.com/ehdcjf/nodeps.git


const [N, ...rawData] = require('fs')
	.readFileSync('./dev/stdin').toString().split('\n')
const [r, c] = N.split(' ').map(Number)
const graph = rawData.map(v => v.trimEnd().split(''))
const start = { r: 0, y: 0 }
for (let i = 0; i < r; i++) {
	for (let j = 0; j < c; j++) {
		if (graph[i][j] == 'I') {
			start.r = i;
			start.c = j;
		}
	}
}
const visited = Array.from(new Array(r), () => Array(c).fill(false))