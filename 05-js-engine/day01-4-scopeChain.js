// 1-4 스코프 체인
// 전역 객체 및 중첩된 함수의 스코프의 레퍼런스를 저장하고 연결된 상태를 보여주는 것
// {} 블록이 기준이 된다. / 선언이 기준


// anonymouse -> 익명함수 파일 전체를 뜻한다.
// Lexical Scope ( 어휘적 범위 ) - 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정되는 것

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
  b()
  // a() 함수 선언문에서 기준에서 b() 함수의 접근이 가능 한지 확인 ( 없다 X -> 부모함수로이동)
  // (부모) anonymouse 함수에서 b() 함수가  있는지 확인 (없다 X -> 부모함수로이동 x (최상위 함수) -> b()가 없다 판단. )
}

a();
c();


// 선언 간 지도 ( 접근 가능 )
// anony -> x ,c, a
// c -> y, b
// b -> z
// a -> x
// x 중복일 경우 현재 위치에서 가장 가까운 값이(우선순위) 들어온다.