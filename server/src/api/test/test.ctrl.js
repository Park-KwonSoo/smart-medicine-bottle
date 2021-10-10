//테스트용 api service
const { sendPushMessage } = require('../../util/FCM');


exports.sendFcmMessage = async ctx => {
    const { deviceToken, title, body } = ctx.request.body;

    try {
        await sendPushMessage(ctx.request.body);
    } catch(e) {
        console.log('Error at FCM Sending : ', e);
    }
};