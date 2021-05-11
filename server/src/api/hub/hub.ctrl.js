//허브(Mqtt Broker)등록 및 삭제
const Hub = require('../../models/hub');
const Mqtt = require('../../lib/MqttModule');
const DataProcess = require('../../lib/DataProcess');
const jwt = require('jsonwebtoken');

exports.hubConnect = async (ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
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
    ctx.body = hub;
};

exports.hubDisconnect = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
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