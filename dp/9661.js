//상근이와 창영이는 턴을 번갈아가면서 돌을 가져가며,
//돌은 4x개 만큼 가져갈 수 있다.
//즉, 가능한 개수는 1, 4, 16, 64, ...개 이다.
//4x개만큼 돌을 가져갈 수 있는 방법이 없는 사람이 게임을 지게 된다.

//두 사람이 완벽하게 게임을 했을 때,
//이기는 사람을 구하는 프로그램을 작성하시오.
//게임은 상근이가 먼저 시작한다.
//(1 ≤ N ≤ 1,000,000,000,000)

const input = +require('fs').readFileSync('./dev/stdin').toString().trim();
// let dp = [];
// let sk = true;
// let cy = false;
// dp[1] = sk;
// dp[2] = cy;
// dp[3] = sk;
// dp[4] = sk;

// for (let i = 4; i <= Math.pow(4, 3); i++) {
// 	dp[i] = Number.isInteger(Math.log(i) / Math.log(4)) ? true : false;
// 	for (let j = 1; j < i; j *= 4) {
// 		dp[i] = dp[i] || !dp[i - j];
// 		if (dp[i] == true) break;
// 	}
// }

// for (let i = 1; i <= Math.pow(4, 3); i++) {
// 	console.log(`${i}: ${dp[i] ? 'SK' : 'CY'}`);
// }

//    1  2  3  4  5
//    sk cy sk sk cy

const winner = ['SK', 'CY', 'SK', 'SK', 'CY'];

console.log(winner[(input - 1) % 5]);
