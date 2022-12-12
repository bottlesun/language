// require() node 에서의 내외장 모듈 정보 가지고 오는 기능
// http 데이터 전송 node 내장 모듈
// const http = require('http');
// express 패키지
const express = require('express');

const app = express();

// 미들웨어 설정

app.use('/',(req, res, next) => {
  console.log('This always runs!')
  next();
});

app.use('/app-product',(req, res, next) => {
  console.log('In another middleware!')
  res.send('<h1>The "Add product" page!</h1>')
  // next() // 이게 있어야 다음 함수도 실행 된다.
});

app.use('/',(req, res, next) => {
  console.log('In another middleware!')
  res.send('<h1>Hello from express!</h1>')
});

// express 사용 시 아래 내용들 안쓰고 해도 됨.
app.listen(3000)

// http.createServer(callback); HTTP 내장 모듈의 메서드 서버 객체를 만들어 준다.
// const server = http.createServer(app);

//listen() 서버를 실행한다.
//close() 서버를 강제로 종료한다.
// server.listen(3000);
