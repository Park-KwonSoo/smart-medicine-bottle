const mqtt = require('mqtt');
const clientList = [];

exports.mqttOn = async (hosting, foo) => {
    const filterIndex = clientList.findIndex(client => {
        return (client.options.clientId === hosting.clientId
            && client.options.host === hosting.host
            && client.options.port === hosting.port)
    })

    if(filterIndex === -1) {
        const client = mqtt.connect(hosting);
        clientList.push(client);

        client.on('connect', () => {
            console.log('Hub connected: ', client.connected)
        });

        client.on('message', async (topic, message) => {
            const result = await foo(topic, message.toString());
            console.log('\x1b[1;32msubscribe : topic', topic, 'message : ', message.toString(), '\x1b[0m')
            if(result)  this.mqttPublishMessage(client, result);
        });
        
        return client;
    } 

    return clientList[filterIndex];
}

exports.mqttSubscribe = (client, topic) => {
    client.subscribe(topic, () => {
    });
}

exports.mqttPublishMessage = (client, { topic, message }) => {
    client.publish(topic, message, () => {
        console.log('\x1b[1;33mpublish : topic', topic, 'message : ', message, '\x1b[0m')
    })
}

exports.mqttUnsubscribe = (client, topic) => {
    client.unsubscribe(topic, () => {
        console.log('unsubscribe', topic)
    })
}

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