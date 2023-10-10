for (let i = 1; i <= 100; i++) {
	list.push(i);
}

for (let i = list.length - 1; i > 0; i -= 1) {
	const randomIndex = Math.floor(Math.random() * (i + 1));
	[list[i], list[randomIndex]] = [list[randomIndex], list[i]];
}

console.log(list);
