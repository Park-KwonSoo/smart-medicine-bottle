const Mqtt = require('../lib/MqttModule');
const DataProcess = require('../lib/DataProcess');
const Hub = require('../models/hub');
const Bottle = require('../models/bottle');

exports.on = async() => {
    await subscribeOn();
    console.log('\x1b[1;34mMQTT Server On\x1b[0m');
};

const subscribeOn = async () => {
    const bottleList = await Bottle.find();

    bottleList.forEach(async(bottle) => {
        const topic = 'bottle/' + bottle.getBottleId() + '/bts';
        const hub = await Hub.findByHubId(bottle.getHubId());
        const client = await Mqtt.mqttOn(hub.getHubHost(), DataProcess.dataPublish);
        Mqtt.mqttSubscribe(client, topic);
    })
};