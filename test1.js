const possibleNum = [];

function possibleNumDfs(arr) {
	if (arr.length == 5) {
		possibleNum.push(arr);
		return;
	} else {
		for (let i = 0; i < 5; i++) {
			if (!arr.includes(i)) {
				possibleNumDfs([...arr, i]);
			}
		}
	}
}

possibleNumDfs([]);

console.log(JSON.stringify(possibleNum));
