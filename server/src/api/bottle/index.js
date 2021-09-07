const Router = require('koa-router');
const bottleCtrl = require('./bottle.ctrl');

const bottle = new Router();

/**
 * 약병 연결
 * request parameter : bottleId, hubId
 * url : http://localhost:4000/api/bottle
 * return : null
 */
bottle.post('/', bottleCtrl.bottleConnect);

/**
 * 약병 연결 해제
 * request parameter : x
 * url : http://localhost:4000/api/bottle/:bottleId
 * return : null
 */
bottle.delete('/:bottleId', bottleCtrl.bottleDisconnect);

/**
 * 약병 정보 확인
 * request parameter : x
 * url : http://localhost:4000/api/bottle/:bottleId
 * return : bottle(json type)
 */
bottle.get('/:bottleId', bottleCtrl.getBottleInfo);

/**
 * 약병에 대한 피드백 확인
 * request parameter : bottleId
 * url : http://localhost:4000/api/bottle/feedback/:bottleId
 * return : feedback List
 */
bottle.get('/feedback/:bottleId', bottleCtrl.getBottleFeedback);

/**
 * 약병에 약 등록 = 약 검색 후 약 ID(medicineId)와 복용 정보 보고 사용자가 약 복용량(dosage) 입력
 * request parameter : medicineId, dosage, doctorId
 * url : http://localhost:4000/api/bottle/:bottleId
 * return : bottle(json type)
 */
bottle.patch('/:bottleId', bottleCtrl.setMedicine);

/**
 * 비어있는 약병에 전담의 등록
 * request parameter : bottleId, doctorId
 * url : http://localhost:4000/api/bottle/doctor/:bottleId
 * return null;
 */
// bottle.patch('/doctor/:bottleId', bottleCtrl.registerDoctorToBottle);

/**
 * 현재 로그인한 유저의 허브 중, 해당 허브에 등록된 약병 리스트를 가져옴
 * request parameter : x
 * url : http://localhost:4000/api/bottle/hub/:hubId
 * return : bottle List(json type List)
 */
bottle.get('/hub/:hubId', bottleCtrl.getHubsBottleList);

/**
 * 현재 로그인한 유저의 모든 약병을 조회함
 * request parameter : x
 * url : http://localhost:4000/api/bottle/
 * return : bottle List
 */
bottle.get('/', bottleCtrl.getAllBottleList);


module.exports = bottle;