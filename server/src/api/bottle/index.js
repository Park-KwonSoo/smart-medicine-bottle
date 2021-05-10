const Router = require('koa-router');
const bottleCtrl = require('./bottle.ctrl');

const bottle = new Router();

bottle.post('/register', bottleCtrl.bottleRegister);
bottle.post('/lookupInfo/:bottleId', bottleCtrl.lookupInfo);
bottle.post('/setmedicine/:bottleId', bottleCtrl.setMedicine);

module.exports = bottle;