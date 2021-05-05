const Router = require('koa-router');
const hubCtrl = require('./hub.ctrl');

const hub = new Router();

hub.post('/register', hubCtrl.hubRegister);

module.exports = hub;