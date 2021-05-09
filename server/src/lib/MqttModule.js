const mqtt = require('mqtt');
const clientList = [];

exports.mqttOn = async (hosting) => {
    const filterIndex = clientList.findIndex(client => {
        return (client.options.clientId === hosting.clientId
            && client.options.host === hosting.host
            && client.options.port === hosting.port)
    });

    if(filterIndex === -1) {
        const client = mqtt.connect(hosting);
        clientList.push(client);
        client.on('connect', () => {
            console.log('Client connected: ', client.connected);
        }); 
        
        return client;
    } else  {
        return clientList[filterIndex];
    };
};

exports.mqttSubscribe = (client, topic) => {
    client.subscribe(topic);
    client.on('message', (topic, message, packet) => {
        console.log('\x1b[1;37mtopic : ', topic, '\x1b[0m');
        console.log('\x1b[1;37mmessage : ', message.toString(), '\x1b[0m', '\n');
    });
};

exports.mqttPublishMessage = (client, topic, message) => {
    client.publish(topic, message, () => {});
};