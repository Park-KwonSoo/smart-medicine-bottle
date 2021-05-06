//허브(Mqtt Broker)등록 및 삭제
const Hub = require('../../models/hub');
const Mqtt = require('../../lib/MqttModule');

exports.hubConnect = async (ctx) => {
    const { host, port, hubId, topic } = ctx.request.body;

    const hub = {
        hubId,
        hosting : {
            host,
            port
        }
    };

    await Hub.findOneAndUpdate({ 
        hubId 
    }, hub, { 
        upsert : true
    });

    const client = Mqtt.mqttOn({ host, port });
    Mqtt.mqttSubscribe(client, topic);

    ctx.body = 'host :' + host;
    ctx.status = 200;
}

exports.hubDisconnect = async(ctx) => {

}