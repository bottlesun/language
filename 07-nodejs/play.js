// const person = {
//   name: 'Max',
//   age: 29,
//   greet() {
//     console.log('Hi, I am ' + this.name);
//   }
// }
//
// const printName = ({name}) => {
//   console.log(name)
// }
//
// printName(person);
//
// const {name, age} = person;
// console.log(name, age)

// const cpPerson = {...person}
// console.log(cpPerson)

// const hobbies = ['Sports' , 'Cooking'];
// const [hobby1,hobby2] = hobbies;
// console.log(hobby1,hobby2);

// console.log(hobbies.map(hobby => 'Hoobby : ' +  hobby ));
// console.log(hobbies);

// hobbies.push('Programming'); -> 상수임에도 포인터가 바뀌지 않아서 값이 변경이 가능.
// console.log(hobbies)

// const cpArr = [...hobbies]
// console.log(cpArr)
//
// const toArray = (...args) => { // 갯수의 상관 없이 배열로 만들 수 있다
//   return args
// }
// console.log(toArray(1,2,3,4))

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log('Timer is done!');
  fetchData()
    .then(text => {
    console.log(text)
    return fetchData();
  })
    .then(text2 => {
      console.log(text2 ,'text2')
    })
}, 2000)