// 2-2 비동기 호출 스택 분석하기
// 2-3 비동기는 영원한 비동기이다.

setTimeout(() => { // 비동기 callback
  console.log('a');
}, 0);

Promise.resolve().then(() => {
  // 위의 함수와 비교 했을때 사람이 느끼기엔 동시 실행이지만 마이크로 큐스택이 우선이기에
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

// 호출스택
// 전부 실행 후 남는게 없어진다.
// sto - c 실행 후 빠져나감
// sto - b 실행 후 빠져나감
// sto - a 실행 후 빠져나감
// 1. anonymouse - 파일 실행이 끝났으므로 빠져나감

/* 비동기에서 필요한 event loop */

// background -> 추상적인 개념으로 임의로 만들어 생각하는 부분
// js 가 아닌 엔진 ( 다른 언어로 되어있다 )
// event , time ,http , 네트워크 등등... (비동기)

// sto  0
// set 1000
// set 2000

// task queue
// background 에서 특정조건 ( ex -> timeout 초 , event 조건 ) 이 만족이 되면 task queue 로 저장

//event loop 의 역할 호출 스택이 비어있을때 함수를 하나씩 끌어 올려준다.

// M - 호출 스택에 있는 함수가 저장 sto 1  2  3 - 순서대로 실행 후 호출스택을 빠져나간 후 다음을 보낸다
// m - promise , process.nextTick 의 경우 마이크로 에 저장 나머지는 위에 있는 매크로에 저장한다.

// 마이크로 태스크 큐가 우선순위 를 가진다.

setTimeout(() => {
  console.log('M');
}, 0);

Promise.resolve().then(() => {
  // 위의 함수와 비교 했을때 사람이 느끼기엔 동시 실행이지만 마이크로 큐스택이 우선이기에
  // p 가 먼저 실행 된다.
  console.log('p')
});


const p = new Promise((resolve, reject) => {

});