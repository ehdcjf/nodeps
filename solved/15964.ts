// https://www.acmicpc.net/problem/15964
// 이상한 기호
const [A, B]: number[] = require('fs').readFileSync('./dev/stdin').toString().trim().split(' ').map(Number);
console.log((A + B) * (A - B));
