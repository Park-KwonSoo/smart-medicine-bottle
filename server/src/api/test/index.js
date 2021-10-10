//test용 api입니다.
const Router = require('koa-router');
const testCtrl = require('./test.ctrl');

const test = new Router();

//푸쉬메시지 테스트
test.post('/fcm', testCtrl.sendFcmMessage);



module.exports = test;
