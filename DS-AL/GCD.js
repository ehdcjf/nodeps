let getGCD = (num1, num2) => (num2 > 0 ? getGCD(num2, num1 % num2) : num1);

let getGCD2 = (num1, num2) => {
	while (num2 > 0) {
		let r = num1 % num2;
		num1 = num2;
		num2 = r;
	}

	return num1;
};
