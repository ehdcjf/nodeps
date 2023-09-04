//돌은 1개, 3개 또는 4개 가져갈 수 있다.
//마지막 돌을 가져가는 사람이 게임을 이기게 된다.
//두 사람이 완벽하게 게임을 했을 때,
//이기는 사람을 구하는 프로그램을 작성하시오.
//게임은 상근이가 먼저 시작한다. SK  CY

const input = +require('fs').readFileSync('./dev/stdin').toString().trim();

const SK = true;
const CY = false;

let dp = [];
dp[1] = SK;
dp[2] = CY;
dp[3] = SK;
dp[4] = SK;
for (let i = 5; i <= 1000; i++) {
	dp[i] = !dp[i - 1] || !dp[i - 3] || !dp[i - 4];
}
console.log(dp[input] ? 'SK' : 'CY');
