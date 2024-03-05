// https://www.acmicpc.net/problem/31458
// !!초콜릿 중독 주의!!
/*입력
첫 번째 줄에는 수식의 개수 $T$가 주어진다.
$(1\le T\le 1\, 000)$


두 번째 줄부터 $T$개의 수식이 한 줄에 하나씩 주어진다.
하나의 수식은 $a$개의 느낌표, 정수 $n$, $b$개의 느낌표가 공백 없이 순서대로 합쳐진 형태이다.
$(0\le a,b\le 30;$ $0\le n\le 1)$

출력
각 수식을 계산한 결과를 한 줄에 하나씩 출력한다.

*/const input: string[] = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n')
const N = input.shift();