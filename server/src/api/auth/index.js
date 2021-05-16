const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

/**
 * 회원가입 (email type)
 * url : http://localhost:4000/api/auth/register
 * request parameter : userId, password, passwordCheck
 * return : null
 */
auth.post('/register', authCtrl.register);

/**
 * 로그인 (email type)
 * url : http://localhost:4000/api/auth/login
 * request parameter : userId, password
 * return : userId
 */
auth.post('/login', authCtrl.login);

/**
 * 로그아웃
 * url : http://localhost:4000/api/auth/logout
 * request parameter : null
 * return : null
 */
auth.post('/logout', authCtrl.logout);

module.exports = auth;