for (let i = 0; i < 1 << 9; i++) {
	let x = i;
	let cnt = 0;
	while (x > 0) {
		if ((x & 1) == 1) {
			cnt++;
		}
		x >>= 1;
	}
	if (cnt == 5)
		console.log(
			i
				.toString(2)
				.padStart(9, '0')
				.split('')
				.reduce((r, v, i) => {
					if (v == '1') r.push(position[i]);
					return r;
				}, [])
		);
}
