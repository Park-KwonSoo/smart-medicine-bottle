//회원가입, 로그인 및 로그아웃에 관한 api
const User = require('../../models/user');
const Joi = require('joi');

exports.register = async(ctx) => {
    const { userId, password, passwordCheck } = ctx.request.body;

    const schema = Joi.object().keys({
        userId : Joi.string().email().max(50).required(),
        password : Joi.string().required(),
        passwordCheck : Joi.string().required(),
    })
    
    const result = schema.validate(ctx.request.body);
    if(result.error || password !== passwordCheck) {
        ctx.status = 400;
        return;
    }

    const existUser = await User.findByUserId(userId);
    if(existUser) {
        ctx.status = 409;
        return;
    }

    const user = new User({
        userId
    });

    await user.setPassword(password);
    await user.save();

    ctx.status = 201;

};

exports.login = async(ctx) => {
    const { userId, password } = ctx.request.body;

    const schema = Joi.object().keys({
        userId : Joi.string().email().max(50).required(),
        password : Joi.string().required()
    })

    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400;
        return;
    }

    const user = await User.findByUserId(userId);
    if(!user) {
        ctx.stauts = 401;
        return;
    }

    const isPasswordTrue = await user.checkPassword(password);
    if(!isPasswordTrue) {
        ctx.status = 401;
        return;
    }

    const token = await user.generateToken();
    ctx.cookies.set('access_token', token, {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * 30
    });

    ctx.status = 200;
    ctx.body = {
        userId
    };

};

exports.logout = async(ctx) => {
    ctx.cookies.set('access_token', null, {
        httpOnly : true,
        maxAge : 0
    });

    ctx.status = 204;
};