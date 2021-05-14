const Router = require('koa-router');
const bottleCtrl = require('./bottle.ctrl');

const bottle = new Router();

bottle.post('/', bottleCtrl.bottleConnect);
bottle.delete('/:bottleId', bottleCtrl.bottleDisconnect);
bottle.get('/:bottleId', bottleCtrl.lookupInfo);
bottle.patch('/:bottleId', bottleCtrl.setMedicine);

module.exports = bottle;