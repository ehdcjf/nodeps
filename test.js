const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const a = input[1].split(' ').map(Number);

let now = a[0];
let gain = 0;

for (let i = 1; i < a.length; i++) {
	if (now > a[i]) {
		now = a[i];
	} else {
		gain = Math.max(a[i] - now, gain);
	}
}
console.log(gain);
