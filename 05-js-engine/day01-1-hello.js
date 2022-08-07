// 1-1 함수와 함수의 호출 , 고차함수

const add = (a,b) => a + b; // (a + b) ({a+  b})  return 을 생략 하고 사용.  (a,b) => return a + b; 이랑 같은 뜻
// ()를 사용해줘야 할때는, 객체를 리턴 해줘야 할때 사용한다.
// {} 객체만 사용 할 경우 js는 함수의 body로 인식한다. (return이 안됨.)

function calculator (func,a,b) { // 매게변수 function , a ,b 를 받는다.
  return func(a,b);
}

add(3,5); // a + b 를 return 한다. // 8
calculator(add,3,5) //8  // add() 함수의 호출 X


// document.querySelector('#header').addEventListener('click' , add() ) // x add() 함수의 호출 return값을 의미
// document.querySelector('#header').addEventListener('click' , add ) // o add 함수선언을 클릭 시 실행한다는 의미


/* 고차함수 - 함수안에서 다른 함수를 return 하는 함수 */
// 고차함수를 사용 할 경우 함수의 리턴 을 사용해도 가능 하다

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

document.querySelector('#header').addEventListener('click' , onClick());
// 함수의 호출을 return 값으로 대체 해보면 말이 되는 코드인지 아닌지 알 수 있다





