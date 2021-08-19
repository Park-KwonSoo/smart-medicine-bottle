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
 * http methods : post
 */
exports.updateMyInfo = async ctx => {
    
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

        return doctorInfo.info;
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

    const patientInfoList = await PatientInfo.findAllByPatientIdAndUseYn(userId, 'W');

    ctx.status = 200;
    ctx.body = {
        patientInfoList,
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

    patientInfo.updateInfo('환자 등록 요청 수락');
    patientInfo.setUseYn('Y');
    patientInfo.save();

    ctx.status = 200;

};

