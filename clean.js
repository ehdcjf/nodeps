const fs = require('fs');
const prompts = require('prompts');

(async () => {
	const { action } = await prompts([
		{
			type: 'select',
			name: 'action',
			message: '😊',
			choices: ['🎉 Solved!', '😒 Give up'].map((v) => {
				return {
					title: v,
					value: v.split(' ')[0],
				};
			}),
		},
		// {
		// 	type: (prev) => (prev == '🎉 New!' ? 'text' : null),
		// 	name: 'directory',
		// 	message: 'Directory? ',
		// },
		// {
		// 	type: 'text',
		// 	name: 'module',
		// 	message: 'Module?',
		// },
	]);
	const file = fs.readFileSync('index.js').toString();
	const fileName = file.split('\n')[0].split('/').pop();

	if (!Number.isInteger(fileName)) {
		console.error('require link');
		process.exit(1);
	}

	switch (action) {
		case '🎉':
			fs.writeFileSync(`./solved/${fileName}.js`, file);
			fs.writeFileSync(
				'index.js',
				`const input = require('fs').readFileSync('./dev/stdin').toString().trim();`
			);
			break;
		case '😒':
			fs.writeFileSync(`./giveup/${fileName}.js`, file);
			fs.writeFileSync(
				'index.js',
				`const input = require('fs').readFileSync('./dev/stdin').toString().trim();`
			);
			break;
	}
})();
