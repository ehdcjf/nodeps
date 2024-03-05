// https://www.acmicpc.net/problem/31458
// !!초콜릿 중독 주의!!

const 입력값 = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
const 정답 = [];
for (let 반복 = 1; 반복 < input.length; 반복++) {
	const 스택 = [];
	const 문자열 = 입력값[반복];
	for (let 문자인덱스 = 0; 문자인덱스 < 문자열.length; 문자인덱스++) {
		if (스택.length == 0) {
			스택.push(문자열[문자인덱스]);
		} else {
			if (스택[스택.length - 1] == '!') {
				스택.push(문자열[문자인덱스]);
			} else {
				스택.pop();
				스택.push('1');
			}
		}
	}
	const 마지막정수 = 스택.pop();
	const 스택길이 = 스택.length;
	if (스택길이 % 2 == 0) 정답.push(마지막정수);
	else 정답.push(마지막정수 == '0' ? '1' : '0');
}

console.log(정답.join('\n'));
