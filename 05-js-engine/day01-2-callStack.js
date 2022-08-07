// 1-2 자바스크립트 스펙 외우지 마세요. [callstack]

// stack 이란 호출을 할때마다 stack이 쌓이는 것을 말한다.
// 저금통 , 명함 처럼 밑에서 붙어 쌓이고 위에서 부터 밑으로 실행 // (선입후출) lifo , filo

// queue 한쪽 끝에서 시작하면 다른쪽 끝에서 끝이 되는 통로같은 것을 말한다.
// 줄을 서서 기다리는 것 // (선입선출) fifo

const x = 'x';
function c() {
  const y = 'y';
  console.log('c');
}

function a() {
  const x = 'x';
  console.log('a');
  function b(){
    const z = 'z';
    console.log('b');
  }
  b()
}

a(); // a , b , c
c(); // c