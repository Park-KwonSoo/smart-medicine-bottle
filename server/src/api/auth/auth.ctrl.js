//회원가입, 로그인 및 로그아웃에 관한 api
const User = require('../../models/user');
const Profile = require('../../models/profile');
const DoctorInfo = require('../../models/doctorInfo');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


exports.register = async(ctx) => {
    const { 
        userId,
        password,
        passwordCheck,
        userNm,
        userAge,
        contact,
    } = ctx.request.body;

    const schema = Joi.object().keys({
        userId : Joi.string().email().max(50).required(),
        password : Joi.string().required(),
        passwordCheck : Joi.string().required(),
        userNm : Joi.string().required(),
        userAge : Joi.number().required(),
        contact : Joi.string().required(),
    });
    
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
        userId,
        userTypeCd : 'NORMAL',
        useYn : 'Y',
    });

    await user.setPassword(password);

    const profile = new Profile({
        userId,
        userNm,
        userAge,
        contact,        
    });

    await user.save();
    await profile.save();

    ctx.status = 201;

};

exports.doctorRegister = async ctx => {
    const { 
        userId, 
        password, 
        passwordCheck,
        info,
    } = ctx.request.body;

    const schema = Joi.object().keys({
        userId : Joi.string().email().max(50).required(),
        password : Joi.string().required(),
        passwordCheck : Joi.string().required(),
        info : Joi.object().required(),
    })
    
    const result = schema.validate(ctx.request.body);
    if(result.error || password !== passwordCheck) {
        ctx.status = 400;
        return;
    }

    const existUser = await User.findByUserId(userId);
    const existDoctorInfo = await DoctorInfo.findByDoctorId(userId);
    if(existUser || existDoctorInfo) {
        ctx.status = 409;
        return;
    }

    const doctor = new User({
        userId,
        userTypeCd : 'DOCTOR',
        useYn : 'W',
    });

    await doctor.setPassword(password);

    const doctorInfo = new DoctorInfo({
        doctorId : userId,
        info,
        useYn : 'W',
    });


    doctor.save();
    doctorInfo.save();
    
    ctx.status = 201;

}

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
    if(!user || !user.userTypeCd) {
        ctx.stauts = 401;
        return;
    }

    const isPasswordTrue = await user.checkPassword(password);
    if(!isPasswordTrue) {
        ctx.status = 401;
        return;
    }

    if(user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const token = await user.generateToken();
    ctx.cookies.set('access_token', token, {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * 30
    });

    ctx.status = 200;
    ctx.body = {
        userId,
        token
    };

};

exports.logout = async(ctx) => {
    ctx.cookies.set('access_token', null, {
        httpOnly : true,
        maxAge : 0
    });

    ctx.status = 204;
};

exports.verifyToken = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 400;
        ctx.body = {
            name : 'Token Not Exist',
            message : 'Not Exist Token',
            expiredAt : null,
        };
        return;
    }

    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            ctx.status = 400;
            ctx.body = err;
            return;
        }
    });

    ctx.status = 200;
    ctx.body = {
        name : 'Token Exist',
        message : 'Token Work',
        expiredAt : null,
    };
};