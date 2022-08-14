/* 2-4 promise 동기 함수 알아보기 */

let a = 2;
// Promise 란, 실행은 바로 하되, 결괏값을 나중에 원할 때 쓸 수 있는 것
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

// 호출분석
// 전부 실행 후 anonymouse 빠져나감
// 4 빠져나감
// 4. P.then 호출
// 3 빠져나감
// 3. console.log(딴짓)
// 2 빠져 나감.
//  setTimeout
//  console.log(제일) 실행
// 2. (resolve) => {} (익명함수 호출)
// 1. anonymouse


// 선언 map
// 1. anonymouse -> a (2) , p실행
// 2. anonymouse -> a (5) 변경

// background (비동기실행)
//2. p.then , fun 저장
//1. time , fun 저장

// M - 1. time(fun) 호출스택 실행
// m - 2. p(5) 저장 호출스택 실행


// 호출스택 , bg , 큐 가 전부 비워 있어야 js 종료.


/* 2-5 async/await Promise 로 바꾸기 */
p.then((result) => {
  console.log('result', result)
  // return 1 -> 일반 값을 리턴 시 해당 값이 다음으로 넘어간다.
  return Promise.resolve(1) // Promise 를 리턴하면 resolve 된 값이 다음으로 넘어간다.
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

async function as() {
  // 분석 시 async 함수의 끝은 await 가 시작 되기 전 이다. (동기부분)
  const a = await 1; // await -> then
  //const a = axios.get();
  //const a = Promise; // promise 나 axios 같은 값들의 경우는 , 아래서 변경할때, 그냥 치환하여 사용이 가능하다. ex.1
  console.log('a', a);
  console.log('hmm');
  await null;
  const b = await Promise.resolve(1); // Promise.resolve 값을 넘겨준다.
  console.log('b', b);
  return b
}

/* async/await Promise 로 바꾸는 규칙 ( 1 : 1 대응이 아님 )
// await 수 만큼 then 호출
// 순서 왼쪽-> 오른쪽 , 위-> 아래로

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
  */

a().then((result) => {
  console.log(result)
}).then((result2) => {
  console.log(result2)
})


// 호출스택
// anonymouse 종료
// 2 실행 후 종료
// 2. a
// 1.anonymouse

// 선언 map
// anonymouse -> delayP fun , a fun

//event loop

//bg
// await
// await
// await
// as then
// as then

// M -
// m - p1

function delayP(ms) { // setTimeout 을 promis로 바꾸는 법
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
    reject(error)
  })
};

async  function a(){
  await delayP(3000);
}
