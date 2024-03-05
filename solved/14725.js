// https://www.acmicpc.net/problem/14725
// 개미굴

class AntHillItem {
	constructor(word, end = false) {
		this.word = word;
		this.end = end;
		this.children = new Map();
	}

	hasChild(word) {
		return this.children.has(word);
	}

	addChild(word, isEnd = false) {
		if (this.children.has(word)) return;
		this.children.set(word, new AntHillItem(word, isEnd));
		return this.children.get(word);
	}

	getChild(word) {
		return this.children.get(word);
	}
}

class AntHill {
	constructor() {
		this.head = new AntHillItem('*');
	}

	addPath(words) {
		let current = this.head;
		let index = 0;
		while (index < words.length) {
			const word = words[index];
			const isEnd = index == words.length - 1;
			if (!current.hasChild(word)) {
				current.addChild(word, isEnd);
			}
			const nextNode = current.getChild(word);
			if (!nextNode) return;

			current = nextNode;
			index++;
		}
	}

	print(node, depth = 0) {
		if (node.end == true) return '';
		return [...node.children.entries()]
			.sort((a, b) => (a[0] >= b[0] ? 1 : -1))
			.map(([w, c]) => {
				return ['-'.repeat(2 * depth) + w, this.print(c, depth + 1)]
					.filter((v) => v.length > 0)
					.join('\n');
			})
			.join('\n');
	}
}

const anthill = new AntHill();
const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n');
input.shift();
input.forEach((p) => {
	const [_, ...path] = p.split(' ');
	anthill.addPath(path);
});
const result = anthill.print(anthill.head);
console.log(result);
