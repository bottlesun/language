// 1-2 자바스크립트 스펙 외우지 마세요. [callstack]

// stack 이란 호출을 할때마다 stack이 쌓이는 것을 말한다.
// 저금통 , 명함 처럼 밑에서 붙어 쌓이고 위에서 부터 밑으로 실행 // (선입후출) lifo , filo

// queue 한쪽 끝에서 시작하면 다른쪽 끝에서 끝이 되는 통로같은 것을 말한다.
// 줄을 서서 기다리는 것 // (선입선출) fifo

// 선언과 호출 차이를 착각하지 말기

const x = 'x';
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

//scope - 특정 함수에서 어떤 값에 접근 할 수 있는 있는지 알 수 있다.

// 1-3 호출 스택 분석
// js를 위에서부터 아래로 선언 한다.
// a()의 호출로 function a() 문으로 간다.
// stack 1 const x
// stack 2 console.log('a')
// b() 호출
// stack 3 const z
// stack 4 console.log('b')
// c() 호출
// stack 5 const y
// stack 6 console.log('c')
// 호출문을 빠져나와서 들어갔던 c() 밑으로 이동
// 마지막에 있는 c() 호출

// 정답 a , b ,c , c