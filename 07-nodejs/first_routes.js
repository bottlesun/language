// fs 파일읽기 node 내장 모듈
const fs = require('fs');

const requestHandler = (req, res) => {
  const {url, method} = req;

  if (url === '/') {
    //document.write() 페이지에 출력하는 함수
    res.write('<html lang="ko">');
    res.write('<head><title> Enter Message </title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => { // chunk 데이터를 받아준다.
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {  // chunk 데이터를 문자열로 변환해준다.
      const parsedBody = Buffer.concat(body).toString();
      // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
      const message = parsedBody.split('=')[0];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html lang="ko">');
  res.write('<head><title> My First Page </title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
}


// 커스텀 모듈

// 하나만 보내는 방법
// module.exports = requestHandler

// 복수개를 보내는 방법
// module.exports = { // 두개를 보내도 하나에서 관리 가능
//   handler : requestHandler,
//   someText : 'Some hard coded text'
// };

// 따로 지정하는 방법
// module.exports.handler = requestHandler
// module.exports.someText = 'Some hard coded text'

//단축어 module 생략
exports.handler = requestHandler
exports.someText = 'Some hard coded text';