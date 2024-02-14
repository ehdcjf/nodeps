//https://www.acmicpc.net/problem/24524
//https://u.acmicpc.net/9034be9c-41f3-4192-a956-49ccfea442d4/2022skku_solution.pdf
// 풀이보고 풀었음
const [S, T] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const A = new Array(T.length).fill(0);
for (let i = 0; i < S.length; i++) {
	const s = S[i];
	if (!T.includes(s)) continue;
	if (s == T[0]) A[0] += 1;
	else {
		const index = T.indexOf(s);
		if (A[index - 1] > 0) {
			A[index - 1] -= 1;
			A[index] += 1;
		}
	}
}

console.log(A[A.length - 1]);
