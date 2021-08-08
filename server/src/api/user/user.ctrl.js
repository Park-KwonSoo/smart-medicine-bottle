//유저에 관련된 Api
const User = require('../../models/user')
const Bottle = require('../../models/bottle')
const Hub = require('../../models/hub')
const jwt = require('jsonwebtoken')


exports.myInfo = async ctx => {
    const token = ctx.req.headers.authorization
    if (!token || !token.length) {
        ctx.status = 401
        return
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(userId);
    if(!user || !user.userTypeCd) {
        ctx.status = 403;
        return;
    }

    let result = {
        myInfo : user,
        myDoctor : null,
        patientList : [],
        userList : [],
    };

    if (user.userTypeCd === 'NORMAL') {
        const doctor = await User.findById(user.doctorId);
        result.myDoctor = doctor;

    } else if (user.userTypeCd === 'DOCTOR') {
        const patientList = await User.findAllByDoctorId(user.userId);
        result.patientList = patientList;

    } else if (user.userTypeCd === 'MANAGER') {
        const userList = await User.find();
        result.userList = userList;
    }

    ctx.status = 200;
    ctx.body = result;
}

exports.getUserDetail = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if(!user) {
        ctx.status = 403;
        return;
    } else if (user.userTypeCd === 'NORMAL') {
        ctx.status = 403;
        return;
    }

    let result = {
        reqUser : user,
        reqUserBottleList : [],
    };

    if (user.userTypeCd === 'DOCTOR') {
        const { reqUserId } = ctx.params;
        const reqUser = await User.findById(reqUserId);
        if (!reqUser) {
            ctx.status = 404;
            return;
        }
        if(reqUser.doctorId !== user.userId) {
            ctx.status = 403;
            return;
        }

        const reqUserHubList = await Hub.findAllByUserId(reqUserId);
        if(reqUserHubList && reqUserHubList.length) {
            const reqUserBottleList = [];

            await Promise.all(reqUserHubList.forEach(async hub => {
                const bottle = await Bottle.findAllByHubId(hub.hubId);
                reqUserBottleList.push(...bottle);
            }));

            result.reqUserBottleList = reqUserBottleList;
        }

    }

    ctx.status = 200;
    ctx.body = result;

};

exports.updateReqUser = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if(!user) {
        ctx.status = 403;
        return;
    }

    if (user.userTypeCd === 'MANAGER') {
        const { useYn } = ctx.request.body;
        const { reqUserId } = ctx.params;

        const reqUser = await User.findById(reqUserId);
        if(!reqUser) {
            ctx.status = 404;
            return;
        }

        await reqUser.setUseYn(useYn);
        await reqUser.save();

        return;
    }

    ctx.status = 200;

}