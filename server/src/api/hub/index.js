const Router = require('koa-router');
const hubCtrl = require('./hub.ctrl');

const hub = new Router();

hub.post('/', hubCtrl.hubConnect);
hub.delete('/:hubId', hubCtrl.hubDisconnect);

module.exports = hub;