require('dotenv').config(); // .env 파일에서 환경변수 불러오기
const express = require('express');

const config = require('./config/key');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {User} = require('./models/User');
const {auth} = require("./middleware/auth");

//application/x-www-form-urlencoded on 으로된 데이터를 가져와서 분석할수있게 하는 코드
app.use(express.json()); // bodyParser 내장
//application/json 으로된 데이터를 가져와서 분석할수있게 하는 코드
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

mongoose.set('strictQuery', true);
// mongodb 메서드 connect() 인스턴스에 대한 연결 생성 및 데이터 베이슽 참조 반환
mongoose.connect(config.mongoURL)
  .then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!! Hi '));


app.post('/api/user/register', (req, res) => {
  // 회원가입 할때 필요한 정보들을 client 에서 가져와
  // 데이터 베이스에 넣어준다.

  // req.body => json 형식으로 되있는 클라이언트의 정보를 받아준다.
  const user = new User(req.body);

  // mongodb 메서드 save() -> 데이터의 저장 수정
  user.save((err, userInfo) => {
    if (err) return res.status(400).json({seccess: false, err});
    return res.status(200).json({
      seccess: true
    })
  });
});


app.post('/api/user/login', (req, res) => {
  // 요청된 이메일을 데이터베이스 안에 있는지 찾기.
  // findOne mongoDB 제공 메서드
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '해당하는 유저가 없습니다.'
      })
    }
    // 요청된 이메일이 데이터 베이스에 있다면 맞는 비밀번호 인지 확인.

    user.comparePassword(req.body.password, (err, isMatch) => {
      // isMatch | DB와 직접 친 비밀번호가 같으면 true
      if (!isMatch) return res.status(400).json({loginSuccess: false, message: '비밀번호가 틀렸습니다.'});

      // 비밀번호까지 맞다면 유저 토큰 생성.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰 저장. 어디에?  -> 쿠키 , 로컬스토리지
        res.cookie("x_auth", user.token) // 첫번째 인자 이름으로 쿠키 안으로 들어감
          .status(200)
          .json({loginSuccess: true, userId: user._id})
      });

    });
  });
});

//auth 미들웨어
// role 0 일반유저 role 0이 아니면 관리자
app.get('/api/user/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 true 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role !== 0,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/user/logout', auth, (req, res) => {

  User.findByIdAndUpdate({_id: req.user._id}, {token: ''}, (err, user) => {
    if (err) return res.json({success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})


app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})