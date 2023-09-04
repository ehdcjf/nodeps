const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const strings = input.map((v) => v.trim().split(''));
const set = new Set();
const sample = [];
for (let i = 0; i < M; i++) {
	let str = '';
	for (let j = 0; j < N; j++) {
		str += strings[j][i];
	}
	sample.push(str);
}
let cnt = 0;
while (true) {
	for (let i = 0; i < M; i++) {
		const s = sample[i].slice(cnt);
		if (!set.has(s)) {
			set.add(s);
		} else {
			console.log(cnt - 1);
			process.exit();
		}
	}
	cnt++;
}
