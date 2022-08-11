const x = true;
let y = false;

function a() {
  let a = 4;
  y = true;
  if (x) {
    let a = 3;
    for (let i = 0; i < a; i++) {
      console.log(i)
    }
    if (y) { // flase 의 경우 실행이 되지 않기에 분석 x 없는샘 친다
      kkk();
    }
  }
  // z(); // 호출을 한 상태에서 선언이 되지 않았기 때문에 에러
}

a();
const z = (a, b) => {return a + b}; // TDZ
z(3, 5) // 8
// function z( ) or var z 의 경우 호이스팅이 되기때문에 최 상단으로 올라간다. const let 은 안됨


/* 블록 스코프 분석 */
// a -> anonymouse
// a if(x) -> a -> anonymouse
// a for -> a if(x) -> a -> anonymouse

/* 호출스택 분석 */
// 3. z          / this -> window
// 2. a          / this -> window
// 1. anonymouse / this -> window


/* 선언 map */
// 1. anoymouse   / a(fun), x(true) , y(false)
// 2. a           / a(4)  -> a 가 재선언 될 수 있는 이유는 다른 스코프 이기 때문이다.
// 1-2. anoymouse / y -> trun 변경
// 3. a if(x)     / a(3)
// 4. a if(x) for / i(0) , a(3) ( 반복문의 경우 스코프가 계속 생성 )
// 5. a if(x) for / i(1) , a(3) ( 반복문의 경우 스코프가 계속 생성 )
// 6. a if(x) for / i(2) , a(3) ( 반복문의 경우 스코프가 계속 생성 )
/* 반복문으로 생성된 스코프는 형제스코프기에 서로간의 접근이 불가능하다. */
//1-3. anoymouse  / z(fun) 추가
// 7. z           / a(3) , b(5) 매개변수 추가

