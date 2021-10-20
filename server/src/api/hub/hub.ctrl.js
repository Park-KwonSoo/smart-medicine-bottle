//허브(Mqtt Broker)등록 및 삭제
const Hub = require('../../models/hub');
const Bottle = require('../../models/bottle');
const User = require('../../models/user');
const Mqtt = require('../../util/MqttModule');
const DataProcess = require('../../util/DataProcess');
const jwt = require('jsonwebtoken');
const BottleMedicine = require('../../models/bottleMedicine');

//허브 연결
exports.hubConnect = async (ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { hubId, host, hubNm, } = ctx.request.body;

    const isExistHub = await Hub.findByHubId(hubId);
    if(isExistHub) {
        ctx.status = 409;
        return;
    }

    const hosting = {
        host,
        port : "1883",
    };

    Mqtt.mqttOn(hosting, DataProcess.dataPublish);
    
    const hub = new Hub({
        hubId,
        hosting,
        userId,
        hubNm,
    });

    await hub.save();

    ctx.status = 201;

};

//허브 연결 해제
exports.hubDisconnect = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
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

    const hosting = await hub.getHubHost();
    Mqtt.mqttOff(hosting);

    const bottleList = await Bottle.find({ hubId });
    await Promise.all(bottleList.map(async bottle => {
        await BottleMedicine.updateMany({ bottleId : bottle.bottleId }, { useYn : 'N' });
    }));

    await Bottle.deleteMany({ hubId });
    await Hub.deleteOne({ hubId });

    ctx.status = 204;
};

//허브 정보 조회
exports.getHubList = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }
    
    const hubList = await Hub.find({ userId });
    if(!hubList || !hubList.length) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body = {
        hubList
    };
};

//허브 이름 변경
exports.setHubName = async ctx => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { hubId } = ctx.params;
    const { hubNm } = ctx.request.body;

    await Hub.updateOne({ hubId }, { hubNm });

    ctx.status = 200;
};
