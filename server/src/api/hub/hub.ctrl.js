//허브(Mqtt Broker)등록 및 삭제
const Hub = require('../../models/hub');
const Mqtt = require('../../lib/MqttModule');

exports.hubConnect = async (ctx) => {
    const { hubId, host, port } = ctx.request.body;

    const hosting = {
        host,
        port
    };

    Mqtt.mqttOn(hosting);
    await Hub.findOneAndUpdate({
        hubId
    }, { hosting }, {
        upsert : true
    });

    ctx.status = 200;
}

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
}