const mqtt = require('mqtt');

exports.mqttOn = async(hosting, topic) => {
    const client = mqtt.connect(hosting);
    client.subscribe(topic);
}