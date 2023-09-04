const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on('line', function (line) {
	if (isNaN(Number(line))) {
		const f = line.split(' ').map((v) => {
			if (v == 'swimming') return 'soccer';
			else return 'swimming';
		});
		console.log(f.join(' '));
		process.exit();
	} else {
		console.log(Array(1500).fill('bowling').join(' '));
		readline.cursorTo(process.stdout, 0, 0);
		readline.clearScreenDown(process.stdout);
	}
}).on('close', function () {
	process.exit();
});
