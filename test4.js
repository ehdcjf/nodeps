const [[N, M], sonnohms] = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));

/**
	손놈이 들어온 순간에는 무조건 서빙을 한다.
	즉 손놈이 들어온 순간에는 서빙 외에 무엇도 할 수 없다.
	손놈이 들어오기 전에 
		1. 토기를 제작하고, 
		2.토기에 커피를 담는다.  
	총 2의 시간이 필요.

	즉 t가 0 또는 1 이면  fail이다.

	토기가 흙탕물이 되는 시간이 있으니
	2+M 시간 전에 두 작업이 이루어지기만 하면 될거같음

 	M=1 일때.
	2에 토기에 담긴 커피는 3에 흙이됨.  
	근데 3에 들어온 손놈까지는 허용가능^^ 

	그냥 한별이는 무조건 남는시간에 토기를 만드는게 최선,
	
	손놈 오는 시간 전에 커피가 흙탕물이 안되는 선에서 
	커피을 토기에 담아야함. 
	손놈이 4의 시간에 입장하면, 최소 3의 시간에는 커피를 담아야함.
*/

let serving = Array(1000001).fill(true);

let now = 0;
let togi = 0;
sonnohms.forEach((sonnohm) => {
	serving[sonnohm] = false;
});

const Last = sonnohms[sonnohms.length - 1];
let sonnohm = 0;

while (now <= Last) {
	console.log(now, togi, sonnohms[sonnohm]);
	if (now < sonnohms[sonnohm]) {
		if (!serving[now]) {
			if (togi == 0) {
				togi++;
			} else {
				if (now + M >= sonnohms[sonnohm]) {
					togi--;
					sonnohm++;
				} else {
					togi++;
				}
			}
		}
		now++;
	}
}

console.log(sonnohm);
