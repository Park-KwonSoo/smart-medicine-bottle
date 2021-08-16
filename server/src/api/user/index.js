const Router = require('koa-router')
const userCtrl = require('./user.ctrl')

const user = new Router();

/**
 * 현재 유저 정보 조회
 * request parameter : token
 * url : http://localhost:4000/api/user
 * return : Object User
 */
user.get('/', userCtrl.getMyDetail);

/**
 * 유저를 등록하려는 의사의 요청을 전부 보여준다
 * request parameter : token,
 * url : http://localhost:4000/api/user/doctorrequest
 * return : List
 */
user.get('/doctorrequest', userCtrl.viewAllDoctorRegister);


/**
 * 유저를 등록하려는 의사의 요청을 수락한다.
 * request parameter : token, doctorId,
 * url : http://localhost:4000/api/user/doctorrequest/:doctorId
 * return : null
 */
user.post('/doctorrequest', userCtrl.acceptDoctorRegister);


module.exports = user;
