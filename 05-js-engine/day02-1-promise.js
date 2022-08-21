// 비동기 callback
setTimeout(() => { // 조건이 달성 되면 바로(강제) 실행
  console.log('a');
}, 1000);

// 동기 callback
function calculator(callback, a, b) {
  return callback(a, b)
}
calculator(function () {
  return x + y
}, 3, 5);


// promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

// 프로미스의 장점 - 코드를 분리 해서 사용 할 수 있다.
// 결괏값이 필요할때 사용, 가능

promise.then(() => {
  console.log('a')
});

const p2 = axios.get('서버주소2') // 성공
const p3 = axios.get('서버주소3') // 성공
const p1 = axios.get('서버주소1') // 성공
const p4 = axios.get('서버주소4') // 실패
const p5 = axios.get('서버주소5') // 성공
const p6 = axios.get('서버주소6') // 성공

// 선언 후 나중에 한번에 호출 사용이 가능하다. (결괏값을 원할때 받을 수 있다)
// .all() 의 단점 -> 하나라도 실패 시 전부 실패
Promise.all([p1, p2, p3, p4, p5, p6]).then((result) => {}).catch((error) => {});
// .allSettled() 는 성공 실패를 나눠준다.
Promise.allSettled([p1, p2, p3, p4, p5, p6]).then((result) => {
  // 실패한 것만 필터링 해서 다시 시도 가능
}).catch((error) => {}).finally(() => {});

// .catch 는 .then 까지의 대한 catch 이다.
