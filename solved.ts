const solved = await(Bun.file('./index.ts')).text();
const pnum = +solved.split('\n')[0].split('/').pop()!;

if (typeof pnum != 'number') {
	console.error('require link');
	process.exit(1);
}
const fileName = `./solved/${pnum}.ts`;

if (await Bun.file(fileName).exists()) {
	console.error('File already exists');
	process.exit(1);
}

await Bun.write(fileName, solved);
console.log(`🎉Solved ${pnum}`);
