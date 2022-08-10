// this 는 기본적으로 window 이다.

console.log(this) // window

function a() {
  'use strict' // strict 모드 에서의 this
  console.log(this) // undefined
}

a();

// js //window, globalThis
// node //global, globalThis

/* this 가 바뀔때 */
// 1. 객체의 메서드를 호출 하는 경우
// () => 화살표 함수일 경우 부모 scope를 선언하기에 this 가 바뀌지 않음.

const obj = {
  name: 'bottlesun',
  sayName() {
    console.log(this.name);
    // bottlesun 출력
  }
};
const sayN = obj.sayName;
sayN() // window 기준으로 변경
// 아무것도 출력 되지 않음 - this는 함수가 호출 될때, 기준으로 정해진다. (아무것도 없으면 window기준)

// 2. new 를 사용 할 경우 - this 는 객체 자기 자신이 된다.

function Human(name) {
  this.name = name;
}

new Human('bottlesun')

// 3. bind() , apply() , call() - this 를 바꿔주는 함수

function sayName() {
  console.log(this.name);
}

// bind() 는 this만 바꾼 새로운 함수를 만들어준다. 호출을 해야하기에 ()를 붙여준다.
sayName.bind({name: 'bottlesun'})()
// apply() 는 호출까지 해준다. // 매개변수를 배열로 넣어준다 ex) a.apply(null , [1,2])
sayName.apply({name: 'bottlesun'})
// call() 은 호출까지 해준다. // 매개변수를 순서대로 넣어준다. ex) a.apply(null , 1,2)
sayName.call({name: 'bottlesun'})


const obj2 = {
  name: 'bottlesun',
  sayName() {
    console.log(this.name);
    // 객체의 메서드를 호출 하고 있다.
    // bottlesun
    function inner() {
      console.log(this.name);
      // 함수 호출 기준으로 this를 바꿔주는 동작을 하지 않았기에 window 기준
      // (빈칸)
    }

    inner()
  }
}
// scope : inner -> sayName() -> anonymouse


/* 화살표 함수일 경우 */
// 부모 함수의 this 기준
const obj3 = {
  name: 'bottlesun',
  sayName() {
    console.log(this.name);
    // 객체의 메서드를 호출 하고 있다.
    // bottlesun
    const inner = () => {
      console.log(this.name);
      // bottlesun 이 된다.
    }
    inner()
  }
}
obj3.sayName();

// obj3 호출 스택 분석

// 3. inner() -> 화살표 함수인지 아닌지 여부 확인 ( 맞다 this -> 부모요소로 가지고 온다 / this = Obj3 )
// 2. obj3.sayName() -> 화살표 함수인지 아닌지 여부 확인 ( 아니다 this 변경 / this = Obj3 )
// 1. anonymouse -> (this = window)

// inner() 가 화살표함수가 아닌 function 이라면?
// 3. inner() -> 화살표 함수인지 아닌지 여부 확인 ( 아니다 호출 위치에 따른 this 변경 -> this = window )
// 2. obj3.sayName() -> 화살표 함수인지 아닌지 여부 확인 ( 아니다 this 변경 / this = Obj3 )
// 1. anonymouse -> (this = window)


/* this 를 분석 할 수 없는 케이스 */
const header = document.querySelector('.header');
header.addEventListener('click', function () {
  // function은  함수의 선언이지 호출이 아니라 this를 알 수가 없다.
  console.log(this) // header
})

header.addEventListener('click', () => {
  // 화살표 함수의 경우는 부모의 this를 따라간다.
  console.log(this) // window
})

// addEventListener 의 분석 (추측)
/*
const header = {
  addEventListener : function (eventName,callback) {
    callback.call(this) // this 가 header
    callback.call(header)
  }
}*/


// callStack의 기준으로 this 가 달라진다.