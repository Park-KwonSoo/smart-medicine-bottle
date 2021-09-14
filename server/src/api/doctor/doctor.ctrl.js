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
const DoctorInfo = require('../../models/doctorInfo');
const jwt = require('jsonwebtoken');


/**
 * 현재 로그인한 유저의 의사 정보를 가져온다
 * http methods : get
 * @param {*} ctx 
 * @returns 
 */
exports.getDoctorsInfo = async ctx => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
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
    
    const doctorInfo = await DoctorInfo.findOne({
        doctorId : userId,
        useYn : 'Y'
    });

    if(!doctorInfo) {
        ctx.status = 401;
        ctx.body = {
            error : '인증되지 않은 회원'
        }
        return;
    }

    ctx.status = 200;
    ctx.body = {
        doctorInfo : doctorInfo.info
    };

};

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
        ctx.body = {
            error : '권한 없는 유저',
        };
        return;
    }

    const managePatientIdList = await PatientInfo.findAllByDoctorIdAndUseYn(userId, 'Y');

    const patientList = [];
    await Promise.all(managePatientIdList.map(async patient => {
        const patientProfile = await Profile.findByUserId(patient.patientId);
        patientList.push(patientProfile);
    }));

    ctx.status = 200;
    ctx.body = {
        patientList,
    };

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
        ctx.body = {
            error : '권한 없는 사용자',
        };
        return;
    }

    const { patientId } = ctx.params;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 유저',
        };
        return;
    }

    const isDoctorsPatient = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(patientId, userId, 'Y');
    if(!isDoctorsPatient) {
        ctx.status = 403;
        ctx.body = {
            error : '접근 권한 없는 환자',
        };
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

    const reqUserBmList = [];
    await Promise.all(reqUserBottleList.map(async bottle => {
        const bm = await BottleMedicine.findOne({
            doctorId : userId,
            bottleId : bottle.bottleId,
            useYn : 'Y',
        });
        reqUserBmList.push(bm);
    }));

    const bottleList = await Promise.all(reqUserBmList.map(async bottleMedicine => {
        const { bottleId, dosage, regDtm, medicineId } = bottleMedicine;
        const medicine = await Medicine.findOne({ medicineId });
        return {
            bottleId,
            dosage,
            regDtm,
            medicine,
        };
    }));

    const result = {
        profile,
        info : isDoctorsPatient.getInfo(),
        bottleList,
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

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, doctorId : userId, useYn : 'Y' });
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
    const feedbackList = await Feedback.find({
        bmId : bottleMedicine._id,
    }).sort({ fdbDtm : 'desc' });

    const result = {
        bottleId,
        medicine,
        takeMedicineHist,
        feedbackList,
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
        ctx.body = {
            error : '권한 없는 유저',
        };
        return;
    }

    const { patientId, info } = ctx.request.body;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 유자',
        };
        return;
    }

    const patientInfo = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(patientId, userId, 'Y');
    if(!patientInfo) {
        ctx.status = 404;
        ctx.body = {
            error : '접근 권한 없는 환자',
        };
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

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, doctorId : userId, useYn : 'Y' });

    if(!bottleMedicine) {
        ctx.status = 403;
        ctx.body = {
            error : '약병에 대한 권한 없음'
        }
        return;
    }

    const newFeedback = new Feedback({
        fdbType,
        bmId : bottleMedicine._id,
        doctorId : userId,
        feedback,
    });
    newFeedback.save();

    ctx.status = 200;

};

exports.searchPatientById = async ctx => {
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
        ctx.body = {
            error : '권한 없는 유저',
        };
        return;
    }

    const { patientId } = ctx.params;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 회원',
        };
        return;
    }

    const patientProfile = await Profile.findOne({ userId : patientId });

    ctx.status = 200;
    ctx.body = {
        patientNm : patientProfile.userNm,
        patientId,
    };
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
        ctx.body = {
            error : '권한 없는 유저',
        };
        return;
    }

    const { patientId } = ctx.request.body;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 유저',
        };
        return;
    }

    const isExistPatientInfo = await PatientInfo.findByPatientIdAndDoctorId(patientId, userId);
    if(isExistPatientInfo) {
        ctx.status = 403;
        ctx.body = {
            error : '이미 등록된 환자이거나, 등록 요청 대기중인 환자',
        };
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
        ctx.body = {
            error : '권한 없는 유저',
        };
        return;
    }

    const { patientId } = ctx.params;
    const patient = await User.findByUserId(patientId);
    if(!patient || patient.useYn !== 'Y') {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 회원',
        };
        return;
    }

    const patientInfo = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(patientId, userId, 'Y');
    if(!patientInfo) {
        ctx.status = 404;
        ctx.body = {
            error : '등록되지 않은 환자',
        };
        return;
    }

    await patientInfo.setUseYn('N')
    patientInfo.save();

    ctx.status = 200;

};