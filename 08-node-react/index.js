require('dotenv').config(); // .env 파일에서 환경변수 불러오기

const express = require('express');
const app = express()
const mongoInfo = process.env.MONGO_INFO;
const port = process.env.PORT;
const {User} = require('./models/User');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// mongodb 메서드 connect() 인스턴스에 대한 연결 생성 및 데이터 베이슽 참조 반환
mongoose.connect(mongoInfo)
  .then(() => console.log('mongoDB connected!'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!! 안녕하세요 :) '));


app.post('/register', (req, res) => {
  // 회원가입 할때 필요한 정보들을 client 에서 가져와
  // 데이터 베이스에 넣어준다.

  // req.body => json 형식으로 되있는 클라이언트의 정보를 받아준다.
  const user = new User(req.body);

  // mongodb 메서드 save() -> 데이터의 저장 수정
  user.save((err,userInfo) => {
    if(err) return res.status(404).json({seccess : false , err});
    return res.status(200).json({
      seccess : true
    })
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})