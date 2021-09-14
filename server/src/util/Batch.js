//toDO : Batch System
/**
 * 21/09/14
 * Author : 박권수
 * 배치 시스템
 * 1) 매년 지나면 프로필의 Age를 +1
 * 2) Dosage에 따라, Push Notification 발송
 */

const cron = require('node-cron');

const Profile = require('../models/profile');
const User = require('../models/user');
const Hub = require('../models/hub');
const Bottle = require('../models/bottle');
const BottleMedicine = require('../models/bottleMedicine');


//매년 1월 1일 00시 00분에 1살씩 추가
exports.CheckNewYear = () => {
    cron.schedule('0 0 0 1 1 *', async () => {
        const profileList = await Profile.find();
        profileList.forEach(async profile => {
            await profile.updateUserAge();
            profile.save();
        });

    }, {
        timezone : 'Asia/Tokyo',
    });
};

//dosage에 따라, Push Notification을 발송한다.
//아침 8시, 점심 12시, 저녁 6시에 한번씩 발송
exports.PushNotifyByDosage = async() => {

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
                PushNotify(deviceToken);
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
                PushNotify(deviceToken);
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
                PushNotify(deviceToken);
            }
        });
    }, {
        timezone : 'Asia/Tokyo',
    });

};

const PushNotify = async(deviceToken) => {
    //toDo : deviceToken을 받아서 push notification을 발송하는 함수
    console.log(deviceToken);
};
