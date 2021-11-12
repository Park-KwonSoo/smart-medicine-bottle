//toDO : Batch System
/**
 * 21/09/14
 * Author : 박권수
 * 배치 시스템
 * 1) Dosage에 따라, Push Notification 발송
 */

const cron = require('node-cron');
const fs = require('fs');

const Profile = require('../models/profile');
const User = require('../models/user');
const Hub = require('../models/hub');
const Bottle = require('../models/bottle');
const BottleMedicine = require('../models/bottleMedicine');
const Medicine = require('../models/medicine');

const updateMedicineInfo = require('../lib/UpdatingMedicineInfo');
const { sendPushMessage } = require('./FCM');


//매월 1일 0시 0분에 약 정보 업데이트
exports.updateMedicineData = async () => {
    cron.schedule('0 0 0 1 * *', () => {
        updateMedicineInfo.updateMedicineInfo();
    }, {
        timezone : 'Asia/Tokyo',
    });
};

//매주 일요일마다 불필요한 qrcode 제거
exports.removeQrCode = () => {
    cron.schedule('0 0 0 * * 0', () => {
        // eslint-disable-next-line no-undef
        const qrDir = process.env.QR_DIR;
        fs.rm(qrDir, { recursive : true, force : true, }, () => {
            fs.mkdir(qrDir, (err) => { if(err)  console.log(err) });
        });
    }, {
        timezone : 'Asia/Tokyo',
    });
};

//dosage에 따라, Push Notification을 발송한다.
//아침 8시, 점심 12시, 저녁 6시에 한번씩 발송
exports.sendPushMessageByDosage = async() => {

    //매일 아침 8시 : 복용량 상관 없이 보냄
    cron.schedule('0 0 8 * * *', async () => {
        const bottleMedicineList = await BottleMedicine.find({ useYn : 'Y', dosage : { $gte : 1 } });
        bottleMedicineList.forEach(async bottleMedicine => {
            const bottle = await Bottle.findOne({ bottleId : bottleMedicine.bottleId });
            const hub = await Hub.findOne({ hubId : bottle.hubId });
            const user = await User.findOne({ userId : hub.userId, useYn : 'Y' });

            if(user) {
                const profile = await Profile.findOne({ userId : user.userId });
                const { deviceToken } = profile;

                if(deviceToken) {
                    const medicine = await Medicine.findOne({ medicineId : bottleMedicine.medicineId });
                    sendPushMessage({
                        deviceToken,
                        title : '약 복용 시간입니다',
                        body : medicine.name + '을 복용하셔야 합니다.',
                    });
                }
            }
        });
    }, {
        timezone : 'Asia/Tokyo',
    });


    //매일 점심 12시 : 복용량이 3인 환자들만
    cron.schedule('0 0 12 * * *', async () => {
        const bottleMedicineList = await BottleMedicine.find({ useYn : 'Y', dosage : { $gte : 3 } });
        bottleMedicineList.forEach(async bottleMedicine => {
            const bottle = await Bottle.findOne({ bottleId : bottleMedicine.bottleId });
            const hub = await Hub.findOne({ hubId : bottle.hubId });
            const user = await User.findOne({ userId : hub.userId, useYn : 'Y' });

            if(user) {
                const profile = await Profile.findOne({ userId : user.userId });
                const { deviceToken } = profile;

                if(deviceToken) {
                    const medicine = await Medicine.findOne({ medicineId : bottleMedicine.medicineId });
                    sendPushMessage({
                        deviceToken,
                        title : '약 복용 시간입니다',
                        body : medicine.name + '을 복용하셔야 합니다.',
                    });
                }
            }
        });
    }, {
        timezone : 'Asia/Tokyo',
    });


    //매일 저녁 6시
    cron.schedule('0 0 18 * * *', async () => {
        const bottleMedicineList = await BottleMedicine.find({ useYn : 'Y', dosage : { $gte : 2 } });
        bottleMedicineList.forEach(async bottleMedicine => {
            const bottle = await Bottle.findOne({ bottleId : bottleMedicine.bottleId });
            const hub = await Hub.findOne({ hubId : bottle.hubId });
            const user = await User.findOne({ userId : hub.userId, useYn : 'Y' });

            if(user) {
                const profile = await Profile.findOne({ userId : user.userId });
                const { deviceToken } = profile;

                if(deviceToken) {
                    const medicine = await Medicine.findOne({ medicineId : bottleMedicine.medicineId });
                    sendPushMessage({
                        deviceToken,
                        title : '약 복용 시간입니다',
                        body : medicine.name + '을 복용하셔야 합니다.',
                    });
                }
            }
        });
    }, {
        timezone : 'Asia/Tokyo',
    });

};