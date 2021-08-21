/* eslint-disable no-undef */
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
        ctx.body = {
            error : '회원가입 양식이 잘못되었습니다.',
        };
        return;
    }

    const existUser = await User.findByUserId(userId);
    if(existUser) {
        ctx.status = 409;
        ctx.body = {
            error : '이미 존재하는 회원입니다.',
        };
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
        ctx.body = {
            error : '회원가입 양식이 잘못되었습니다.',
        };
        return;
    }

    const existUser = await User.findByUserId(userId);
    if(existUser) {
        ctx.status = 409;
        ctx.body = {
            error : '이미 존재하는 회원입니다.',
        };
        return;
    }

    const existDoctorInfo = await DoctorInfo.findByDoctorId(userId);
    if(existDoctorInfo.useYn === 'W') {
        ctx.status = 401;
        ctx.body = {
            error : '가입 승인 대기중인 회원입니다.',
        };
        return;
    } else if(existDoctorInfo.useYn === 'N') {
        ctx.status = 401;
        ctx.body = {
            error : '가입이 거절된 회원입니다.',
        };
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
        ctx.body = {
            error : '로그인 양식이 잘못되었습니다.',
        };
        return;
    }

    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd) {
        ctx.stauts = 401;
        ctx.body = {
            error : '존재하지 않는 회원입니다.',
        };
        return;
    }

    const isPasswordTrue = await user.checkPassword(password);
    if(!isPasswordTrue) {
        ctx.status = 401;
        ctx.body = {
            error : '비밀번호가 틀렸습니다.',
        };
        return;
    }

    if(user.useYn !== 'Y') {
        ctx.status = 403;
        ctx.body = {
            error : '가입 대기중이거나 탈퇴한 회원입니다.',
        };
        return;
    }

    const token = await user.generateToken();
    ctx.cookies.set('access_token', token, {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * 30
    });

    ctx.status = 200;
    ctx.body = {
        userTypeCd : user.userTypeCd,
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

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
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