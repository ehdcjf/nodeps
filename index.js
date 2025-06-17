// 15824
const [[N], values] = require('fs')
	.readFileSync('./dev/stdin').toString().trim().split('\n').map(v => v.trim().split(' ').map(Number))
values.sort((a, b) => a - b)
const MOD = BigInt(1_000_000_007)

const POWER = [BigInt(1)]
for (let i = 1; i < N; i++) {
	POWER.push(POWER[i - 1] * BigInt(2) % MOD)
}

let answer = BigInt(0);
for (let i = 1; i <= N; i++) {
	const jooheonMiseryIndex = BigInt(values[i - 1]) * (POWER[i - 1] - POWER[N - i])
	answer = ((answer + jooheonMiseryIndex) % MOD + MOD) % MOD
}
console.log(answer.toString())



