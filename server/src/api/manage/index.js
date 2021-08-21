const Router = require('koa-router');
const manageCtrl = require('./manage.ctrl');

const manage = new Router();

/**
 * 의사 회원가입 요청을 한 회원들의 목록을 리턴
 * request parameter : null
 * url : http://localhost:4000/api/manage/doctor
 * return : doctor request List
 */
manage.get('/doctor', manageCtrl.getDoctorRegReqList);

/**
 * 의사 회원가입 요청을 한 특정 회원의 상세정보 확인
 * request parameter : doctor Id
 * url : http://localhost:4000/api/manage/doctor/:doctorId
 * return : doctor Info
 */
manage.get('/doctor/:doctorId', manageCtrl.getDoctorRegReqDetail);

/**
 * 의사 요청을 한 회원을 수락한다
 * request parameter : doctor Id
 * url : http://localhost:4000/api/manage/doctor/accept
 * return : null
 */
manage.post('/doctor/accept', manageCtrl.acceptDoctorRegReq);

/**
 * 의사 요청을 한 회원을 거절한다.
 * request parameter : doctor Id
 * url : http://localhost:4000/api/manange/doctor/reject
 * return : null
 */
manage.post('/doctor/reject', manageCtrl.rejectDoctorRegReq);

/**
 * 의사 요청을 한 회원의 자격 번호가 유효한지 검증한다
 * reqeust parameter : doctor License
 * url : http://localhost:4000/api/manage/doctor/validate
 * return : result true or false
 */
manage.post('/doctor/validate', manageCtrl.validateDoctorLicense);


module.exports = manage;