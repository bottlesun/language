// 1-5 호이스팅
// 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미

// 검사 하는 방법
// var 은 최상단으로 올린다.
// function()은 전체를 위로 올린다 (var 아래)
// const 등은 그자리 그대로 유지

// 선언을 가장 위로 작성하고, 선언하기 전에 호출접근을 안하면 호이스팅 고려를 안할 수 있다. (되도록 지키기)

var y; // 여러번 선언되어도 문제가 없다. 호이스팅 되도 최상단만 올라가기 떄문에, 오류가 날 확률이 높다. 직관적(x)

function c() {
  const y = 'y';
  console.log('c');
  function b() {
    const z = 'z';
    console.log('b');
    c()
  }
}
function a() {
  console.log('a');
  b()
  console.log(x);   // TDZ Temporal Dead Zone - 선언보다 더 위에서 변수에 접근을 하는것을 말한다. (이런 상황 피하기)
  const x = 'x2';
  console.log(z) // 해당 z는 a 안에서의 z라 TDZ에서 예외
}


y = 'hehe';
const z = () => {}; // 이 위의 코드는 z 에 대해서는 TDZ가 된다. (같은 스코프 안에서만 적용)
a();
c();
