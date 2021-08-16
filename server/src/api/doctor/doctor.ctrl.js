//의사가 사용할 수 있는 Api
const User = require('../../models/user');
const Profile = require('../../models/profile');
const Bottle = require('../../models/bottle');
const Medicine = require('../../models/medicine');
const BottleMedicine = require('../../models/bottleMedicine');
const TakeMedicineHist = require('../../models/takeMedicineHistory');
const Feedback = require('../../models/feedback');
const Hub = require('../../models/hub');
const PatientInfo = require('../../models/patientInfo');
const jwt = require('jsonwebtoken');

/**
 * 관리하는 환자 목록을 모두 가져옴
 * @param {*} ctx 
 * http methods : GET
 */
exports.getPatientList = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const managePatientIdList = await PatientInfo.findAllByDoctorIdAndUseYn(userId, 'Y');

    const result = [];
    await Promise.all(managePatientIdList.map(async patient => {
        const patientProfile = await Profile.findByUserId(patient.patientId);
        result.push(patientProfile);
    }));

    ctx.status = 200;
    ctx.body = result;

};

/**
 * 관리하는 특정 환자의 정보를 가져온다.
 * @param {*} ctx 
 * http methods : GET
 */
exports.getPatientDetail = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { patientId } = ctx.params;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        return;
    }

    const isDoctorsPatient = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(patientId, userId, 'Y');
    if(!isDoctorsPatient) {
        ctx.status = 403;
        return;
    }

    const profile = await Profile.findByUserId(patientId);
    
    //reqUser의 약병 조회도 한번에
    const reqUserHubList = await Hub.findAllByUserId(patientId);
    const reqUserBottleList = [];
    await Promise.all(reqUserHubList.map(async hub => {
        const bottleList = await Bottle.findAllByHubId(hub.hubId, userId);
        reqUserBottleList.push(...bottleList);
    }));

    const result = {
        profile,
        info : isDoctorsPatient.getInfo(),
        bottleList : reqUserBottleList,
    };

    ctx.status = 200;
    ctx.body = result;

};

/**
 * 관리하는 환자의 특병 약병을 조회하여, 복용을 잘 하고 있는지 확인한다.
 * @param {*} ctx 
 * http methods : GET
 */
exports.getBottleDetail = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        ctx.body = {
            error : '권한 없는 사용자',
        }
        return;
    }

    const { bottleId } = ctx.params;
    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 약병',
        }
        return;
    }

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, doctorId : userId });
    if(!bottleMedicine) {
        ctx.status = 403;
        ctx.body = {
            error : '약병에 대한 권한 없음',
        }
        return;
    }

    const medicine = await Medicine.findOne({ medicineId : bottleMedicine.medicineId });
    const takeMedicineHist = await TakeMedicineHist.find({ 
        bmId : bottleMedicine._id,
    }).sort({ takeDate : 'desc' });

    const result = {
        medicine,
        takeMedicineHist,
    };

    ctx.status = 200;
    ctx.body = result;

};

/**
 * 특정 환자의 특이사항을 기록한다.
 * @param {*} ctx 
 * http methods : PATCH
 */
exports.writeReqPatientReport = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { patientId, info } = ctx.request.body;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        return;
    }

    const patientInfo = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(patientId, userId, 'Y');
    if(!patientInfo) {
        ctx.status = 404;
        return;
    }

    await patientInfo.updateInfo(info);
    patientInfo.save();

    ctx.status = 200;
    
};

/**
 * 약을 복용중인 환자의 약병(=복용중인 약)에 대한 피드백을 등록한다.
 * @param {*} ctx 
 * http methods : POST
 */
exports.writeReqBottleFeedback = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        ctx.body = {
            error : '권한 없는 사용자',
        }
        return;
    }

    const { bottleId, fdbType, feedback } = ctx.request.body;
    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 약병'
        }
        return;
    }

    const bottleMedicine = await BottleMedicine.find({ bottleId, doctorId : userId })
        .sort({ regDtm : 'desc' })
        .limit(1);

    if(!bottleMedicine.length) {
        ctx.status = 403;
        ctx.body = {
            error : '약병에 대한 권한 없음'
        }
        return;
    }

    const newFeedback = new Feedback({
        fdbType,
        bmId : bottleMedicine[0]._id,
        doctorId : userId,
        feedback,
    });
    newFeedback.save();

    ctx.status = 200;

};

/**
 * 새로운 환자를 등록한다.
 * @param {*} ctx 
 * http methods : POST
 */
exports.registerNewPatient = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'DOCTOR') {
        ctx.status = 403;
        return;
    }

    const { patientId } = ctx.request.body;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        return;
    }

    const isExistPatientInfo = await PatientInfo.findByPatientIdAndDoctorId(patientId, userId);
    if(isExistPatientInfo) {
        ctx.status = 403;
        return;
    }

    const patientInfo = new PatientInfo({
        patientId,
        doctorId : userId,
        info : '',
        useYn : 'W',
    });

    patientInfo.updateInfo('환자 등록 요청');
    patientInfo.save();

    ctx.status = 200;

};

/**
 * 등록된 환자를 해제한다.
 * @param {*} ctx 
 * http methods : DELETE
 */
exports.removeReqPatient = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'DOCTOR') {
        ctx.status = 403;
        return;
    }

    const { patientId } = ctx.params;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        return;
    }

    const patientInfo = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(patientId, userId, 'Y');
    if(!patientInfo) {
        ctx.status = 404;
        return;
    }

    await patientInfo.setUseYn('N')
    patientInfo.save();

    ctx.status = 200;

};