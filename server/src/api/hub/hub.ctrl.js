//허브(Mqtt Broker)등록 및 삭제
const Hub = require('../../models/hub');
const User = require('../../models/user');
const Mqtt = require('../../lib/MqttModule');
const DataProcess = require('../../lib/DataProcess');
const jwt = require('jsonwebtoken');

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

    const { hubId, host, port } = ctx.request.body;

    const isExistHub = await Hub.findByHubId(hubId);
    if(isExistHub) {
        ctx.status = 409;
        return;
    }

    const hosting = {
        host,
        port
    };

    Mqtt.mqttOn(hosting, DataProcess.dataPublish);
    
    const hub = new Hub({
        hubId,
        hosting,
        userId
    });

    await hub.save();

    ctx.status = 201;

};

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

    await Hub.deleteOne({ hubId });

    ctx.status = 204;
};