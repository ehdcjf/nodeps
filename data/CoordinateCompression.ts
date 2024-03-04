const arr = [1, 100, 2, 3030, 10, -1, 0, 1, 99, 100, 101, 10000];
const set = [...new Set(arr)]
	.sort((a, b) => a - b)
	.reduce((r: any, v, i) => {
		r[v] = i;
		return r;
	}, {});
const result = arr.map((v) => set[v]);
console.log(result);
