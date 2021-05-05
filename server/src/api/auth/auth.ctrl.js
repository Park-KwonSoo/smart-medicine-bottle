//회원가입, 로그인 및 로그아웃에 관한 api
const User = require('../../models/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

exports.register = async(ctx) => {
    ctx.body = 'register'
};

exports.login = async(ctx) => {
    ctx.body = 'login'
};

exports.logout = async(ctx) => {
    ctx.body = 'logout'
};