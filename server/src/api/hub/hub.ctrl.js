//허브(Mqtt Broker)등록 및 삭제
const Hub = require('../../models/hub');
const Mqtt = require('../../lib/MqttModule');
const DataProcess = require('../../lib/DataProcess');

exports.hubConnect = async (ctx) => {
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
        hosting
    });

    await hub.save();

    ctx.status = 200;
    ctx.body = hub;
};

exports.hubDisconnect = async(ctx) => {
    const { hubId } = ctx.params;

    const hub = await Hub.findByHubId(hubId);
    if(!hub) {
        ctx.status = 404;
        return;
    }

    const hosting = await hub.getHubHost();
    Mqtt.mqttOff(hosting);

    await Hub.deleteOne({ hubId });

    ctx.status = 200;
};