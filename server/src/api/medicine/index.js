const Router = require('koa-router');
const medicineCtrl = require('./medicine.ctrl');

const medicine = new Router();

/**
 * 약 검색 후 검색 대상 가져오기
 * request parameter : name, company, target 중 하나
 * url : http://localhost:4000/api/medicine
 * return : medicine List(json 타입의 List)
 */
medicine.post('/', medicineCtrl.medicineSearch);

/**
 * 약 검색 후 검색 대상 가져오기
 * request parameter : x
 * url : http://localhost:4000/api/medicine/:mdedicineId
 * return : medicine(json type)
 */
medicine.get('/:medicineId', medicineCtrl.medicineGet);

module.exports = medicine;