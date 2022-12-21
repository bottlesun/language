const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 // 글자 수
const jwt = require('jsonwebtoken');


const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number
  }
})

// 비밀번호 암호화 시키기. ( https://www.npmjs.com/package/bcrypt )

//pre() 몽구스 메소드 | 메소드를 실행하기 이전에 동작을 넣어주는 기능
userSchema.pre('save', function (next) {
  var user = this; // user.password -> database 에 들어있는 this 값

  // isModified() |  password가 변경될때
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // hash -> 암호화 된 비밀번호
        if (err) return next(err)
        user.password = hash
        next();
      });
    });
  } else {
    next();
  }
});


// 로그인 비밀번호 체크
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword = 입력중인 pw | db 암호화 된 비밀번호가 같은지 체크

  //compare() bcrypt 메소드 | 두 인자 값 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // json web token 을 이용해 token을 생성
  //_id = db에 임의 생성 _id
  var token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
}


userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // verify() | 토큰의 복호화 (decode)
  jwt.verify(token, 'secretToken', function (err, decoded) {
    // 유저 id 를 이용해 유저를 찾고, 클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id": decoded, "token": token}, function (err, user) {
      if (err) return cb(err);
      cb(null, user)
    });
  });
}

const User = mongoose.model('User', userSchema);

module.exports = {User}
