// const fcm = require('firebase-admin');
const axios = require('axios');

// exports.initializeFCM = () => {
//     fcm.initializeApp({
//         credential: fcm.credential.applicationDefault(),
//     });
// };

exports.sendPushMessage = async ({ deviceToken, title, body }) => {
    // const notifyMessage = {
    //     notification : {
    //         title,
    //         body,
    //     },
    //     token : deviceToken,
    // };
    // fcm.messaging().send(notifyMessage).then(res => {
    //     console.log(res);
    // }).catch(e => {
    //     console.log(e);
    // });

    const message = {
        to : deviceToken,
        notification : {
            title,
            body,
            priority : 'high',
        },
        data : null,
    }

    const url = 'https://fcm.googleapis.com/fcm/send';
    const result = await axios.post(url, message, {
        headers : {
            'Content-Type' : 'application/json',
            // eslint-disable-next-line no-undef
            'Authorization' : `key=${process.env.FCM_KEY}`,
        },
    });

    console.log(result.data);
};