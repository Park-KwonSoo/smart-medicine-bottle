const Router = require('koa-router')
const userCtrl = require('./user.ctrl')

const user = new Router();

/**
 * 현재 유저 정보 조회
 * request parameter : token
 * url : http://localhost:4000/api/user
 * return : Object User
 */
user.get('/', userCtrl.getMyDetail);

module.exports = user;
