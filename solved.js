const solved = await Bun.file('./index.js').text();
const pnum = +solved.split('\n')[0].split('/').pop();

if (typeof pnum != 'number') {
	console.error('require link');
	process.exit(1);
}
const fileName = `./solved/${pnum}.js`;

if (await Bun.file(fileName).exists()) {
	console.error('File already exists');
	process.exit(1);
}

await Bun.write(fileName, solved);
console.log(`🎉Solved ${pnum}`);
