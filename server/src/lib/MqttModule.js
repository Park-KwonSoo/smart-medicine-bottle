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

exports.mqttSubscribe = (client, topic, func) => {
    client.subscribe(topic);
    client.on('message', async (topic, message, packet) => {
        const result = await func(topic, message.toString());
        this.mqttPublishMessage(client, result);
    });
};

exports.mqttPublishMessage = (client, { topic, message }) => {
    client.publish(topic, message, () => {});
};

exports.mqttOff = (hosting) => {
    const filterIndex = clientList.findIndex(client => {
        return (client.options.clientId === hosting.clientId
            && client.options.host === hosting.host
            && client.options.port === hosting.port)
    });

    if(filterIndex !== -1) {
        clientList[filterIndex].end();
        clientList.splice(filterIndex, 1);
    }
}