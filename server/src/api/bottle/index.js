const Router = require('koa-router');
const bottleCtrl = require('./bottle.ctrl');

const bottle = new Router();

bottle.post('/lookupInfo', bottleCtrl.lookupInfo);
bottle.post('/setmedicine', bottleCtrl.setMedicine);

module.exports = bottle;