const Router = require('koa-router');
const bottleCtrl = require('./bottle.ctrl');

const bottle = new Router();

bottle.post('/lookupInfo', bottleCtrl.lookupInfo);

module.exports = bottle;