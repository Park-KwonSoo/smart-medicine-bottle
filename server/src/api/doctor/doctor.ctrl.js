//의사가 사용할 수 있는 Api
const User = require('../../models/user');
const Profile = require('../../models/profile');
const Bottle = require('../../models/bottle');
const Medicine = require('../../models/medicine');
const History = require('../../models/history');
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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const managePatientIdList = await PatientInfo.findAllByDoctorId(userId);

    const result = managePatientIdList.map(async patientId => {
        const patient = await User.findByUserId(patientId);
        return patient;
    });

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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
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

    const isDoctorsPatient = await PatientInfo.findByPatientIdAndDoctorId(patientId, userId);
    if(!isDoctorsPatient) {
        ctx.status = 403;
        return;
    }

    const profile = await Profile.findByUserId(patientId);
    
    //reqUser의 약병 조회도 한번에
    const reqUserHubList = await Hub.findAllByUserId(patientId);
    const reqUserBottleList = [];
    await Promise.all(reqUserHubList.map(async hub => {
        const bottleList = await Bottle.findAllByHubId(hub.hubId);
        reqUserBottleList.push(...bottleList);
    }));

    const result = {
        ...profile,
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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { bottleId } = ctx.params;
    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    }
    if(bottle.getDoctorId() !== userId) {
        ctx.status = 403;
        return;
    }


    //약병에 들어있는 약 정보와 복용 내역을 가져온다.
    const bottleInfo = {
        temperature : bottle.temperature,
        humidity : bottle.humidity,
        dosage : bottle.dosage,
        balance : bottle.balance,
    };

    const medicine  = await Medicine.findByMedicineId(bottle.getMedicineId());
    const takeHistory = await History.findByBottleIdAndMedicineId(bottleId, bottle.getMedicineId());

    const result = {
        bottleInfo,
        medicine,
        takeHistory,
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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { reqUserId, info } = ctx.request.body;
    const patient = await User.findByUserId(reqUserId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        return;
    }

    const patientInfo = await PatientInfo.findByPatientIdAndDoctorId(reqUserId, userId);
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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if(!user || user.userTypeCd !== 'DOCTOR' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { bottleId, fdbType, feedback } = ctx.request.body;
    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    }
    if(bottle.getDoctorId() !== userId) {
        ctx.status = 403;
        return;
    }

    const newFeedback = new Feedback({
        fdbDtm : new Date(),
        fdbType,
        bottleId,
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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if(!user || user.userTypeCd !== 'DOCTOR') {
        ctx.status = 403;
        return;
    }

    const { reqUserId } = ctx.request.body;
    const patient = await User.findByUserId(reqUserId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        return;
    }

    const patientInfo = new PatientInfo({
        patientId : reqUserId,
        doctorId : userId,
        info : '',
    });

    patientInfo.updateInfo('환자 등록');
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

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
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

    const patientInfo = await PatientInfo.findByPatientIdAndDoctorId(patientId, userId);
    if(!patientInfo) {
        ctx.status = 404;
        return;
    }

    await PatientInfo.deleteOne({
        patientId,
        doctorId : userId,
    });

    ctx.status = 200;

};