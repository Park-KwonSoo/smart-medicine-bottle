const Router = require('koa-router');
const doctorCtrl = require('./doctor.ctrl');

const doctor = new Router();


/**
 * 현재 로그인한 유저(의사)의 정보를 가져옴.
 * request parameter : token
 * url : http://localhost:4000/doctor/
 * return : doctor's Info
 */
doctor.get('/', doctorCtrl.getDoctorsInfo);

/**
 * 현재 로그인한 유저(의사)의 관리 환자 목록을 가져옴
 * request parameter
 * url : http://localhost:4000/doctor/patient
 * return : patient List
 */
doctor.get('/patient', doctorCtrl.getPatientList);

/**
 * 현재 로그인한 유저(의사)의 관리 환자 상세 정보를 가져옴
 * request parameter : patient Id
 * url : http://localhost:4000/doctor/patient/:patientId
 * return : patient Detail
 */
doctor.get('/patient/:patientId', doctorCtrl.getPatientDetail);

/**
 * 현재 로그인한 유저(의사)의 관리 약병 상세 정보를 가져옴
 * request parameter : bottle Id
 * url : http://localhost:4000/doctor/bottle/:bottleId
 * return : bottle Detail
 */
doctor.get('/bottle/:bottleId', doctorCtrl.getBottleDetail);


/**
 * 현재 로그인한 유저(의사)의 특정 관리 환자의 특이사항을 기록함
 * request parameter : reqUserId, info
 * url : http://localhost:4000/doctor/patient
 * return : null
 */
doctor.patch('/patient', doctorCtrl.writeReqPatientReport);

/**
 * 현재 로그인한 유저(의사)의 특정 관리 환자의 약병의 피드백을 등록함.
 * request parameter : bottleId, fdbType, feedback
 * url : http://localhost:4000/doctor/bottle
 * return : null
 */
doctor.post('/bottle', doctorCtrl.writeReqBottleFeedback);

/**
 * 현재 로그인한 유저(의사)의 관리 환자를 등록함.
 * request parameter : reqUserId
 * url : http://localhost:4000/doctor/patient
 * return : null
 */
doctor.post('/patient', doctorCtrl.registerNewPatient);

/**
 * 현재 로그인한 유저(의사)의 특정 관리 환자를 삭제함.
 * request parameter : patientId
 * url : http://localhost:4000/doctor/patient/:patientId
 * return : null
 */
doctor.delete('/patient/:patientId', doctorCtrl.removeReqPatient);


module.exports = doctor;
 