const list = [
	29, 27, 5, 39, 78, 36, 85, 15, 73, 23, 91, 22, 24, 32, 9, 76, 65, 6, 18, 71, 59, 11, 48, 20, 90, 40, 43, 45, 8,
	58, 95, 70, 79, 84, 83, 63, 96, 37, 28, 93, 80, 1, 74, 54, 7, 87, 3, 17, 86, 47, 46, 69, 75, 89, 66, 98, 30, 68,
	35, 13, 97, 12, 62, 92, 49, 55, 94, 72, 52, 4, 31, 14, 61, 44, 33, 51, 53, 42, 10, 88, 34, 56, 19, 25, 2, 67,
	57, 82, 77, 50, 100, 81, 26, 64, 38, 21, 60, 41, 99, 16,
];

class SelectionSort {
	/**
	 *
	 * @param {*} comparator "ASC" 오름차순 | "DESC" 내림차순
	 */
	constructor(comparator) {
		comparator = comparator || 'ASC';

		/**
		 *
		 */
		this.comparator = comparator == 'ASC' ? (a, b) => a < b : (a, b) => a > b;
	}
	sort(arr) {
		const array = [...arr];

		for (let i = 0; i < array.length - 1; i++) {
			let minIndex = i;

			for (let j = i + 1; j < array.length; j += 1) {
				if (this.comparator(array[j], array[minIndex])) {
					minIndex = j;
				}
			}

			if (minIndex == i) continue;

			[array[i], array[minIndex]] = [array[minIndex], array[i]];
			console.log(array);
		}

		return array;
	}
}

const ss = new SelectionSort('ASC');

const sortedList = ss.sort(list);

console.log(sortedList);
