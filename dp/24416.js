const input = +require('fs').readFileSync('./dev/stdin').toString().trim();
let recursionCnt = 0;
const dpCnt = input - 2;

function recursionFn(n) {
	if (n == 1 || n == 2) {
		recursionCnt++;
		return 1;
	} else {
		return recursionFn(n - 1) + recursionFn(n - 2);
	}
}
recursionFn(input);
console.log(recursionCnt, dpCnt);
