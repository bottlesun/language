const path = require('path')

// 프로젝트의 메인 모듈의 경로
module.exports = path.dirname(process.mainModule.filename)