// require() node 에서의 내외장 모듈 정보 가지고 오는 기능
// express 패키지

const express = require('express');
const bodyParser = require('body-parser');
const {get404Errors} = require('./controllers/error')
const path = require('path');
const app = express();

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

