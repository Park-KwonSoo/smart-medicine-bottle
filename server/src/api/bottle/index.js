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
bottle.get('/:bottleId', bottleCtrl.lookupInfo);

/**
 * 약병에 약 등록 = 약 검색 후 약 ID(medicineId)와 복용 정보 보고 사용자가 약 복용량(dosage) 입력
 * request parameter : medicineId, dosage
 * url : http://localhost:4000/api/bottle/:bottleId
 * return : bottle(json type)
 */
bottle.patch('/:bottleId', bottleCtrl.setMedicine);

module.exports = bottle;