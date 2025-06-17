# 음수에 대한 모듈러 연산

모듈러 연산은 __0 이상 MOD 미만의 정수__ 로 표현되어야 함.
```javascript
const MOD = 7
const a = -3
console.log(a%MOD) // -3
```
```mod 7```에서 가능한 나머지는 ```0, 1, 2, 3, 4, 5, 6```  
```-3```은 유효하지 않은 모듈러 값이기 때문에  음수의 경우는

 ```(NUMBER % MOD + MOD) % MOD``` 이런 식으로 MOD 값을 더하고 한번더 모듈러 연산을 수행




# 모듈러 연산 기본 법칙

### 덧셈

(a + b) mod m  = (a mod m + b mod m) mod m

### 뺼셈

(a - b) mod m  = (a mod m - b mod m) mod m


### 곱셈

(a * b) mod m  = ((a mod m) * (b mod m)) mod m