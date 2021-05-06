const Router = require('koa-router');
const hubCtrl = require('./hub.ctrl');

const hub = new Router();

hub.post('/connect', hubCtrl.hubConnect);
hub.post('/disconnect', hubCtrl.hubDisconnect);

module.exports = hub;