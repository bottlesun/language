// require() node 에서의 내외장 모듈 정보 가지고 오는 기능
// express 패키지
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// 미들웨어 설정

//bodyParser - post request 를 읽어오는 기능을 가진 라이브러리
app.use(bodyParser.urlencoded({extended: false}));
// express.static() 읽기전용으로 직접 경로 액세스를 허용해준다.
app.use(express.static(path.join(__dirname, 'public')));
// routes 폴더에서 불러 옴
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // 마지막만 send 로 끝나면 setHeader 이던 status 던 사용해서 설정이 가능하다.
  // 더미경로를 만들어 page not found 를 출력하는 것
  res.status(404).sendfile(path.join(__dirname, 'views', '404.html'));
})

//listen() 서버를 실행한다.
//close() 서버를 강제로 종료한다.
app.listen(3000)

// express 사용 시 아래 내용들 안쓰고 해도 됨.
// http.createServer(callback); HTTP 내장 모듈의 메서드 서버 객체를 만들어 준다.
// const server = http.createServer(app);

