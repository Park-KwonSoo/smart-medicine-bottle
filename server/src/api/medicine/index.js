const Router = require('koa-router');
const medicineCtrl = require('./medicine.ctrl');

const medicine = new Router();

medicine.post('/', medicineCtrl.medicineSearch);
medicine.get('/:medicineId', medicineCtrl.medicineGet);

module.exports = medicine;