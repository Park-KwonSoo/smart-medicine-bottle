//유저에 관련된 Api
const User = require('../../models/user');
const Profile = require('../../models/profile');
const PatientInfo = require('../../models/patientInfo');
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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByUserId(userId)
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const profile = await Profile.findByUserId(userId);

    ctx.status = 200;
    ctx.body = profile;

}

/**
 * 내 정보를 업데이트한다.
 * @param {*} ctx 
 * http methods : post
 */
exports.updateMyInfo = async ctx => {
    
};

/**
 * 의사가 요청한 환자 등록을 확인한다.
 * @param {*} ctx 
 * http methods : get
 */
exports.viewAllDoctorRegister = async ctx => {
    const token = ctx.req.headers.authorization
    if (!token || !token.length) {
        ctx.status = 401
        return
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByUserId(userId)
    if(!user || !user.userTypeCd || user.userTypeCd !== 'NORMAL' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const patientInfoList = await PatientInfo.findAllByPatientIdAndUseYn(userId, 'W');

    ctx.status = 200;
    ctx.body = patientInfoList;

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
