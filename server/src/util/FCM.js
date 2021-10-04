const fcm = require('firebase-admin');


exports.initializeFCM = () => {
    fcm.initializeApp({
        credential : fcm.credential.applicationDefault(),
    });
};

exports.sendPushMessage = async ({ deviceToken, title, body }) => {
    const notifyMessage = {
        notification : {
            title,
            body,
        },
        token : deviceToken,
    };
    fcm.messaging().send(notifyMessage);
};