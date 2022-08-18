// 클로저 문제 -> 스코프 , 비동기 , var
// 클로저가 문제다 (x)
// 클로저를 사용해서 헤결하는 문제
// for문(반복문)과 비동기를 함께 사용하면 종종 발생

// 문제 : var 과 for과 비동기의 환상의 콜라보
// 해결법 : var 유지 -> 즉시 실행함수로 클로저 생성
// 해결법 : var -> let으로 변경

function a() {
  for (var i = 0; i < 5; i++) { // 1 가 5가 되고, 5 < 5가 flase
    setTimeout(() => {
      console.log(i);
    }, i * 1000) // 0 , 1000, 2000, 3000, 4000
  }
}

// function a 스코프는 1개고, for문의 스코프는 5개
// a 스코프에서 i는 0->5가 되는거고, for 문의 스코프 5개에서 i는 각 0,1,2,3,4

// 호출스택
// anony 종료
// a 종료
// setT 종료
// setT
// a
// anonymouse -> this = window

// 선언 map
// anonymouse - fun a
// a -> i 0 , 1, 2, 3, 4, 5 로 변경 // var 는 함수 스코프를 따른다.
// for -> i (x)
// () => i -> 부모 요소에 i가 있나 올라간다.

// background
// tf 1
// tf 2
// tf 3
// tf 4
// tf 5

/* 즉시실행함수 사용 방법
function a() {
  for (var i = 0; i < 5; i++) {
  (function(j) { // var j = i; 의 역할을 해줌
      setTimeout(() => {
      console.log(i);
    }, i * 1000)
  })(i)
  }
}
 */