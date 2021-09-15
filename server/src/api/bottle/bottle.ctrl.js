/* eslint-disable no-undef */
//어플에서 약병 등록 및, 약병에 관한 정보 조회 = 여기서 mqtt통신으로 broker에 데이터를 요청한다.
const Bottle = require('../../models/bottle');
const Hub = require('../../models/hub');
const Medicine = require('../../models/medicine');
const User = require('../../models/user');
const PatientInfo = require('../../models/patientInfo');
const TakeMedicineHist = require('../../models/takeMedicineHistory');
const BottleMedicine = require('../../models/bottleMedicine');
const Feedback = require('../../models/feedback');
const Mqtt = require('../../util/MqttModule');
const jwt = require('jsonwebtoken');

//약병 등록
exports.bottleConnect = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { bottleId, hubId } = ctx.request.body;

    const isExistBottle = await Bottle.findByBottleId(bottleId);
    if(isExistBottle) {
        ctx.status = 409;
        return;
    }

    const hub = await Hub.findByHubId(hubId);
    if(!hub) {
        ctx.status = 404;
        return;
    }
    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        return;
    }

    const hosting = hub.getHubHost();
    if(!hosting) {
        ctx.status = 404;
        return;
    }


    const newBottle = new Bottle({
        bottleId,
        hubId
    });

    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + newBottle.getBottleId() + '/bts';
    Mqtt.mqttSubscribe(client, topic);

    await newBottle.save();

    ctx.status = 201;
};

//약병 등록 해제
exports.bottleDisconnect = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { bottleId } = ctx.params; 

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    } 

    const hub = await Hub.findByHubId(bottle.getHubId());
    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        return;
    }

    const hosting = hub.getHubHost();

    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + bottleId + '/bts';
    Mqtt.mqttUnsubscribe(client, topic);

    await Bottle.deleteOne({ bottleId });

    ctx.status = 204;

};

//약병 정보를 조회 -> 약병의 기록을 가져온다. message : req
exports.getBottleInfo = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { bottleId } = ctx.params;

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    }

    const hub = await Hub.findByHubId(bottle.getHubId());
    if(hub.userId !== userId) {
        ctx.status = 403;
        return;
    }


    const hosting = hub.getHubHost();
    //서버에서 bottle로 데이터를 요청한다.
    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + bottleId + '/stb';
    const message = 'req';
    await Mqtt.mqttPublishMessage(client, { topic, message });

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, useYn : 'Y' });
    
    if(bottleMedicine) {
        const takeMedicineHist = await TakeMedicineHist
            .find({ bmId : bottleMedicine._id })
            .sort({ takeDate : 'desc' })
            .populate('bmId');

        ctx.status = 200;
        ctx.body = {
            bottle,
            takeMedicineHist,
        };

    } else {
        ctx.status = 200;
        ctx.body = {
            bottle,
            takeMedicineHist : [],
        }
    }

}

//약병에 대한 피드백의 정보를 가져옴
exports.getBottleFeedback = async ctx => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        ctx.body = {
            error : '권한 없는 사용자'
        }
        return;
    }

    const { bottleId } = ctx.params;

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 약병'
        }
        return;
    }

    const hub = await Hub.findByHubId(bottle.getHubId());
    if(hub.userId !== userId) {
        ctx.status = 403;
        ctx.body = {
            error : '약병에 대한 권한 없음'
        }
        return;
    }

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, useYn : 'Y' });

    if(bottleMedicine) {
        const feedbackList = await Feedback.find({ bmId : bottleMedicine._id })
            .sort({ fdbDtm : 'desc' })
            .populate('bmId');

        ctx.status = 200;
        ctx.body = feedbackList;
    } else {
        ctx.status = 404;
        ctx.body = {
            error : '정보가 등록되지 않은 약병',
        };
    }

};

//약병의 ID를 찾아서 약의 정보와 처방의를 등록 : Post
exports.setMedicine = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { bottleId } = ctx.params;
    const { medicineId, dosage, doctorId } = ctx.request.body;

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        ctx.body = {
            error : '약병 찾을 수 없음.',
        }
        return;
    }

    const hub = await Hub.findByHubId(bottle.getHubId());
    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        ctx.body = {
            error : '해당 허브 권한 없음',
        }
        return;
    }

    const medicine = await Medicine.findByMedicineId(medicineId);
    if(!medicine) {
        ctx.status = 404;
        ctx.body = {
            error : '해당 약 존재하지 않음',
        }
        return;
    }


    //new bottleMedicine
    let bottleMedicine = new BottleMedicine({
        bottleId,
        medicineId,
        dosage,
    });

    if(doctorId !== undefined && doctorId !== null && doctorId !== '') {
        const patientInfo = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(userId, doctorId, 'Y');
        if(!patientInfo) {
            ctx.status = 403;
            ctx.body = {
                error : '담당의가 아님',
            };
            return;
        }

        bottleMedicine.setDoctorId(doctorId);
    }

    await BottleMedicine.updateMany({ bottleId }, { useYn : 'N '});
    
    bottleMedicine.save();

    ctx.status = 200;
};

// //비어있는 약병에 의사를 등록한다.
// exports.registerDoctorToBottle = async ctx => {
//     const token = ctx.req.headers.authorization;
//     if(!token || !token.length) {
//         ctx.status = 401;
//         return;
//     }

//     const { userId } = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByUserId(userId);
//     if(!user || !user.userTypeCd || user.useYn !== 'Y') {
//         ctx.status = 403;
//         return;
//     }

//     const { bottleId } = ctx.params;
//     const { doctorId } = ctx.request.body;
//     const bottle = await Bottle.findByBottleId(bottleId);
//     if(!bottle) {
//         ctx.status = 404;
//         return;
//     }
//     if(bottle.getDoctorId()) {
//         ctx.status = 403;
//         return;
//     }

//     const patinetInfo = await PatientInfo.findByPatientIdAndDoctorIdAndUseYn(userId, doctorId, 'Y');
//     if(!patinetInfo) {
//         ctx.status = 404;
//         return;
//     }

//     bottle.setDoctorId(doctorId);
//     bottle.save();

//     ctx.status = 200;

// };

//로그인한 유저의 약병 리스트 가져오기
exports.getHubsBottleList = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }
    
    const { hubId } = ctx.params;

    const hub = await Hub.findByHubId(hubId);
    if(!hub) {
        ctx.status = 404;
        return;
    }

    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        return;
    }

    const bottleList = await Bottle.find({ hubId });
    if(!bottleList || !bottleList.length) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body = {
        bottleList,
    };
    
};

//현재 로그인한 유저의 모든 약병을 가져옴
exports.getAllBottleList = async ctx => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const hubList = await Hub.find({ userId });

    const bottleList = [];
    await Promise.all(hubList.map(async hub => {
        const _bottleList = await Bottle.find({ hubId : hub.hubId });
        bottleList.push(..._bottleList);
    }));

    ctx.status = 200;
    ctx.body = {
        bottleList
    };

};