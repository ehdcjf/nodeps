const [[N], ...rawData] = require('fs')
	.readFileSync('./dev/stdin').toString().trim().split('\n').map(v => v.trim().split(' ').map(Number))

