//github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/trie/TrieNode.js
//github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/trie/Trie.js
class TrieNode {
	children: Map<string, TrieNode>;

	constructor(public character: string, public isEndOfWord = false) {
		this.children = new Map();
	}
	addChild(character: string, isEndOfWord = false) {
		if (!this.children.has(character)) this.children.set(character, new TrieNode(character, isEndOfWord));

		const childNode = this.children.get(character)!;

		childNode.isEndOfWord = childNode.isEndOfWord || isEndOfWord;
		return childNode;
	}

	getChild(character: string) {
		return this.children.get(character);
	}

	hasChild(character: string) {
		return this.children.has(character);
	}

	hasChildren() {
		return this.children.size != 0;
	}

	suggestChildren() {
		return [...this.children.keys()];
	}

	toString() {
		let childrenAsString = this.suggestChildren().toString();
		childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
		const isEndOfWord = this.isEndOfWord ? '*' : '';
		return `${this.character}${isEndOfWord}${childrenAsString}`;
	}

	removeChild(character: string) {
		const childNode = this.getChild(character);
		if (childNode && !childNode.isEndOfWord && !childNode.hasChildren()) {
			this.children.delete(character);
		}
		return this;
	}
}

class Trie {
	head: TrieNode;
	constructor() {
		this.head = new TrieNode('*');
	}

	addWord(word: string) {
		const characters = Array.from(word);
		let currentNode = this.head;
		for (let i = 0; i < characters.length; i++) {
			const isEndOfWord = i === characters.length - 1;
			currentNode = currentNode.addChild(characters[i], isEndOfWord);
		}
		return this;
	}

	getLastCharacterNode(word: string) {
		const characters = Array.from(word);
		let currentNode = this.head;

		for (let i = 0; i < characters.length; i++) {
			if (!currentNode.hasChild(characters[i])) return null;
			currentNode = currentNode.getChild(characters[i])!;
		}

		return currentNode;
	}

	suggestNextCharacter(word: string) {
		const lastCharacter = this.getLastCharacterNode(word);
		if (!lastCharacter) return null;
		return lastCharacter.suggestChildren();
	}

	doesWordExist(word: string) {
		const lastCharacter = this.getLastCharacterNode(word);
		return !!lastCharacter && lastCharacter.isEndOfWord;
	}

	deleteWord(word: string) {
		const depthFirstDelete = (currentNode: TrieNode, charIndex = 0) => {
			if (charIndex >= word.length) return null;

			const character = word[charIndex];
			const nextNode = currentNode.getChild(character);
			if (nextNode == null) return null;

			depthFirstDelete(nextNode, charIndex + 1);

			if (charIndex === word.length - 1) {
				nextNode.isEndOfWord = false;
			}
			currentNode.removeChild(character);
		};

		depthFirstDelete(this.head);
		return this;
	}
}
