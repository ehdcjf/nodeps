for (let i = 0; i < 1 << 9; i++) {
	let arr = Array.from(Array(3), () => Array(3).fill(0));
	let x = i;
	let k = 0;
	while (x > 0) {
		if ((x & 1) == 1) {
			arr[Math.floor(k / 3)][k % 3] = 1;
		}
		x >>= 1;
		k++;
	}

	const cross = Array.from(Array(2 * 3), () => []);

	for (let a = 0; a < 3; a++) {
		for (let b = 0; b < 3; b++) {
			if (arr[a][b] == 1) cross[a + b].push([a, b]);
		}
	}
	let visited = Array.from(Array(2 * 3), () => false);
	let max = 0;
	function dfs(n, cnt) {
		if (max >= cnt + 2 * 3 - 1 - n) return;

		if (n >= 2 * 3 - 1) {
			max = Math.max(cnt, max);
			return;
		}

		cross[n].forEach(([i, j]) => {
			// console.log(i - j + N);
			if (visited[i - j + 3] == false) {
				visited[i - j + 3] = true;
				dfs(n + 1, cnt + 1);
				visited[i - j + 3] = false;
			}
		});
		dfs(n + 1, cnt);
	}

	dfs(0, 0);

	const tt = parseInt(arr.flat().reverse().join(''), 2);
	console.log(max);
}
