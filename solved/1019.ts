// https://www.acmicpc.net/problem/1019
// 책 페이지
/**
 * solution
 * ....수학문제
 */
const input: number = +require('fs').readFileSync('./dev/stdin').toString().trim();
const nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let start = 1;
let end = input;
let mul = 1;

function calc(num: number, mul: number) {
	while (num > 0) {
		nums[num % 10] += mul;
		num = Math.floor(num / 10);
	}
}

while (start <= end) {
	while (start % 10 !== 0 && start <= end) {
		calc(start, mul);
		start++;
	}

	while (end % 10 !== 9 && end >= start) {
		calc(end, mul);
		end--;
	}
	if (start > end) break;
	start = Math.floor(start / 10);
	end = Math.floor(end / 10);

	for (let i = 0; i < 10; i++) {
		nums[i] += (end - start + 1) * mul;
	}
	mul *= 10;
}

console.log(nums.join(' '));
