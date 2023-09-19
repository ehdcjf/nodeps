let students = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.split('\n')
	.map((v) => v.trim().split(' '));

students.shift();

while (students.length > 1) {
	const student = students.shift();
	const target = (student[student.length - 1] - 1) % students.length;
	const front = students.slice(0, target);
	const rear = students.slice(target + 1, students.length);
	students = [...rear, ...front];
}
console.log(students[0][0]);
