const mqtt = require('mqtt');

exports.mqttOn = (hosting) => {
    const client = mqtt.connect(hosting);
    client.on('connect', () => {
        console.log('Connected : ', client.connected)
    });

    return client;
}

exports.mqttSubscribe = (client, topic) => {
    client.subscribe(topic);
    client.on('message', (topic, message, packet) => {
        console.log('topic : ', topic);
        console.log('message : ', message.toString());
    });
}