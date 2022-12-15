// require() node 에서의 내외장 모듈 정보 가지고 오는 기능
// express 패키지
//const expressHbs = require('express-handlebars');

const express = require('express');
const bodyParser = require('body-parser');
const {get404Errors} = require('./controllers/error')
const path = require('path');

const app = express();

//.engine() 내장에 등록되있지 않은 템플릿 엔진을 등록한다.
//layoutsDir - 레이아웃의 기본 url 을 설정하게 해준다.
// app.engine(
//   'hbs',
//   expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );
//.set('key','name') name 을  key 값에 있는 서버 동작을 구성, 동작 할 수 있습니다
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// 미들웨어 설정

//bodyParser - post request 를 읽어오는 기능을 가진 라이브러리
app.use(bodyParser.urlencoded({extended: false}));
// express.static() 읽기전용으로 직접 경로 액세스를 허용해준다.
app.use(express.static(path.join(__dirname, 'public')));
// routes 폴더에서 불러 옴
app.use('/admin', adminData);
app.use(shopRoutes);

app.use(get404Errors);

//listen() 서버를 실행한다.
//close() 서버를 강제로 종료한다.
app.listen(3000)

// express 사용 시 아래 내용들 안쓰고 해도 됨.
// http.createServer(callback); HTTP 내장 모듈의 메서드 서버 객체를 만들어 준다.
// const server = http.createServer(app);

