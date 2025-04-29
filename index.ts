const [[N], S] = require('fs')
	.readFileSync('./dev/stdin').toString().split('\n').map((v:string)=>v.split(" ").map(Number))

console.log(N,S)

let start = 0;
let end = 0;
let fruits = [0,0,0,0,0,0,0,0,0]


while(S[start]==S[end]){
    start+=1
    fruits[S[start]-1]+=1
}
let maxLength =  start-end+1

while(start<N){
    while(fruits.filter(v=>v>0).length<=2){

    }
    while(end<start){

    }
}






