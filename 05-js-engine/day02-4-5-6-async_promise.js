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

function delayP(ms) { // setTimeout 을 Promise 로 바꾸는 법
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
    reject(error)
  })
};

async function AsyncA() {
  await delayP(3000); // 3초
  await delayP(6000); // 6초
  await delayP(9000); // 9초
} // 토탈 18초

async function AsyncB() {
  // 두개 이상을 동시에 실행 시키는 상황 일 경우 async 안에서도 promise 도 사용한다.
  const p1 = delayP(3000);
  const p2 = delayP(6000);
  await promise.all([p1, p2]);//6초
  await delayP(9000); // 9초
} // 토탈 15초

async function c() {
  const a = await 1;
  const b = await 2;

  return a + b;
}

Promise.resolve(1)
  .then((a) => {
    return 2
  })
  .then((b) => {
    return a + b
  })

  (function () {
    let a;
    let b;
    return Promise.resolve(1)
      .then((result) => {
        a = result
        return 2;
      })
      .then((result) => {
        b = result
        return a + b; // 시적 허용
      })
  })();

async function createPost() {
  const post = await db.getPost() // 게시물 조회;
  if (post) {
    res.status(403).send('이미 존재합니다.')
  } else {
    await db.createPost();  // 게시글 작성
    //항상 동시에 진행 될 수 있는게 있는지 확인하기
    const p1 = db.userIncrementPostCount(); // 사용자 게시글 카운트 1 올림
    const p2 = db.createNoti(); // 새로운 게시글 알림 등록
    await promise.allSettled([p1, p2]);
  }
}

// Promise 란, 실행은 바로 하되, 결괏값을 나중에 원할 때 쓸 수 있는 것.
// 실행은 바로 --> 결괏값이 나올 때는 나중에 --> 결괏 값이 사용 할 때는 더 나중
// 실행은 바로 --> 결괏값도 바로 쓰고 싶은데 --> 그 다음에 결괏값이 나오면 --> then , await, promise.all 이런 결괏값을 기다린 후에 실행된다.

const results = await Promise.all([p1, p2, p3]);

results.map(async () => {
  await result조작(); //p1,p2,p3 동시에 조작
});

for (let result of results) {
  await result조작(); // p1 이 끝난 후 p2 , p3 순차적으로 조작
}

let array = [];
for(let result of results){
  array.push(result조작())
}

const x = true;
const y = false;

/* 부분적으로 스코프 사용해보기 */
function a2() {
  let a = 4;
  y = true;
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
a2();넵