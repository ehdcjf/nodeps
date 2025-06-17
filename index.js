// 1708
const [[N], ...values] = require('fs')
	.readFileSync('./dev/stdin').toString().trim().split('\n').map(v => v.trim().split(' ').map(Number))

const base = values.reduce((a, b) => (a[1] < b[1] || (a[1] === b[1] && a[0] < b[0])) ? a : b);

console.log(base)

values.sort((a, b) => {
	if (a[0] == b[0]) {
		return a[1] - b[1]
	}
	else return a[0] - b[0]
})


class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}



function ccw(p1, p2, p3) {
	const [x1, y1] = p1;
	const [x2, y2] = p2;
	const [x3, y3] = p3;
	return (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
}

points.sort((a, b) => {
	const ccwResult = ccw(base, a, b);
	if (ccwResult > 0) return -1;   // a가 b보다 반시계 방향
	if (ccwResult < 0) return 1;    // b가 a보다 반시계 방향
	// 같은 방향이면 기준점과의 거리로 정렬 (가까운 것 먼저)
	const distA = (a[0] - base[0]) ** 2 + (a[1] - base[1]) ** 2;
	const distB = (b[0] - base[0]) ** 2 + (b[1] - base[1]) ** 2;
	return distA - distB;
});