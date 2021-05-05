const Router = require('koa-router');
const medicineCtrl = require('./medicine.ctrl');

const medicine = new Router();

medicine.get('/search', medicineCtrl.medicineSearch);

module.exports = medicine;