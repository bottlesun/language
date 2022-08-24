# 인간 엔진 Js - 제로초님 강의 정리

## 함수의 정의 , 함수의 호출의 차이점 과 고차함수

### [ 함수의 정의와 함수의 호출의 차이점 ]

**함수의 정의란?**

함수를 호출 하기 이전에 인수를 전달 받을 매개 변수와 실행문 , return 값을 지정하고 선언 하는것을 말한다.

```jsx
// 1. 함수 선언문
function add (x,y) {
return x + y ;
}

// 2. 함수 표현식
const add2 function(x,y) {
return x + y;
}

//3. function 생성자 함수
const add3 = new function('x','y','return x+y');

//4. 화살표 함수 (es6)
const add4 = (x,y) => x+y;
```

**함수의 호출이란?**

정의된 함수를 실행하기 위해 필요한 인수를 매개변수를 통해 함수에 전달하여 함수를 실행시키는 것을 말한다.

함수를 호출하면 코드 블록 속에 담긴 실행문을 실행하여 결과값을 return 한다.

```jsx
//함수의 정의

const add = (a,b) => a + b;
// (a + b) ({a+  b})  return 을 생략 하고 사용.  (a,b) => return a + b; 이랑 같은 뜻
// ()를 사용해줘야 할때는, 객체를 리턴 해줘야 할때 사용한다.
// {} 객체만 사용 할 경우 js는 함수의 body로 인식한다. (return이 안됨.)

function calculator (func,a,b) { // 매개변수 function , a ,b 를 받는다.
  return func(a,b);
}

// 함수의 호출
add(3,5); // a + b 를 return 한다. // 8
calculator(add,3,5) //8  // add() 함수의 호출 X
```

실제 클릭 이벤트를 사용할때, 자주 실수하는 부분에 대한 예시

```jsx
const header = document.querySelector('#header');

function add() {
hello(); 
  return a.style.backgroundColor = '#333'
}

function hello(){
  return a.style.color='red'
}

// o add 함수선언을 클릭 시 함수를 실행한다는 의미
header.addEventListener('click' , add )

// x add() 함수의 호출 return값을 의미
header.addEventListener('click' , add() ) // error
```

### [ 고차함수 ]

함수 안에서 다른 함수를 return 하는 함수

고차 함수를 사용 할 경우 함수의 리턴을 사용 해도 error 가 안난다.

```jsx
const header = document.querySelector('#header');

const onClick = () => () => { // 고차함수
  console.log('hello');
}

/* 화살표 함수의 경우 return () => 랑 같은 의미
const onClick = () => {
  return () => { // 고차함수
    console.log('hello');
  }
}
*/

header.addEventListener('click' , onClick());
// 함수의 호출을 return 값으로 대체 해보면 말이 되는 코드인지 아닌지 알 수 있다
```

### [ React 속 함수 사용 ]

```jsx
import {useCallback} from 'react';

export const App = () => {
  const onClick = useCallback((e) => {
    console.log(e.target);
  },[]);

  return (
    // <div onClick={onClick()}></div> // x
    <div onClick={onClick}></div>
// o 매게변수를 넣지않아서, 함수호출 값이 아닌 함수선언을 넣어줘야한다.
  )
}
```

---

## 콜 스택 (Call Stack) & 콜백 큐( Callback Queue)

콜스택(**call stack) 이란?**

함수를 호출을 추적할때 사용하는 것이다. 콜 스택은 각 함수 (function)의 호출 마다 1개의 stack이 쌓인다.

호출 된 함수가 끝나면 call stack 도 빠져나가게 된다. ( 부모 → 자식 으로 쌓이고 자식 → 부모 로 나가게 된다. )

(명함 지갑 처럼 밑으로 쌓이고 위에서 부터 빠져나가는 선입 후출 방식)

**콜백 큐( Callback Queue) 란?**

이벤트를 처리하기 위한 메시지 큐, 처리할 메시지의 대기열을 사용하여 메시지 처리를 한다.

이벤트 루프의 시점, 대기열에서 가장 오래된 메시지 부터 큐에서 꺼내 처리를 한다.

꺼낸 메시지를 매개변수로, 메시지에 연결된  함수를 호출 한다. (함수를 호출 하기 때문에, 그 함수에 대한 스택도 쌓인다. )

스코프(scope) 란?

함수 에서 변수와 매개 변수의 접근성 여부 를 뜻한다. 유효 범위에 따라서, 접근성과 Life time 을 제어 할 수 있다. 스코프의 종류에는 전역 스코프 ( global scope ) 와 지역 스코프 ( local scope ) 가 있다.

### [ 호출 스택( call stack ) 분석 ]

```jsx
function c() {
  const y = 'y';
  console.log('c');
  debugger; // sources 화면으로 이동
}

function a() {
  const x = 'x';
  console.log('a');
  function b(){
    const z = 'z';
    console.log('b');
    c() // 호출
  }
  b() // 호출
}

// 닫는 순서대로 빠져나온다.
a(); // a , b , c
c(); // c
```

> 1) javascript 문서의 전체를 위에서부터 아래로 선언을 한다. ( 호출이 아닌 선언 )
>
>
> 2) 선언 이후 a() 호출 - function a()로 이동 한다.
>
> stack 1 ) const x
>
> stack 2 ) console.log(’a’)
>
> 3) b() 호출 - function b() 로 이동 한다.
>
> stack 3 ) const z
>
> stack 4 ) console.log(’b’)
>
> 4) c() 호출 - function c() 로 이동 한다.
>
> stack 5 ) const y
>
> stack 6 ) console.log(’c’)
>
> 실행 후 다시 내려와서 마지막에 c() 호출로 인해 , 다시 fun c 를 실행.
>
> **[ 실행 결과 - console 출력 : a , b , c , c ]**
>

함수 처리는 스택이 텅 빌때 까지 계속 되며, 큐에 메시지가 남아 있으면 같은 방법으로 모든 큐와 스택이 사라질때까지, 진행 된다.

---

## 스코프 체인 (Scope chain)

전역 객체 와 중첩된 함수의 스코프의 레퍼런스를 차례로 저장하고, 스코프의 연결된 상태를 보여주는 것을 말한다.

**anonymouse 란?**

익명 함수 파일 전체를 뜻한다. ( 가장 상위 의 위치 )

**Lexical Scope(어휘적 범위) 란?**

함수를 어디서 호출 하는지가 아니라, 어디에 선언 하는지에 따라 결정 된다.

### [ 선언지도( 접근가능 한 함수 ) 분석 ]

```jsx
const x = 'x';
function c() { // c -> anonymouse
  const y = 'y';
  console.log('c');
  function b(){ // b -> c -> anonymouse (부모함수 순서)
    const z = 'z';
    console.log('b');
    c()
  }
}
function a() { // a -> anonymouse
  const x = 'x';
  console.log('a');
  b() //Error Uncaught ReferenceError: b is not defined
}

a();
c();
```

a() 함수 선언문에서 기준에서 b() 함수의 접근이 가능 한지 확인 ( 없다 X -> 부모함수로이동)
(부모) anonymouse 함수에서 b() 함수가  있는지 확인

(없다 X -> 부모함수로이동 x (최상위 함수) -> b()가 없다 판단. )

> [접근가능 지도]
>
>
> anonymouse →  const x , fun c , fun a (접근 가능)
>
> fun c → const y , fun b (접근 가능)
>
> fun b → const z (접근 가능)
>
> fun a → const x (접근 가능)
>
> - const x 의 중복 경우에는 현재 위치에서 가장 가까운 값이 (우선순위) 로 들어온다.

---

## 호이스팅 (**Hoisting**)

변수와 함수의 메모리 공간을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 미리 선언하는 것을 말한다.

**[ 검사하는 방법 ]**

- var 로 선언 한 변수는 제일 상단으로 올린다.
- function() 함수 전체를 상단으로 올린다.
- const let 등은 그 자리로 유지 시킨다.

**[코드 작성 시 호이스팅을 고려 하지 않을 수 있는 방법 ]**

선언을 가장 위로 작성하고, 선언전 호출 접근을 하지 않으면 대다수의 상황에서는 호이스팅 고려를 하지 않을 수 있다.

### [ 호이스팅 고려 하기 ] - 문제점 찾기

```jsx
var y; // 문제 1
function c() {
  var y = 'y';
  console.log('c');
  function b() {
    const z = 'z';
    console.log('b');
    c()
  }
}
function a() {
  console.log('a');
  b()  // 문제 2
  console.log(x);  // 문제 3
  const x = 'x2';
  console.log(z)  // 예외 문제1
}
const x = 'x';
y = 'hehe';
const z = () => {}; // 예외 문제1 이 문제가 될 수 있으려면?
a();
c();
```

1.  **var 사용**

**var -** es6 이전에 사용 되던, 변수 선언 방식

```jsx
var y; // var 사용
function c() {
  var y = 'y'; // 중복 선언이 가능 하다.
  console.log('c');
  function b() {
    const z = 'z';
    console.log('b');
    c()
  }
}
```

[ var의 문제 ]

var 같은 경우 호이스팅이 되어, 최상단으로 올라오기 때문에 여러번 선언이 되어도 문제가 없다.

오류가 날 확률 이 높고, 코드가 직관적이지 못하며 변화가 심하다  사용x

1. **접근 할 수 없는 스코프 체인**

```jsx
function c() {
  var y = 'y'; // 문제1
  console.log('c');
  function b() {
    const z = 'z';
    console.log('b');
    c()
  }
}

function a() {
  console.log('a');
  b()  // 스코프체인 에러
  console.log(x);  // 문제 3
  const x = 'x2';
  console.log(z)  // 예외 문제1
}
```

**[ 스코프 체인 문제 ]**

fun a() 에서 b() 를 호출 했지만 fun c() 블럭 안에 b() 가 들어있기에

1. **TDZ ( Temporal Dead Zone )**

변수의 선언보다 더 위에서 해당 변수를 호출 하는 것을 말한다.

```jsx
function a() {
  console.log('a');
  b()  // 스코프체인 에러
  console.log(x); // TDZ
  const x = 'x2';
  console.log(z)  // 예외 문제1 - 해당 z는 a 안에서의 z라 TDZ에서 예외
}
console.log(z) // fun a()가 아닌 밖으로 나와있다면  TDZ
const z = () => {}; 
```

[ TDZ 의 문제 ]

console.log(x) 가 const x 가 선언이 되지 않은 상태에서, 호출이 되는 상태를 말한다.

console.log(z) 의 경우는 fun a() 스코프 안에 들어 있기 때문에 tdz 예외 상황이 된다.

---

## this

자신이 속한 객체 또는 자신이 생성 할 인스턴스를 가리키는 참조변수를 뜻한다.

this 를 브라우저 콘솔에 치면 , window 가 나온다. 아무값이 없을때 this 는 기본적으로 window를 가르킨다.

```jsx
console.log(this) // window

function a() {
  'use strict' // strict 모드 에서의 this
  console.log(this) // undefined
}

a();
```

> java Script 에서의 this -> window , globalThis
>
>
> node 에서의 this → global , globalThis
>

### **[ this 가 바뀌는 상황 ]**

- 객체의 메서드를 호출 하는 경우

() ⇒ {} 화살표 함수의 경우는 부모 scope를 선언하기에 this 가 바뀌지 않는다.

```jsx
const obj = {
  name: 'bottlesun',
  sayName() {
    console.log(this.name);
    // bottlesun 출력
  }
};

const sayN = obj.sayName;
sayN() //아무것도 출력 되지 않음
obj.sayName() // bottlesun 
```

결론 - this는 함수가 호출 될때, 기준으로 정해진다. (아무것도 없으면 window기준)
sayN() 이 실행 되었을때, sayN 기준의 this 는 anonymouse → window 이기에 undefined 출력

obj.sayName() 가 실행 되었을 때, obj.sayName 기준 에 name의 값이 있어서 그 값이 this 가 된다.

- **new 를 사용 하여 새로 값을 생성 할 경우**

```jsx
**function Human(name) {
  this.name = name; // 기준 window
}

const a = new Human('bottlesun') //  bottlesun 이 기준이 된다

console.log(a.name) // bottlesun**
```

결론 - this 는 객체  자기 자신이 된다.

객체의 값을 새로 설정 해줄 경우, 매게변수의 값이 this 가 된 것을 볼 수 있다.

- **this 를 바꿔주는 함수를 사용 하는 경우 - bind() , apply() , call()**

```jsx
function sayName() {
  console.log(this.name);
}

// bind() 는 this만 바꾼 새로운 함수를 만들어준다. 호출을 해야하기에 ()를 붙여준다.
sayName.bind({name: 'bottlesun'})()
// apply() 는 호출까지 해준다. // 매개변수를 배열로 넣어준다 ex) a.apply(null , [1,2])
sayName.apply({name: 'bottlesun'})
// call() 은 호출까지 해준다. // 매개변수를 순서대로 넣어준다. ex) a.apply(null , 1,2)
sayName.call({name: 'bottlesun'})
```

### **[ this 에 따른 값 이 달라지는 상황 정리]**

```jsx
const obj2 = {
  name: 'bottlesun', // 메서드 값
  sayName() {
    console.log(this.name);
    // 객체의 메서드를 호출 하고 있다.
    // bottlesun
    function inner() {
      console.log(this.name);
      // 함수 호출 기준으로 this를 바꿔주는 동작을 하지 않았기에 window 기준
      // (빈칸)
    }

    inner() // 호출 기준 메서드 X -> window
  }
}
// scope : inner -> sayName() -> anonymouse
```

### **[ 화살표 함수의 경우 ]**

```jsx
// 부모 함수의 this 기준
const obj3 = {
  name: 'bottlesun',
  sayName() {
    console.log(this.name);
    // 객체의 메서드를 호출 하고 있다.
    // bottlesun
    const inner = () => {
      console.log(this.name);
      // bottlesun 이 된다.
    }
    inner()
  }
}
obj3.sayName();
```

결론 -  화살표 함수는 부모 함수의 this 기준을 가진다.

inner 의 this.name 은 원래 함수 호출 기준으로 잡아 window 가 나와야 하지만,

화살표 함수의 경우 부모 함수 this가 기준으로 적용 되기에  bottlesun 이 출력이 된다.

> **[ 호출 스택 분석 ]**
>
>
> anonymouse -> (this = window)
>
> obj3.sayName() -> 화살표 함수인지 아닌지 여부 확인 ( 아니다 this 변경 / this = Obj3 )
>
> inner() -> 화살표 함수인지 아닌지 여부 확인 ( 맞다 this -> 부모요소로 가지고 온다 / this = Obj3 )
>

> **[ inner() 가 화살표함수가 아닌 function 이라면? ]**
>
>
> anonymouse -> (this = window)
>
> obj3.sayName() -> 화살표 함수인지 아닌지 여부 확인 ( 아니다 this 변경 / this = Obj3 )
> inner() -> 화살표 함수인지 아닌지 여부 확인 ( 아니다 호출 위치에 따른 this 변경 -> this = window )
>

### [ this 를 분석 할 수 없는 케이스 ]

```jsx
const header = document.querySelector('.header');
header.addEventListener('click', function () {
  // function은 함수의 선언이지 호출이 아니라 this를 알 수가 없다.
  console.log(this) // header
})

header.addEventListener('click', () => {
  // 화살표 함수의 경우는 부모의 this를 따라간다.
  console.log(this) // window
})

```

```jsx
// addEventListener 의 분석 (추측)

const header = {
  addEventListener : function (eventName,callback) {
    callback.call(this) // this 가 header
    callback.call(header)
  }
}
```

결론 - callStack의 기준으로 this 가 달라진다.

---

## 블럭스코프 (BlockScope)

블록스코프는 블록{ }이 생성 될 때 마다 새로운 스코프가 형성 되는 것을 말한다.

```scss
const x = true;
let y = false;

function a() {
  let a = 4;
  y = true;
  if (x) {
    let a = 3;
    for (let i = 0; i < a; i++) {
      console.log(i) // 0 , 1 , 2
    }
    if (!y) { 
		// flase 의 경우 실행이 되지 않기에 분석 x 없는샘 친다
       kkk();
    }
  }
  z();
}

a();
const z = (a, b) => {return a + b};
z(3, 5) // 8

```

결론 -

if 문 에서의 { } 블럭 스코프는 if 조건 값이 flase 일 경우,  블럭 스코프 내부를 검사하지 않고 스킵한다.

const z = (a, b) => {return a + b} 처럼 함수의 경우 호이스팅으로 인해, 최상단으로 올라간다.

> **[ 접근 가능 블록스코프 분석 ]**
>
>
>  fun a → anonymouse
>
>  a if() -> fun a -> anonymouse
>
>  a for → a if() → fun a → anonymouse
>

> **[ 호출스택 분석 ]**
>
> 1. anonymouse  / this → window
> 2. a() / this → window
> 3. z() / this → window

> **[  선언 MAP ]**
>
>
> 1. anoymouse   / a(fun), x(true) , y(false)
> 2. a           / a(4)  -> a 가 재선언 될 수 있는 이유는 다른 스코프 이기 때문이다.
>
>  1-2. anoymouse / y -> trun 변경
> 3. a if(x)     / a(3)
>  4. a if(x) for / i(0) , a(3) ( 반복문의 경우 스코프가 계속 생성 )
>  5. a if(x) for / i(1) , a(3) ( 반복문의 경우 스코프가 계속 생성 )
>  6. a if(x) for / i(2) , a(3) ( 반복문의 경우 스코프가 계속 생성 )
      > /* 반복문으로 생성된 스코프는 형제 스코프기에 서로간의 접근이 불가능하다. */
      > 1-3. anoymouse  / z(fun) 추가
>  7. z           / a(3) , b(5) 매개변수 추가
>


## 비동기 콜백 ( Promise )

비동기처리가 필요한 이유는?

자바스크립트는 싱글 스레드로 프로그램이 동작한다.

싱글 스레드는 한번에 한가지의 일만 처리가 가능하기에 , 수많은 데이터를 한번에 뿌려주거나 작업을 해야 하는 경우 동기적 처리만 한다고 했을 때, 시스템 효율이 매우 떨어지게 되기 때문에 비동기적인 작업이 필요하다.

### [ 비동기와 동기의 차이]

**동기 callback**

```jsx
// 동기 callback
function calculator(callback, a, b) {
  return callback(a, b)
}
calculator(function () {
  return x + y
}, 3, 5);
```

**promise**
객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다.

```jsx
// promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

// 프로미스의 장점 - 코드를 분리 해서 사용 할 수 있다.
// 결괏값이 필요할때 사용, 가능
```

프로미스의 장점 - 코드를 분리해서 사용 할 수 있다.

결괏값이 필요할 때, 불러서 사용 할 수 있다.

**[ Promise.all() , Promise.allSettled() 의 사용]**

여러 개의 프로미스를 동시에 실행시키고 모든 프로미스가 준비될 때까지 기다려야 하는 상황이 있다.

복수의 URL에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 이런 상황이 발생할때, 사용 한다.

```jsx
promise.then(() => {
  console.log('a')
});

const p2 = axios.get('서버주소2') // 성공
const p3 = axios.get('서버주소3') // 성공
const p1 = axios.get('서버주소1') // 성공
const p4 = axios.get('서버주소4') // 실패
const p5 = axios.get('서버주소5') // 성공
const p6 = axios.get('서버주소6') // 성공

// .catch 는 .then 까지의 대한 catch 이다.
```

**[ Promise.all() ]**

여러개의 프로미스를 처리 할때 사용한다.

모든 프로미스가 이행될 때 까지 기다렸다가 그 결괏값을 담은 배열을 반환한다.

```jsx
Promise.all([p1, p2, p3, p4, p5, p6])
.then((result) => {})
.catch((error) => {});
```

.all() 의 단점 -> 하나라도 실패 시 전부 실패

**[ Promise.allSettled() ]**

.allSettled() 는 성공 실패를 나눠서 반환 해준다.

```jsx

Promise.allSettled([p1, p2, p3, p4, p5, p6])
.then((result) => {  // 실패한 것만 필터링 해서 다시 시도 가능
})
.catch((error) => {})
.finally(() => {});
```

.catch 는 .then 까지의 대한 catch 이다.

---

## 비동기 호출 스택 분석하기

### [비동기 콜백의 호출 스택 분석]

```jsx
setTimeout(() => { // 비동기 callback
  console.log('a');
}, 0);

Promise.resolve().then(() => {
  // p 가 먼저 실행 된다.
  console.log('p')
})

setTimeout(() => {
  console.log('b');
}, 1000);

setTimeout(() => {
  console.log('c');
}, 2000);

// 한번 비동기는 영원한 비동기
// 비동기는 동시의 문제가 아닌, 순서의 문제다.
```

위의 함수와 비교 했을 때, 사람이 느끼기엔 동시 실행이지만 마이크로 큐 스택이 우선이기에  console.log(’p’) 가 먼저 실행 된다

> **[호출스택]**
>
>
> anonymouse - 파일 실행이 끝났으므로 js 종료
> sto - c 실행 후 빠져나감
> sto - b 실행 후 빠져나감
> sto - a 실행 후 빠져나감
> anonymouse
>

[ **비동기에서 필요한 event loop ]**

event loop 의 역할 호출 스택이 비어있을때 함수를 하나씩 끌어 올려준다.

- **task queue**

background 에서 특정조건 ( ex -> timeout 초 , event 조건 ) 이 만족이 되면 task queue 로 저장

- **background**

추상적인 개념으로 임의로 만들어 생각하는 부분 background

js 엔진이 아닌  web or node 엔진
event , time ,http , 네트워크 등등... (비동기)

> **[ background** ]
>
>
> setTimeout 0
>
> setTimeout 1000
>
> setTimeout 2000
>

**[ 다시 확인하기 ]**

```jsx
setTimeout(() => {
  console.log('M');
}, 0);

Promise.resolve().then(() => {
  // 위의 함수와 비교 했을때 사람이 느끼기엔 동시 실행이지만 마이크로 큐스택이 우선이기에
  // p 가 먼저 실행 된다.
  console.log('p')
});
```

---

### promise 동기 함수 알아보기

Promise 란, 실행은 바로 하되, 결괏값을 나중에 원할 때 쓸 수 있는 것

```jsx
let a = 2;
const p = new Promise((resolve, reject) => {
  // Promise 안에 함수가 선언 되고 p 에 대입이 되고 밑으로 넘어간다.
  // 해당 내부 함수는 동기 코드 이다.
  console.log('제일먼저') // 호출 순서 1

  setTimeout(() => {
    // 정상적인 흐름에서 바뀌어 있을때, 비동기
    a = 5;
    console.log(a); // 호출 순서 3
    resolve(a);
  }, 0)
});

// 딴짓딴짓
console.log('딴짓'); // 호출 순서 2

p.then((result) => {
  console.log('result', result) // // 호출 순서 4
});
```

Promise 안에 함수가 선언 되어, p 에 대입이 되고 밑으로 넘어간다.
해당 내부 함수는 동기 코드 이다.

> **[ 호출분석 ]**
>
>
> 전부 실행 후 anonymouse 빠져나감
> 4 빠져나감
> 4. P.then 호출
     > 3 빠져나감
> 3. console.log(딴짓)
     > 2 빠져 나감.
     > setTimeout
     > console.log(제일) 실행
>  2. (resolve) => {} (익명함수 호출)
> 1. anonymouse
>

> **[ 선언 map ]**
1. anonymouse -> a (2) , p실행
2. anonymouse -> a (5) 변경
>

> **[ background (비동기실행) ]**
2. p.then , fun 저장
1. time , fun 저장
>

> M - 1. time(fun) 호출스택 실행
m - 2. p(5) 저장 호출스택 실행
>

호출스택 , bg , 큐 가 전부 비워 있으면,  js 종료.

---

## async/await  Promise 로 바꾸기

async 와 await 는 프로미스 를 좀 더 편하게 사용 할 수 있게 해준다.

비동기 문법을 동기 문법 처럼 가독성있게 해주는 장점이 있다.

```jsx
/* p 상위 코드 참조 */

p.then((result) => {
  console.log('result', result)
  // return 1 -> 일반 값을 리턴 시 해당 값이 다음으로 넘어간다.
  return Promise.resolve(1) //value: 1 (Promise)
// Promise 를 리턴하면 resolve 된 값이 다음으로 넘어간다.
}).then((result) => {
  console.log(result) // 1
  return undefined;
}).then((result) => {
  // 함수는 return 이 없으면 undefined 이기에 undefined
  console.log(result) // undefined
}).then(() => {

}).catch(() => {
  // 에러로 이동
}).finally(() => {
  // then , catch 와 상관 없이 실행
});
```

**Promise.resolve(value)**

일반 리턴 값으로 넘길 시 해당 값이 다음 블럭 스코프로 넘어가지만

**Promise.resolve(value) 사용 하면** Promise 의 value 값 을 리턴 할 수 있다.

### [ async / await ]

```jsx
async function as() {
	/* await가 시작 하기 전 */
  const a = await 1; // await -> then
  // a = axios.get();
  // a = Promise;
  console.log('a', a);
  console.log('hmm');
  await null;
  const b = await Promise.resolve(1); // Promise.resolve 값을 넘겨준다.
  console.log('b', b);
  return b
}
```

**async / await 비동기 함수를 분석 시에 유의해야할 점**

async 함수의 끝은 await 가 시작 되기 전이다. (해당 부분은 동기부분이다. )
promise 나 axios 같은 값들의 경우 변경할때, 그냥 치환하여 사용이 가능하다.

**async / await 를 Promise 로 바꾸는 규칙 ( 1 : 1 대응이 아님 )**

- await 수 만큼 then 호출
- 순서 - 왼쪽-> 오른쪽 , 위-> 아래로

### [ Promise 로 변경 ]

```jsx
Promise.resolve(1) // ex.1 ) axios.get().then()
  .then((a) => { // 대입 값 const = a
    // await 에서 await 사이 전부를 가지고 온다.
    console.log('a', a);
    console.log('hmm');
    return null; //  마지막 await의 경우는 return
  })
  .then(() => { // 대입값이 없으니 비워준다.
    return Promise.resolve(1);
  })
  .then((b) => {
    console.log('b', b);
    return b;
  });

a().then((result) => {
  console.log(result)
}).then((result2) => {
  console.log(result2)
})
```

> **[ 호출스택 ]**
>
>
> anonymouse 종료
>
> 2 실행 후 종료
>
> 2. a
>
> 1. anonymouse
>

> **[ 선언 map ]**
>
>
> anonymouse ->  a fun
>

event loop

> [ background ]
>
>
> await
>
> await
>
> await
>
> as then
>
> as then
>

> M -
>
>
> m - p1
>

---

### setTimeout 을 Promise로 바꾸는 법

```jsx
function delayP(ms) { // setTimeout 을 Promise 로 바꾸는 법
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
    reject(error)
  })
};
```

**[ async / await ]**

```jsx
async function AsyncB() {
  // 두개 이상을 동시에 실행 시키는 상황 일 경우 async 안에서도 promise 도 사용한다.
  const p1 = delayP(3000);
  const p2 = delayP(6000);
  await promise.all([p1, p2]);//6초
  await delayP(9000); // 9초
} // 토탈 15초
```

### async / await Promise 로 바꾸기

```jsx
async function c() {
  const a = await 1;
  const b = await 2;

  return a + b;
}
```

**[ promise ]**

```jsx
Promise.resolve(1) // await retrun 1
  .then((a) => { // const a resolve 값이 대입
    return 2 // retrun 2 
  })
  .then((b) => { // const b retrun 2 값이 대입
    return a + b // a + b
  })
```

**[즉시실행함수]**

```jsx
(function () {
    let a; // 선언
    let b; // 선언
    return Promise.resolve(1) // await 1
      .then((result) => {  // result = 1
        a = result  // a = 1
        return 2;  
      })
      .then((result) => { // result = 2
        b = result // b = 2 
        return a + b; // 시적 허용
      })
  })();
```

[실전 예제]

```jsx
async function createPost() {
  const post = await db.getPost() // 게시물 조회;
  if (post) {
    res.status(403).send('이미 존재합니다.')
  } else {
    await db.createPost();  // 게시글 작성
    //항상 동시에 진행 될 수 있는게 있는지 확인하기
    const p1 = db.userIncrementPostCount(); // 사용자 게시글 카운트 1 올림
    const p2 = db.createNoti(); // 새로운 게시글 알림 등록
    awaitpromise.allSettled([p1, p2]);
  }
}
```

Promise 란, 실행은 바로 하되, 결괏값을 나중에 원할 때 쓸 수 있는 것.

실행은 바로 --> 결괏값이 나올 때는 나중에 --> 결괏 값이 사용 할 때는 더 나중

실행은 바로 --> 결괏값도 바로 쓰고 싶은데 --> 그 다음에 결괏값이 나오면 --> then , await, promise.all 이런 결괏값을 기다린 후에 실행된다.

**[ map과 for of 의 동작차이 ]**

```jsx
const results= awaitPromise.all([p1,p2,p3]);

results.map(async () => {
  await result조작(); //p1,p2,p3 동시에 조작
});

for (let result ofresults) {
  await result조작(); // p1 이 끝난 후 p2 , p3 순차적으로 조작
}

let array= [];
for(let result ofresults){
array.push(result조작())
}

const x= true;
const y= false;
```

[ 부분적 스코프 ]

```jsx
/* 부분적으로 스코프 사용해보기 */
function a2() {
  let a = 4;
  const y = true;
  if (x) {
    let a = 3;
    for (let i = 0; i < a; i++) {
		console.log(i, a) // i - 0,1,2 , a - 3
    }
    if (!y) {
      kkk()
    }
  }
}
a2();
```

---

## 클로저 ( Closure )

클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. 클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다.

### 클로저의 문제

스코프 , 비동기 , var 에서 일어난다.

반복문과 비동기를 함께 사용 하면 발생 한다.

```jsx
function a() {
  for (var i = 0; i < 5; i++) { // 1 가 5가 되고, 5 < 5가 flase
    setTimeout(() => {
      console.log(i); 
    }, i * 1000) // 0 , 1000, 2000, 3000, 4000
  }
}
```

> 원하는 console.log(i) 값
>
>
> 1, 2 ,3, 4 ,5  순차적인 출력
>
> 출력 값
>
> 5, 5, 5, 5, 5
>

**[문제 발생 이유]**

function a 스코프는 1개고, for문의 스코프는 5개 이다.

fun a 기준에서 i 는 0 → 5 로 바로 넘어가게 되고, for문 에서는 0 , 1 , 2 , 3 , 4 가 된다.

var로 사용 할 경우, 강제로 선언을 맨 위로 끌어 올리기 때문에 fun a 기준에서 스코프 관점을 바라보게 된다.

> **호출스택**
>
>
> Anonymouse 종료
>
> a 종료
>
> setT 종료
>
> setT
>
> a
>
> anonymouse -> this = window
>

> **선언 map**
>
>
> anonymouse - fun a
>
> a -> i 0 , 1, 2, 3, 4, 5 로 변경 // var 는 함수 스코프를 따른다.
>
> for -> i (x)
>
> () => i -> 부모 요소에 i가 있나 올라간다.
>

> event loop ( background ) - 호출스택이 비어지면 하나씩 생성 ,
>
>
> setTimeout Fun 1
>
> setTimeout Fun 2
>
> setTimeout Fun 3
>
> setTimeout Fun 4
>
> setTimeout Fun 5
>

해결방법 1 - var 유지 → 즉시 실행 함수로 클로저 생성

해결방법 2 - var → let 으로 변경

**[ 즉시실행 함수 변환 ]**

```jsx
/* 즉시실행함수 사용 방법 */
function a() {
  for (var i = 0; i < 5; i++) {
  (function(j) { // var j = i; 의 역할을 해줌
      setTimeout(() => {
      console.log(i);
    }, i * 1000)
  })(i)
  }
}
```
