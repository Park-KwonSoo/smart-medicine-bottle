const Router = require('koa-router');
const bottleCtrl = require('./bottle.ctrl');

const bottle = new Router();

bottle.post('/connect', bottleCtrl.bottleConnect);
bottle.post('/disconnect/:bottleId', bottleCtrl.bottleDisconnect);
bottle.post('/lookupInfo/:bottleId', bottleCtrl.lookupInfo);
bottle.post('/setmedicine/:bottleId', bottleCtrl.setMedicine);

module.exports = bottle;