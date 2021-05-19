const Router = require('koa-router');
const hubCtrl = require('./hub.ctrl');

const hub = new Router();

/**
 * 허브 등록
 * request parameter : hubId, host, port
 * url : http://localhost:4000/api/hub
 * return : hub(json type)
 */
hub.post('/', hubCtrl.hubConnect);

/**
 * 로그인한 유저의 허브 목록 가져오기
 * request parameter : X
 * url : http://localhost:4000/api/hub
 * return : hub List(json type)
 */
hub.get('/', hubCtrl.getHubList);

/**
 * 허브 등록 해제
 * request parameter : x
 * url : http://localhost:4000/api/hub/:hubId
 * return : null
 */
hub.delete('/:hubId', hubCtrl.hubDisconnect);

module.exports = hub;