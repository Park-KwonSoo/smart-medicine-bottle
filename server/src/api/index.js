const Router = require('koa-router')
const auth = require('./auth')
const user = require('./user')
const bottle = require('./bottle')
const hub = require('./hub')
const medicine = require('./medicine')
const doctor = require('./doctor');

const api = new Router();

api.use('/auth', auth.routes())
api.use('/user', user.routes())
api.use('/bottle', bottle.routes())
api.use('/hub', hub.routes())
api.use('/medicine', medicine.routes())
api.use('/doctor', doctor.routes());

module.exports = api;