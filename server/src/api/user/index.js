const Router = require('koa-router')
const userCtrl = require('./user.ctrl')

const user = new Router()

/**
 * 현재 유저 정보 조회
 * request parameter : token
 * url : http://localhost:4000/api/user
 * return : Object User
 */
user.get('/', userCtrl.myInfo)

/**
 * 현재 유저의 타입에 따라 요청 유저 정보 조회(의사 : 환자, 관리자 : 모든 유저)
 * request parameter : token
 * url : http://localhost:4000/api/user/:reqUserId
 * return : status
 */
 user.get('/:reqUserId', userCtrl.getUserDetail)

 /**
 * 현재 유저의 타입에 따라 요청 유저 정보 수정(의사 : 환자, 관리자 : 모든 유저)
 * request parameter : token
 * url : http://localhost:4000/api/user/:reqUserId
 * return : status
 */
user.patch('/:reqUserId', userCtrl.updateReqUser)

