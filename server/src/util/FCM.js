const fcm = require('firebase-admin');


exports.initializeFCM = () => {
    fcm.initializeApp({
        credential : fcm.credential.applicationDefault(),
    });
};

exports.sendPushMessage = async ({ deviceToken, message }) => {
    const notifyMessage = {
        notification : {
            title : '약 먹을 시간입니다',
            body : message,
        },
        token : deviceToken,
    };
    fcm.messaging().send(notifyMessage);
};