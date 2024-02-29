var figlet = require('figlet');

figlet('Price Of Chess ', function (err: any, data: any) {
	if (err) {
		console.log('Something went wrong...');
		console.dir(err);
		return;
	}
	console.log(data);
});
