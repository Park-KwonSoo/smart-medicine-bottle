//유저에 관련된 Api
const User = require('../../models/user');
const Profile = require('../../models/profile');
const PatientInfo = require('../../models/patientInfo');
const DoctorInfo = require('../../models/doctorInfo');
const jwt = require('jsonwebtoken');


/**
 * 내 정보를 확인한다.
 * @param {*} ctx 
 * http methods : get
 */
exports.getMyDetail = async ctx => {
    const token = ctx.req.headers.authorization
    if (!token || !token.length) {
        ctx.status = 401
        return
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByUserId(userId)
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const profile = await Profile.findByUserId(userId);

    ctx.status = 200;
    ctx.body = {
        profile,
    };

}

/**
 * 내 정보를 업데이트한다.
 * @param {*} ctx 
 * http methods : patch
 */
exports.updateMyDetail = async ctx => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.useYn !== 'Y' || user.userTypeCd !== 'NORMAL') {
        ctx.status = 403;
        return;
    }
    
    const profile = await Profile.findByUserId(userId);
    if(!profile || profile.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { userNm, birth, contact, password, passwordCheck, } = ctx.request.body;

    const existContact = await Profile.findOne({ contact, useYn : 'Y' });
    if(existContact) {
        ctx.status = 409;
        ctx.body = { 
            error : '이미 가입된 번호',
        };

        return;
    }

    //passwordCheck가 있고 로컬 회원이라면 비밀번호 변경함
    if(passwordCheck && user.authTypeCd === 'NORMAL') {
        //passwordCheck와 password가 같아야함
        if(passwordCheck !== password) {
            ctx.status = 401;
            ctx.body = {
                error : '비밀번호가 일치하지 않습니다.',
            };
            return;
        }

        await user.setPassword(password);
        await user.save();
    }

    await profile.updateProfileInfo({
        userNm,
        birth,
        contact,
    });

    await profile.save();

    ctx.status = 200;

};

/**
 * 현재 로그인한 유저(환자)를 관리하는 의사 목록을 가져온다.
 * http methods : get
 * @param {*} ctx 
 * @returns 
 */
exports.getMyDoctorList = async ctx => {
    const token = ctx.req.headers.authorization
    if (!token || !token.length) {
        ctx.status = 401
        return
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByUserId(userId)
    if(!user || user.userTypeCd !== 'NORMAL' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const patientInfoList = await PatientInfo.find({ 
        patientId : userId, 
        useYn : 'Y',
    });

    const doctorList = await Promise.all(patientInfoList.map(async patientInfo => {
        const doctorInfo = await DoctorInfo.findOne({ 
            doctorId : patientInfo.doctorId,
            useYn : 'Y',
        });

        return doctorInfo ? doctorInfo.info : null;
    }));

    ctx.status = 200;
    ctx.body = {
        doctorList,
    };

};

/**
 * 의사가 요청한 환자 등록을 확인한다.
 * @param {*} ctx 
 * http methods : get
 */
exports.viewAllDoctorRegisterReq = async ctx => {
    const token = ctx.req.headers.authorization
    if (!token || !token.length) {
        ctx.status = 401
        return
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByUserId(userId)
    if(!user || !user.userTypeCd || user.userTypeCd !== 'NORMAL' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const patientInfoList = await PatientInfo.find({
        patientId : userId,
        useYn : 'W',
    })
    
    const doctorReqList = await Promise.all(patientInfoList.map(async patientInfo => {
        const doctor = await DoctorInfo.findOne({ 
            doctorId : patientInfo.doctorId,
            useYn : 'Y',
        });
        return {
            patientId : patientInfo.patientId,
            doctorId : patientInfo.doctorId,
            useYn : patientInfo.useYn,
            info : patientInfo.info,
            doctorNm : doctor.info.doctorNm,
        }
    }));

    ctx.status = 200;
    ctx.body = {
        doctorReqList,
    };

};

/**
 * 의사가 요청한 환자 등록을 수락한다/
 * @param {*} ctx 
 * http methods : post
 */
exports.acceptDoctorRegister = async ctx => {
    const token = ctx.req.headers.authorization
    if (!token || !token.length) {
        ctx.status = 401
        return
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByUserId(userId)
    if(!user || !user.userTypeCd || user.userTypeCd !== 'NORMAL' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }
    
    const { doctorId } = ctx.request.body;
    const patientInfo = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(userId, doctorId, 'W');
    if(!patientInfo) {
        ctx.status = 404;
        return;
    }

    await patientInfo.updateInfo('환자 등록 요청 수락');
    await patientInfo.setUseYn('Y');
    await patientInfo.save();

    ctx.status = 200;

};

